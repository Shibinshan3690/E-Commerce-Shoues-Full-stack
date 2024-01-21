
import NavigationBar from '../NavigationBar'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Card, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';



function Wislist() {
    const [wishlist, setWishlist] = useState([]);
    const userId=localStorage.getItem("userId")
  
    
      const fetchWishlist = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/user/${userId}/wishlists`);
          setWishlist(response.data.data);
        } catch (error) {
          console.error('Error fetching wishlist:', error);
          // Handle error
        }
      };
  
      useEffect(()=>{
        fetchWishlist()
      },[userId])

    const RemoveCartItem=async(id)=>{
        try {
          const productId=id;
          const response=await axios.delete(`http://localhost:5000/api/user/${userId}/wishlists`,{
            data: { productId: productId }  
          })
          fetchWishlist()
         
          
        } catch (error) {
          console.log("error fetching the product", error);
          toast.error("error");
        }
      }
      useEffect(()=>{
        fetchWishlist()
      },[])

  return (
    <>
    
      <NavigationBar/>

      <Container>
      <h2>Your Wishlist</h2>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="row justify-content-center">
          {wishlist.map((item) => (
            <Card key={item._id} style={{ width: '12rem' }} className='p-3 m-3 product-card'>
              <div className="product-image-container">
                <Card.Img variant="top" src={item.image} />
              </div>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Button
                  variant="danger"
                  onClick={() => RemoveCartItem(item._id)}
                >
                  Remove
                </Button>
                {/* Other product details */}
              </Card.Body>
            </Card>
            
          ))}
        
        </div>
      )}
    </Container>
    
    
    
    </>
  )
}

export default Wislist
