import { semanticColors } from '@malberee/heroui-native'
import { Vibration } from 'react-native'
import {
  type SharedValue,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

import { useTheme } from '@providers'

const ANIMATION_TIME = 50
const THREESOLD = 0.3

export const useSwipeToDelete = (progress: SharedValue<number>) => {
  const { current } = useTheme()
  const shouldDelete = useDerivedValue(() => progress.value >= THREESOLD)

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
    () => shouldDelete.value,
    (result, previous) => {
      if (result !== previous && previous !== null) {
        runOnJS(Vibration.vibrate)(50)
      }
    },
  )

  return { animatedStyle, animatedTextStyle, animatedProps }
}
