import {isPlainObject, isDate} from "./checkType"

export default function handleData(data: any): any {
  let val = data
  if (isDate(val)) {
    val = data.toISOString()
  } else if (isPlainObject(data)) {
    val = JSON.stringify(data)
  }
  return val

}
export function parseData(data: any): any  {
  let val = data
  if(typeof data === 'string'){
    try {
      val = JSON.parse(data)
    }catch {

    }
  }
  return val
}
