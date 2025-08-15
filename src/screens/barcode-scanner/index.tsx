import { type ProductType } from '@store'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'
import Toast from 'react-native-toast-message'
import { Camera } from 'react-native-vision-camera'

import { Modal, ScannerOverlay, ProductForm } from '@components'
import { useScanner } from '@hooks'

import { fetchProduct } from './api'

export const BarcodeScanner = () => {
  const [product, setProduct] = useState<Pick<
    ProductType,
    'name' | 'picture'
  > | null>(null)

  const onScan = async (data: string) => {
    try {
      const product = await fetchProduct(data)

      setProduct(product)
    } catch (err) {
      let error
      if (err instanceof Error) error = err.message
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: String(error) as string,
      })
      return null
    }
  }

  const { cameraProps, toggleTorch } = useScanner('barcode', onScan)

  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="relative flex-1">
      <Camera {...cameraProps} style={{ flex: 1 }} />
      <ScannerOverlay type="barcode" toggleTorch={toggleTorch} />
      {product ? (
        <Modal onClose={() => setProduct(null)}>
          <ProductForm
            product={product}
            receiptId={id}
            onSubmit={() => router.replace(`/${id}`)}
          />
        </Modal>
      ) : null}
    </View>
  )
}
