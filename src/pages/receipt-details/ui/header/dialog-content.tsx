import { Button } from '@malberee/heroui-native'
import type { FC } from 'react'
import { Text, View } from 'react-native'

interface DialogContentProps {
  onCancel: () => void
  onDelete: () => void
}

export const DialogContent: FC<DialogContentProps> = ({
  onCancel,
  onDelete,
}) => {
  return (
    <>
      <Text className="mb-4 text-lg text-foreground">
        Are you sure you want to delete the receipt?
      </Text>
      <View className="flex-col gap-2">
        <Button color="default" variant="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button color="danger" variant="flat" onPress={onDelete}>
          Delete
        </Button>
      </View>
    </>
  )
}
