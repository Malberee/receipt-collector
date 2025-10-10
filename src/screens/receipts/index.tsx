import { PortalHost } from '@gorhom/portal'
import { store } from '@store'
import { Button, Plus } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import moment from 'moment'
import React, { useEffect, useRef, useState } from 'react'
import { View } from 'react-native'
import { useSharedValue } from 'react-native-reanimated'

import { Container, Modal, ReceiptForm, ScannerButton } from '@components'

import { Filters } from './filters'
import { Header } from './header'
import { ReceiptList } from './receipt-list'
import { filterReceipts, type FiltersType } from './utils'

export const Receipts = observer(() => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const initialFilters = useRef({} as FiltersType)
  const [filters, setFilters] = useState<FiltersType>(() => {
    const maxAmount = Math.ceil(
      Math.max(...store.receipts.map((receipt) => receipt.amount)),
    )

    const timestamps = store.receipts.map((receipt) => moment(receipt.date))
    const minDate = moment.min(timestamps).clone().startOf('day')
    const maxDate = moment.max(timestamps).clone().endOf('day')

    const initialState: FiltersType = {
      amount: { from: 0, to: maxAmount },
      date: { from: minDate.toDate(), to: maxDate.toDate() },
      rarities: [],
    }

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

  return (
    <Container>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      <Filters
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
