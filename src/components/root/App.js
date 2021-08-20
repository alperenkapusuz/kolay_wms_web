import React from "react";
import { Container } from "reactstrap";
import { AuthProvider } from "../authentication/contexts/AuthContext"; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Register from "../authentication/register/Register";
import Login from "../authentication/login/Login";
import ForgotPassword from "../authentication/forgotPassword/ForgotPassword"

function App() {
  return (
    <Container>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
