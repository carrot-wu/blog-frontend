import React, { useRef, memo } from 'react';
import { useLocation, matchPath, SwitchProps } from 'react-router-dom';

interface CacheSwitchProps extends SwitchProps {
  include?: string[];
}
interface CacheVal {
  [index: string]: { computedMatch: any };
}

const CacheSwitch: React.FC<CacheSwitchProps> = (props) => {
  const cache = useRef<CacheVal>({});
  const location = useLocation();
  const { children, include = [] } = props;
  const childNode = React.Children.map(children, (child) => {
    if (React.isValidElement(child)) {
      // 验证是否为是react element
      const { path } = child.props;
      const match = matchPath(location.pathname, { ...child.props, path });

      if (match && include.includes(path)) {
        //如果匹配，则将对应path的computedMatch属性加入cache对象里
        //当include为true时，缓存全部组件，当include为数组时缓存对应组件
        cache.current[path] = { computedMatch: match };
      }

      //可以在computedMatch里追加入一个display属性，可以在路由组件的props.match拿到
      const cloneProps =
        cache.current[path] &&
        Object.assign(cache.current[path].computedMatch, {
          display: match ? 'block' : 'none'
        });

      return (
        <div style={{ display: match ? 'block' : 'none' }}>
          {React.cloneElement(child, { computedMatch: cloneProps })}
        </div>
      );
    }

    return null;
  });
  return <>{childNode}</>;
};
export default memo(CacheSwitch);
