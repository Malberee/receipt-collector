import { nanoid } from 'nanoid'

import { type ProductType, receipts } from '@entities/receipt'

export const handleSubmit = async (
  product: Omit<ProductType, 'id'>,
  receiptId: string,
) => {
  receipts.addProduct(receiptId, { id: nanoid(), ...product })
}
