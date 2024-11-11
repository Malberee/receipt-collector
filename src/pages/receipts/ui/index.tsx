import React from 'react'

import { ScannerButton } from '@shared/ui'

import { ReceiptList } from './receipt-list'

export const Receipts = () => {
  return (
    <>
      <ReceiptList />
      <ScannerButton href="/qr-scanner">Scan QR</ScannerButton>
    </>
  )
}
