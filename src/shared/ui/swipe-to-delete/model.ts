import { semanticColors } from '@malberee/heroui-native'
import { Vibration } from 'react-native'
import {
  type SharedValue,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { useTheme } from '@shared/lib'

const ANIMATION_TIME = 50
const THREESOLD = 0.3

export const useSwipeToDelete = (progress: SharedValue<number>) => {
  const { current } = useTheme()
  const shouldDelete = useSharedValue(false)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      progress.value >= THREESOLD
        ? semanticColors[current].danger[50]!
        : semanticColors[current].default[200]!,
      { duration: ANIMATION_TIME },
    ),
  }))

  const colorFunc = () => ({
    color: withTiming(
      progress.value >= THREESOLD
        ? semanticColors[current].danger[500]!
        : semanticColors[current].foreground[600]!,
      { duration: ANIMATION_TIME },
    ),
  })

  const animatedProps = useAnimatedProps(colorFunc)
  const animatedTextStyle = useAnimatedStyle(colorFunc)

  useAnimatedReaction(
    () => progress.value,
    (currentValue) => {
      shouldDelete.value = currentValue >= THREESOLD
    },
  )

  useAnimatedReaction(
    () => shouldDelete.value,
    () => {
      runOnJS(Vibration.vibrate)(50)
    },
  )

  return { animatedStyle, animatedTextStyle, animatedProps }
}
