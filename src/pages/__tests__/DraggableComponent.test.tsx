import { fireEvent, render, screen } from '@testing-library/react'
import { renderHook } from '@testing-library/react-hooks'

import DraggableComponent from '../DraggableComponent'
import useResizeObserver from '../../hooks/useResizeObserver'

describe('DraggableComponent', () => {

  beforeEach(() => {
    const mockResizeObserver = jest.fn()
    mockResizeObserver.mockReturnValue({
      observe: () => null,
      unobserve: () => null,
      disconnect: () => null
    })
    window.ResizeObserver = mockResizeObserver
  })

  test('ResizeObserver Init value', () => {
    const { result } = renderHook(() => useResizeObserver({ current: null }))

    expect(result.current[0]).toBe(0) // width
    expect(result.current[1]).toBe(0) // height
    expect(result.current[2]).toBe(0) // offsetLeft
    expect(result.current[3]).toBe(0) // offsetTop
  })

  // How to test resize event?

  test('DraggableComponent Render', () => {
    const { container } = render(<DraggableComponent />)
    expect(container).not.toBe(null)
  })

  test('DraggableZone Component Render', () => {
    render(<DraggableComponent />)
    expect(screen.getByRole('group')).toBeInTheDocument()
  })

  test('Drag Box Component Render', () => {
    render(<DraggableComponent />)
    expect(screen.getByText('Drag Me!')).toBeInTheDocument()
  })

  test('Drag after mousedown on box', () => {
    render(<DraggableComponent />)
    const draggableZone = screen.getByRole('group')
    const Box = screen.getByText('Drag Me!')
    
    fireEvent.mouseDown(Box)
    fireEvent.mouseMove(draggableZone)
    fireEvent.mouseUp(Box)

    expect(Box).toHaveStyle('transform: translate3d(0px, 0px, 0px)')
  })
})