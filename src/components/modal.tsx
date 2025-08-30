import { Portal } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, type PropsWithChildren, useEffect } from 'react'
import {
  BackHandler,
  Dimensions,
  Keyboard,
  Pressable,
  View,
} from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Animated, {
  FadeIn,
  FadeInDown,
  FadeOut,
  FadeOutDown,
  LinearTransition,
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
    const keyboardListener = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss()
    })

    return () => {
      backHandler.remove()
      keyboardListener.remove()
    }
  }, [])

  return (
    <Portal hostName="modal-portal">
      <View
        className="absolute left-0 top-0 z-20"
        style={{ height: Dimensions.get('screen').height, width: '100%' }}
        onTouchStart={Keyboard.dismiss}
      >
        <KeyboardAwareScrollView
          enableOnAndroid
          contentContainerStyle={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <AnimatedPressable
            className="absolute top-0 h-full w-full bg-black/70"
            entering={FadeIn.duration(100)}
            exiting={FadeOut.duration(100)}
            onPress={onClose}
          />
          <Animated.View
            className="rounded-medium border border-default-100 bg-default-50 p-4 pt-10"
            entering={FadeInDown.duration(100)}
            exiting={FadeOutDown.duration(100)}
            layout={LinearTransition.duration(200)}
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
        </KeyboardAwareScrollView>
      </View>
    </Portal>
  )
}
