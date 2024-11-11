import { Button } from '@malberee/nextui-native'
import React, { type FC } from 'react'
import { Text, View } from 'react-native'

import { useTimer } from '../lib'

export interface TimerProps {
  cancelDelete: () => void
  onTimeIsUp: () => void
  initialValue?: number
}

export const Timer: FC<TimerProps> = ({
  initialValue,
  cancelDelete,
  onTimeIsUp,
}) => {
  const timerCount = useTimer(onTimeIsUp, initialValue)

  return (
    <Button
      size="lg"
      color="default"
      variant="flat"
      startContent={
        <View className="size-6 flex-row justify-center rounded-full bg-primary/20">
          <Text className="absolute text-primary">{timerCount}</Text>
        </View>
      }
      onPress={cancelDelete}
    >
      Cancel deletion
    </Button>
  )
}
