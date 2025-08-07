import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE = process.env.REACT_APP_API_URL;

const AddMenu = () => {
  const [dishes, setDishes] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  useEffect(() => {
    fetchDishes();
  }, []);

  const fetchDishes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/api/dishes`);
      setDishes(res.data);
    } catch (err) {
      console.error("Failed to fetch dishes", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, image: files[0] });
    } else if (name === 'price') {
      setFormData({ ...formData, price: value === '' ? '' : Number(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append('name', formData.name);
    fd.append('price', formData.price);
    fd.append('description', formData.description);
    fd.append('image', formData.image);

    try {
      await axios.post(`${API_BASE}/api/dishes/add`, fd);
      setFormData({ name: '', price: '', description: '', image: null });
      fetchDishes();
    } catch (err) {
      console.error("Error adding dish", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/dishes/${id}`);
      fetchDishes();
    } catch (err) {
      console.error("Error deleting dish", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Add New Dish</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" className="mb-4">
        <div className="mb-2">
          <input type="text" name="name" placeholder="Dish Name" className="form-control" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="number" name="price" placeholder="Price" className="form-control" value={formData.price} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <textarea name="description" placeholder="Description" className="form-control" value={formData.description} onChange={handleChange} required />
        </div>
        <div className="mb-2">
          <input type="file" name="image" accept="image/*" className="form-control" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-success">Add Dish</button>
      </form>

      <h4>Menu List</h4>
      <div className="row">
        {dishes.map((dish) => (
          <div className="col-md-4 mb-3" key={dish._id}>
            <div className="card">
              <img
                src={`${API_BASE}/uploads/${dish.image}`}
                className="card-img-top"
                alt={dish.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{dish.name}</h5>
                <p className="card-text">{dish.description}</p>
                <p className="card-text"><strong>₹{dish.price}</strong></p>
                <button className="btn btn-danger" onClick={() => handleDelete(dish._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenu;
