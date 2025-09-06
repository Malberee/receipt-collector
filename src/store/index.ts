import { makeAutoObservable } from 'mobx'
import { makePersistable } from 'mobx-persist-store'
import moment from 'moment'
import { nanoid } from 'nanoid'
import { MMKV } from 'react-native-mmkv'

import type { Rarity } from '@constants'

type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [P in K]?: T[P] }
export type AddReceiptArg = Omit<
  MakeOptional<ReceiptType, 'id' | 'autoCalcAmount' | 'rarity'>,
  'products'
>

export type ProductType = {
  id: string
  name: string
  price: number
  calculatedPrice: number
  quantity: number
  picture?: string
}

export type ReceiptType = {
  id: string
  amount: number
  autoCalcAmount: boolean
  date: Date
  rarity: Rarity
  products: ProductType[]
}

type Filters = {
  amount: {
    from?: number
    to?: number
  }
  date: {
    from?: Date
    to?: Date
  }
  rarities?: Rarity[]
}

export type Theme = 'light' | 'dark' | 'system'

type Preferences = {
  theme: Theme
}

type RangeFilter<T> = {
  from?: T
  to?: T
}

const storage = new MMKV()

class Store {
  receipts: ReceiptType[] = []
  preferences: Preferences = {
    theme: 'system',
  }

  filters: Filters = {
    amount: {},
    date: {},
  }

  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ReceiptsStore',
      properties: ['receipts', 'preferences'],
      storage: {
        setItem: (key, data) => storage.set(key, data),
        getItem: (key) => storage.getString(key) ?? null,
        removeItem: (key) => storage.delete(key),
      },
    })
  }

  getReceipts() {
    const { from: amountFrom, to: amountTo } = this.filters.amount
    const { from: dateFrom, to: dateTo } = this.filters.date
    const rarities = this.filters.rarities

    return this.receipts
      .filter((receipt) => {
        if (amountFrom !== undefined && amountTo !== undefined) {
          return receipt.amount >= amountFrom && receipt.amount <= amountTo
        }

        return true
      })
      .filter((receipt) => {
        if (dateFrom !== undefined && dateTo !== undefined) {
          return moment(receipt.date).isBetween(
            dateFrom,
            dateTo,
            'second',
            '[]',
          )
        }

        return true
      })
      .filter((receipt) => {
        if (rarities?.length) {
          return rarities.includes(receipt.rarity as any)
        }

        return true
      })
  }

  addReceipt(receipt: AddReceiptArg) {
    const isExists = !!this.receipts.find((item) => item.id === receipt.id)

    if (isExists) {
      throw 'Receipt already exists!'
    } else {
      this.receipts.unshift({
        autoCalcAmount: false,
        rarity: 'none',
        products: [],
        ...receipt,
        id: receipt?.id ?? nanoid(),
      })
    }
  }

  updateReceipt(receipt: Partial<ReceiptType>) {
    this.receipts = this.receipts.map((item) =>
      item.id === receipt.id ? { ...item, ...receipt } : item,
    )
  }

  deleteReceipt(id: string) {
    this.receipts = this.receipts.filter((receipt) => receipt.id !== id)
  }

  getReceiptById(id: string) {
    return this.receipts.find((receipt) => receipt.id === id)
  }

  addProduct(
    receiptId: string,
    product: Omit<ProductType, 'id' | 'calculatedPrice'>,
  ) {
    const receipt = this.getReceiptById(receiptId)

    if (!receipt) {
      throw 'Receipt not found!'
    }

    if (!receipt.products) {
      receipt.products = []
    }

    receipt.products.push({
      id: nanoid(),
      calculatedPrice: product.price * product.quantity,
      ...product,
    })
  }

  updateProduct(
    receiptId: string,
    productId: string,
    product: Omit<ProductType, 'id' | 'calculatedPrice'>,
  ) {
    const receipt = this.getReceiptById(receiptId)

    if (!receipt) {
      throw 'Receipt not found!'
    }

    if (!receipt.products) {
      throw 'Products not found!'
    }

    receipt.products = receipt.products.map((item) =>
      item.id === productId
        ? {
            ...item,
            ...product,
            calculatedPrice: product.price * product.quantity,
          }
        : item,
    )
  }

  deleteProduct(receiptId: string, productId: string) {
    const receipt = this.getReceiptById(receiptId)

    if (!receipt) {
      throw 'Receipt not found!'
    }

    if (!receipt.products) {
      throw 'Products not found!'
    }

    receipt.products = receipt.products.filter(
      (product) => product.id !== productId,
    )
  }

  setFilters(
    filterName: keyof Filters,
    filters: RangeFilter<number | Date> | Rarity[],
  ) {
    this.filters[filterName] = filters as any
  }

  setPreferences<T extends keyof Preferences>(
    preferenceName: T,
    value: Preferences[T],
  ) {
    this.preferences[preferenceName] = value
  }
}

export const store = new Store()
