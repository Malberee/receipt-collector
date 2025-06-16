import { PortalHost, PortalProvider } from '@gorhom/portal'
import { Slot } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import { useColorScheme } from 'nativewind'
import React from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { configureReanimatedLogger } from 'react-native-reanimated'
import { SafeAreaView } from 'react-native-safe-area-context'
import Toast, { type BaseToastProps } from 'react-native-toast-message'

import { Container } from '@app/layouts'
import { ThemeProvider } from '@app/providers'

import { Toast as CustomToast } from '@shared/ui'

import '../../../global.css'

configureReanimatedLogger({ strict: false })
SplashScreen.preventAutoHideAsync()

const toastConfig = {
  error: (props: BaseToastProps) => <CustomToast {...props} />,
}

const RootLayot = () => {
  const { colorScheme } = useColorScheme()

  return (
    <GestureHandlerRootView>
      <ThemeProvider>
        <PortalProvider>
          <SafeAreaView
            edges={['right', 'bottom', 'left']}
            className="transition-background flex-1 bg-default-50 duration-100"
          >
            <StatusBar
              style={colorScheme === 'dark' ? 'light' : 'dark'}
              translucent
            />
            <Container>
              <Slot />
            </Container>
            <PortalHost name="modal-portal" />
            <Toast config={toastConfig} position="bottom" />
          </SafeAreaView>
        </PortalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  )
}

export default RootLayot
