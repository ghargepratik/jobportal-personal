import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { MDBDataTable } from 'mdbreact'
import { Link } from 'react-router-dom'
import Loader from '../../utility/Loader.js'
import { GenerateDocRecord } from '../../common/TableColum.js'
import { convertDateFormate } from '../../common/convertDateFormate.js'

const GeneratedDocuments = () => {
  const [showLoader, setshowLoader] = useState(false)
  const [user, setUsers] = useState(GenerateDocRecord);


  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    try {
      const token = localStorage.getItem('token')
      let config = {
        headers: {
          headers: { 'Content-Type': 'application/pdf' },
          token: `Bearer${token}`,
        },
      }

      setshowLoader(true)
      await axios.get(`${process.env.REACT_APP_DOMAIN_URL}/api/documents/get-all`, config).then((res) => {
        console.log("🚀 ~ file: GeneratedDocuments.js ~ line 31 ~ awaitaxios.get ~ res", res.data)
        if (res.data.list.length === 0) {
          setshowLoader(false)
        }

        let array = []
        let newarray = {}
        res.data.list.map((result) => {
          console.log("🚀 ~ file: Activity.js ~ line 58 ~ res.data.list.map ~ result", result)
          setshowLoader(false)
          console.log("actionType",result?.actionType)
          console.log("documentUrl",result?.documentUrl)
          console.log("time",result?.updatedAt)
          console.log("name",result?.application_id?.name)
          console.log("name",result?.application_id?.email)
          
          // console.log('result', result.actionType, 'app_id', result?.application_id?.jobposttitle, 'job_id', result?.job_id?.jobposttitle)
          array.push({
            name: result?.application_id?.name,
            email: result?.application_id?.email,
            activity: result?.actionType,
            time: convertDateFormate(result.updatedAt),
            documentpath: (
              <div class="text-center">
                <a className="btn btn-primary " href={`${process.env.REACT_APP_DOMAIN_URL}${result?.documentUrl}`} target="_blank" >
                  View
                </a>
              </div>
            ),
            
          })
        })
        newarray['rows'] = array.reverse()
        newarray['columns'] = GenerateDocRecord['columns']
        if (newarray.length === 0) {
          setshowLoader(false)
        }
        setUsers(newarray)
      })
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-6">{/* <h1>Interview Scheduled List</h1> */}</div>
          </div>
        </div>
      </section>
      <section class="content">
        <div class="container-fluid">
          <div class="row">
            <div class="col-12">
              <div className={`card ${showLoader && 'loader_show'} `}>
                {showLoader && <Loader />}
                <div class="card-header">
                  <h3 class="card-title">Generated Document List</h3>
                </div>
                <div class="card-body">
                  <div className="row">
                    <div className="form-group col-lg-12 ">
                      <MDBDataTable entries={50} striped bordered small data={user} className="text-center"/>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default GeneratedDocuments