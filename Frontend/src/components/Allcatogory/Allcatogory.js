import React, { useEffect, useState } from 'react';
import NavigationBar from '../NavigationBar';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Footer } from '../Footer';
import { useNavigate } from 'react-router';
import { FaHeart } from 'react-icons/fa'; // Import the heart icon from FontAwesome or use a different icon library

import { Form } from 'react-bootstrap';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify';

const AllCategory = () => {
  const [product, setProduct] = useState([]);
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]); // State to store filtered products
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    // Fetch products from the backend when the component mounts
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/products');
        setFilteredProducts(response.data.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle error
      }
    };

    fetchProducts();
  }, []);

  // Update filtered products based on search input
  useEffect(() => {
    const filtered = product.filter((value) => {
      if (search === "") {
        return true;
      } else if (value.title.toLowerCase().includes(search.toLowerCase())) {
        return true;
      } else {
        return false;
      }
    });
    setFilteredProducts(filtered);
  }, [search, product]);

  // Function to handle adding to wishlist
  const addToWishlist =async (id) => {
              try{
                  const response=await axios.post(`http://localhost:5000/api/user/${userId}/wishlists`,{
                    productId: id,
                  
                  })
                    if(response.status===201){
                      return  toast.success("product added to wislist")
                    }
                 }catch(error){
                  console.error("Error adding product to the whislist:", error);
                  toast.error(error.response.data.message);
                 }
              }
  

  return (
    <>
      <NavigationBar />
      <Form className="d-flex w-25 position-absolute m-5" style={{ zIndex: "99", right: "10rem", top: "1.8rem" }}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          onChange={(ev) => { setSearch(ev.target.value) }}
        />
        <Button
          variant="outline-success"
          className="bg-white"
          style={{ color: "black", fontWeight: "600" }}
        >
          Search
        </Button>
      </Form>
      <Container>
        <div className='row justify-content-center'>
          {filteredProducts.map((item) => (
            <Card style={{ width: '12rem' }} className='p-3 m-3 product-card' key={item.id}>
              <div className="product-image-container">
                <Card.Img variant="top" src={item.image} />
              </div>
              <Card.Body>
                <Card.Title>{item.title}</Card.Title>
                <Card.Text>
                  {Array(item.star).fill(<span key={item.id} className="star">★★★★</span>)}
                </Card.Text>
                <div className="product-price" fontWeight="20px">
                  $ {item.price}
                </div>
                <Button
                  onClick={() => navigate(`/view/${item._id}`)}
                  style={{ backgroundColor: 'black' }}
                  className="view-button"
                >
                  View
                </Button>
                <Button
                  onClick={() => addToWishlist(item._id)}
                  style={{ backgroundColor: 'transparent', border: 'none', cursor: 'pointer' }}
                >
                  <FaHeart color="black"  size={20}  onClick={()=>addToWishlist(item._id)}  />
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default AllCategory;
