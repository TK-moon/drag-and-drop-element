import { screen, render, fireEvent } from "@testing-library/react"
import Draggable from "../Draggable"

describe('Draggable', () => {
  const handleMouseMove = jest.fn()
  const handleMouseLeave = jest.fn()
  const child = <div>child</div>

  const element = (
    <Draggable
      id='draggableZone'
      handleMouseMove={handleMouseMove}
      handleMouseLeave={handleMouseLeave}
    >
      {child}
    </Draggable>
  )

  test('draggable component child render', () => {
    render(element)
    expect(screen.getByText('child')).toBeInTheDocument()
  })

  test('id property is exist in draggable component', () => {
    render(element)
    expect(screen.getByRole('group')).toHaveAttribute('id')
  })

  test('handleMouseMove function run on mouseMove event', () => {
    render(element)
    const draggableZone = screen.getByRole('group')
    fireEvent.mouseMove(draggableZone)
    
    expect(handleMouseMove).toHaveBeenCalled()
    expect(draggableZone).toHaveStyle('transform:')
  })

  test('handleMouseLeave function run on mouseLeave event', () => {
    render(element)
    fireEvent.mouseLeave(screen.getByRole('group'))
    expect(handleMouseLeave).toHaveBeenCalled()
  })
})