import { Button, Flash } from '@malberee/nextui-native'
import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia'
import React, { type FC } from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'

import { getScannableAreaSize } from '../lib'

interface OverlayProps {
  toggleTorch: () => void
}

const { width, height } = Dimensions.get('window')
const size = Object.values(getScannableAreaSize(300)) as [
  number,
  number,
  number,
  number,
]

const outer = rrect(rect(0, 0, width, height), 0, 0)
const inner = rrect(rect(...size), 43, 43)

export const Overlay: FC<OverlayProps> = ({ toggleTorch }) => {
  return (
    <>
      <Canvas
        style={
          Platform.OS === 'android'
            ? { flex: 1 }
            : StyleSheet.absoluteFillObject
        }
      >
        <DiffRect inner={inner} outer={outer} color="black" opacity={0.5} />
      </Canvas>
      <View
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-110"
        style={{ width: inner.rect.width, height: inner.rect.height }}
      >
        <View className="absolute left-0 top-0 size-[95px] rounded-tl-[50px] border-0 border-l-3 border-t-3 border-white" />
        <View className="absolute right-0 top-0 size-[95px] rounded-tr-[50px] border-0 border-r-3 border-t-3 border-white" />
        <View className="absolute bottom-0 left-0 size-[95px] rounded-bl-[50px] border-0 border-b-3 border-l-3 border-white" />
        <View className="absolute bottom-0 right-0 size-[95px] rounded-br-[50px] border-0 border-b-3 border-r-3 border-white" />
      </View>
      <Button
        className="absolute bottom-20 left-1/2 size-24 -translate-x-1/2 dark"
        isIconOnly
        variant="flat"
        color="default"
        size="lg"
        radius="full"
        startContent={<Flash color="white" size="32px" />}
        onPress={toggleTorch}
      ></Button>
    </>
  )
}
