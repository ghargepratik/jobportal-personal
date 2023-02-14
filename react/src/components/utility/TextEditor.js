import React, { useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
const TextEditor = (props) => {
  const initialValue = props.initialValue
  return (
    <>
      <Editor
        apiKey={process.env.REACT_APP_TYNI_EDITOR_KEY}
        value={props.initialValue}
        onEditorChange={(newText) => {
          props.fn(newText)
        }}
        textareaName={props.name}
        init={{
          height: 300,
          menubar: 'tools',
          plugins: [
            'advlist',
            'autolink',
            'lists',
            'link',
            'image',
            'charmap',
            'preview',
            'anchor',
            'searchreplace',
            'visualblocks',
            'code',
            'fullscreen',
            'insertdatetime',
            'media',
            'table',
            'code',
            'help',
            'wordcount',
          ],
          toolbar:
            'undo redo | blocks | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help | code',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
        }}
      />
    </>
  )
}

export default TextEditor
