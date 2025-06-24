import { useContext } from 'react'

import { ThemeContext } from './provider'

export const useTheme = () => useContext(ThemeContext)
