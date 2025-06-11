import { DeleteIcon } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, type ReactNode } from 'react'
import { View } from 'react-native'
import { GestureDetector } from 'react-native-gesture-handler'
import Animated from 'react-native-reanimated'

import { DeleteDialog } from '@shared/ui'

import { useDelete } from './lib'

interface DeleteLayoutProps {
  onDelete: () => void
  children: ReactNode
}

cssInterop(DeleteIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const DeleteLayout: FC<DeleteLayoutProps> = ({ children, onDelete }) => {
  const {
    wrapperStyle,
    iconWrapperStyle,
    iconStyle,
    panGesture,
    showDialog,
    cancelDelete,
  } = useDelete(onDelete)

  return (
    <View>
      {showDialog ? (
        <DeleteDialog
          text="Are you sure you want to delete the receipt?"
          onCancel={cancelDelete}
          onDelete={onDelete}
        />
      ) : (
        <>
          <Animated.View
            style={iconWrapperStyle}
            className="absolute h-full w-full flex-row items-center justify-end bg-danger/10 px-10 pb-px"
          >
            <Animated.View style={iconStyle}>
              <DeleteIcon className="text-danger" width="24px" height="24px" />
            </Animated.View>
          </Animated.View>
          <GestureDetector gesture={panGesture}>
            <Animated.View style={wrapperStyle}>{children}</Animated.View>
          </GestureDetector>
        </>
      )}
    </View>
  )
}
