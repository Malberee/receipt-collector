import { Portal } from '@gorhom/portal'
import { rem } from 'nativewind'
import { type FC, type PropsWithChildren } from 'react'
import { Dimensions, Pressable, View } from 'react-native'
import Animated, {
  Easing,
  FadeIn,
  FadeOut,
  SlideInLeft,
  SlideOutLeft,
} from 'react-native-reanimated'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useBackHandler } from '@hooks'

interface DrawerProps extends PropsWithChildren {
  onClose: () => void
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

const ANIMATION_DURATION = 500

export const Drawer: FC<DrawerProps> = ({ children, onClose }) => {
  const { width, height } = Dimensions.get('screen')
  const { top, bottom } = useSafeAreaInsets()

  useBackHandler(onClose)

  return (
    <Portal hostName="modal-portal">
      <View className="absolute left-0 top-0 z-10" style={{ width, height }}>
        <AnimatedPressable
          className="absolute left-0 top-0 size-full bg-black/70"
          onPress={onClose}
          entering={FadeIn.easing(Easing.inOut(Easing.cubic)).duration(
            ANIMATION_DURATION,
          )}
          exiting={FadeOut.easing(Easing.inOut(Easing.cubic)).duration(
            ANIMATION_DURATION,
          )}
        />
        <Animated.View
          className="h-full w-[65%] rounded-r-3xl border-r border-default-100 bg-default-50 px-6"
          style={{
            paddingTop: top + rem.get(),
            paddingBottom: bottom + rem.get(),
          }}
          entering={SlideInLeft.easing(Easing.inOut(Easing.cubic)).duration(
            ANIMATION_DURATION,
          )}
          exiting={SlideOutLeft.easing(Easing.inOut(Easing.cubic)).duration(
            ANIMATION_DURATION,
          )}
        >
          {children}
        </Animated.View>
      </View>
    </Portal>
  )
}
