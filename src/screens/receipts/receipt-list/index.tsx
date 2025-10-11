import { type ReceiptType, store } from '@store'
import { type FC, useCallback, useState } from 'react'
import { type ListRenderItem } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { DeleteDialog } from '@components'

import { useFilters } from '../filters'
import { Empty } from './empty'
import { Receipt } from './receipt'

interface ReceiptListProps {
  data: ReceiptType[]
}

export const ReceiptList: FC<ReceiptListProps> = ({ data }) => {
  const { hasFilters } = useFilters()
  const [receiptToDelete, setReceiptToDelete] = useState('')

  const renderItem = useCallback<ListRenderItem<ReceiptType>>(
    ({ item }) => <Receipt receipt={item} onDelete={setReceiptToDelete} />,
    [],
  )

  return data.length ? (
    <>
      <Animated.FlatList
        className="-mx-4"
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        removeClippedSubviews
        itemLayoutAnimation={LinearTransition}
      />
      {receiptToDelete ? (
        <DeleteDialog
          text="Are you sure you want to delete the receipt?"
          onCancel={() => setReceiptToDelete('')}
          onDelete={() => {
            store.deleteReceipt(receiptToDelete)
            setReceiptToDelete('')
          }}
        />
      ) : null}
    </>
  ) : (
    <Empty hasFilters={hasFilters} />
  )
}
