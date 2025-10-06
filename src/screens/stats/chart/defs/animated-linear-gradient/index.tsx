import { Children, type ReactElement, type FC, useLayoutEffect } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import {
  type LinearGradientProps,
  RNSVGLinearGradient,
  type StopProps,
} from 'react-native-svg'

import { ANIMATION_EASING, CURSOR_ANIMATION_DURATION } from '../../constants'
import { percentToFloat } from './percent-to-float'

const extractGradient: any =
  require('react-native-svg/src/lib/extract/extractGradient').default

const ReanimatedLinearGradient =
  Animated.createAnimatedComponent(RNSVGLinearGradient)

export const AnimatedLinearGradient: FC<LinearGradientProps> = ({
  children,
  x1 = '0%',
  y1 = '0%',
  x2 = '100%',
  y2 = '0%',
  ...props
}) => {
  const linearGradientProps = extractGradient({ children, ...props }, undefined)
  const stops = Children.toArray(children) as ReactElement<StopProps>[]
  const lastStops = useSharedValue(stops)

  const offsets = stops.map(({ props }) =>
    useSharedValue(percentToFloat(props.offset ?? 0)),
  )

  const animatedProps = useAnimatedProps(() => {
    const gradient = linearGradientProps?.gradient.map(
      (item: number, index: number) =>
        !(index % 2) ? offsets[Math.floor(index / 2)].value : item,
    )
    return { gradient }
  })

  useLayoutEffect(() => {
    if (
      stops.map((stop) => stop.props.offset).every((stop) => stop !== undefined)
    ) {
      const duration = lastStops.value[1].props.offset
        ? CURSOR_ANIMATION_DURATION
        : 0

      offsets.forEach((offset, index) => {
        offset.value = withTiming(
          percentToFloat(stops[index].props.offset ?? 0),
          {
            duration,
            easing: ANIMATION_EASING,
          },
        )
      })
    }

    lastStops.value = stops
  }, [children])

  return (
    <ReanimatedLinearGradient
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      {...linearGradientProps}
      animatedProps={animatedProps}
    />
  )
}
