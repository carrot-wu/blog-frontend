import React from "react"
import {matchPath, SwitchProps, __RouterContext as RouterContext} from 'react-router'

interface CacheSwitchProps extends SwitchProps {
  include?: string[]
}

interface CacheVal {
  [index: string]: { computedMatch: any }
}

interface CacheState {
  cache: CacheVal
}

class CacheSwitch extends React.Component<CacheSwitchProps> {
  cache:CacheVal = {}
  render() {
    return (
      <RouterContext.Consumer>
        {context => {
          const location = this.props.location || context.location
          const {children, include = []} = this.props
          return React.Children.map(children, child => {
            if (React.isValidElement(child)) { // 验证是否为是react element
              const {path} = child.props
              const match = matchPath(location.pathname, {...child.props, path})
              if (match && include.includes(path)) {
                //如果匹配，则将对应path的computedMatch属性加入cache对象里
                //当include为true时，缓存全部组件，当include为数组时缓存对应组件
                this.cache[path] = {computedMatch: match}
              }

              //可以在computedMatch里追加入一个display属性，可以在路由组件的props.match拿到
              const cloneProps = this.cache[path] && Object.assign(this.cache[path].computedMatch, {display: match ? 'block' : 'none'})

              return <div
                style={{display: match ? 'block' : 'none'}}>{React.cloneElement(child, {computedMatch: cloneProps})}</div>
            }

            return null
          })
        }
        }
      </RouterContext.Consumer>
    )

  }
}

export default CacheSwitch
