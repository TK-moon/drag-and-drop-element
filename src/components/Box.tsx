import React, { forwardRef } from 'react'

interface BoxProps {
  handleBoxMouseDown: (event: React.MouseEvent<HTMLDivElement>) => void
  handleBoxMouseUp: (event: React.MouseEvent<HTMLDivElement>) => void
  children: React.ReactNode
}

const Box = forwardRef<HTMLDivElement, BoxProps>((props: BoxProps, ref) => {
  return (
    <div
      ref={ref}
      className='drag-box'
      role='button'
      onMouseDown={props.handleBoxMouseDown}
      onMouseUp={props.handleBoxMouseUp}
    >
      {props.children}
    </div>
  )
})

export default Box