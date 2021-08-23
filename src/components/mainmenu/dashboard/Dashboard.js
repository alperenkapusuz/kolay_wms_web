import React, { Component } from "react";
import { Row, Col } from "reactstrap";
import ProductList from "../products/ProductList";

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col>
            <ProductList />
          </Col>
        </Row>
      </div>
    );
  }
}
