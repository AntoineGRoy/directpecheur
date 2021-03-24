import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../usercontext";
import { AnimatePresence, motion } from "framer-motion";
import { auth, db } from "../firebase";
import "../css/orderContainer.css"

const AdminProduct = ({ product }) => {
  //checking for new messages
  const [showProduct, setShowProduct]=useState(true);
  const [fs, setFs] = useState(null);
  //const [orderPanelIsShown, setOrderPanelIsShown]=useState(false);
  async function handleClick() {
    console.log(product);

  }
//Set the fontsize depending on name length
  const setFontSizes = useCallback(() => {
    if (product.name) {
      if (product.name.length > 12) {
        setFs(300 / product.name.length);
      } else {
        setFs(22);
      }
    }
  }, [product.name])
  useEffect(setFontSizes, [product.name,product.img_url]);
  
  //notify the product when we send him a message
 /* const getLiveQuantity = useCallback(() =>
    listenForProductDetails(
      productUID,
      product,
      setProduct,
    ), [product.username,
    userInfos.username])
  useEffect(
    callFirestoreUnreadMessages,
    [messages]
  );*/

  return (
    <div style={{minWidth:200, border:"1px solid black", padding:16, borderRadius:8}}
    >
      {showProduct&&<div
        onClick={handleClick}
      >
        {product.img&&<img src={product.img_url} height={64}/>}
        <h2
          style={{ fontSize: fs }}
          className="name"
        >
          {product.name}
        </h2>
        <h2
          style={{ fontSize: fs }}
          className="name"
        >
          Quantité:{product.quantity/1000}Kg
        </h2>
        <h2
          style={{ fontSize: fs }}
          className="name"
        >
          {product.prix_au_kilo}&euro;/Kg
        </h2> 
        <div style={{width:"100%",textAlign:"center"}}>
        <button style={{margin:"0 auto",cursor:"pointer",marginTop:16,border:0,background:"orange", color:"white", fontWeight:"bold", padding:".5rem", borderRadius:8}} onClick={async()=>{await db.collection("products").doc(product.id).delete().then(()=>{ setShowProduct(false);console.log("Document successfully deleted!");})}}>Retirer</button>
        </div>
      </div>
      }
    </div>
  );
};

export default AdminProduct