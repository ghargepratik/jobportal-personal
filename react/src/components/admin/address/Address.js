import React, { useState, useEffect } from 'react'
import TextEditor from '../../utility/TextEditor'
import AddressList from './AddressList'
import { useHttpClient } from '../../utility/useHttpHooks.js'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Address = () => {
  const [addresstext, setAddresstext] = useState('')
  const [addresses, setAddresses] = useState([])
  const [getAddressIdForEdit, setGetAddressIdForEdit] = useState('')
  const [showEditBtn, setShowEditBtn] = useState(false)
  const { isLoading, error, sendRequest, clearError } = useHttpClient()

  //GET ALL COMMENTS
  const getAllomment = async () => {
    const token = localStorage.getItem('token')

    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/get-all`,
      'GET',
      {},
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )
    // console.log("🚀 ~ file: Address.js ~ line 30 ~ getAllomment ~ res", res.data.addresses)
    setAddresses(res.data.addresses.reverse())

    // if(res.data){
    //   toast.success(res.data.message)
    // }
  }

  useEffect(() => {
    getAllomment()
  }, [])

  /*****************************************POST ADDRESS************************************************************* */
  //ADD COMMENT
  const addComment = async (e) => {
    e.preventDefault()
    const token = localStorage.getItem('token')

    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/create`,
      'POST',
      { addresstext: addresstext },
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )
    // console.log("🚀 ~ file: Address.js ~ line 44 ~ addComment ~ res", res.data.address)
    setAddresses([res.data.address, ...addresses])

    if (res.data) {
      toast.success(res.data.message)
    }
  }

  /****************************************************************************************************** */

  /*****************************************GET SINGLE ADDRESS************************************************************* */
  //GET SINGLE ADDRESS
  const getSingleComment = async (addressid) => {
    const token = localStorage.getItem('token')

    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/get/${addressid}`,
      'GET',
      {},
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )
    // console.log("🚀 ~ file: Address.js ~ line 98 ~ getSingleComment ~ res", res.data.address)

    setAddresstext(res.data?.address?.addresstext)
    setGetAddressIdForEdit(res.data?.address?._id)
    setShowEditBtn(true)
    // setAddresses([res.data.address,...addresses])
  }

  /*********************************************************************************************************** */

  /*******************************************EDIT SINGLE ADDRESS**************************************************************** */
  //EDIT SINGLE ADDRESS
  const EditSingleAddress = async (addressid) => {
    const token = localStorage.getItem('token')

    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/edit/${addressid}`,
      'PUT',
      { addresstext: addresstext },
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )
    console.log('🚀 ~ file: Address.js ~ line 102 ~ EditSingleAddress ~ res', res.data)

    if (res.data) {
      getAllomment()
      setAddresstext('')
      setGetAddressIdForEdit('')
      setShowEditBtn(false)
    }

    if (res.data) {
      toast.success(res.data.message)
    }
  }

  /************************************************DELETE SINGLE ADDRESS*********************************************************** */
  //DELETE SINGLE ADDRESS
  const deleteSingleAddress = async (addressid) => {
    let filterarr = addresses?.filter((address) => {
      return address?._id !== addressid
    })
    setAddresses(filterarr)
    const token = localStorage.getItem('token')
    const res = await sendRequest(
      `${process.env.REACT_APP_DOMAIN_URL}/api/address/delete/${addressid}`,
      'DELETE',
      {},
      {
        Accept: 'application',
        'Content-Type': 'application/json',
        token: `Bearer${token}`,
      }
    )

    if (res.data) {
      toast.success(res.data.message)
    }
  }

  /*********************************************************************************************************** */
  return (
    <div className="container">
      <div className="row">
        <div className="col-md-10">
          <div className="addres-create pt-4">
            <TextEditor initialValue={addresstext} name="addresstext" fn={setAddresstext} />
            {showEditBtn ? (
              <button onClick={() => EditSingleAddress(getAddressIdForEdit)}>Edit</button>
            ) : (
              <button onClick={addComment} className="mt-4">
                Comment
              </button>
            )}
          </div>
          <div className="addres-posts pt-3">SHOW ALL ADDRESS POST</div>
          <div className="comment_wrapper">
            {addresses?.map((data, i) => (
              <AddressList data={data} key={data._id} getSingleComment={getSingleComment} deleteSingleAddress={deleteSingleAddress} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Address
