import * as Haptics from 'expo-haptics'
import { semanticColors } from 'merlo-ui'
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
export const THRESHOLD = 0.3

export const useSwipeToDelete = (progress: SharedValue<number>) => {
  const { current } = useTheme()
  const isDark = current === 'dark'
  const shouldDelete = useDerivedValue(() => progress.value >= THRESHOLD)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: withTiming(
      progress.value >= THRESHOLD
        ? semanticColors[current].danger[50]!
        : isDark
          ? semanticColors[current].default[200]!
          : semanticColors[current].default[100]!,
      { duration: ANIMATION_TIME },
    ),
  }))

  const colorFunc = () => ({
    color: withTiming(
      progress.value >= THRESHOLD
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
        runOnJS(Haptics.impactAsync)(Haptics.ImpactFeedbackStyle.Soft)
      }
    },
  )

  return { animatedStyle, animatedTextStyle, animatedProps }
}
