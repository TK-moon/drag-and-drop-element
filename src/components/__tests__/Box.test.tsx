import { fireEvent, render, screen } from '@testing-library/react'
import Box from '../Box'

describe('Box', () => {
  const handleMouseDown = jest.fn()
  const handleMouseUp = jest.fn()
  const boxTextProp = 'Drag Me!'

  const element = (
    <Box handleBoxMouseDown={handleMouseDown} handleBoxMouseUp={handleMouseUp}>{boxTextProp}</Box>
  )

  test('Box Render Test', () => {
    render(element)
    const boxText = screen.getByText(boxTextProp)
    expect(boxText).toBeInTheDocument()
  })

  test('Box ClassName Test', () => {
    render(element)
    expect(screen.getByText(boxTextProp)).toHaveClass('drag-box')
  })

  test('Box MouseDown Test', () => {
    render(element)
    const box = screen.getByText(boxTextProp)
    fireEvent.mouseDown(box)
    expect(handleMouseDown).toHaveBeenCalled()
  })

  test('Box MouseUp Test', () => {
    render(element)
    const box = screen.getByText(boxTextProp)
    fireEvent.mouseUp(box)
    expect(handleMouseUp).toHaveBeenCalled()
  })
})