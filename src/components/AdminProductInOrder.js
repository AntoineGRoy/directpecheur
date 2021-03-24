import React, { useEffect, useState, useContext, useCallback } from "react";
import { UserContext } from "../usercontext";
import { AnimatePresence, motion } from "framer-motion";

import "../css/orderContainer.css"

const AdminProductInOrder = ({ product }) => {
  //checking for new messages

  const [fs, setFs] = useState(null);
  //const [orderPanelIsShown, setOrderPanelIsShown]=useState(false);
  function handleClick() {
    console.log(product)
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
  useEffect(setFontSizes, [product.name]);
  
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
    <div
    >
      <div
        onClick={handleClick}
      >
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
          {product.quantity/1000}Kg
        </h2>
        <h2
          style={{ fontSize: fs }}
          className="name"
        >
          coût:{product.price}&euro;
        </h2>
        
      </div>
    </div>
  );
};

export default AdminProductInOrder