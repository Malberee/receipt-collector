import { Button, ChevronIcon, Plus } from '@malberee/nextui-native'
import { Link, usePathname, useSegments } from 'expo-router'
import { cssInterop } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'

import { ReceiptForm } from '@features/receipt-create-edit'
import { ThemeSwitcher } from '@features/theme-toggle'

import { Modal } from '@shared/ui'

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
  const segments = useSegments()

  const isScanner =
    segments[0] === 'qr-scanner' || segments[0] === 'barcode-scanner'

  return (
    <View
      className={`z-10 w-full flex-row justify-between p-4 ${isScanner && 'absolute'}`}
    >
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
                className={isScanner ? 'text-white' : 'text-foreground'}
                width="24px"
                height="24px"
              />
            }
          />
        </Link>
      )}

      {!isScanner ? <ThemeSwitcher /> : null}

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </View>
  )
}
