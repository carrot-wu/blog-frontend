import {TagItem} from 'types/tag'
export interface TagMap {
  [index: string]: TagItem
}

export interface TagDefaultState {
  tagList: string[];
  tagMap: TagMap
}
// action type
export const UPD_TAG_LIST = 'UPD_TAG_LIST'

// action
export interface UpdTagAction {
  type: typeof UPD_TAG_LIST,
  payload: {
    tagList: TagItem[]
  }
}

export type UpdTagActionType = UpdTagAction
