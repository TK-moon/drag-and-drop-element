import React, { useLayoutEffect, useState, useCallback } from "react"

const useResizeObserver = (ref: React.RefObject<HTMLElement>, callback?: (entry: DOMRectReadOnly) => void) => {
  const [width, setWidth] = useState(0)
  const [height, setHeight] = useState(0)

  const [offsetTop, setOffsetTop] = useState(0)
  const [offsetLeft, setOffsetLeft] = useState(0)

  const handleResize = useCallback((entries: ResizeObserverEntry[]) => {
    if (!Array.isArray(entries)) return
    
    const entry = entries[0]
    setWidth(entry.contentRect.width)
    setHeight(entry.contentRect.height)
    
    const target = entry.target as HTMLElement
    setOffsetLeft(target.offsetLeft)
    setOffsetTop(target.offsetTop)

    if (callback) callback(entry.contentRect)
  }, [callback])

  // useEffect 는 render, paint 이후 실행
  // useLayoutEffect는 render이후 paint 전 실행
  useLayoutEffect(() => {
    if (!ref.current) return
    const element = ref.current

    let RO: ResizeObserver | null = null
    RO = new ResizeObserver((entries: ResizeObserverEntry[]) => handleResize(entries))
    RO.observe(element)

    return () => {
      if (!RO) return
      if (element) RO.unobserve(element)
      else RO.disconnect()
      RO = null
    }
  }, [handleResize, ref])

  return [width, height, offsetLeft, offsetTop]
}

export default useResizeObserver