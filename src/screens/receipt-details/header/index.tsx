import { store } from '@store'
import { router } from 'expo-router'
import { Button } from 'merlo-ui'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { BackButton, DeleteDialog, Popover } from '@components'

import { DotsIcon } from './dots-icon'
import { PopoverContent } from './popover-content'

interface HeaderProps {
  receiptId: string
  onEdit: () => void
}

export const Header: FC<HeaderProps> = ({ receiptId, onEdit }) => {
  const { t } = useTranslation()
  const [showPopover, setShowPopover] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <View className="w-full flex-row justify-between pb-4">
      <BackButton />
      <View>
        <Button
          isIconOnly
          variant="light"
          size="lg"
          color="default"
          startContent={
            <DotsIcon
              className="text-foreground"
              width="24px"
              height="24px"
              style={{ transform: [{ rotate: '90deg' }] }}
            />
          }
          onPress={() => setShowPopover(true)}
        />
        {showPopover ? (
          <Popover onClose={() => setShowPopover(false)}>
            <PopoverContent
              onEdit={() => {
                onEdit()
                setShowPopover(false)
              }}
              onDelete={() => {
                setShowDialog(true)
                setShowPopover(false)
              }}
            />
          </Popover>
        ) : null}
      </View>
      {showDialog ? (
        <DeleteDialog
          text={t('Are you sure you want to delete the receipt?')}
          onCancel={() => setShowDialog(false)}
          onDelete={() => {
            store.deleteReceipt(receiptId)
            router.navigate('../')
          }}
        />
      ) : null}
    </View>
  )
}
