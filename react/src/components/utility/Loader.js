import React from 'react'

const Loader = () => {
  console.log('loader')
  return (
    <div className="loader_class">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  )
}

export default Loader
