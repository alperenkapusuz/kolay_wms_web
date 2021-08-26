import { useEffect, useState } from "react";
import { db, auth } from "../../authentication/firebase/Firebase";
import { Table, Button } from "reactstrap";
import "./ProductList.css";

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

  // const removeItem = () =>{
  //   auth.onAuthStateChanged((user)=>{
  //     db.collection(user.uid).doc()
  //   })
  // }

  
  

  return (
    <div className="container">
      <Table className="table">
        <thead className="table-header">
          <tr>
            <th>ID</th>
            <th>BRAND</th>
            <th>NAME</th>
            <th>PRICE</th>
            <th>QUENTITY</th>
          </tr>
        </thead>
        <tbody className="table-body">
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
