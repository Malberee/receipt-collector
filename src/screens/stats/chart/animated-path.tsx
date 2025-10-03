import { useEffect, type FC } from 'react'
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { interpolatePath, parse } from 'react-native-redash'
import { Path, type PathProps } from 'react-native-svg'

import { ANIMATION_DURATION, ANIMATION_EASING } from './constants'

const ReanimatedPath = Animated.createAnimatedComponent(Path)

interface AnimatedPathProps extends PathProps {
  d: string
}

export const AnimatedPath: FC<AnimatedPathProps> = ({ d, ...props }) => {
  const progress = useSharedValue(0)
  const previous = useSharedValue(parse(d))
  const current = useSharedValue(parse(d))

  const animatedProps = useAnimatedProps(() => {
    const d = interpolatePath(
      progress.value,
      [0, 1],
      [previous.value, current.value],
    )
    return { d }
  })

  useEffect(() => {
    previous.value = current.value
    current.value = parse(d)
    progress.value = 0
    progress.value = withTiming(1, {
      duration: ANIMATION_DURATION,
      easing: ANIMATION_EASING,
    })
  }, [d])

  return <ReanimatedPath animatedProps={animatedProps} {...props} />
}
