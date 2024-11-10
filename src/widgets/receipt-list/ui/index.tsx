import { observer } from 'mobx-react-lite'
import React from 'react'
import { FlatList } from 'react-native'

import { Receipt, receipts } from '@entities/receipt'

import Empty from './empty'

export const ReceiptList = observer(() => {
  const data = receipts.receipts

  return data.length ? (
    <FlatList
      contentContainerStyle={{ paddingBottom: 101 }}
      data={data}
      renderItem={({ item }) => <Receipt {...item} />}
      keyExtractor={(item) => item.id}
    />
  ) : (
    <Empty />
  )
})