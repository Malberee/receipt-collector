import { Slot } from 'expo-router'
import React from 'react'

import { Header } from '@app/layouts'

const Layout = () => {
  return (
    <>
      <Header />
      <Slot />
    </>
  )
}

export default Layout
