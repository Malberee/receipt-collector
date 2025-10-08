import { type FC, useEffect, useRef, useState } from 'react'
import { Text, type View } from 'react-native'
import Animated, {
  FadeOut,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import {
  ANIMATION_EASING,
  SELECTED_POINT_RADIUS,
  CURSOR_ANIMATION_DURATION,
} from './constants'
import type { ChartProps, DataItem } from './index'
import { useChart } from './provider'

interface TooltipProps extends Pick<ChartProps, 'formatValue' | 'formatDate'> {
  data: DataItem[]
  selectedPoint: number
}

const TOOLTIP_ANIMATION_DURATION = 200

export const Tooltip: FC<TooltipProps> = ({
  data,

  selectedPoint,
  formatValue,
  formatDate,
}) => {
  const {
    colors,
    width: containerWidth,
    height: containerHeight,
    x,
    y,
  } = useChart()

  const space = 24

  const getTranslateX = (width: number) => {
    const xPos = x(selectedPoint)
    if (xPos + width + space > containerWidth - SELECTED_POINT_RADIUS)
      return xPos - width - space
    return xPos + space
  }
  const getTranslateY = (height: number) => {
    const yPos = y(data[selectedPoint].value) - height / 2
    if (yPos + height > containerHeight - SELECTED_POINT_RADIUS)
      return containerHeight - height - SELECTED_POINT_RADIUS
    if (yPos < SELECTED_POINT_RADIUS) return SELECTED_POINT_RADIUS
    return yPos
  }

  const [isMounted, setIsMounted] = useState(false)
  const translateX = useSharedValue(0)
  const translateY = useSharedValue(0)
  const ref = useRef<View>(null)

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: isMounted
      ? withTiming(1, {
          duration: TOOLTIP_ANIMATION_DURATION,
        })
      : 0,
    transform: [
      {
        translateX: translateX.value,
      },
      {
        translateY: translateY.value,
      },
    ],
  }))

  useEffect(() => {
    if (ref.current) {
      ref.current.measure((_, __, width, height) => {
        translateX.value = withTiming(getTranslateX(width), {
          duration: isMounted ? CURSOR_ANIMATION_DURATION : 0,
          easing: ANIMATION_EASING,
        })
        translateY.value = withTiming(getTranslateY(height), {
          duration: isMounted ? CURSOR_ANIMATION_DURATION : 0,
          easing: ANIMATION_EASING,
        })
      })
    }

    if (!isMounted) setIsMounted(true)
  }, [selectedPoint])

  return (
    <Animated.View
      className="absolute z-10 flex-row items-center gap-2 rounded-md px-2 py-1"
      style={[
        animatedStyle,
        {
          left: 0,
          top: 0,
          backgroundColor: colors.tooltipBackground,
          borderColor: colors.default,
          borderWidth: 1,
        },
      ]}
      ref={ref}
      exiting={FadeOut.duration(TOOLTIP_ANIMATION_DURATION)}
    >
      <Text className="capitalize" style={{ color: colors.default }}>
        {formatDate
          ? formatDate(data[selectedPoint].date)
          : data[selectedPoint].date.toString()}
      </Text>
      <Text style={{ color: colors.default }} numberOfLines={1}>
        {formatValue
          ? formatValue(data[selectedPoint].value)
          : data[selectedPoint].value}
      </Text>
    </Animated.View>
  )
}
