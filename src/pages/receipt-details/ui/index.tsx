import { useLocalSearchParams } from 'expo-router'
import { observer } from 'mobx-react-lite'
import React from 'react'

import { ScannerButton } from '@shared/ui'

import { Header } from './header'
import { Receipt } from './receipt'

export const ReceiptDetails = observer(() => {
  const { id } = useLocalSearchParams<{ id: string }>()

  return (
    <>
      <Header />
      <Receipt id={id} />
      <ScannerButton href={`/scanner/barcode/${id}`}>
        Scan barcode
      </ScannerButton>
    </>
  )
})
