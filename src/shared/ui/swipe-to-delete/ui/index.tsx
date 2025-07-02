import { type FC, type PropsWithChildren, useRef } from 'react'
import { Dimensions } from 'react-native'
import Swipeable, {
  type SwipeableMethods,
} from 'react-native-gesture-handler/ReanimatedSwipeable'

import { RightAction } from './right-action'

interface SwipeToDeleteProps extends PropsWithChildren {
  onDelete: () => void
}

export const SwipeToDelete: FC<SwipeToDeleteProps> = ({
  children,
  onDelete,
}) => {
  const ref = useRef<SwipeableMethods>(null)

  return (
    <Swipeable
      rightThreshold={Dimensions.get('window').width * 0.2}
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
