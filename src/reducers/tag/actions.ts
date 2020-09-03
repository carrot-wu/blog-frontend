import { getTagList } from 'services/tag';
import { UPD_TAG_LIST, UpdTagAction } from './types';
import { Action } from 'redux';
import { AppState } from '../index';
import { ThunkAction } from 'redux-thunk';
import { TagItem } from '@/types/tag';

//actionCreator
export function updTag(tagList: TagItem[]): UpdTagAction {
  return {
    type: UPD_TAG_LIST,
    payload: { tagList }
  };
}
// action
export const thunkUpdTag = (): ThunkAction<
  void,
  AppState,
  null,
  Action<typeof UPD_TAG_LIST>
> => async (dispatch, getState) => {
  const {
    tag: { tagList, tagMap }
  } = getState();
  if (tagList && tagList.length) {
    return Promise.resolve(Object.values(tagMap));
  }

  const { data } = await getTagList();
  dispatch(updTag(data));
  return data;
};
