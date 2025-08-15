import { Button, Flash } from '@malberee/heroui-native'
import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia'
import React, { type FC } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'

import type { ScannerType } from '@hooks'
import { getScanArea } from '@utils'

interface ScannerOverlayProps {
  toggleTorch: () => void
  type: ScannerType
}

export const ScannerOverlay: FC<ScannerOverlayProps> = ({
  toggleTorch,
  type,
}) => {
  const { width, height } = Dimensions.get('screen')

  const isQR = type === 'qr'
  const radius = isQR ? 40 : 15
  const size = Object.values(getScanArea(300, isQR ? 300 : 100)) as [
    number,
    number,
    number,
    number,
  ]

  const outer = rrect(rect(0, 0, width, height), 0, 0)
  const inner = rrect(rect(...size), radius, radius)

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>

      <View
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: inner.rect.width,
          height: inner.rect.height,
        }}
      >
        <Text className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[150%] text-3xl text-white">
          {type === 'qr' ? 'QR code' : 'Barcode'}
        </Text>

        <View
          className={`absolute left-0 top-0 ${isQR ? 'size-[100px] rounded-tl-[65px]' : 'size-[40px] rounded-tl-[25px]'} -translate-x-1/4 -translate-y-1/4 border-l-3 border-t-3 border-white`}
        />
        <View
          className={`absolute right-0 top-0 ${isQR ? 'size-[100px] rounded-tl-[65px]' : 'size-[40px] rounded-tl-[25px]'} -translate-y-1/4 translate-x-1/4 scale-x-[-1] border-l-3 border-t-3 border-white`}
        />
        <View
          className={`absolute bottom-0 left-0 ${isQR ? 'size-[100px] rounded-bl-[65px]' : 'size-[40px] rounded-bl-[25px]'} -translate-x-1/4 translate-y-1/4 border-b-3 border-l-3 border-white`}
        />
        <View
          className={`absolute bottom-0 right-0 ${isQR ? 'size-[100px] rounded-bl-[65px]' : 'size-[40px] rounded-bl-[25px]'} translate-x-1/4 translate-y-1/4 scale-x-[-1] border-b-3 border-l-3 border-white`}
        />
      </View>

      <Button
        className="absolute bottom-20 left-1/2 size-24 -translate-x-1/2 !rounded-full dark"
        isIconOnly
        variant="flat"
        color="default"
        size="lg"
        radius="full"
        startContent={<Flash color="white" size="32px" />}
        onPress={toggleTorch}
      />
    </View>
  )
}
