import React, { useContext } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Dashboards from '../components/admin/dashboards/Dashboards'
import AdminApp from '../components/admin/layouts/AdminApp'
import Login from '../components/auth/Login'
import Register from '../components/auth/Register'
import { GlobalContext } from '../App'
import CreateJobPost from '../components/admin/Jobs/CreateJobPost'
import JobPostList from '../components/admin/Jobs/JobPostList'
import UserAppliedApplication from '../components/admin/Jobs/UserAppliedApplication'
import EmailTemplate from '../components/admin/email-templates/EmailTemplate'
import InterviewSchedule from '../components/admin/report-lists/InterviewSchedule'
import HiredCandidates from '../components/admin/report-lists/HiredCandidates'
import JoinedCandidates from '../components/admin/report-lists/JoinedCandidates'
import Activity from '../components/admin/activity/Activity'
import JobList from '../components/user/jobs/Job-list'
import JobIndex from '../components/user/jobs/Jon-index'
import ApplyNowJob from '../components/common/ApplyNowJob'
import UserHome from '../components/user/layouts/UserHome'
import EditJobPost from '../components/admin/Jobs/EditJobPost.js'
import SingleUserApplication from '../components/admin/Jobs/SingleUserApplication.js'
import PageNotFound from '../components/user/layouts/PageNotFound'
import Address from '../components/admin/address/Address'
import GeneratedDocuments from '../components/admin/generatedDocument/GeneratedDocuments'
import ResetPassword from '../components/auth/ResetPassword'
import RecordsOfSendMail from '../components/admin/recordSendMails/RecordsOfSendMail'
import ContactUs from '../components/user/contactUs/ContactUs'

const AdminRouter = () => {
  console.log('routing file')
  const {
    state: { loginRole },
  } = useContext(GlobalContext)
  const currentURL = window.location.href
  console.log('currentURL', currentURL)

  return (
    <div>
      <Router basename="/career">
        <Routes>
          {/* Admin Routes */}
          <Route path="/resetpassword/:resettoken" element={<ResetPassword />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {loginRole === 'admin' && (
            <Route path="/admin" element={<AdminApp />}>
              <Route path="dashboard" element={<Dashboards />} />
              <Route path="create-job-post" element={<CreateJobPost />} />
              <Route path="edit-job-post" element={<EditJobPost />} />
              <Route path="job-post-list" element={<JobPostList />} />
              <Route path="email-templates" element={<EmailTemplate />} />
              <Route path="interview-scheduled-list" element={<InterviewSchedule />} />
              <Route path="hired-candidates-list" element={<HiredCandidates />} />
              <Route path="joined-candidates-list" element={<JoinedCandidates />} />

              <Route path="user-applied-applications" element={<UserAppliedApplication />} />
              <Route path="single-user-applied-applications" element={<SingleUserApplication />} />
              <Route path="activity" element={<Activity />} />
              <Route path="address" element={<Address />} />
              <Route path="generate-document" element={<GeneratedDocuments />} />
              <Route path="send-emails" element={<RecordsOfSendMail />} />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          )}
          {/* <Route path="/apply-now-job" element={<ApplyNowJob />} /> */}

          <Route path="/v2/career/" element={<UserHome />} />
          <Route path="/" element={<UserHome />}>
            <Route index element={<JobList />} />
            <Route path="/job-list" element={<JobList />} />
            <Route path="/job-index/:id" element={<JobIndex />}></Route>
            <Route path="/contactus" element={<ContactUs />}></Route>
            <Route path="applynow" element={<ApplyNowJob />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default AdminRouter
