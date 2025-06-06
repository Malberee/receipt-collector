import { Button, ChevronDown } from '@malberee/heroui-native'
import { router } from 'expo-router'
import { type FC, useState } from 'react'
import { View } from 'react-native'

import { receipts } from '@entities/receipt'

import { Modal, Popover } from '@shared/ui'

import { DialogContent } from './dialog-content'
import { DotsIcon } from './dots-icon'
import { PopoverContent } from './popover-content'

interface HeaderProps {
  receiptId: string
  onEdit: () => void
}

export const Header: FC<HeaderProps> = ({ receiptId, onEdit }) => {
  const [showPopover, setShowPopover] = useState(false)
  const [showDialog, setShowDialog] = useState(false)

  return (
    <View className="w-full flex-row justify-between pb-4">
      <Button
        isIconOnly
        variant="light"
        size="lg"
        color="default"
        startContent={
          <ChevronDown
            className="text-foreground"
            width="24px"
            height="24px"
            style={{ transform: [{ rotate: '90deg' }] }}
          />
        }
        onPress={() => router.navigate('../')}
      />
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
        <Modal onClose={() => setShowDialog(false)}>
          <DialogContent
            onCancel={() => setShowDialog(false)}
            onDelete={() => {
              receipts.deleteReceipt(receiptId)
              router.navigate('../')
            }}
          />
        </Modal>
      ) : null}
    </View>
  )
}
