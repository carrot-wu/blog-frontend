// action type
export const UPD_COMMON_DATA = 'UPD_COMMON_DATA'
export const UPD_COMMON_TEST = 'UPD_COMMON_TEST'

// action
interface CommonAction {
  type: typeof UPD_COMMON_DATA,
  payload: {
    test: string
  }
}

interface TestAction {
  type: typeof UPD_COMMON_TEST,
  payload: {
    data: string
  }
}

export type CommActionType = CommonAction | TestAction
