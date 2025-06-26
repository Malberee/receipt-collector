import {
  Button,
  MoonFilledIcon,
  RadioGroup,
  SunFilledIcon,
} from '@malberee/heroui-native'
import { observer } from 'mobx-react-lite'
import { cssInterop } from 'nativewind'
import { View } from 'react-native'

import { type Theme, receipts } from '@entities/receipt'

import { Popover } from '@shared/ui'

import { useToggleTheme } from '../model'
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
const radios = [
  { value: 'Light', classNames, icon: <SunFilledIcon {...iconProps} /> },
  { value: 'Dark', classNames, icon: <MoonFilledIcon {...iconProps} /> },
  { value: 'System', classNames, icon: <SmartphoneIcon {...iconProps} /> },
]

export const ToggleTheme = observer(() => {
  const {
    showPopover,
    CurrentIcon,
    togglePopover,
    onValueChange,
    setCoordinates,
  } = useToggleTheme()

  return (
    <View>
      <Button
        isIconOnly
        variant="light"
        color="default"
        size="lg"
        startContent={<CurrentIcon {...iconProps} width={24} height={24} />}
        onPress={togglePopover}
        onLayout={(event) => {
          event.target.measure((_, __, width, height, pageX, pageY) =>
            setCoordinates({ x: pageX + width / 2, y: pageY + height / 2 }),
          )
        }}
      />

      {showPopover ? (
        <Popover onClose={togglePopover}>
          <RadioGroup
            value={receipts.theme}
            classNames={{ wrapper: 'gap-1' }}
            onValueChange={(value) => {
              togglePopover()
              onValueChange(value as Theme)
            }}
          >
            {radios.map((radio) => (
              <CustomRadio
                key={radio.value}
                value={radio.value.toLowerCase()}
                classNames={radio.classNames}
                startContent={radio.icon}
              >
                {radio.value}
              </CustomRadio>
            ))}
          </RadioGroup>
        </Popover>
      ) : null}
    </View>
  )
})
