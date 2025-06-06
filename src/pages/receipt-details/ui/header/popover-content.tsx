import { Button, DeleteIcon, EditIcon } from '@malberee/heroui-native'
import type { FC } from 'react'

interface PopoverContentProps {
  onEdit: () => void
  onDelete: () => void
}

export const PopoverContent: FC<PopoverContentProps> = ({
  onEdit,
  onDelete,
}) => {
  return (
    <>
      <Button
        className="w-full"
        variant="light"
        color="default"
        startContent={<EditIcon className="text-foreground" />}
        onPress={onEdit}
      >
        Edit
      </Button>
      <Button
        className="w-full"
        variant="flat"
        color="danger"
        startContent={<DeleteIcon className="text-danger-500" />}
        onPress={onDelete}
      >
        Delete
      </Button>
    </>
  )
}
