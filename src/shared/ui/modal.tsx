import { Portal } from '@gorhom/portal'
import { Button, Plus } from '@malberee/nextui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, type ReactNode } from 'react'
import {
  type GestureResponderEvent,
  KeyboardAvoidingView,
  Pressable,
  View,
} from 'react-native'

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
      <Pressable
        onPress={onClose}
        className="absolute bottom-0 z-20 h-screen w-screen flex-row items-center justify-center bg-black/70"
      >
        <KeyboardAvoidingView behavior="padding">
          <View
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => {
              e.stopPropagation()
            }}
            className="relative rounded-medium bg-default-50 p-4"
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
          </View>
        </KeyboardAvoidingView>
      </Pressable>
    </Portal>
  )
}
