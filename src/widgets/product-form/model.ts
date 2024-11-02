import { router } from 'expo-router'
import { nanoid } from 'nanoid'

import { type ProductType, receipts } from '@entities/receipt'

export const handleSubmit = (
  product: Omit<ProductType, 'id'>,
  receiptId: string,
) => {
  receipts.addProduct(receiptId, { id: nanoid(), ...product })
  router.navigate(`/receipt-details/${receiptId}`)
}
