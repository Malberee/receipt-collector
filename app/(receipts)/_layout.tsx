import { Slot, usePathname } from 'expo-router'
import React from 'react'
import { useSharedValue } from 'react-native-reanimated'

import { Header } from '@app/layouts'

import { FiltersReceipts } from '@features/filter-receipts'

const Layout = () => {
  const isExpanded = useSharedValue(false)
  const pathname = usePathname()

  return (
    <>
      <Header
        toggleFilters={() => {
          isExpanded.value = !isExpanded.value
        }}
      />
      {pathname === '/' ? <FiltersReceipts isExpanded={isExpanded} /> : null}
      <Slot />
    </>
  )
}

export default Layout
