import React from 'react'
import { FiEdit } from 'react-icons/fi'
import { MdDelete } from 'react-icons/md'


const AddressList = ({data,getSingleComment,deleteSingleAddress}) => {
  
  return (
    <div className='editcard'>
        <div className='comment-card'>
            <p dangerouslySetInnerHTML={{ __html: data.addresstext }}></p>
        </div>
        <div className='button-card'>
            <ul className='actiob_btn'>
                <FiEdit onClick={()=>getSingleComment(data?._id)} />
                <MdDelete onClick={()=>deleteSingleAddress(data?._id)} />
            </ul>
        </div>
    </div>
  )
}

export default AddressList