import { useEffect, type FC } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { Line, type LineProps } from 'react-native-svg'

import { ANIMATION_DURATION, ANIMATION_EASING } from './constants'

const ReanimatedLine = Animated.createAnimatedComponent(Line)

interface AnimatedLineProps extends LineProps {
  x: number
  duration?: number
}

export const AnimatedLine: FC<AnimatedLineProps> = ({
  x,
  opacity: _opacity,
  duration,
  ...props
}) => {
  const xPosition = useSharedValue(x)
  const opacity = useSharedValue(_opacity ?? 1)

  const animatedProps = useAnimatedProps(() => ({
    x1: xPosition.value,
    x2: xPosition.value,
    opacity: opacity.value,
  }))

  useEffect(() => {
    xPosition.value = withTiming(x, {
      duration: duration ?? ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })
  }, [x])

  useEffect(() => {
    if (_opacity !== undefined) {
      opacity.value = withTiming(_opacity, {
        duration: duration ?? ANIMATION_DURATION,
        easing: ANIMATION_EASING,
      })
    }
  }, [_opacity])

  return <ReanimatedLine animatedProps={animatedProps} {...props} />
}
