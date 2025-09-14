type CurrencySymbolMapMap = {
  [index: string]: string
}
declare module 'currency-symbol-map/map' {
  import data from 'currency-symbol-map/map'

  export default data as CurrencySymbolMapMap
}
