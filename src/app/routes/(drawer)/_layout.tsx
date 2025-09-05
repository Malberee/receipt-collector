import { semanticColors } from '@malberee/heroui-native'
import { Stack } from 'expo-router'

import { Drawer, Navbar } from '@components'
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
              <Navbar onNavigate={hide} />
            </Drawer>
          ) : null
        }
      </DrawerContext.Consumer>
    </DrawerProvider>
  )
}

export default Layout
