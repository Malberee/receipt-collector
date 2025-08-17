import { Button, Flash } from '@malberee/heroui-native'
import {
  Canvas,
  DiffRect,
  Group,
  Path,
  rect,
  rrect,
} from '@shopify/react-native-skia'
import React, { useEffect, type FC } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import {
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'

import type { ScannerType } from '@hooks'
import { getScanArea } from '@utils'

import { makeCornerPath } from './utils'

interface ScannerOverlayProps {
  toggleTorch: () => void
  type: ScannerType
}

export const ScannerOverlay: FC<ScannerOverlayProps> = ({
  toggleTorch,
  type,
}) => {
  const screen = Dimensions.get('screen')

  const isQR = type === 'qr'
  const radius = isQR ? 40 : 15
  const spacing = isQR ? 20 : 10
  const lineLength = isQR ? 40 : 10
  const area = getScanArea(300, isQR ? 300 : 100)

  const outer = rrect(rect(0, 0, screen.width, screen.height), 0, 0)
  const inner = rrect(
    rect(...(Object.values(area) as [number, number, number, number])),
    radius,
    radius,
  )

  const width = useSharedValue(0)
  const opacity = useSharedValue(0)
  const animatedInner = useDerivedValue(() => {
    const x = screen.width / 2 - width.value / 2
    return rrect(rect(x, area.y, width.value, area.height), radius, radius)
  })

  const corners = [
    makeCornerPath(
      inner.rect.x,
      inner.rect.y,
      radius + spacing,
      spacing,
      lineLength,
      'tl',
    ),
    makeCornerPath(
      inner.rect.x + inner.rect.width,
      inner.rect.y,
      radius + spacing,
      spacing,
      lineLength,
      'tr',
    ),
    makeCornerPath(
      inner.rect.x,
      inner.rect.y + inner.rect.height,
      radius + spacing,
      spacing,
      lineLength,
      'bl',
    ),
    makeCornerPath(
      inner.rect.x + inner.rect.width,
      inner.rect.y + inner.rect.height,
      radius + spacing,
      spacing,
      lineLength,
      'br',
    ),
  ]

  useEffect(() => {
    width.value = withTiming(area.width, { duration: 1000 })
    opacity.value = withDelay(1000, withTiming(1, { duration: 1000 }))
  }, [])

  return (
    <View style={StyleSheet.absoluteFill}>
      <Canvas style={{ flex: 1 }}>
        <DiffRect
          inner={animatedInner}
          outer={outer}
          color="black"
          opacity={0.5}
        />

        <Group
          origin={{ x: inner.rect.width / 2, y: inner.rect.height / 2 }}
          opacity={opacity}
        >
          {corners.map((path, i) => (
            <Path
              key={i}
              path={path}
              style="stroke"
              color="white"
              strokeCap="round"
              strokeWidth={4}
            />
          ))}
        </Group>
      </Canvas>

      <Text
        className="absolute left-1/2 text-3xl text-white"
        style={{
          top: inner.rect.y,
          transform: [{ translateY: '-200%' }, { translateX: '-50%' }],
        }}
      >
        {type === 'qr' ? 'QR code' : 'Barcode'}
      </Text>

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
