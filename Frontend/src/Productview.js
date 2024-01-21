import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Card, Container } from "react-bootstrap";
import NavigationBar from "./components/NavigationBar";
import { Footer } from "./components/Footer";
import { toast } from "react-toastify";
import axios from "axios";
import "./Productview.css"; 

const Productview = () => {
  const [product, setProduct] = useState('');
  const { id } = useParams();
  const userId=localStorage.getItem("userId")
  console.log(userId);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/admin/products/${id}`);
        // console.log(response,'adminedit')
        const { _id, title, image, price, description, category } = response.data.product;
        setProduct({
          id: _id,
          title,
          image,
          price,
          category,
          description,
        });
      } catch (error){
        console.log(error);
        toast.error(error.message || "Failed to fetch products");
      }
     
    };
    fetchProduct();
  }, [id]);


  const handleAddToCart=async()=>{
            try{
                 const response = await axios.post(`http://localhost:5000/api/user/${userId}/cart`,{producId:id})
                  // console.log(response)
                 if(response){
                 await axios.get(`http://localhost:5000/api/user/${userId}/cart`)
                   console.log(userId,"nsdncsjn")
                 return toast.success("product added to cart")
               }
            }catch(error){
            console.log("Error adding product to the cart",error);
            toast.error(error.response.data.message)
            }
            }

  return (
    <>
      <NavigationBar />
      <Container>
        <div className="row justify-content-center">
          {/* Use optional chaining to avoid errors if product is not yet fetched */}
          {product && (
            <Card  style={{ width: "30rem" }} className="p-3 m-3" key={product._id}>
              <Card.Img
                variant="top"
                src={product.image}
          
                style={{ width: "28rem", height: "17rem" }}
              />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  
                  {Array(product.star)
                    .fill(null)
                    .map((_, index) => (
                      <span key={index} className="star">
                        ★★★★
                      </span>
                    ))}
                </Card.Text>
                <span  className="product-price " 
                  style={{ fontSize: "30px", fontWeight: 600, padding: "10px" ,marginLeft:"-9px" }}
                >
                  $ {product.price}
                </span>
                <Button
                onClick={handleAddToCart}
                  variant="primary"
                  style={{
                    width: "12rem",
                    backgroundColor: "black",
                    fontWeight: 600,
                  }}
                >
                  Add to Cart
                </Button>
              </Card.Body>
            </Card>
          )}
        </div>
      </Container>
      <Footer />
    </>
  );
};

export default Productview;
