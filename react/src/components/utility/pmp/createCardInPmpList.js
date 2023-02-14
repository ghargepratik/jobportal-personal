import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css'
import { toast } from 'react-toastify'
import { convertDateFormate } from '../../common/convertDateFormate'

//HardCoded List Of PMPListID (GET from PMP->get all api list ==>https://appsworld.website/v2/pmp/api/list/all/90)
let PMPListId = {
  First_Interview_Scheduled: '335', //1st List in pmp {we add 1st_interview in PMPList 335}
  Second_Interview_Scheduled: '372', //2nd List in pmp {we add 2nd_interview in PMPList 372}
  HR_Interview_Scheduled: '373', //3rd List in pmp {we add HR_interview in PMPList 373}
  Hired: '553', //4th List in pmp {we add Hired_Candidate in PMPList 553}
  Offered: '554', //5th List in pmp {we add Offered_Candidate in PMPList 554}
  Joined: '555', //6th List in pmp {we add Joined Candidate in PMPList 555}
  Rejected: '556', //7th List in pmp {we add Rejected Candidate in PMPList 556}
}
let PMPListIdArray = ['335', '372', '373', '553', '554', '555', '556']

//PMP LOGIN (to get token of pmp)
export const loginInPMP = () => {
  try {
    let pmpBody = {
      email: 'santosh.prasad@techinfini.in', //`${process.env.REACT_APP_PMP_LOGIN_EMAIL}`
      password: 'password', //`${process.env.REACT_APP_PMP_LOGIN_PASSWORD}`
    }
    console.log('🚀 ~ file: createCardInPmpList.js:25 ~ loginInPMP ~ body', pmpBody)
    axios
      .post('https://appsworld.website/v2/pmp/api/user/login', pmpBody)
      .then((res) => {
        console.log('🚀 ~ file: createCardInPmpList.js:28 ~ axios.post ~ res', res)
        let token = res.data.accessToken
        localStorage.setItem('pmpToken', token)
        toast.success('PMP Login Success')
      })
      .catch((err) => {
        console.log('🚀 ~ file: createCardInPmpList.js:30 ~ axios.post ~ err', err)
      })
  } catch (err) {
    console.log('🚀 ~ file: createCardInPmpList.js:37 ~ loginInPMP ~ err', err)
  }
}

//Creating Card In PMP After SheduleInterview in JobPortal
export const toCreateCardInPMPList = (status, userDetails, singlejobapplicationid) => {
  console.log('🚀 ~ file: SheduleInterview.js:116 ~ toCreateCardInPMPList ~ status', status, 'userDetails=>', userDetails)

  let pmpListId = PMPListId[status]
  console.log('🚀 ~ file: SheduleInterview.js:146 ~ toCreateCardInPMPList ~ pmpListId', pmpListId)

  let resumeLink = `https://docs.google.com/gview?url=${process.env.REACT_APP_DOMAIN_URL}${userDetails?.userInfo?.url}&embedded=true`

  let description = `<b>Candidate Email -</b>${userDetails?.userInfo?.email} <br> <b>Applied Job -</b>${
    userDetails?.userInfo?.jobposttitle
  } <br> <b>Candidate Experience -</b>${userDetails?.userInfo?.experience} <br><b>Interview Date -</b>${convertDateFormate(
    userDetails?.interviewShedule?.date
  )} and ${userDetails?.interviewShedule?.time} <br> <b>Candidate Resume -</b> <a href=${resumeLink}><br> `

  let body = {
    title: userDetails?.userInfo?.name,
    description: description,
    priority: 'high',
    assignedTo: 25,
    dueDate: userDetails?.interviewShedule?.date,
  }

  const token = localStorage.getItem('pmpToken')
  let config = {
    headers: {
      headers: { 'Content-Type': 'multipart/form-data' },
      Authorization: `Bearer ${token}`,
    },
  }

  if (pmpListId) {
    axios
      .post(`https://appsworld.website/v2/pmp/api/card/new/${pmpListId}`, body, config)
      .then((response) => {
        console.log('res data Of pmp card', response.data)

        saveCardIdInSingleJobApplication(singlejobapplicationid, response.data?._id)
        if (response?.data?.message) {
          toast.success(response?.data?.message || 'Card Created In PMP')
        }
      })
      .catch((err) => {
        console.log('catch err', err)
        toast.error('Something Went Wrong While creating card In PMP')
      })
  } else {
    toast.error('pmpListId Not found to create card')
  }
}

