import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
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

cssInterop(ChevronIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

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

  const currentPath = usePathname()

  return (
    <View className="z-10 w-full flex-row justify-between py-4">
      <View className="flex-row gap-4">
        {currentPath === '/receipts' ? (
          <Button
            isIconOnly
            size="lg"
            startContent={<Plus color="white" width="24px" height="24px" />}
            onPress={() => setModalIsOpen(true)}
          />
        ) : (
          <Link href="/" asChild>
            <Button
              isIconOnly
              variant="light"
              size="lg"
              startContent={
                <ChevronIcon
                  className="text-foreground"
                  width="24px"
                  height="24px"
                />
              }
            />
          </Link>
        )}

        {currentPath === '/receipts' ? (
          <Button
            isIconOnly
            variant="light"
            size="lg"
            color="default"
            startContent={<FilterIcon className="text-foreground" />}
            onPress={toggleFilters}
          />
        ) : null}
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
