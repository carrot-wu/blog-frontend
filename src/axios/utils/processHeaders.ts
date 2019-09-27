import {isPlainObject} from "./checkType"

function normalizeHeadersName(headers: any, normalizeName: string): void {
  if (!headers) return
  Object.keys(headers).forEach(name => {
    if (name !== normalizeName && name.toLowerCase() === normalizeName.toLowerCase()) {
      headers[normalizeName] = headers[name]
      delete headers[name]
    }
  })
}

export default function processHeaders(data: any, headers: any): any {
  normalizeHeadersName(headers, 'Content-Type')
  if (isPlainObject(data)) {
    if (headers && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
 export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }

  headers.split('\r\n').forEach(line => {
    let [key, val] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (val) {
      val = val.trim()
    }
    parsed[key] = val
  })

  return parsed
}
