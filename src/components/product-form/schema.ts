import { t } from 'i18next'
import * as yup from 'yup'

export const getSchema = (required: boolean) => {
  if (required) {
    return yup.object().shape({
      name: yup.string().required(t('Name is required')),
      price: yup
        .number()
        .positive(t('Price must be a positive number'))
        .typeError(t('Price must be a number')),
      quantity: yup
        .number()
        .positive(t('Quantity must be a positive number'))
        .typeError(t('Quantity must be a number')),
    })
  }
  return yup.object().shape({
    name: yup.string(),
    price: yup
      .number()
      .positive(t('Price must be a positive number'))
      .typeError(t('Price must be a number')),
    quantity: yup
      .number()
      .positive(t('Quantity must be a positive number'))
      .typeError(t('Quantity must be a number')),
  })
}
