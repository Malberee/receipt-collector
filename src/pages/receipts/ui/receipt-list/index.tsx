import { observer } from 'mobx-react-lite'
import { rem } from 'nativewind'
import React, { useCallback } from 'react'
import { FlatList, type ListRenderItem } from 'react-native'

import { type ReceiptType, receipts } from '@entities/receipt'

import { Empty } from './empty'
import { Receipt } from './receipt'

export const ReceiptList = observer(() => {
  const data = receipts.getReceipts()

  const renderItem = useCallback<ListRenderItem<ReceiptType>>(
    ({ item }) => <Receipt {...item} />,
    [],
  )

  return data.length ? (
    <FlatList
      style={{ marginHorizontal: -rem.get() }}
      contentContainerStyle={{
        paddingBottom: 101,
      }}
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      removeClippedSubviews
    />
  ) : (
    <Empty />
  )
})
