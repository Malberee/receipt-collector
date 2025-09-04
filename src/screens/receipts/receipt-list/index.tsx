import { type ReceiptType, receipts } from '@store'
import { observer } from 'mobx-react-lite'
import React, { useCallback, useState } from 'react'
import { type ListRenderItem } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'

import { DeleteDialog } from '@components'

import { Empty } from './empty'
import { Receipt } from './receipt'

export const ReceiptList = observer(() => {
  const [receiptToDelete, setReceiptToDelete] = useState('')
  const data = receipts.getReceipts()

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
            receipts.deleteReceipt(receiptToDelete)
            setReceiptToDelete('')
          }}
        />
      ) : null}
    </>
  ) : (
    <Empty />
  )
})
