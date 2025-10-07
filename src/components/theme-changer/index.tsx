import { store } from '@store'
import { cn, MoonFilledIcon, SunFilledIcon } from 'merlo-ui'
import { observer } from 'mobx-react-lite'
import { Text, View } from 'react-native'

import { useTheme } from '@providers'

import { Tabs } from '../tabs'
import { SmartphoneIcon } from './smartphone-icon'

export const ThemeChanger = observer(() => {
  const { set } = useTheme()

  const icons = {
    dark: MoonFilledIcon,
    light: SunFilledIcon,
    system: SmartphoneIcon,
  }

  return (
    <Tabs
      options={[
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
        { label: 'System', value: 'system' },
      ]}
      value={store.preferences.theme}
      onValueChange={set}
      renderOption={({ label, value }) => {
        const Icon = icons[value]

        return (
          <View className="flex-col items-center justify-center gap-px">
            <Icon
              className={cn(
                'text-foreground',
                value === store.preferences.theme && 'text-white',
              )}
              width={18}
              height={18}
            />
            <Text
              className={cn(
                'transition-color text-sm text-foreground',
                value === store.preferences.theme && 'text-white',
              )}
            >
              {label}
            </Text>
          </View>
        )
      }}
    />
  )
})
