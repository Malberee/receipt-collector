import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname } from 'expo-router'
import { cssInterop } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'

import { ReceiptForm } from '@features/receipt-create-edit'

import { Modal } from '@shared/ui'

import { ThemeSwitcher } from './theme-switcher'

cssInterop(ChevronIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const Header = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const currentPath = usePathname()

  return (
    <View className="z-10 w-full flex-row justify-between py-4">
      {currentPath === '/' ? (
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

      <ThemeSwitcher />

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </View>
  )
}
