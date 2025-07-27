import { type AddReceiptArg, receipts } from '@entities/receipt'

export const submitReceipt = (receipt: AddReceiptArg) => {
  if (receipt?.id) {
    receipts.updateReceipt(receipt)
  } else {
    receipts.addReceipt(receipt)
  }
}
