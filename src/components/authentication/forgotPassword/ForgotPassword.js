import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLoginButton } from "react-social-login-buttons";
import { Link, useHistory } from "react-router-dom";

const Login = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setMessage("");
      setError("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMessage("Check your inbox for further instructions");
    } catch {
      setError("Failed to reset password");
    }

    setLoading(false);
  }
  return (
    <section className="login">
      <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {message && <Alert variant="success">{message}</Alert>}
      <Form className="login-form" onSubmit={handleSubmit}>
        <FormGroup id="email">
          <Input
            className="input"
            type="text"
            autoFocus
            required
            placeholder="E-posta girin"
            ref={emailRef}
          />
        </FormGroup>
        <Button disabled={loading} className="w-100" type="submit">
          Reset Password
        </Button>
        <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
        </div>
      </Form>
      <div className="w-100 text-center mt-2">
        Need an account? <Link to="/register">Sign Up</Link>
      </div>
    </section>
  );
};

export default Login;
