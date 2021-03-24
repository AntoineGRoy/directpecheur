import React, { useRef, useEffect, useState } from "react";

import bluehook from "../img/bluehook.svg";
import { setFirestoreProductNewQuantity, AddProductToOrder } from "../helpersFunctions/set";
import "../css/orderContainer.css"

const OrderContainer=({
  setTotalPrice,
  product,
  setOrderUID,
  orderUID,
  order,
  setOrder,
  userInfos,
  detailsAreShown,
  setDetailsAreShown,
  containerIsShown,
  setContainerIsShown
})=>{
  const [message,setMessage]=useState('')
  
  console.log(orderUID)
  console.log(userInfos.username)
  const [localQuantity, setlocalQuantity] = useState(0);
  /***Handle Click and Submit***/
  const handleSubmit = e => {
    console.log(localQuantity);
    e.preventDefault();
    if (localQuantity&&localQuantity>product.part_value-1) {
      let price=product.prix_au_kilo/1000*localQuantity;
      AddProductToOrder(setDetailsAreShown, setMessage,price,orderUID, setOrderUID, localQuantity, product.id, product.name,userInfos.username,userInfos.id);
      setFirestoreProductNewQuantity(
        product.id,
        localQuantity,
      );
      setlocalQuantity("");
      setTotalPrice(p=>p+price);
    }else{setMessage("Quantité Insuffisante!")}
  };
  
  const handleCancel = () => {
    setDetailsAreShown(!detailsAreShown);
    setContainerIsShown(!containerIsShown);
    setlocalQuantity(0);
  };
  

  return (
    <div
      className={`product-container ${
        detailsAreShown ? "product-container-expanded" : undefined
        }`}
    >
      <div
        className="name-container"
        style={{
          width: "100%",
          background:"navy",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <h3 style={{ color: "white", margin:"16px 32px" }}>{product.name}</h3>
        <div className="close-x" onClick={handleCancel}>
          X
        </div>
      </div>
      <div style={{color:"white"}}>
        <div className="img-container">
          <img
            alt={`avatar-${product.name}`}
            style={{ cursor: "pointer" }}
            src={product.img_url}
            className='avatar'
          />
        </div>
      <ul>
      <li>
        Prix au kilo: {product.prix_au_kilo}&euro;{"    "}
      </li>
      
      <li style={{paddingBottom:"16px"}}>
        Qantité conseillée par personne : {product.part_value}g
      </li></ul>
      
      </div>
      <div className="input-button-container">
      <label style={{padding:"16px",fontSize:16, color:"white"}}>Quantité désirée en grammes</label><span style={{color:"red",padding:message&&8,background:"white"}}>{message}</span>
      
        <form onSubmit={handleSubmit}>
          
          <input
            label="Quantité désirée en grammes"
            style={{ fontSize: 18, textAlign:"right" }}
            className="product-input"
            value={localQuantity}
            onChange={e => {
              setlocalQuantity(e.target.value);
            }}
          />
          <button className="input-button" type="submit">
            <img style={{ height: "2.5rem", width: "2.5rem" }} src={bluehook} />
          </button>
          <button className="input-button" style={{color:"white"}} onClick={handleCancel}>
            Annuler
          </button>
        </form>
      </div>
    </div>
  );
}

export default OrderContainer;
