import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, provider } from "../firebase/Firebase";
import { Link, useHistory } from "react-router-dom";
import "../css/Auth.css";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to log in");
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
            <h2 className="text-center mb-4">Log In</h2>
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
            <Button disabled={loading} className="button" type="submit">
              Log In
            </Button>
            <div className="w-100 text-center mt-3">
              <Link to="/forgot-password">Forgot Password?</Link>
            </div>
            <hr />
            <div className="text-center pt-1">OR</div>
            <GoogleLoginButton onClick={signIn} className="mt-3 mb-3" />
            <div className="w-100 text-center mt-2"></div>
            <div className="w-100 text-center mt-2">
              Need an account? <Link to="/register">Sign Up</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Login;
