import {
  Button,
  MoonFilledIcon,
  RadioGroup,
  SunFilledIcon,
} from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import { cssInterop, useColorScheme } from 'nativewind'
import { useState } from 'react'
import { View } from 'react-native'

import { type Theme, receipts } from '@entities/receipt'

import { Popover } from '@shared/ui'

import { CustomRadio } from './custom-radio'
import { SmartphoneIcon } from './smartphone-icon'

cssInterop(SunFilledIcon, {
  className: {
    target: false,
    nativeStyleToProp: {
      color: true,
    },
  },
})

export const ToggleTheme = observer(() => {
  const [showPopover, setShowPopover] = useState(false)

  const { setColorScheme, colorScheme } = useColorScheme()

  const changeTheme = (theme: Theme) => {
    receipts.setTheme(theme)
    setColorScheme(theme)
  }

  const Icon = colorScheme === 'dark' ? SunFilledIcon : MoonFilledIcon

  const iconProps = {
    className: 'text-foreground',
    width: 20,
    height: 20,
  }
  const classNames = {
    base: 'rounded-2xl active:bg-default-500/20 rounded-2xl transition-colors overflow-hidden',
    labelWrapper:
      'ml-0 p-2 flex-row items-center justify-center gap-2 transition-colors group-[[selected=true]]:bg-default-500/20',
    label: 'text-center flex-1',
  }

  return (
    <View>
      <Button
        isIconOnly
        variant="light"
        color="default"
        size="lg"
        startContent={<Icon {...iconProps} width={24} height={24} />}
        onPress={() => setShowPopover(true)}
      />

      {showPopover ? (
        <Popover onClose={() => setShowPopover(false)}>
          <RadioGroup
            value={receipts.theme}
            classNames={{ wrapper: 'gap-1' }}
            onValueChange={(value) => {
              setShowPopover(false)
              changeTheme(value as Theme)
            }}
          >
            <CustomRadio
              value="light"
              classNames={classNames}
              startContent={<SunFilledIcon {...iconProps} />}
            >
              Light
            </CustomRadio>
            <CustomRadio
              value="dark"
              classNames={classNames}
              startContent={<MoonFilledIcon {...iconProps} />}
            >
              Dark
            </CustomRadio>
            <CustomRadio
              value="system"
              classNames={classNames}
              startContent={<SmartphoneIcon {...iconProps} />}
            >
              System
            </CustomRadio>
          </RadioGroup>
        </Popover>
      ) : null}
    </View>
  )
})
