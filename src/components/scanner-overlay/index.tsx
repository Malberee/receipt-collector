import { Button, Flash } from '@malberee/heroui-native'
import React, { useEffect, type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated'
import Svg, { Path } from 'react-native-svg'

import type { ScannerType } from '@hooks'
import { getScanArea } from '@utils'

import { makeCornerPath } from './utils'

interface ScannerOverlayProps {
  type: ScannerType
  hasTorch: boolean
  toggleTorch: () => void
}

const AnimatedPath = Animated.createAnimatedComponent(Path)

export const ScannerOverlay: FC<ScannerOverlayProps> = ({
  type,
  hasTorch,
  toggleTorch,
}) => {
  const { t } = useTranslation()
  const screen = Dimensions.get('screen')

  const isQR = type === 'qr'
  const radius = isQR ? 40 : 15
  const strokeWidth = 4
  const spacing = isQR ? 20 : 10
  const lineLength = isQR ? 40 : 10
  const area = getScanArea(300, isQR ? 300 : 100)

  const width = useSharedValue(0)
  const opacity = useSharedValue(0)

  const holeAnimatedProps = useAnimatedProps(() => {
    const w = width.value
    const h = area.height
    const x = screen.width / 2 - w / 2
    const y = screen.height / 2 - h / 2

    const outer = `M0 0 H${screen.width} V${screen.height} H0 Z`
    const inner = `
      M${x + radius} ${y}
      H${x + w - radius}
      Q${x + w} ${y} ${x + w} ${y + radius}
      V${y + h - radius}
      Q${x + w} ${y + h} ${x + w - radius} ${y + h}
      H${x + radius}
      Q${x} ${y + h} ${x} ${y + h - radius}
      V${y + radius}
      Q${x} ${y} ${x + radius} ${y}
      Z
    `

    return {
      d: outer + inner,
    }
  })
  const cornerAnimatedProps = useAnimatedProps(() => ({
    opacity: opacity.value,
  }))

  useEffect(() => {
    width.value = withTiming(area.width, { duration: 1000 })
    opacity.value = withDelay(1000, withTiming(1, { duration: 1000 }))
  }, [])

  return (
    <View style={StyleSheet.absoluteFill}>
      <Svg className="size-full">
        <AnimatedPath
          animatedProps={holeAnimatedProps}
          fill="black"
          fillOpacity={0.5}
          fillRule="evenodd"
        />
        {(['tl', 'tr', 'bl', 'br'] as const).map((pos) => (
          <AnimatedPath
            animatedProps={cornerAnimatedProps}
            key={pos}
            d={makeCornerPath(
              area.x + (pos.includes('r') ? area.width : 0),
              area.y + (pos.includes('b') ? area.height : 0),
              radius + spacing - strokeWidth,
              spacing,
              lineLength,
              pos,
            )}
            stroke="white"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="none"
          />
        ))}
      </Svg>

      <Text
        className="absolute left-1/2 text-3xl text-white"
        style={{
          top: area.y,
          transform: [{ translateY: '-200%' }, { translateX: '-50%' }],
        }}
      >
        {t(type === 'qr' ? 'QR code' : 'Barcode')}
      </Text>

      {hasTorch ? (
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
      ) : null}
    </View>
  )
}
