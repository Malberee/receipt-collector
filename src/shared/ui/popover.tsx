import { Portal } from '@gorhom/portal'
import type { FC, PropsWithChildren } from 'react'
import { Pressable } from 'react-native'
import Animated, { FadeInUp, FadeOutUp } from 'react-native-reanimated'

interface PopoverProps extends PropsWithChildren {
  onClose: () => void
}

export const Popover: FC<PopoverProps> = ({ children, onClose }) => {
  return (
    <>
      <Portal hostName="modal-portal">
        <Pressable className="absolute top-0 size-full" onPress={onClose} />
      </Portal>
      <Animated.View
        className="absolute right-0 top-full z-10 min-w-36 flex-col gap-2 rounded-3xl border border-default-200 bg-default-100 p-2"
        entering={FadeInUp.duration(100)}
        exiting={FadeOutUp.duration(100)}
      >
        {children}
      </Animated.View>
    </>
  )
}
