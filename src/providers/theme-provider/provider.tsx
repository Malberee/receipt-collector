import { type Theme, store } from '@store'
import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'
import { useColorScheme } from 'nativewind'
import {
  type FC,
  type PropsWithChildren,
  createContext,
  useEffect,
  useState,
} from 'react'
import { View } from 'react-native'

type ThemeContextType = {
  current: Exclude<Theme, 'system'>
  isDark: boolean
  set: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({
  current: 'light',
  isDark: false,
  set: () => {},
})

export const ThemeProvider: FC<PropsWithChildren> = observer(({ children }) => {
  const { colorScheme } = useColorScheme()
  const [theme, setTheme] = useState(() => {
    if (store.preferences.theme === 'system') return colorScheme ?? 'light'
    return store.preferences.theme
  })

  const onThemeChange = (theme: Theme) => {
    if (theme === 'system') setTheme(colorScheme ?? 'light')
    else setTheme(theme)

    store.setPreferences('theme', theme)
  }

  useEffect(() => {
    if (store.preferences.theme === 'system') {
      setTheme(colorScheme ?? 'light')
    }
  }, [colorScheme])

  return (
    <ThemeContext.Provider
      value={{ current: theme, isDark: theme === 'dark', set: onThemeChange }}
    >
      <StatusBar style={theme === 'dark' ? 'light' : 'dark'} translucent />
      <View className={`flex-1 ${theme}`}>{children}</View>
    </ThemeContext.Provider>
  )
})
