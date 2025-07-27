import { nanoid } from 'nanoid'

import { type ReceiptType, receipts } from '@entities/receipt'

export const submitReceipt = (
  receipt: Omit<ReceiptType, 'id'> & {
    id?: string
  },
) => {
  if (receipt?.id) {
    receipts.updateReceipt(receipt as ReceiptType)
  } else {
    receipts.addReceipt({ ...receipt, id: nanoid() })
  }
}
