import { Button } from '@malberee/heroui-native'
import type { FC } from 'react'
import { useTranslation } from 'react-i18next'

import { PenIcon, TrashIcon } from '@icons'

interface PopoverContentProps {
  onEdit: () => void
  onDelete: () => void
}

export const PopoverContent: FC<PopoverContentProps> = ({
  onEdit,
  onDelete,
}) => {
  const { t } = useTranslation()

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
        {t('Edit')}
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
        {t('Delete')}
      </Button>
    </>
  )
}
