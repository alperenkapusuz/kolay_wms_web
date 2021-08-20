import React, { useRef, useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Input,
  Alert,
  Card,
  CardBody,
} from "reactstrap";
import { GoogleLoginButton } from "react-social-login-buttons";
import { useAuth } from "../contexts/AuthContext";
import { auth, provider } from "../../firebase/Firebase";
import { Link, useHistory } from "react-router-dom";
import "../css/Auth.css";

const Register = () => {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { signup } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    try {
      setError("")
      setLoading(true)
      await signup(emailRef.current.value, passwordRef.current.value)
      history.push("/")
    } catch {
      setError("Failed to create an account")
    }

    setLoading(false)
  }

  const signIn = () => {
    auth.signInWithPopup(provider).catch((err) => {
      alert(err.message);
    });
  };

  return (
    <Card className="login">
      <CardBody>
        <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
        
        <Form onSubmit={handleSubmit} className="login-form">
        {error && <Alert variant="danger">{error}</Alert>}
          <FormGroup id="email">
            <Input
              type="email"
              ref={emailRef}
              required
              autoFocus
              placeholder="E-posta girin"
              className="input"
            />
          </FormGroup>
          <FormGroup id="password">
            <Input
              ref={passwordRef}
              type="password"
              autoFocus
              required
              placeholder="Şifreyi girin"
              className="input"
            />
          </FormGroup>
          <FormGroup id="passwordConfirm">
            <Input
              ref={passwordConfirmRef}
              type="password"
              className="input"
              autoFocus
              required
              placeholder="Şifreyi doğrulayın"
            />
          </FormGroup>
          <Button disabled={loading} className="button" type="submit">
            Sign Up
          </Button>
          <hr />
          <div className="text-center pt-3">OR</div>
          <GoogleLoginButton onClick={signIn} className="mt-3 mb-3" />
          <div className="w-100 text-center mt-2">
            Already have an account? <Link to="/login">Log In</Link>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Register;
