import { Portal } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, type PropsWithChildren, useEffect } from 'react'
import {
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
} from 'react-native-reanimated'

interface ModalProps extends PropsWithChildren {
  onClose: () => void
}

cssInterop(Plus, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        onClose()
        return true
      },
    )

    return () => backHandler.remove()
  }, [])

  return (
    <Portal hostName="modal-portal">
      <View
        className="absolute left-0 top-0 z-20 flex-row items-center justify-center"
        style={{ height: Dimensions.get('screen').height, width: '100%' }}
      >
        <AnimatedPressable
          className="absolute bottom-0 h-full w-full bg-black/70"
          entering={FadeIn.duration(100)}
          exiting={FadeOut.duration(100)}
          onPress={onClose}
        />
        <KeyboardAvoidingView behavior="padding">
          <Animated.View
            className="rounded-medium border border-default-100 bg-default-50 p-4 pt-10"
            entering={FadeInDown.duration(100)}
            exiting={FadeOutDown.duration(100)}
          >
            <Button
              startContent={<Plus className="rotate-45 text-foreground" />}
              isIconOnly
              variant="light"
              color="default"
              className="absolute right-2 top-2 z-10"
              onPress={onClose}
            />
            {children}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Portal>
  )
}
