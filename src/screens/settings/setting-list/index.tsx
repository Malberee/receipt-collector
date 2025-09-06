import { View } from 'react-native'

import { Select } from '@components'

import { Option } from './option'

export const SettingList = () => {
  return (
    <View className="flex-col">
      <Option
        title="Language"
        endContent={
          <Select
            options={[
              { value: 'en', label: 'EN' },
              { value: 'ua', label: 'UA' },
            ]}
          />
        }
      />
    </View>
  )
}
