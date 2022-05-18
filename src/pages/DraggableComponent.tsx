import React, { useRef, useLayoutEffect } from 'react'

import useResizeObserver from '../hooks/useResizeObserver'
import Draggable from '../components/Draggable'
import Box from '../components/Box'

interface getMovePositionParams {
  eventPosition: { x: number, y: number },
  parentOffset: { left: number, top: number },
  childSize: { width: number, height: number }
}


interface DraggableComponentProps {}

const DraggableComponent = (props: DraggableComponentProps) => {
  const boxRef = useRef<HTMLDivElement>(null)
  const draggableZoneRef = useRef<HTMLDivElement>(null)

  let isDragging = false
  let timeout: ReturnType<typeof setTimeout> | null = null

  const [
    dragZoneWidth,
    dragZoneHeight,
    dragZoneOffsetLeft,
    dragZoneOffsetTop
  ] = useResizeObserver(draggableZoneRef)

  const [
    boxWidth,
    boxHeight,
  ] = useResizeObserver(boxRef)

  const getMovePositionParams = (clientX: number, clientY: number) => ({
    eventPosition: { x: clientX, y: clientY },
    parentOffset: { left: dragZoneOffsetLeft, top: dragZoneOffsetTop },
    childSize: { width: boxWidth, height: boxHeight }
  })

  const getMovePosition = (params: getMovePositionParams) => {
    const calcPosition = {
      x: params.eventPosition.x - params.parentOffset.left - (params.childSize.width / 2),
      y: params.eventPosition.y - params.parentOffset.top - (params.childSize.height / 2)
    }

    const availablePosition = getAvailablePosition()
    // Over X
    if (calcPosition.x < availablePosition.left) calcPosition.x = 0
    else if (calcPosition.x > availablePosition.right) calcPosition.x = availablePosition.right
    // Over Y
    if (calcPosition.y < availablePosition.top) calcPosition.y = 0
    else if (calcPosition.y > availablePosition.bottom) calcPosition.y = availablePosition.bottom

    return calcPosition
  }

  const getAvailablePosition = () => ({ top: 0, right: dragZoneWidth - boxWidth, bottom: dragZoneHeight - boxHeight, left: 0 })

  const handleBoxMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
    isDragging = true
    if (!boxRef.current) return
    const boxElement = boxRef.current as HTMLDivElement

    const movePositionParams = getMovePositionParams(event.clientX, event.clientY)
    const movePosition = getMovePosition(movePositionParams)

    boxElement.style.transition = 'transform 50ms ease-out'
    boxElement.style.transform = `translate3d(${movePosition.x}px, ${movePosition.y}px, 0px)`
    timeout = setTimeout(() => {
      boxElement.style.transition = ''
      timeout = null
    }, 50)
  }

  const handleBoxMouseUp = (event: React.MouseEvent<HTMLDivElement>) => {
    isDragging = false
    if (timeout) clearTimeout(timeout)
  }

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !boxRef.current) return
    const movePositionParams = getMovePositionParams(event.clientX, event.clientY)
    const movePosition = getMovePosition(movePositionParams)

    const boxElement = boxRef.current as HTMLDivElement
    boxElement.style.transform = `translate3d(${movePosition.x}px, ${movePosition.y}px, 0px)`
  }

  const handleMouseLeave = () => isDragging = false

  useLayoutEffect(() => {
    // Reset box position when draggable zone resized
    const boxElement = boxRef.current as HTMLDivElement
    const x = (dragZoneWidth / 2) - (boxWidth / 2)
    const y = (dragZoneHeight / 2) - (boxHeight / 2)

    boxElement.style.transition = 'transform 100ms ease-out'
    boxElement.style.transform = `translate3d(${x}px, ${y}px, 0px)`
  }, [dragZoneWidth, dragZoneHeight, boxWidth, boxHeight])
  

  return (
    <Draggable
      id='draggableZone'
      handleMouseMove={handleMouseMove}
      handleMouseLeave={handleMouseLeave}
      ref={draggableZoneRef}
    >
      <Box
        ref={boxRef}
        handleBoxMouseDown={handleBoxMouseDown}
        handleBoxMouseUp={handleBoxMouseUp}
      >
        Drag Me!
      </Box>
    </Draggable>
  )
}

export default DraggableComponent