import React from 'react'
import './styles.less'

interface BottomLineProps {
  children?: React.ReactElement | string
  lineWidth?: number | string
}

const BottomLine: React.FC<BottomLineProps> = (props) => {
  const { children = '我是有底线的', lineWidth = '100%' } = props
  return (
    <div className="bottom-line">
      <span style={{maxWidth:lineWidth}} className="line"/>
      <span className="bottom-text">{children}</span>
      <span style={{maxWidth:lineWidth}} className="line"/>
    </div>
  )
}

export default BottomLine
