import { useEffect, useState } from "react";
import { db } from "../../authentication/firebase/Firebase";
import { Table } from "reactstrap";

function ProductList() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    db.collection("items").onSnapshot((snapshot) => {
      setItems(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  console.log(items);

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
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ProductList;
