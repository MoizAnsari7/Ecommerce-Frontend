import { useState } from 'react';
import './CreateProduct.css';
import toast from 'react-hot-toast';
import api from '../api';

function CreateProduct() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [formData, setFormData] = useState({
    seller_id : user ? user._id : '',
    item_name: '',
    item_category: '',
    item_price: '',
    item_dsc: '',
    item_qty: '',
    item_image: '',
    item_discount: ''
  });

  function handleChange(e){
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  function handleFileChange(e){
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, item_image: file}));
    }
  };

  async function handleSubmit(e){
    e.preventDefault();

    const formPayload = new FormData();
    formPayload.append("item_name", formData.item_name);
    formPayload.append("item_category", formData.item_category);
    formPayload.append("item_price", formData.item_price);
    formPayload.append("item_dsc", formData.item_dsc);
    formPayload.append("item_qty", formData.item_qty);
    formPayload.append("item_discount", formData.item_discount);
    formPayload.append("item_image", formData.item_image);
    formPayload.append("seller_id", formData.seller_id);

    try{
      await api.post("/addProduct", formPayload, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      toast.success("Product Added successfully");
    }
    catch(error){
      toast.error("Product not added");
    };

    console.log(formData);

    setFormData({
      item_name: '',
      item_category: '',
      item_price: '',
      item_dsc: '',
      item_qty: '',
      item_image: '',
      item_discount: ''
    });
  };

  return (
    <div className="create-product-container">
      <h2>Add a New Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="item_name"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="item_category"
            value={formData.item_category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="item_price"
            value={formData.item_price}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <input
            type="text"
            name="item_dsc"
            value={formData.item_dsc}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="item_qty"
            value={formData.item_qty}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Product Image</label>
          <input
            type="file"
            accept="image/*"
            name='item_image'
            onChange={handleFileChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Discount (%)</label>
          <input
            type="number"
            name="item_discount"
            value={formData.item_discount}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className='addProductButton'>Add Product</button>
      </form>
    </div>
  );
}

export default CreateProduct;