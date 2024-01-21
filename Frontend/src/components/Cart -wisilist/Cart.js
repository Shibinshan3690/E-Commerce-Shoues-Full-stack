import React, {  useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import { toast } from 'react-toastify';
import NavigationBar from '../NavigationBar';
import axios from 'axios';
const userId=localStorage.getItem("userId")



const Cart = () => { 
  const [cart,setCart]=useState([])
    //increment  


  const fetchCart=async()=>{
      try{
         const response=await axios.get(`http://localhost:5000/api/user/${userId}/cart`)
          setCart(response.data.data)
      }catch(error){
        console.log("error fetching the product", error);
      toast.error("error");
      }
  }
  useEffect(()=>{
    fetchCart()
  },[])



  
   // Filter out the item to be removed from the cart
     const handleRemove = async (id) => {
    try {
        const productId = id;
        const response = await axios.delete(`http://localhost:5000/api/user/${userId}/cart`, {
            data: { productId: productId }
            
        });
 console.log(response)
         if(response){
              toast.success("product removed")
         }
        // Assuming fetchCart is a function that updates the cart after removal
        fetchCart();
    } catch (error) {
        console.error("Error removing the product", error);
        toast.error("Error removing the product");
    }
};




const handleIncrement = (item) => {
  const updatedCart = cart.map((cartItem) => {
    if (cartItem.id === item.id) {
      return { ...cartItem, quantity: cartItem.quantity + 1 };
    }
    return cartItem;
  });
  setCart(updatedCart);
};


//dicrement
const handleDecrement = (item) => {
  const updatedCart = cart.map((cartItem) => {
    if (cartItem.id === item.id && cartItem.quantity > 1) {
      return { ...cartItem, quantity: cartItem.quantity - 1 };
    }
    return cartItem;
    
  });
  setCart(updatedCart);
};





  // Calculate the total cash
  const totalCash = cart.reduce((total, item) => total + item.newPrice * item.quantity, 0);
  



const buyProduct=async()=>{
  try {
    const response=await axios.post(`http://localhost:5000/api/user/${userId}/payment`)
    console.log(response.data.url);
    window.location.href=response.data.url
  } catch (error) {
    toast.error(error)
    console.log(error);
  }
}
   
  return (
    <>
    <NavigationBar/>
    <div className="container">
      <h1 className="mt-4">Your Cart    <BsFillCartFill className="ml-3"  /></h1>
      <ul className="list-group">
        {cart.map((item, index) => (
          <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
            <div>
              <h5>{item.title}</h5>
              <p>${item.price}</p>
              <div className="input-group">
                <button
                  className="btn btn-secondary"
                  onClick={() => handleDecrement(item)}
                >
                  -
                </button>
                <input type="text" value={item.quantity} className="form-control" readOnly />
                <button
                  className="btn btn-secondary"
                  onClick={() => handleIncrement(item)}
                >
                  +
                </button>

                <button
                  className="btn btn-danger"  style={{marginLeft:"10px"}}
                  onClick={()=>handleRemove(item._id)}
                >
                  Remove
                </button>

                <button
                  className="btn btn-primary"  style={{marginLeft:"10px"}}
                       onClick={buyProduct}
                >
                  By Now
                </button>
              </div>
            </div>
            <div>
              <img src={item.image} alt={item.title} style={{ width: '100px' }} />
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          </li>
        ))}
      </ul>
       <p className="mt-3"  style={{fontSize:"25px", fontWeight:600}}>Total Cash: ${totalCash}</p>
    </div>
   
    </>
  );
};


export default Cart;
