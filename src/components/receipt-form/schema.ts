import { t } from 'i18next'
import * as yup from 'yup'

export const getSchema = (required: boolean) => {
  if (required) {
    return yup.object().shape({
      amount: yup
        .number()
        .positive(t('Amount must be a positive number'))
        .typeError(t('Amount must be a number'))
        .when('autoCalcAmount', {
          is: true,
          then: (schema) => schema.optional(),
          otherwise: (schema) => schema.required(t('Amount is required')),
        }),
      autoCalcAmount: yup.boolean().required(),
    })
  }

  return yup.object().shape({
    amount: yup
      .number()
      .positive(t('Amount must be a positive number'))
      .typeError(t('Amount must be a number')),
    autoCalcAmount: yup.boolean().required(),
  })
}
