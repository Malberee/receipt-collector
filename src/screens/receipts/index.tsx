import { PortalHost } from '@gorhom/portal'
import { store } from '@store'
import { Button, Plus } from 'merlo-ui'
import { reaction } from 'mobx'
import { observer } from 'mobx-react-lite'
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { Container, Modal, ReceiptForm, ScannerButton } from '@components'

import { Filters } from './filters'
import { Header } from './header'
import { ReceiptList } from './receipt-list'
import { filterReceipts, getFilters, type FiltersType } from './utils'

export const Receipts = observer(() => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const initialFilters = useRef({} as FiltersType)
  const [filters, setFilters] = useState<FiltersType>(() => {
    const initialState = getFilters(store.receipts)

    initialFilters.current = initialState

    return initialState
  })
  const [hasFilters, setHasFilters] = useState(false)
  const isExpanded = useSharedValue(false)

  const data = filterReceipts(store.receipts, filters)

  useEffect(() => {
    const { amount, date, rarities } = filters
    const { amount: initialAmount, date: initialDate } = initialFilters.current

    setHasFilters(
      amount.from !== initialAmount.from ||
        amount.to !== initialAmount.to ||
        date.from.getTime() !== initialDate.from.getTime() ||
        date.to.getTime() !== initialDate.to.getTime() ||
        rarities.length > 0,
    )
  }, [filters])

  useEffect(() => {
    const dispose = reaction(
      () => store.receipts.map((receipt) => receipt),
      () => {
        setFilters(getFilters(store.receipts))
      },
    )

    return () => dispose()
  }, [])

  return (
    <Container>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      <Filters
        filters={filters}
        isExpanded={isExpanded}
        onValueChange={(key, value) =>
          setFilters((prevState) => ({ ...prevState, [key]: value }))
        }
      />
      <ReceiptList data={data} hasFilters={hasFilters} />
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
})
