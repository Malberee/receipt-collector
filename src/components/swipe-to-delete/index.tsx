import { type FC, type PropsWithChildren, useRef } from 'react'
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'

import { RightAction } from './right-action'
import { THRESHOLD } from './use-swipe-to-delete'

interface SwipeToDeleteProps extends PropsWithChildren {
  width: number
  color?: string
  backgroundColor?: string
  onDelete: () => void
}

export const SwipeToDelete: FC<SwipeToDeleteProps> = ({
  children,
  width,
  color,
  backgroundColor,
  onDelete,
}) => {
  const ref = useRef<SwipeableMethods>(null)

  return (
    <Swipeable
      rightThreshold={width * THRESHOLD}
      onSwipeableWillOpen={() => {
        onDelete()
        ref?.current?.close()
      }}
      renderRightActions={(progress) => (
        <RightAction
          progress={progress}
          color={color}
          backgroundColor={backgroundColor}
        />
      )}
      ref={ref}
    >
      {children}
    </Swipeable>
  )
}
