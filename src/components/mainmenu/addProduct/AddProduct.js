import React, { useState } from "react";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert,
  Card,
  CardBody,
} from "reactstrap";
import { db, auth } from "../../authentication/firebase/Firebase";
import Navi from "../navi/Navi";
import alertify from "alertifyjs";
import "./AddProduct.css";

const AddProduct = () => {
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quentity, setQuentity] = useState("");
  const [error, setError] = useState("");

  const addToFirestore = (e) => {
    e.preventDefault();
    auth.onAuthStateChanged((user) => {
      db.collection(user.uid).doc(id).set({
        brand: brand,
        name: name,
        price: price,
        quentity: quentity,
      });
    });
    alertify.success(name + " sepete eklendi");
    setId("");
    setBrand("");
    setName("");
    setPrice("");
    setQuentity("");
  };

  return (
    <div>
      <Navi />
      <Card className="card">
        <CardBody >
          <Form className="form">
            {error && <Alert variant="danger">{error}</Alert>}
            <FormGroup>
              <Label className="label">ID</Label>
              <Input
                type="text"
                name="ID"
                id="exampleId"
                value={id}
                onChange={(e) => setId(e.target.value)}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <Label className="label">Brand</Label>
              <Input
                type="text"
                name="Brand"
                id="exampleBrand"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <Label className="label">Name</Label>
              <Input
                type="text"
                name="Name"
                id="exampleName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <Label className="label">Price</Label>
              <Input
                type="text"
                name="Price"
                id="examplePrice"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="input"
              />
            </FormGroup>
            <FormGroup>
              <Label className="label">Quentity</Label>
              <Input
                type="text"
                name="Quentity"
                id="exampleQuentity"
                value={quentity}
                onChange={(e) => setQuentity(e.target.value)}
                className="input"
              />
            </FormGroup>
            <Button className="button" onClick={addToFirestore}>
              ADD
            </Button>
            {error && <Alert variant="danger">{error}</Alert>}
          </Form>
        </CardBody>
      </Card>
    </div>
  );
};

export default AddProduct;
