import React, { useRef, useEffect } from 'react'
import WebViewer from '@pdftron/webviewer'
const ShowResume = ({ link }) => {
  const viewer = useRef(null)
  useEffect(() => {
    WebViewer(
      {
        initialDoc: link,
      },
      viewer.current
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core
      instance.UI.loadDocument(link, { filename: 'myfile.docx' })
    })
  }, [])

  return (
    <div>
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  )
}

export default ShowResume
