import { type FC, type PropsWithChildren, useRef } from 'react'
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'

import { RightAction } from './right-action'
import { THRESHOLD } from './use-swipe-to-delete'

interface SwipeToDeleteProps extends PropsWithChildren {
  width: number
  onDelete: () => void
}

export const SwipeToDelete: FC<SwipeToDeleteProps> = ({
  children,
  width,
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
      renderRightActions={RightAction}
      ref={ref}
    >
      {children}
    </Swipeable>
  )
}
