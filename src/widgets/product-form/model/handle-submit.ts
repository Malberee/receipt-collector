import { nanoid } from 'nanoid'

import { type ProductType, receipts } from '@entities/receipt'

export const handleSubmit = async (
  product: Omit<ProductType, 'id'>,
  receiptId: string,
  productId?: string,
) => {
  if (productId) {
    receipts.updateProduct(receiptId, productId, product)
  } else {
    receipts.addProduct(receiptId, { id: nanoid(), ...product })
  }
}
