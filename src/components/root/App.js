import React from "react";
import { Container } from "reactstrap";
import { AuthProvider } from "../authentication/contexts/AuthContext"; 
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Register from "../authentication/register/Register";
import Login from "../authentication/login/Login";
import ForgotPassword from "../authentication/forgotPassword/ForgotPassword"
import MainMenu from "../mainmenu/MainMenu";
import AddProduct from "../mainmenu/addProduct/AddProduct";

function App() {
  return (
    <Container>
      <div>
        <Router>
          <AuthProvider>
            <Switch>
              <Route path="/register" component={Register} />
              <Route path="/login" component={Login} />
              <Route path="/forgot-password" component={ForgotPassword} />
              <Route path="/mainmenu" component={MainMenu} />
              <Route path="/addproduct" component={AddProduct}/>
            </Switch>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
