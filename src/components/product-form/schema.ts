import * as yup from 'yup'

export const getSchema = (required: boolean) => {
  if (required) {
    return yup.object().shape({
      name: yup.string().required('Name is required'),
      price: yup.number(),
      quantity: yup.number(),
    })
  }
  return yup.object().shape({
    name: yup.string(),
    price: yup.number(),
    quantity: yup.number(),
  })
}
