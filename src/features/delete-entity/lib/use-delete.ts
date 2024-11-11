import { useEffect, useState } from 'react'
import { Dimensions, Vibration } from 'react-native'
import { Gesture } from 'react-native-gesture-handler'
import {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

export const useDelete = (onDelete: () => void) => {
  const [shouldDelete, setShoudlDelete] = useState(false)
  const [showTimer, setShowTimer] = useState(false)
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  const { width: SCREEN_WIDTH } = Dimensions.get('window')
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2

  const cancelDelete = () => {
    setShowTimer(false)
    translateX.value = withTiming(0)
    scale.value = withTiming(0)
    opacity.value = withTiming(1)
  }

  useEffect(() => {
    if (shouldDelete) {
      Vibration.vibrate(50)
    }
  }, [shouldDelete])

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX <= 0) {
        translateX.value = event.translationX
      }

      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        runOnJS(setShoudlDelete)(true)
        scale.value = withTiming(1)
      } else {
        runOnJS(setShoudlDelete)(false)
        scale.value = withTiming(0)
      }
    })
    .onEnd(() => {
      const shouldBeDismissed = translateX.value < TRANSLATE_X_THRESHOLD

      if (shouldBeDismissed) {
        translateX.value = withTiming(
          -SCREEN_WIDTH,
          undefined,
          (isFinished) => {
            if (isFinished) {
              runOnJS(setShowTimer)(true)
            }
          },
        )
        opacity.value = withTiming(0)
      } else {
        translateX.value = withTiming(0)
      }
    })
    .activateAfterLongPress(150)

  const wrapperStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  const iconWrapperStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const iconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }))

  return {
    wrapperStyle,
    iconWrapperStyle,
    iconStyle,
    panGesture,
    showTimer,
    cancelDelete,
  }
}
