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
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import "../css/Auth.css";

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
    <Card className="login">
      <CardBody>
        <h1 className="text-center pt-3 font-weight-bold">KolayWMS</h1>
        <Form className="login-form" onSubmit={handleSubmit}>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
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
          <Button disabled={loading} className="button" type="submit">
            Reset Password
          </Button>
          <div className="w-100 text-center mt-3">
            <Link to="/login">Login</Link>
          </div>
          <div className="w-100 text-center mt-2">
            Need an account? <Link to="/register">Sign Up</Link>
          </div>
        </Form>
      </CardBody>
    </Card>
  );
};

export default Login;
