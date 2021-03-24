import React, { useState } from "react";
import AdminOrder from "./AdminOrder";



const AdminOrdersList = ({ orders}) => {
  const[detailsAreShown, setDetailsAreShown]= useState(false);
  return (
    <div key="product-list">
      <div
        style={{
          display: "flex",
          width: "auto",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-evenly",
          alignItems: "center"
        }}
      >
        {orders &&
          orders[0] !== null &&
          orders.map((p,index) => <AdminOrder order={p} key={p +index+ "key"}
          />)}
        {!orders && <p>loading...</p>}
      </div>
    </div>
  );
};
export default AdminOrdersList;
