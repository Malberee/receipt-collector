import { PortalHost } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
import React, { useState } from 'react'
import { useSharedValue } from 'react-native-reanimated'

import { Modal, ReceiptForm, ScannerButton } from '@components'

import { Filters } from './filters'
import { Header } from './header'
import { ReceiptList } from './receipt-list'

export const Receipts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isExpanded = useSharedValue(false)

  return (
    <>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      <Filters isExpanded={isExpanded} />
      <ReceiptList />
      <ScannerButton
        href="/scanner/qr"
        endContent={
          <Button
            isIconOnly
            startContent={
              <Plus
                width={38}
                height={38}
                className="text-primary-foreground"
              />
            }
            className="aspect-square h-full w-auto"
            onPress={() => setModalIsOpen(true)}
          />
        }
      >
        Scan QR code
      </ScannerButton>
      <PortalHost name="popover-portal" />

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </>
  )
}
