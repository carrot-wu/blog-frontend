import {useState, useCallback, useEffect} from "react";
export interface LoadFnParams {
  pageNum: number;
  pageSize: number;
}
// 列表接口返回的数据
export interface FnRes<T = any> {
  // 下一页
  nextPage?: number;
  // 总页数
  totalPage: number;
  list: T[];
  [propName: string]: any;
}
// return出去的加载函数类型
export interface LoadFnInterface<T = any> {
  (params: LoadFnParams): Promise<FnRes<T>>;
}
// 默认数据接口
interface OptionsInterface {
  // 一页多少个
  pageSize?: number;
  // 初始也数默认为1
  defaultPage?: number;
  // 是否默认加载
  immediate?: boolean
}
// 返回出去的数据接口
interface InfiniteRes<T> {
  // 返回出去的调用函数方法
  load: () => void;
  // 是否处于加载状态
  loading: boolean;
  // 是否还有下一页
  hasMore: boolean;
  // 列表数据
  list: T[];
  // 接口错误的error对象
  error: Error | null;
  // 清除分页数据 从第一页重新开始
  clear: () => void;
}
export default function useInfinite<T>(
  loadFn: LoadFnInterface<T>,
  options: OptionsInterface = {}
): InfiniteRes<T> {
  const { pageSize = 10, defaultPage = 1, immediate = false } = options;
  // loadFn 是一个异步函数 最终返回的res 包含 {data, pageNo, totalPage}
  const [loading, setLoading] = useState(false);
  const [pageNum, setPageNum] = useState(defaultPage);
  const [dataList, setDataList] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState(null);

  const initLoad = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const result = await loadFn({ pageNum, pageSize });
      let { nextPage, totalPage, list } = result;
      setDataList(dataList.concat(list));
      nextPage = nextPage || (pageNum + 1)
      setPageNum(nextPage);
      if (nextPage > totalPage) {
        setHasMore(false);
      }
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }, [loadFn, pageNum, pageSize, dataList]);

  const clear = useCallback(() => {
    setLoading(false);
    setPageNum(defaultPage);
    setDataList([]);
    setHasMore(true);
    setError(null);
  }, [defaultPage]);

  useEffect(() => {
    if(immediate) {
      initLoad()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return {
    load: initLoad,
    loading,
    hasMore,
    list:dataList,
    error,
    clear
  };
}
