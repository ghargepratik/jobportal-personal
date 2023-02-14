import React, { useEffect, useRef } from 'react'

const Iframe = ({ src, width, height }) => {
  const container = useRef()
  useEffect(() => {
    setTimeout(() => {
      const frm = document.createElement('iframe')
      frm.src = src
      frm.width = width
      frm.height = height
      frm.loading = 'lazy'
      frm.scrolling = 'no'
      container.current.appendChild(frm)
    }, 100)
  }, [])
  return <div ref={container} />
}

export default Iframe
