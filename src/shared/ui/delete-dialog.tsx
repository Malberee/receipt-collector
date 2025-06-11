import { Button } from '@malberee/heroui-native'
import type { FC } from 'react'
import { Text, View } from 'react-native'

import { Modal } from './modal'

interface DeleteDialogProps {
  text: string
  onCancel: () => void
  onDelete: () => void
}

export const DeleteDialog: FC<DeleteDialogProps> = ({
  text,
  onCancel,
  onDelete,
}) => {
  return (
    <Modal>
      <Text className="mb-4 text-lg text-foreground">{text}</Text>
      <View className="flex-col gap-2">
        <Button color="default" variant="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button color="danger" variant="flat" onPress={onDelete}>
          Delete
        </Button>
      </View>
    </Modal>
  )
}
