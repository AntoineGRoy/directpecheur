import React, { useRef, useEffect, useState } from "react";
import {AddProductToFirestore} from "../helpersFunctions/set";
import ImageUpload from "./imageUpload";
import bluehook from "../img/bluehook.svg";
import { setFirestoreProductNewQuantity, AddProductToOrder } from "../helpersFunctions/set";
import "../css/orderContainer.css"

const AddPanel=({setShowAddPanel})=>{
  const [message,setMessage]=useState('');
  const [detailsAreShown,setDetailsAreShown]=useState(true);
  const [product, setProduct]=useState({id:null,name:null,img_url:null,part_value:null,prix_au_kilo:null, quantity:null});

  /***Handle Click and Submit***/
  function handleChange(event) {
    setProduct({
      ...product,
      [event.target.name]: event.target.value
    });
  }
  const handleSubmit = e => {
    console.log(product);
    e.preventDefault();
    AddProductToFirestore(setDetailsAreShown, setProduct, product);
  };
  
  const handleCancel = () => {
    setShowAddPanel(false);
  };
  

  return (
    <div
      className={`product-container ${
        detailsAreShown ? "product-container-expanded" : undefined
        }`} style={{maxWidth:300}}
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
      <div className="input-button-container">
        <form onSubmit={handleSubmit} style={{display:"flex",flexDirection:"column" }}>
        <label style={{padding:"16px",fontSize:16, color:"white"}}>Nom</label>
          <input
            name="name"
            label="Nom"
            style={{ fontSize: 18, textAlign:"right" }}
            className="product-input"
            value={product.name}
            onChange={handleChange}
          />
          <label style={{padding:"16px",fontSize:16, color:"white"}}>Prix/Kilo</label>
       
          <input
            name="prix_au_kilo"
            label="Prix au Kilo"
            style={{ fontSize: 18, textAlign:"right" }}
            className="product-input"
            value={product.prix_au_kilo}
            onChange={handleChange}
          />
          <label style={{padding:"16px",fontSize:16, color:"white"}}>Minimum en G</label>
       
          <input
            name="part_value"
            label="Une Part ="
            style={{ fontSize: 18, textAlign:"right" }}
            className="product-input"
            value={product.part_value}
            onChange={handleChange}
          />
          <label style={{padding:"16px",fontSize:16, color:"white"}}>Quantité en G</label>
       
          <input
            name="quantity"
            label="Quantité disponible"
            style={{ fontSize: 18, textAlign:"right" }}
            className="product-input"
            value={product.quantity}
            onChange={handleChange}
          />
          <div>
          {product.id&&<ImageUpload productUID={product.id}/>}
          <div style={{textAlign:"center", display:"flex",justifyContent:"center", alignItems:"center"}}>
            <button style={{color:"black", padding:16, marginBottom:16, marginRight:16}}  type="submit">
            POSTER
          </button>
          <button className="input-button" style={{color:"black", padding:16, marginBottom:16, marginLeft:16}} onClick={handleCancel}>
            Annuler
          </button></div>
          
         
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddPanel;
