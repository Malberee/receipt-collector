import { useEffect, type FC } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Line } from 'react-native-svg'

import {
  ANIMATION_EASING,
  CURSOR_ANIMATION_DURATION,
  SELECTED_POINT_RADIUS,
} from './constants'
import { useChart } from './provider'

interface CursorProps {
  selectedPoint: number | null
}

const AnimatedLine = Animated.createAnimatedComponent(Line)

export const Cursor: FC<CursorProps> = ({ selectedPoint }) => {
  const { x, height } = useChart()
  const lastSelectedIndex = useSharedValue<number | null>(null)
  const xPos = useSharedValue(0)
  const opacity = useSharedValue(0)

  useEffect(() => {
    if (selectedPoint !== null) {
      xPos.value = withTiming(x(selectedPoint), {
        duration:
          lastSelectedIndex.value !== null ? CURSOR_ANIMATION_DURATION : 0,
        easing: ANIMATION_EASING,
      })
    }

    lastSelectedIndex.value = selectedPoint
    opacity.value = withTiming(selectedPoint !== null ? 1 : 0, {
      duration: CURSOR_ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })
  }, [selectedPoint])

  const animatedProps = useAnimatedProps(() => ({
    x1: xPos.value,
    x2: xPos.value,
    opacity: opacity.value,
  }))

  return (
    <AnimatedLine
      y1={SELECTED_POINT_RADIUS}
      y2={height - SELECTED_POINT_RADIUS}
      stroke="url(#cursor-gradient)"
      animatedProps={animatedProps}
    />
  )
}
