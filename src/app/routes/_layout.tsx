import 'react-native-get-random-values'

import { PortalHost, PortalProvider } from '@gorhom/portal'
import { semanticColors } from '@malberee/heroui-native'
import { Stack } from 'expo-router'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { Toast as CustomToast } from '@components'
import { ThemeContext, ThemeProvider } from '@providers'

import '../../../global.css'
import '../../utils/i18n'

configureReanimatedLogger({ strict: false })

const toastConfig = {
  error: (props: BaseToastProps) => <CustomToast {...props} />,
}

const RootLayout = () => {
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
              {({ current = 'light' }) => (
                <Stack
                  screenOptions={{
                    headerShown: false,
                    contentStyle: {
                      backgroundColor: semanticColors[current].default[50],
                    },
                  }}
                />
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
