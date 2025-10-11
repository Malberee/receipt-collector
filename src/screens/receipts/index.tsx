import { PortalHost } from '@gorhom/portal'
import { store } from '@store'
import { Button, Plus } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import React, { useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { Container, Modal, ReceiptForm, ScannerButton } from '@components'

import { Filters, useFilters, withFilters } from './filters'
import { Header } from './header'
import { ReceiptList } from './receipt-list'
import { filterReceipts } from './utils'

export const Receipts = withFilters(
  observer(() => {
    const [modalIsOpen, setModalIsOpen] = useState(false)
    const isExpanded = useSharedValue(false)
    const { filters } = useFilters()

    const data = filterReceipts(store.receipts, filters)

    return (
      <Container>
        <Header
          toggleFilters={() => {
            isExpanded.value = !isExpanded.value
          }}
        />
        <Filters isExpanded={isExpanded} />
        <ReceiptList data={data} />
        <View className="mb-4 w-full flex-row gap-4">
          <ScannerButton type="qr" />
          <Button
            isIconOnly
            startContent={
              <Plus
                width={38}
                height={38}
                className="text-primary-foreground"
              />
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
  }),
)
