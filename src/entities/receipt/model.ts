import { makeAutoObservable } from 'mobx'

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
  rarity: Rarity | null
  fiscalNumber: number
  products?: ProductType[] | null
}

const receiptList: ReceiptType[] = [
  {
    fiscalNumber: Math.random(),
    id: Math.random().toString(),
    amount: Math.round(Math.random() * 100),
    date: new Date(),
    rarity: 'epic',
  },
  {
    fiscalNumber: Math.random(),
    id: Math.random().toString(),
    amount: Math.round(Math.random() * 100),
    date: new Date(2024, 10, 2),
    rarity: 'epic',
  },
  {
    fiscalNumber: Math.random(),
    id: Math.random().toString(),
    amount: Math.round(Math.random() * 100),
    date: new Date(2024, 10, 1),
    rarity: 'epic',
  },
  {
    fiscalNumber: Math.random(),
    id: Math.random().toString(),
    amount: Math.round(Math.random() * 100),
    date: new Date(2024, 9, 27),
    rarity: 'epic',
  },
  {
    fiscalNumber: Math.random(),
    id: Math.random().toString(),
    amount: Math.round(Math.random() * 100),
    date: new Date(2023, 9, 27),
    rarity: 'epic',
  },
]

class Receipts {
  receipts: ReceiptType[] = receiptList
  constructor() {
    makeAutoObservable(this)
  }

  addReceipt(receipt: ReceiptType) {
    const isExists = !!this.receipts.find(
      (item) => item.fiscalNumber === receipt.fiscalNumber,
    )

    if (isExists) {
      throw 'Receipt already exists!'
    } else {
      this.receipts = [receipt, ...this.receipts]
    }
  }

  getReceiptById(id: string) {
    return this.receipts.find((receipt) => receipt.id === id)
  }

  deleteReceipt(id: string) {
    this.receipts = this.receipts.filter((receipt) => receipt.id !== id)
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
