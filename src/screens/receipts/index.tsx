import { PortalHost } from '@gorhom/portal'
import { Button, Plus } from '@malberee/heroui-native'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { Container, Modal, ReceiptForm, ScannerButton } from '@components'

import { Filters } from './filters'
import { Header } from './header'
import { ReceiptList } from './receipt-list'

export const Receipts = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const isExpanded = useSharedValue(false)

  return (
    <Container>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      <Filters isExpanded={isExpanded} />
      <ReceiptList />
      <View className="mb-4 w-full flex-row gap-4">
        <ScannerButton type="qr" />
        <Button
          isIconOnly
          startContent={
            <Plus width={38} height={38} className="text-primary-foreground" />
          }
          className="aspect-square h-auto w-auto"
          onPress={() => setModalIsOpen(true)}
        />
      </View>

      <PortalHost name="popover-portal" />

      {modalIsOpen ? (
        <Modal onClose={() => setModalIsOpen(false)}>
          <ReceiptForm onSubmit={() => setModalIsOpen(false)} />
        </Modal>
      ) : null}
    </Container>
  )
}