//Saving CardId in SingleUserApplication(appliedJob) after the Card Creation
export const saveCardIdInSingleJobApplication = (singlejobapplicationid, cardId) => {
  console.log(
    '🚀 ~ file: createCardInPmpList.js:70 ~ saveCardIdInSIngleJobApplication ~ singlejobapplicationid',
    singlejobapplicationid,
    'cardId',
    cardId
  )
  try {
    let body = {
      pmpCardId: cardId,
    }
    const token = localStorage.getItem('token')
    let config = {
      headers: {
        headers: { 'Content-Type': 'multipart/form-data' },
        token: `Bearer${token}`,
      },
    }

    axios
      .patch(`${process.env.REACT_APP_DOMAIN_URL}/api/save-pmp-cardId/${singlejobapplicationid}`, body, config)
      .then((response) => {
        toast.success('CardId saved In JobApplication')
        console.log('cardId Saved', response.data)
      })
      .catch((err) => {
        console.log('while saveing cardid err->', err)
        toast.error('CardID Not Saved')
      })
  } catch (err) {
    console.log('axios err', err)
  }
}

//This is for Change PMPListId of Card in PMP
export const ChangeListIdInPMPAccordingToStatus = (data) => {
  console.log('🚀 ~ file: createCardInPmpList.js:107 ~ ChangeListIdInPMPAccordingToStatus ~ data', data)

  let pmpListId = PMPListId[data.userInfo?.status]
  console.log('🚀 ~ file: createCardInPmpList.js:109 ~ ChangeListIdInPMPAccordingToStatus ~ pmpListId', pmpListId)

  let body = {
    index: 'fourth0', //by Default according to PMP
  }
  console.log('🚀 ~ file: createCardInPmpList.js:113 ~ ChangeListIdInPMPAccordingToStatus ~ body', body)

  const token = localStorage.getItem('pmpToken')
  let config = {
    headers: {
      headers: { 'Content-Type': 'multipart/form-data' },
      Authorization: `Bearer ${token}`,
    },
  }

  if (pmpListId) {
    axios
      .patch(`https://appsworld.website/v2/pmp/api/list/${pmpListId}/add/${data.userInfo?.pmpCardId}`, body, config)

      .then((response) => {
        console.log('res data Of Change LPMPListId of Card', response.data)

        let prevPmpListId = getPreviousPMPListId(pmpListId)
        console.log('🚀 ~ file: createCardInPmpList.js:132 ~ .then ~ prevPmpListId', prevPmpListId)

        if (prevPmpListId) {
          axios
            .patch(`https://appsworld.website/v2/pmp/api/list/${prevPmpListId}/remove/${data.userInfo?.pmpCardId}`, body, config)
            .then((res) => {
              console.log('🚀 ~ file: createCardInPmpList.js:138 ~ .then remove prevCard ~ res', res.data)
            })
            .catch((err) => {
              console.log(' err While removing card from prevPmpListId of PMP', err)
              toast.error('Something Went Wrong While Changing ListId of card In PMP')
            })
        }
        if (response?.data) {
          toast.success(response?.data?.message || 'Card ListId change In PMP')
        }
      })
      .catch((err) => {
        console.log(' err While Changing ListId of card In PMP', err)
        toast.error('Something Went Wrong While Changing ListId of card In PMP')
      })
  } else {
    toast.error('pmpListId Not found to create card')
  }
}

//UTILITY
const getPreviousPMPListId = (pmpListId) => {
  console.log('🚀 ~ file: createCardInPmpList.js:151 ~ getPreviousPMPListId ~ pmpListId', pmpListId)
  let index = PMPListIdArray.indexOf(pmpListId) - 1
  console.log(index)
  return PMPListIdArray[index]
}
