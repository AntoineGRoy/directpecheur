import React, { useContext, useEffect, useState } from "react";
import { getUserInfos, listenForProductDetails } from "../helpersFunctions/get.js";
import { UserContext } from "../usercontext";
import ProductsList from "../components/ProductsList";
import PanierList from "../components/PanierList";
import ActionNav from "../components/ActionNav";
import bluehook from "../img/bluehook.svg";
import "../css/etal.css";
import { auth, db } from "../firebase";
import firebase from "firebase";
import Admin from "../components/Admin"
//Main User Page - Setting Up userContext
const Etal = () => {
  const { userInfos, setUserInfos } = useContext(UserContext);
  const [products,setProducts] = useState([]);
  const [order, setOrder]=useState([]);
  const [orderUID, setOrderUID]=useState('initial');
  const [totalPrice, setTotalPrice]= useState(0);
  console.log(products)
  useEffect(() => {
    getUserInfos(setUserInfos);
  }, []);
  useEffect(()=>{
    if(orderUID==='initial'&&userInfos.username){
      console.log(orderUID)
      console.log(userInfos)
      let newOrderUID=userInfos.username.toString()+Math.floor(Math.random()*10000)
      setOrderUID(newOrderUID.toString());
    }
  },[userInfos])
  useEffect(() => {
    const unsubscribe = db.collection('products')
      .onSnapshot(snapshot => {
        if (snapshot.size) {
          let newProducts=[...products];
           snapshot.forEach((p)=>{
             newProducts.push(p.data());
            console.log(products)
           });
           setProducts(newProducts)
        } else{
          console.log("EMPTY")
          console.log(products)
        }
      })
  return () => {
      unsubscribe()
    }
  }, [firebase])

  useEffect(() => {
    const unsubscribe = orderUID!=='initial'?db.collection('orders').doc(orderUID).collection('products')
      .onSnapshot(snapshot => {
        let newOrder=[...order];
        if (snapshot.size) {
           snapshot.forEach((p)=>{
             newOrder.push(p.data())
           });
           setOrder(newOrder)
            console.log(order)
        } else{
          console.log("EMPTY")
          console.log(orderUID)
        }
      }):()=>{console.log("NUUULLLLLLL!!!!")};
  return () => {
      unsubscribe()
    }
  }, [orderUID,firebase])

  return (
    <div className="etal-container">
      <div className="etal-header">
        <img src={bluehook} style={{ height: "2rem", marginRight: "1rem" }} />
        <h2>{userInfos.username}</h2>
      </div>
      {userInfos.admin===true&&<Admin/>}
      <div style={{display:"flex", justifyContent:"flex-end"}}><ActionNav userInfos={userInfos}/></div>
      <h2 className="etal-intro">Produits du Jour</h2>
      {userInfos && products.length>0 &&<ProductsList setTotalPrice={setTotalPrice} userInfos={userInfos} products={products} order={order} setOrder={setOrder} orderUID={orderUID} setOrderUID={setOrderUID}/>|| <p style={{margin:36}}>Pas de Produits pour l'instant</p>}
      <h2 className="etal-intro">Votre Panier</h2>
      {orderUID!==null&&console.log(orderUID.toString())}
      {orderUID.toString()!==null&&<PanierList userInfos={userInfos} setTotalPrice={setTotalPrice} totalPrice={totalPrice} orderUID={orderUID} order={order} setOrder={setOrder} />}
    </div>
  );
};

export default Etal;
