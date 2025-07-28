import { View } from 'react-native'
import Animated, { type SharedValue } from 'react-native-reanimated'

import { TrashIcon } from '@icons'

import { useSwipeToDelete } from './use-swipe-to-delete'

const AnimatedTrashIcon = Animated.createAnimatedComponent(TrashIcon)

export const RightAction = (progress: SharedValue<number>) => {
  const { animatedStyle, animatedTextStyle, animatedProps } =
    useSwipeToDelete(progress)

  return (
    <Animated.View
      style={animatedStyle}
      className="flex-1 flex-row items-center justify-end gap-px px-10"
    >
      <View className="flex-col items-center justify-center">
        <AnimatedTrashIcon
          animatedProps={animatedProps}
          width={24}
          height={24}
        />
        <Animated.Text style={animatedTextStyle} className="text-center">
          Delete
        </Animated.Text>
      </View>
    </Animated.View>
  )
}
