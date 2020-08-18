import request from 'utils/request';
import { TagItem } from '@/types/tag';

export function getTagList() {
  return request.get<TagItem[]>('tag/getTagList');
}
