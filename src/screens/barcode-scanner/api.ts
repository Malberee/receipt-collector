import i18n from 'i18next'

type Response = {
  product: {
    product_name: string
    image_url: string
  }
  result: {
    name: string
  }
}

export const fetchProduct = async (barcodeNumber: string) => {
  const response = await fetch(
    `https://world.openfoodfacts.org/api/v3/product/${barcodeNumber}`,
  )
  const data: Response = await response.json()

  if (!response.ok) {
    throw new Error(i18n.t(data.result.name))
  }

  return {
    name: data.product.product_name,
    picture: data.product.image_url,
  }
}
