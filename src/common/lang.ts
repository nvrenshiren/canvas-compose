import IntlMessageFormat from 'intl-messageformat'
import Common from './common'

export default class {
  Langs: Object
  constructor(langs: Object) {
    this.Langs = langs
  }
  get(key: string, defaultMessage?: string, options?: {}) {
    let type = Common.getCooike('lang') || 'zh'
    let msg = this.Langs[type][key]
    if (msg == null) {
      if (defaultMessage != null) {
        return defaultMessage
      }
      return key
    }
    if (options) {
      msg = new IntlMessageFormat(msg, type)
      return msg.format(options)
    }
    return msg
  }
}
