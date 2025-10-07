import { Stack } from 'expo-router'
import { semanticColors } from 'merlo-ui'
import { View } from 'react-native'

import { Drawer, Navbar, ThemeChanger } from '@components'
import { DrawerContext, DrawerProvider, useTheme } from '@providers'

const Layout = () => {
  const { current } = useTheme()

  return (
    <DrawerProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: {
            backgroundColor: semanticColors[current].default[50],
          },
        }}
      />
      <DrawerContext.Consumer>
        {({ isShown, hide }) =>
          isShown ? (
            <Drawer onClose={hide}>
              <View className="flex-1 flex-col justify-between">
                <Navbar onNavigate={hide} />
                <View className="h-20">
                  <ThemeChanger />
                </View>
              </View>
            </Drawer>
          ) : null
        }
      </DrawerContext.Consumer>
    </DrawerProvider>
  )
}

export default Layout
