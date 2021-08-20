import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from "../contexts/AuthContext";
import { Link, useHistory } from "react-router-dom";

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
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }

  return (
    <section className="login">
      <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
      {error && <Alert variant="danger">{error}</Alert>}
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
        <FormGroup id="password">
          <Input
            className="input"
            type="password"
            autoFocus
            required
            placeholder="Şifreyi girin"
            ref={passwordRef}
          />
        </FormGroup>
        <FormGroup id="passwordConfirm">
          <Input
            className="input"
            type="password"
            autoFocus
            required
            placeholder="Şifreyi doğrulayın"
            ref={passwordRef}
          />
        </FormGroup>
        <Button disabled={loading} className="w-100" type="submit">
          Sign Up
        </Button>
        <div className="text-center pt-3">OR</div>
        <GoogleLoginButton className="mt-3 mb-3" />
      </Form>
      <div className="w-100 text-center mt-2">
        Already have an account? <Link to="/login">Log In</Link>
      </div>
    </section>
  );
};

export default Register;