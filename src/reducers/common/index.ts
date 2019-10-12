import {CommActionType} from './types'
interface IDefaultState {
  test: string
}

const defaultState: IDefaultState = {
  test: ''
}

export default function commonReducer(state = defaultState, action:CommActionType): IDefaultState {
  switch (action.type) {
    default:
      return state
  }
}

