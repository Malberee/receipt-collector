import { type ProductType } from '@store'
import { CameraView } from 'expo-camera'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Toast from 'react-native-toast-message'

import { Modal, Overlay, ProductForm } from '@components'
import { useScanner } from '@hooks'

import { fetchProduct } from './api'

export const BarcodeScanner = () => {
  const [product, setProduct] = useState<Pick<
    ProductType,
    'name' | 'picture'
  > | null>(null)
  const {
    toggleTorch,
    enableTorch,
    onScan: _onScan,
    scanLock,
  } = useScanner(300, 100)

  const { id } = useLocalSearchParams<{ id: string }>()

  const onScan = async (data: string) => {
    try {
      const product = await fetchProduct(data)

      return product
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

  return (
    <View className="relative flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['ean8', 'ean13', 'code128', 'code39', 'code93'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={(data) =>
          _onScan(data, (barcodeNumber) =>
            onScan(barcodeNumber).then((result) => {
              scanLock.current = true
              setProduct(result)
            }),
          )
        }
      />
      <Overlay type="barcode" toggleTorch={toggleTorch} />
      {product ? (
        <Modal
          onClose={() => {
            scanLock.current = true
            setProduct(null)
          }}
        >
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
