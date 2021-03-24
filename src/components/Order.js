import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../usercontext";
import "../css/orderContainer.css";
import { RemoveProductFromOrder } from "../helpersFunctions/set";
import done from "../img/done.svg";

export const Order = ({ index, product, orderUID, setTotalPrice, setOrder }) => {
  //checking for new messages
  const { userInfos, setUserInfos } = useContext(UserContext);
  const [fs, setFs] = useState(null);
  const [reqAccepted, setReqAccepted] = useState(false);
  //accepting friend requesg
  /*function handleRemove(){
    removeProductFromOrder(orderUID,productUID)
  }*/

  useEffect(() => {
    if (product.name) {
      if (product.name.length > 12) {
        setFs(300 / product.name.length);
        setTotalPrice(p=>p+product.price);
      } else {
        setFs(22);
      }
    }
    //getFireStoreMessagesCount();
  }, [product]);

  useEffect(() => {
    console.log(product);
  }, [reqAccepted]);

  return (
    <div>
      <div>
        <h2 style={{ fontSize: fs }} className="name">
        {product.quantity}g de {product.name}: <b>{product.price}&euro;</b>
        </h2><span style={{cursor:"pointer", pointerEvents:"auto", fontWeight:"bold"}} onClick={()=>{
          RemoveProductFromOrder(product.id,product.orderUID)
          setTotalPrice(p=>(p-product.price));
          setOrder(p=>p.splice(index,0))

        console.log("click")
      }}>X retirer</span>
      </div>
    </div>
  );
};
