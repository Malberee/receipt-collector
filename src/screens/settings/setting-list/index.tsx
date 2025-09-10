import { store } from '@store'
import { observer } from 'mobx-react-lite'
import { useTranslation } from 'react-i18next'
import { View } from 'react-native'

import { Select } from '@components'
import { changeLocale } from '@utils'

import { Option } from './option'

export const SettingList = observer(() => {
  const { t } = useTranslation()
  const { lang } = store.preferences

  return (
    <View className="flex-col">
      <Option
        title={t('Language')}
        endContent={
          <Select
            options={[
              { value: 'en', label: t('English') },
              { value: 'uk', label: t('Ukrainian') },
            ]}
            defaultValue={lang}
            onValueChange={(value) => changeLocale(value)}
          />
        }
      />
    </View>
  )
})
