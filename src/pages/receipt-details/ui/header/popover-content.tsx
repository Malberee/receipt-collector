import { Button } from '@malberee/heroui-native'
import type { FC } from 'react'

import { PenIcon, TrashIcon } from '@shared/ui'

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
        startContent={
          <PenIcon className="text-foreground" width={24} height={24} />
        }
        onPress={onEdit}
      >
        Edit
      </Button>
      <Button
        className="w-full"
        variant="flat"
        color="danger"
        startContent={
          <TrashIcon className="text-danger-500" width={24} height={24} />
        }
        onPress={onDelete}
      >
        Delete
      </Button>
    </>
  )
}
