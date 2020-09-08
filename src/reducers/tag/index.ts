import { UpdTagActionType, UPD_TAG_LIST, TagDefaultState, TagMap } from './types';

const defaultState: TagDefaultState = {
  tagList: [],
  tagMap: {}
};

export default function articleReducer(state = defaultState, action: UpdTagActionType): TagDefaultState {
  switch (action.type) {
    case UPD_TAG_LIST:
      const { tagList } = action.payload;
      const tagMap = tagList.reduce((obj, cur) => {
        obj[cur.name] = cur;
        return obj;
      }, {} as TagMap);
      return {
        tagList: [...state.tagList, ...tagList.map((article) => article.name)],
        tagMap: { ...state.tagMap, ...tagMap }
      };
    default:
      return state;
  }
}
