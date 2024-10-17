import { Button, ChevronIcon, Flash } from '@malberee/nextui-native'
import { Canvas, DiffRect, rect, rrect } from '@shopify/react-native-skia'
import { Link } from 'expo-router'
import React, { FC, useState } from 'react'
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
  50,
  50,
)

interface OverlayProps {
  toggleTorch: () => void
}

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
      <View className="absolute top-2 w-full flex-row justify-between px-2">
        <Link href="/" asChild>
          <Button isIconOnly color="default" variant="light">
            <ChevronIcon color="white" />
          </Button>
        </Link>
        <Button
          isIconOnly
          color="default"
          variant="light"
          onPress={toggleTorch}
        >
          <Flash color="white" size="16px" />
        </Button>
      </View>
    </>
  )
}
