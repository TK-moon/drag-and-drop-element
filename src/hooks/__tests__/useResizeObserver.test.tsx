import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { renderHook, act } from "@testing-library/react-hooks";
import useResizeObserver from "../useResizeObserver";
import ResizeObserver from "resize-observer-polyfill";
import React from 'react'

describe('useResizeObserver', () => {

  beforeEach(() => {
    const mockResizeObserver = jest.fn()
    mockResizeObserver.mockReturnValue({
      observe: jest.fn(),
      unobserve: jest.fn(),
      disconnect: jest.fn(),
    })
    window.ResizeObserver = mockResizeObserver
    Element.prototype.getBoundingClientRect = jest.fn(() => {
      return new DOMRect(1, 1, 1, 1)
    })
});

  test('render test', () => {
    const target: HTMLDivElement = document.createElement('div')
    const ref = { current: target }
    const callback = jest.fn()

    const { result } = renderHook(() => useResizeObserver(ref, callback))
    expect(callback).toHaveBeenCalledTimes(0)
  })
  
})