import React from 'react'
import Nav from '../partials/Nav'
import Sidebar from '../partials/Sidebar'
import { Outlet } from 'react-router-dom'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const AdminApp = () => {
  console.log('Admin App')
  return (
    <>
      <div className="wrapper">
        <Container fluid={true}>
          <Row>
            <Col xs={2} className="p-0">
              <Sidebar />
            </Col>
            <Col xs={10} className="p-0">
              <Nav />

              <Outlet></Outlet>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}

export default AdminApp
