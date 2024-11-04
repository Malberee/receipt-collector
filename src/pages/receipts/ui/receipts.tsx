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
      {data.length ? (
        <FlatList
          contentContainerStyle={{ paddingBottom: 101 }}
          data={data}
          renderItem={({ item }) => <Receipt {...item} />}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <Empty />
      )}
      <ScannerButton href="/qr-scanner">Scan QR</ScannerButton>
    </>
  )
})

export default Receipts
