import { PortalHost, PortalProvider } from '@gorhom/portal'
import { semanticColors } from '@malberee/heroui-native'
import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { rem } from 'nativewind'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { ThemeContext, ThemeProvider } from '@shared/lib'
import { Toast as CustomToast } from '@shared/ui'

import '../../../global.css'

SplashScreen.preventAutoHideAsync()

configureReanimatedLogger({ strict: false })

const toastConfig = {
  error: (props: BaseToastProps) => <CustomToast {...props} />,
}

const RootLayout = () => {
  const { top, bottom } = useSafeAreaInsets()

  useEffect(() => {
    if (top !== 0 && bottom !== 0) {
      SplashScreen.hideAsync()
    }
  }, [top, bottom])

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <SafeAreaView
          edges={['left', 'right']}
          className="flex-1 bg-default-50"
        >
          <PortalProvider>
            <PortalHost name="modal-portal" />
            <ThemeContext.Consumer>
              {({ current }) => (
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: {
                      flex: 1,
                      backgroundColor:
                        semanticColors[current ?? 'light'].default[50],
                      paddingTop: top,
                      paddingBottom: bottom,
                      paddingHorizontal: rem.get(),
                    },
                  }}
                >
                  <Stack.Screen name="index" />
                  <Stack.Screen name="[id]" />
                  <Stack.Screen name="rarity" />
                  <Stack.Screen
                    name="scanner"
                    options={{
                      contentStyle: { padding: 0 },
                    }}
                  />
                </Stack>
              )}
            </ThemeContext.Consumer>
            <Toast config={toastConfig} position="bottom" />
          </PortalProvider>
        </SafeAreaView>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayout
