type Response = {
  product: {
    product_name: string
    image_url: string
  }
  status: 0 | 1
}

export const fetchProduct = async (barcodeNumber: string) => {
  const response: Response = await fetch(
    `https://world.openfoodfacts.org/api/v3/product/${barcodeNumber}`,
  ).then((res) => {
    return res.json()
  })

  if (response.status === 0) {
    throw 'Product not found'
  }

  return {
    name: response.product.product_name,
    picture: response.product.image_url,
  }
}
