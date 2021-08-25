import React, { useState } from "react";
import { Button, Form, FormGroup, Label, Input, Alert } from "reactstrap";
import { db, auth } from "../../authentication/firebase/Firebase";
import Navi from "../navi/Navi";
import alertify from "alertifyjs";

const AddProduct = () => {
  const [id, setId] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quentity, setQuentity] = useState("");
  const [error, setError] = useState("");

  const addToFirestore = (e) => {
    e.preventDefault();
      auth.onAuthStateChanged(user=>{
         db.collection(user.uid).doc(id).set({
          brand:brand,
          name:name,
          price:price,
          quentity:quentity
      })
      })
      alertify.success(name + " sepete eklendi")
      setId("");
      setBrand("");
      setName("");
      setPrice("");
      setQuentity("");
  };

  return (
    <div>
      <Navi />
      <Form>
        {error && <Alert variant="danger">{error}</Alert>}
        <FormGroup>
          <Label>ID</Label>
          <Input
            type="text"
            name="ID"
            id="exampleId"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Brand</Label>
          <Input
            type="text"
            name="Brand"
            id="exampleBrand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Name</Label>
          <Input
            type="text"
            name="Name"
            id="exampleName"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Price</Label>
          <Input
            type="text"
            name="Price"
            id="examplePrice"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label>Quentity</Label>
          <Input
            type="text"
            name="Quentity"
            id="exampleQuentity"
            value={quentity}
            onChange={(e) => setQuentity(e.target.value)}
          />
        </FormGroup>
        <Button onClick={addToFirestore}>ADD</Button>
        {error && <Alert variant="danger">{error}</Alert>}
      </Form>
    </div>
  );
};

export default AddProduct;
