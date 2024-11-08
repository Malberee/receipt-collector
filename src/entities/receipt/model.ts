import { makeAutoObservable } from 'mobx'
import { configurePersistable, makePersistable } from 'mobx-persist-store'
import { MMKV } from 'react-native-mmkv'

import type { Rarity } from '@shared/config'

export type ProductType = {
  id: string
  name: string
  price: number
  quantity: number
  picture?: string
}

export type ReceiptType = {
  id: string
  amount: number
  date: Date
  rarity?: Rarity
  products?: ProductType[]
}

const storage = new MMKV()

configurePersistable({
  storage: {
    setItem: (key, data) => storage.set(key, data),
    getItem: (key) => storage.getString(key) ?? null,
    removeItem: (key) => storage.delete(key),
  },
})

class Receipts {
  receipts: ReceiptType[] = []
  constructor() {
    makeAutoObservable(this)
    makePersistable(this, {
      name: 'ReceiptsStore',
      properties: ['receipts'],
    })
  }

  addReceipt(receipt: ReceiptType) {
    const isExists = !!this.receipts.find((item) => item.id === receipt.id)

    if (isExists) {
      throw 'Receipt already exists!'
    } else {
      this.receipts.unshift(receipt)
    }
  }

  updateReceipt(receipt: ReceiptType) {
    this.receipts = this.receipts.map((item) =>
      item.id === receipt.id ? receipt : item,
    )
  }

  deleteReceipt(id: string) {
    this.receipts = this.receipts.filter((receipt) => receipt.id !== id)
  }

  getReceiptById(id: string) {
    return this.receipts.find((receipt) => receipt.id === id)
  }

  addProduct(receiptId: string, product: ProductType) {
    const receipt = this.getReceiptById(receiptId)

    if (!receipt) {
      throw 'Receipt not found!'
    }

    if (!receipt.products) {
      receipt.products = []
    }

    receipt.products.unshift(product)
  }

  updateProduct(
    receiptId: string,
    productId: string,
    product: Omit<ProductType, 'id'>,
  ) {
    const receipt = this.getReceiptById(receiptId)

    if (!receipt) {
      throw 'Receipt not found!'
    }

    if (!receipt.products) {
      throw 'Products not found!'
    }

    receipt.products = receipt.products.map((item) =>
      item.id === productId ? { ...item, ...product } : item,
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
}

export const receipts = new Receipts()
