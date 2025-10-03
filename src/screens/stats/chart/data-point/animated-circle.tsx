import { useEffect, type FC } from 'react'
import Animated, {
  interpolateColor,
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Circle, type CircleProps } from 'react-native-svg'

import {
  ANIMATION_DURATION,
  ANIMATION_EASING,
  CURSOR_ANIMATION_DURATION,
} from '../constants'

interface AnimatedCircleProps extends CircleProps {
  r: number
  x: number
  y: number
  fill: string
}

const ReanimatedCircle = Animated.createAnimatedComponent(Circle)

export const AnimatedCircle: FC<AnimatedCircleProps> = ({
  x,
  y,
  r,
  fill,
  ...props
}) => {
  const translateX = useSharedValue(x)
  const translateY = useSharedValue(y)
  const radius = useSharedValue(r)
  const currentFill = useSharedValue(fill)
  const progress = useSharedValue(0)

  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
    r: radius.value,
    fill: interpolateColor(progress.value, [0, 1], [currentFill.value, fill]),
  }))

  useEffect(() => {
    translateX.value = withTiming(x, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })
    translateY.value = withTiming(y, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })

    radius.value = withTiming(r, {
      duration: CURSOR_ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })

    progress.value = 0
    progress.value = withTiming(1, {
      duration: CURSOR_ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })
  }, [x, y, r, fill])

  return <ReanimatedCircle animatedProps={animatedProps} {...props} />
}
