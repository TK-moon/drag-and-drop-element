import React, { forwardRef } from 'react'

interface DraggableProps {
  id: string
  children: React.ReactNode
  handleMouseMove: (event: React.MouseEvent<HTMLDivElement>) => void
  handleMouseLeave: () => void
}

const Draggable = forwardRef<HTMLDivElement, DraggableProps>((props: DraggableProps, ref) => {
  return (
    <section>
      <div
        ref={ref}
        role='group'
        id={props.id}
        onMouseMove={props.handleMouseMove}
        onMouseLeave={props.handleMouseLeave}
      >
        {props.children}
      </div>
    </section>
  )
})

export default Draggable