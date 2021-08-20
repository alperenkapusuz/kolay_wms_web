import React, { useRef, useState } from "react";
import { Button, Form, FormGroup, Input, Alert } from "reactstrap";
import { useAuth } from "../contexts/AuthContext";
import { GoogleLoginButton } from "react-social-login-buttons";
import { auth, provider } from "../../firebase/Firebase";
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
    <section className="login">
      {error && <Alert variant="danger">{error}</Alert>}
      <Form className="login-form" onSubmit={handleSubmit}>
        <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
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
            required
            placeholder="Şifreyi girin"
            ref={passwordRef}
          />
        </FormGroup>
        <Button disabled={loading} className="button" type="submit">
          Log In
        </Button>
        <div className="w-100 text-center mt-3">
          <Link to="/forgot-password">Forgot Password?</Link>
        </div>
        <hr/>
        <div className="text-center pt-3">OR</div>
        <GoogleLoginButton onClick={signIn} className="mt-3 mb-3" />{" "}
        <div className="w-100 text-center mt-2">
          Need an account? <Link to="/register">Sign Up</Link>
        </div>
      </Form>
    </section>
  );
};

export default Login;
