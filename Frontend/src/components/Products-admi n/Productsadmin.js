import React, { useContext, useEffect, useState } from 'react';
import { BsFillCartFill } from 'react-icons/bs';
import Sidebar from '../Admin-section/Sidebar-section/Sidebar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProductsAdmin = () => {
  const navigate = useNavigate();
  const [product,setProduct]=useState([])

  // Fetch products from the server when the component mounts
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/products');
        console.log(response.data.data);
        setProduct(response.data.data); // Assuming the product data is in the 'data' field of the response
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, [setProduct]);

  // Remove the product
  const handleRemove = (id) => {
    const updatedCart = product.filter((item) => item.id !== id);
    setProduct(updatedCart);
  };

  return (
    <>
      <Sidebar />
      <div className="container" style={{ width: '1000px', marginLeft: '200px', marginTop: '-610px' }}>
        <h1 className="mt-4">
          All Products <BsFillCartFill className="ml-3" />
        </h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Image</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {product.map((item) => (
              <tr key={item._id}>
                <td>{item._id}</td>
                <td>{item.title}</td>
                <td>{item.price}</td>
                <td>
                  <img src={item.image} alt={item.image} style={{ width: '100px' }} />
                </td>
                <td>
                  <button onClick={() => navigate(`/adminedit/${item.id}`)} className="btn btn-secondary">
                    Edit
                  </button>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="btn btn-danger"
                    style={{ marginLeft: '10px' }}
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProductsAdmin;
