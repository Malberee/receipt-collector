import { Portal } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
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
      <View className="absolute left-0 top-0 z-20 size-full flex-row items-center justify-center bg-black/70">
        <Pressable
          className="absolute bottom-0 h-full w-full"
          onPress={onClose}
        />
        <KeyboardAvoidingView behavior="height">
          <View className="rounded-medium bg-default-50 p-4">
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
      </View>
    </Portal>
  )
}
