import * as Haptics from 'expo-haptics'
import { semanticColors } from 'merlo-ui'
import {
  type SharedValue,
  interpolateColor,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated'

import { useTheme } from '@providers'

const ANIMATION_DURATION = 50
export const THRESHOLD = 0.3

export const useSwipeToDelete = (
  progress: SharedValue<number>,
  color?: string,
  backgroundColor?: string,
) => {
  const { current } = useTheme()
  const isDark = current === 'dark'
  const shouldDelete = useDerivedValue(() =>
    withTiming(progress.value >= THRESHOLD ? 1 : 0, {
      duration: ANIMATION_DURATION,
    }),
  )

  const activeBgColor = isDark
    ? '#2e1822'
    : semanticColors[current].danger[100]!
  const bgColor =
    backgroundColor ??
    (isDark
      ? semanticColors[current].default[100]!
      : semanticColors[current].default[200]!)
  const textColor =
    color ??
    (isDark
      ? semanticColors[current].foreground[400]!
      : semanticColors[current].foreground[500]!)

  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      shouldDelete.value,
      [0, 1],
      [bgColor, activeBgColor],
    ),
  }))

  const colorFunc = () => ({
    color: interpolateColor(
      shouldDelete.value,
      [0, 1],
      [textColor, semanticColors[current].danger[400]!],
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
