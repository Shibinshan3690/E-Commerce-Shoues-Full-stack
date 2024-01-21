import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const EditProducts = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [product, setProduct] = useState({
    _id: "",
    title: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });

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

  const submit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.put(`http://localhost:5000/api/admin/products`,product );
      
      if (response.status === 200) {
        toast.success("Product Edited Successfully");
        navigate('/products');
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div style={{ display: "flex" }}>
      <div style={{ flex: 1, textAlign: "center", padding: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div style={{ display: "block", width: 700 }}>
            <h4>Edit product</h4> <hr />
            <Form onSubmit={submit}>
              <Form.Group>
                <Form.Label>Edit Img src:</Form.Label>
                <Form.Control
                  type="text"
                  name="image"
                  value={product.image}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit product name:</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  value={product.title}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit description:</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  value={product.description}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit Actual price:</Form.Label>
                <Form.Control
                  type="text"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Edit category:</Form.Label>
                <Form.Control
                  type="text"
                  name="category"
                  value={product.category}
                  onChange={handleChange}
                />
              </Form.Group>
              <Button className="m-3" type="submit" variant="primary">
                Save
              </Button>
              <Button className="m-3" onClick={() => navigate("/adminproduct")}>
                Cancel
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProducts;
