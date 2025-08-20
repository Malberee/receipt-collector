import { Spinner } from '@malberee/heroui-native'
import { type ProductType } from '@store'
import { router, useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { View } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'
import Toast from 'react-native-toast-message'
import { Camera } from 'react-native-vision-camera'

import { Modal, ScannerOverlay, ProductForm } from '@components'
import { useScanner } from '@hooks'

import { fetchProduct } from './api'

const SCAN_DELAY = 2000

export const BarcodeScanner = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [shouldScan, setShouldScan] = useState(true)
  const [isActive, setIsActive] = useState(true)
  const [product, setProduct] = useState<Pick<
    ProductType,
    'name' | 'picture'
  > | null>(null)

  const onScan = async (data: string) => {
    try {
      setIsLoading(true)
      setIsActive(false)
      setShouldScan(false)
      const product = await fetchProduct(data)
      setIsLoading(false)
      setProduct(product)
    } catch (err) {
      let error

      if (err instanceof Error) error = err.message

      setTimeout(() => setShouldScan(true), SCAN_DELAY)
      setIsActive(true)
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: String(error),
      })

      return null
    } finally {
      setIsLoading(false)
    }
  }

  const { cameraProps, hasTorch, toggleTorch } = useScanner(
    'barcode',
    shouldScan,
    onScan,
  )

  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <View className="relative flex-1">
      <Camera {...cameraProps} isActive={isActive} style={{ flex: 1 }} />

      <ScannerOverlay
        type="barcode"
        hasTorch={hasTorch}
        toggleTorch={toggleTorch}
      />

      {isLoading ? (
        <Animated.View
          className="absolute size-full flex-row items-center justify-center bg-black/70"
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
        >
          <Spinner size="lg" className="scale-150" />
        </Animated.View>
      ) : null}

      {product ? (
        <Modal
          onClose={() => {
            setProduct(null)
            setIsActive(true)
            setTimeout(() => setShouldScan(true), SCAN_DELAY)
          }}
        >
          <ProductForm
            product={product}
            receiptId={id}
            onSubmit={() => router.dismissTo(`/${id}`)}
          />
        </Modal>
      ) : null}
    </View>
  )
}
