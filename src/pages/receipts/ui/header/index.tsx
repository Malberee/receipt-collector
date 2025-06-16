import { Button, Plus } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, useState } from 'react'
import { View } from 'react-native'

import { ReceiptForm } from '@features/receipt-create-edit'
import { ToggleTheme } from '@features/toggle-theme'

import { Modal } from '@shared/ui'

import { FilterIcon } from './filter-icon'

interface HeaderProps {
  toggleFilters: () => void
}

cssInterop(FilterIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Header: FC<HeaderProps> = ({ toggleFilters }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  return (
    <View className="w-full flex-row justify-between pb-4">
      <View className="flex-row gap-4">
        <Button
          isIconOnly
          size="lg"
          startContent={<Plus color="white" width="24px" height="24px" />}
          onPress={() => setModalIsOpen(true)}
        />

        <Button
          isIconOnly
          variant="light"
          size="lg"
          color="default"
          startContent={<FilterIcon className="text-foreground" />}
          onPress={toggleFilters}
        />
      </View>

      <ToggleTheme />

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </View>
  )
}
