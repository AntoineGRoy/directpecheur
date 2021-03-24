import React, { useContext, useEffect, useState } from "react";
import { getUserInfos, listenForProductDetails } from "../helpersFunctions/get.js";
import { UserContext } from "../usercontext";
import AdminProductsList from "./AdminProductsList";
import AdminOrdersList from "./AdminOrdersList";
import "../css/etal.css";
import { auth, db } from "../firebase";
import firebase from "firebase"
//Main User Page - Setting Up userContext
const Admin = () => {
  const { userInfos, setUserInfos } = useContext(UserContext);
  const [products,setProducts] = useState([]);
  const [orders, setOrders]= useState([]);
  console.log(products)
  console.log(orders)
  useEffect(() => {
    getUserInfos(setUserInfos);
  }, []);
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
    const unsubscribe = db.collection('orders').where("status","==","confirmed")
      .onSnapshot(snapshot => {
        let newOrder=[...orders];
        if (snapshot.size) {
           snapshot.forEach((p)=>{
             newOrder.push(p.data())
           });
           setOrders(newOrder)
            console.log(orders)
        } else{
          console.log("EMPTY")
          
        }
      });
  return () => {
      unsubscribe()
    }
  }, [firebase])

  return (
    <div style={{background:"bisque",border:"2px solid black"}}>
      {userInfos.admin===true&&<div><h2 className="etal-intro">Gérer Les Produits du Jour</h2>
      {userInfos &&<AdminProductsList  userInfos={userInfos} products={products}/>}
      <h2 className="etal-intro">Vos Commandes en cours</h2>
      {userInfos && orders.length>0 &&<AdminOrdersList userInfos={userInfos} orders={orders} />}</div>}
      
    </div>
  );
};

export default Admin;
