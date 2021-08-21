import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from "../contexts/AuthContext";
import { auth, provider } from "../firebase/Firebase";
import { Link, useHistory } from "react-router-dom";
import "../css/Auth.css";

const Register = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      console.log(emailRef.current.value, passwordRef.current.value);
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      console.log(emailRef.current.value, passwordRef.current.value);
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <div> 
      <Card>
        <Card.Body className="login">
        <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
          <Form onSubmit={handleSubmit} className="login-form">
          <h2 className="text-center mb-4">Sign Up</h2>
          {error && <Alert variant="danger">{error}</Alert>}
            <Form.Group id="email">
              <Form.Control
                type="email"
                ref={emailRef}
                required
                placeholder="email"
                className="input"
              />
            </Form.Group>
            <Form.Group id="password">
              <Form.Control
                type="password"
                ref={passwordRef}
                required
                placeholder="password"
                className="input"
              />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Control
                type="password"
                ref={passwordConfirmRef}
                require
                placeholder="password confirmation"
                className="input"
              />
            </Form.Group>
            <Button disabled={loading} className="button" type="submit">
              Sign Up
            </Button>
            <hr />
            <div className="text-center pt-1">OR</div>
            <GoogleLoginButton onClick={signIn} className="mt-3 mb-3" />
            <div className="w-100 text-center mt-2"></div>
            <div className="w-100 text-center mt-2">
              Already have an account? <Link to="/login">Log In</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Register;
