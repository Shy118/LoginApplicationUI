import React, { useState, useEffect, useRef } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

import { Container, Row, Col } from 'react-bootstrap';

import axios from 'axios';

import Portal from './Portal';

const LOGIN_URL = 'http://localhost:8080/v1/login';

function Login() {
  const navigate = useNavigate();
  const userRef = useRef();
  const errRef = useRef();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [employeeData, setEmployeeData] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const navigatePortal = () => {
    // navigate to /portal
    navigate('/portal');
  };

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    setErrorMessage('');
  }, [userName, password])

  const handleSubmit = async (e) => {
      e.preventDefault();

      try {
        await axios.post(LOGIN_URL,
          JSON.stringify({ userName, password }),
          {
            headers: { 'Content-Type': 'application/json' },
          }
        ).then((response) => {
          console.log(JSON.stringify(response?.data));
          console.log(JSON.stringify(response?.status));
          console.log(JSON.stringify(response));
          setUserName('');
          setPassword('');
          setEmployeeData(response.data);
          setSuccess(true);
          navigatePortal()
        });
      } catch (err) {
        console.log(err);
        if (err.response?.status === 400) {
          setErrorMessage('Missing username or password');
        } else if (err.response?.status === 401) {
          setErrorMessage('Invalid userid or password');
        } else {
          setErrorMessage('Login Failed');
        }
        errRef.current.focus();
      }
  }

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col style={{ height: '250px' }}></Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col>
          {success ? (
          <Routes>
            <Route path="/portal" element={<Portal employeeData={employeeData}/>} />
          </Routes>
          ) : (
          <section>
            <p ref={errRef} className={errorMessage ? "error-message" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Sign In</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                id="username"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
                required
              />
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                required
              />
              <Button className='button' variant="light" type='submit'>Login</Button>
            </Form>
          </section>
          )}
        </Col>
        <Col></Col>
      </Row>
      <Row>
        <Col></Col>
        <Col style={{ height: '250px' }}></Col>
        <Col></Col>
      </Row>
    </Container>
  )
}

export default Login;