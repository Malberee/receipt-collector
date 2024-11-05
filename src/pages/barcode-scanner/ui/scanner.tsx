import { CameraView } from 'expo-camera'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import { ProductForm } from '@widgets/product-form'

import { type ProductType } from '@entities/receipt'

import { useScanner } from '@shared/lib'
import { Modal, Overlay } from '@shared/ui'

import { handleScan } from '../model'

export const BarcodeScanner = () => {
  const [product, setProduct] = useState<Pick<
    ProductType,
    'name' | 'picture'
  > | null>(null)
  const {
    toggleTorch,
    enableTorch,
    handleScan: onScan,
    scanLock,
  } = useScanner(300, 100)

  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="relative -mx-4 flex-1">
      <CameraView
        style={StyleSheet.absoluteFillObject}
        barcodeScannerSettings={{
          barcodeTypes: ['ean8', 'ean13', 'code128', 'code39', 'code93'],
        }}
        facing="back"
        enableTorch={enableTorch}
        onBarcodeScanned={(data) =>
          onScan(data, (barcodeNumber) =>
            handleScan(barcodeNumber).then((result) => {
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
            onSubmit={() => router.navigate(`/receipt-details/${id}`)}
          />
        </Modal>
      ) : null}
    </View>
  )
}
