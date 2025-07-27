import { type ProductType, receipts } from '@entities/receipt'

export const submitProduct = (
  product: Omit<ProductType, 'id'>,
  receiptId: string,
  productId?: string,
) => {
  if (productId) {
    receipts.updateProduct(receiptId, productId, product)
  } else {
    receipts.addProduct(receiptId, product)
  }
}
