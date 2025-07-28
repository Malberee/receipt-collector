import type { AddReceiptArg } from '@store'

import { parseText } from './parse-text'
import { parseURL } from './parse-url'

export const parseQR = (data: string): AddReceiptArg => {
  const regexURL = new RegExp(
    /https:\/\/cabinet\.tax\.gov\.ua\/cashregs\/check\?.*/,
  )

  if (regexURL.test(data)) {
    return parseURL(data)
  }

  return parseText(data)
}
