import { useContext } from 'react'

import { DrawerContext } from './provider'

export const useDrawer = () => useContext(DrawerContext)
