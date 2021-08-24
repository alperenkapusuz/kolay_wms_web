import { useEffect, useState } from "react";
import { db, auth } from "../../authentication/firebase/Firebase";
import { Table, Button } from "reactstrap";

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      db.collection(user.uid).onSnapshot((snapshot) => {
        setItems(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      });
    });
  }, []);

  const deleteItems = () => {
    db.collection("items").doc(`${items.id}`).delete();
  };

  return (
    <div>
      <Table striped>
        <thead>
          <tr>
            <th>ID</th>
            <th>BRAND</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>QUENTITY</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {items.map(({ id, data: { brand, name, price, quentity } }) => (
            <tr>
              <th scope="row">{id}</th>
              <td>{brand}</td>
              <td>{name}</td>
              <td>{price}</td>
              <td>{quentity}</td>
              <td>
                <Button onClick={deleteItems}>Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
