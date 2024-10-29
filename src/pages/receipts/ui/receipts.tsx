import { observer } from 'mobx-react-lite'
import React from 'react'
import { FlatList } from 'react-native'

import { Receipt, receipts } from '@entities/receipt'

import { ScannerButton } from '@shared/ui'

import Empty from './empty'

const Receipts = observer(() => {
  const data = receipts.receipts

  return (
    <>
      <FlatList
        contentContainerStyle={{ paddingBottom: 101, flex: 1 }}
        data={data}
        renderItem={({ item }) => <Receipt {...item} />}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<Empty />}
      />
      <ScannerButton>Scan QR</ScannerButton>
    </>
  )
})

export default Receipts
