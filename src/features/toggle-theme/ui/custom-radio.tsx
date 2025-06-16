import { type RadioProps, useRadio } from '@malberee/heroui-native'
import type { FC, ReactNode } from 'react'
import { Pressable, Text, View } from 'react-native'

interface CustomRadioPros extends RadioProps {
  startContent: ReactNode
}

export const CustomRadio: FC<CustomRadioPros> = ({
  startContent,
  ...props
}) => {
  const { children, getBaseProps, getLabelProps, getLabelWrapperProps } =
    useRadio(props)

  return (
    <Pressable {...getBaseProps()}>
      <View {...getLabelWrapperProps()}>
        {startContent}
        {children && <Text {...getLabelProps()}>{children}</Text>}
      </View>
    </Pressable>
  )
}
