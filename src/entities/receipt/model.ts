import { makeAutoObservable } from 'mobx'

import type { Rarity } from '@shared/config'

type Product = {
  id: string
  name: string
  price?: number
  quantity?: number
}

export type ReceiptType = {
  id: string
  amount: number
  date: Date
  rarity: Rarity
  products?: Product[] | null
}

class Receipts {
  receipts: ReceiptType[] = []
  constructor() {
    makeAutoObservable(this)
  }

  addReceipt(receipt: ReceiptType) {
    this.receipts = [receipt, ...this.receipts]
  }

  getReceiptById(id: string) {
    return this.receipts.find((receipt) => receipt.id === id)
  }

  deleteReceipt(id: string) {
    this.receipts = this.receipts.filter((receipt) => receipt.id !== id)
  }
}

export const receipts = new Receipts()
