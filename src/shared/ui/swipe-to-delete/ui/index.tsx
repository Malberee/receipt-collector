import type { FC, PropsWithChildren } from 'react'
import { Dimensions } from 'react-native'
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable'

import { RightAction } from './right-action'

interface SwipeToDeleteProps extends PropsWithChildren {
  onDelete: () => void
}

export const SwipeToDelete: FC<SwipeToDeleteProps> = ({
  children,
  onDelete,
}) => {
  return (
    <Swipeable
      rightThreshold={Dimensions.get('window').width * 0.3}
      onSwipeableOpen={onDelete}
      renderRightActions={RightAction}
    >
      {children}
    </Swipeable>
  )
}
