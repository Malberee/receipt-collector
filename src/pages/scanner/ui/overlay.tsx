import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia'
import React from 'react'
import { Dimensions, Platform, StyleSheet, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const innerDimension = 300

const outer = rrect(rect(0, 0, width, height), 0, 0)
const inner = rrect(
  rect(
    width / 2 - innerDimension / 2,
    height / 2 - innerDimension / 2,
    innerDimension,
    innerDimension,
  ),
  43,
  43,
)

export function Overlay() {
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
    </>
  )
}
