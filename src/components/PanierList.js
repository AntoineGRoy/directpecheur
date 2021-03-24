import React, { useContext, useEffect, useState } from "react";
import { confirmOrder } from "../helpersFunctions/set";
import { UserContext } from "../usercontext";
import { Order } from "./Order";

const PanierList = ({userInfos,orderUID, order, setOrder, totalPrice, setTotalPrice}) => {
  const[orderConfirmed, setOrderConfirmed]= useState(false);
  const[deliveryTime, setDeliveryTime]= useState("dès que possible");
  const [deliveryAddress,setDeliveryAddress]=useState("");
  const [showAddressInput,setShowAddressInput]=useState(false);
  const [showTimeInput,setShowTimeInput]=useState(false);
  console.log(order);
  function handleAddressChange(event) {
    setDeliveryAddress(
    event.target.value
    );
  };
  function handleTimeChange(event) {
    setDeliveryTime(
    event.target.value
    );
  }
  useEffect(()=>{
    console.log("NEWORDER")
  },[order])
  return (
    <div>
      {orderConfirmed&&<div style={{fontSize:24,postion:"absolute",width:"90vw", height:"90vh", textAlign:"center"}}>Merci! <br />
      Nous avons bien reçu votre commande!</div>}
    <div
      style={{
        display: "flex",
        width: "auto",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
      }}
    >{userInfos.username&&order.length===0&&<h2>Faîtes votre choix...</h2>}
      {userInfos&&orderUID&&order[0]&&
        order.map((p,index) => (
          <Order index={index} setTotalPrice={setTotalPrice} product={p} setOrder={setOrder} orderUID={orderUID} key={p+index+ "key"} />
        ))}
        </div>
        <div style={{margin:"32px auto", width:"90vw"}}><h2>Total du Jour: {totalPrice}&euro;</h2> </div>
        {totalPrice>0?<div style={{width:"90vw", margin:"0 auto", textAlign:"center"}}>
          <div style={{margin:16}}>Livrer à {deliveryAddress || userInfos.address} - <span style={{border:"1px black solid", cursor:"pointer"}} onClick={()=>{setShowAddressInput(true)}}>Changer</span></div>
          {showAddressInput&&<div><input type="text" name="address" onChange={handleAddressChange} value={deliveryAddress}/><button onClick={()=>{
            setShowAddressInput(false);console.log(deliveryAddress)
          }}>Confirmer</button></div>
          }
          <div style={{margin:16}}>Heure de livraison {deliveryTime} - <span style={{border:"1px black solid", cursor:"pointer"}} onClick={()=>{setShowTimeInput(true)}}>Changer</span></div>
          {showTimeInput&&<div><input type="text" name="address" onChange={handleTimeChange} value={deliveryTime}/><button onClick={()=>{
            setShowTimeInput(false);console.log(deliveryTime)
          }}>Confirmer</button></div>
          }
          <button style={{ cursor:"pointer", padding:"1rem", color:"white", fontSize:16, fontWeight:"bold", borderRadius:8,border:0, background:"rgba(59, 89, 147, 1)"}} 
          onClick={()=>{
            let tempDeliveryAddress=deliveryAddress!==""?deliveryAddress:userInfos.address;
            confirmOrder(setOrderConfirmed, orderUID, userInfos.username, tempDeliveryAddress, userInfos.phone, deliveryTime, totalPrice)}}>Passer ma Commande</button></div>:null}
        </div>
  );
};
export default PanierList;
