import { Button, Plus } from '@malberee/heroui-native'
import { cssInterop } from 'nativewind'
import React, { type FC, useState } from 'react'
import { View } from 'react-native'

import { ReceiptForm } from '@features/receipt-create-edit'

import { Modal } from '@shared/ui'

import { FilterIcon } from './filter-icon'
import { ThemeSwitcher } from './theme-switcher'

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
    <View className="z-10 w-full flex-row justify-between pb-4">
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

      <ThemeSwitcher />

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </View>
  )
}
