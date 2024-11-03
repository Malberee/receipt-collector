import * as yup from 'yup'

export const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  price: yup.number().required('Price is required'),
  quantity: yup.number().required('Quantity is required'),
})
