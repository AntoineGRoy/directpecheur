import React, { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import "../css/orderContainer.css"
import OrderContainer from "./OrderContainer"

export const Product = ({ detailsAreShown, setDetailsAreShown, setTotalPrice, userInfos, order, setOrder, orderUID, setOrderUID, product }) => {
  //checking for new messages
console.log(order)
  const [fs, setFs] = useState(null);
  //const [orderPanelIsShown, setOrderPanelIsShown]=useState(false);
  const [containerIsShown, setContainerIsShown]=useState(false);
  function handleClick() {
    setDetailsAreShown(!detailsAreShown);
    setContainerIsShown(!containerIsShown);
    console.log(orderUID)
    console.log(order)

    console.log(userInfos)
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
        className="order-container"
      >
       <div className="img-container">
          <img
            alt={`avatar-${product.name}`}
            style={{ cursor: "pointer" }}
            src={product.img_url}
            className={detailsAreShown?'avatar avatar-reduced':'avatar'}
          />
        </div>
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
          {product.prix_au_kilo}&euro;/Kg
        </h2>
        <h2
          style={{ fontSize: fs }}
          className="name"
        >
          {product.quantity/1000}Kg disponibles!
        </h2>
      </div>
      {containerIsShown && (
        <AnimatePresence>
          <motion.div
            key={product.id}
            initial={{
              height: 0,
              width: 0,
              position: "absolute",
              top: 0,
              left: 0,
              transform: "translate(0,0)"
            }}
            animate={{
              height: "auto",
              width: "auto",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)"
            }}
            exit={{
              height: 0,
              width: 0,
              position: "absolute",
              top: 0,
              right: 0,
              transform: "translate(0,0)"
            }}
            style={{zIndex:99}}
          >
            <OrderContainer
              product={product}
              order={setOrder} setOrder={setOrder} orderUID={orderUID} setOrderUID={setOrderUID}
              userInfos={userInfos}
              detailsAreShown={detailsAreShown}
              setDetailsAreShown={setDetailsAreShown}
              setContainerIsShown={setContainerIsShown}
              containerIsShown={containerIsShown}
              setTotalPrice={setTotalPrice}
            />
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
