import React, {useEffect, useState} from "react";
import { db } from "../firebase";
import AdminProductInOrder from "./AdminProductInOrder"

const AdminOrder=({order})=>{
    const [showProducts,setShowProducts]=useState(false);
    const [products, setProducts]=useState();

    useEffect(()=>{
        if(order.id){ db.collection("orders").doc(order.id).collection('products').get().then((querySnapshot) => {
            let newProducts=[];
            querySnapshot.forEach((doc) => {
                // doc.data() is never undefined for query doc snapshots
                newProducts.push(doc.data());
                console.log(doc.id, " => ", doc.data());
            });
            setProducts(newProducts);
        },[])
        .catch((error) => {
            console.log("Error getting documents: ", error);
        }); }
       
    },[])
        return(
        <div style={{padding:"2rem", minWidth:"40%", border:"2px black solid"}}>
           <div onClick={()=>{setShowProducts(!showProducts)}} style={{cursor:"pointer"}}><h2>Nom:{order.username}</h2>
            <h2>Adresse:{order.address}</h2>
            <h2>Phone: {order.phone}</h2>
            <h2>Total: {order.price}&euro;</h2>
            <h2>Commandé le: {order.date}</h2>
            <h2>A Livrer:{order.time}</h2>
            </div>
            {showProducts&&products&&<div>
                {products &&
          products[0] !== undefined &&
          products.map((p,index) => <AdminProductInOrder product={p} key={p +index+ "key"}
          />)}
        {!products && <p>loading...</p>}
                </div>}
            <button style={{cursor:"pointer",marginTop:16,border:0,background:"orange", color:"white", fontWeight:"bold", padding:".5rem", borderRadius:8}} onClick={async()=>{await db.collection("orders").doc(order.id).set({status:"delivre"},{merge:true}).then(()=>{setShowProducts(false)})}}>Noté comme Livré</button>
        </div>
    )
}
export default AdminOrder;