import { Portal } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, type ReactNode } from 'react'
import {
  type GestureResponderEvent,
  KeyboardAvoidingView,
  Pressable,
} from 'react-native'
import Animated, {
  FadeIn,
  FadeOut,
  ZoomIn,
  ZoomOut,
} from 'react-native-reanimated'

interface ModalProps {
  children?: ReactNode
  onClose?: (e: GestureResponderEvent) => void
}

cssInterop(Plus, {
  className: {
    target: 'style',
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Modal: FC<ModalProps> = ({ children, onClose }) => {
  return (
    <Portal hostName="modal-portal">
      <Animated.View
        className="absolute left-0 top-0 z-20 size-full flex-row items-center justify-center bg-black/70"
        entering={FadeIn.duration(100)}
        exiting={FadeOut.duration(100)}
      >
        <Pressable
          className="absolute bottom-0 h-full w-full"
          onPress={onClose}
        />
        <KeyboardAvoidingView behavior="height">
          <Animated.View
            className="rounded-medium bg-default-50 p-4 pt-10"
            entering={ZoomIn.duration(100)}
            exiting={ZoomOut.duration(100)}
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
      </Animated.View>
    </Portal>
  )
}
