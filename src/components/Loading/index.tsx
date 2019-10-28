import React from 'react'
import './styles.less'

interface LoadingProps {
  children: React.ReactElement | string
  size?: number
  color?: string
}

const Loading: React.FC<LoadingProps> = (props) => {
  const { children, size = 24, color = '#24c3ef'} = props
  return (
    <div className="wu-loading">
      <span className="wu-loading-wrapper" style={{width: size, height: size, color}}>
        <svg viewBox="25 25 50 50" className="wu-loading-circular"  style={{color}}>
          <circle cx="50" cy="50" r="20" fill="none"/>
        </svg>
      </span>
      <span className="wu-loading-text">
        {children}
      </span>
    </div>
  )
}

export default Loading
