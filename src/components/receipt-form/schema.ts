import * as yup from 'yup'

export const getSchema = (required: boolean) => {
  if (required) {
    return yup.object().shape({
      amount: yup
        .number()
        .typeError('Amount must be a number')
        .when('autoCalcAmount', {
          is: true,
          then: (schema) => schema.optional(),
          otherwise: (schema) => schema.required('Amount is required'),
        }),
      autoCalcAmount: yup.boolean().required(),
    })
  }

  return yup.object().shape({
    amount: yup.number().typeError('Amount must be a number'),
    autoCalcAmount: yup.boolean().required(),
  })
}
