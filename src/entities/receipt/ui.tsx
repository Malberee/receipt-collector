import { DeleteIcon } from '@malberee/nextui-native'
import { Link } from 'expo-router'
import moment from 'moment'
import { cssInterop } from 'nativewind'
import React from 'react'
import { Dimensions, Text, View } from 'react-native'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'

import { currencyFormatter } from '@shared/lib'
import { Chip } from '@shared/ui'

import { type ReceiptType, receipts } from './model'

cssInterop(DeleteIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

interface ReceiptProps extends ReceiptType {}

export const Receipt = ({ id, amount, date, rarity }: ReceiptProps) => {
  const translateX = useSharedValue(0)
  const scale = useSharedValue(0)
  const opacity = useSharedValue(1)

  const { width: SCREEN_WIDTH } = Dimensions.get('window')
  const TRANSLATE_X_THRESHOLD = -SCREEN_WIDTH * 0.2

  const deleteReceipt = () => {
    receipts.deleteReceipt(id)
  }

  const panGesture = Gesture.Pan()
    .onChange((event) => {
      if (event.translationX <= 0) {
        translateX.value = event.translationX
      }

      if (translateX.value < TRANSLATE_X_THRESHOLD) {
        scale.value = withTiming(1)
      } else {
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
              runOnJS(deleteReceipt)()
            }
          },
        )
        opacity.value = withTiming(0)
      } else {
        translateX.value = withTiming(0)
      }
    })
    .activateAfterLongPress(150)

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }))

  const iconWrapperAnimatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }))

  const iconAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        scale: scale.value,
      },
    ],
  }))

  return (
    <>
      <Animated.View
        style={iconWrapperAnimatedStyle}
        className="absolute h-full w-full flex-row items-center justify-end bg-danger/10 px-10 pb-px"
      >
        <Animated.View style={iconAnimatedStyle}>
          <DeleteIcon className="text-danger" width="24px" height="24px" />
        </Animated.View>
      </Animated.View>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={animatedStyle}>
          <Link href={`/receipt-details/${id}`} asChild>
            <View className="z-10 bg-default-50 px-4 transition-colors active:bg-[#f7f7f8] dark:active:bg-[#222222]">
              <View className="w-full flex-row items-center justify-between border-b border-default-100 px-4 py-4">
                <View className="flex-col justify-between">
                  <Text className="text-xl text-foreground">
                    {currencyFormatter.format(amount)}
                  </Text>
                  <Text className="text-sm text-foreground-500">
                    {moment(date).format('DD.MM.YYYY [ - ] HH:mm')}
                  </Text>
                </View>
                <Chip rarity={rarity} />
              </View>
            </View>
          </Link>
        </Animated.View>
      </GestureDetector>
    </>
  )
}
