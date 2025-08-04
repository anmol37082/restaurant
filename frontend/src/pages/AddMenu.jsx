import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaPlus, FaUtensils } from 'react-icons/fa';
import styles from './Menu.module.css'; // Reuse the same styles

const AddMenu = () => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null
  });

  const [dishes, setDishes] = useState([]);

  const fetchDishes = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/dishes');
      setDishes(res.data);
    } catch (err) {
      console.error("Failed to fetch dishes", err);
    }
  };

  useEffect(() => {
    fetchDishes();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
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
      await axios.post('http://localhost:5000/api/dishes/add', fd);
      alert("✅ Dish added successfully!");
      setFormData({ name: '', price: '', description: '', image: null });
      fetchDishes();
    } catch (err) {
      console.error("❌ Failed to add dish", err);
      alert("Failed to add dish. Please try again.");
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this dish?")) {
      try {
        await axios.delete(`http://localhost:5000/api/dishes/${id}`);
        fetchDishes();
      } catch (err) {
        console.error("❌ Failed to delete dish", err);
      }
    }
  };

  return (
    <div className={`${styles.menuPage} container py-4`}>
      {/* Header */}
      <header className={`${styles.header} text-white py-4 shadow mb-4`}>
        <div className="container">
          <h1 className="m-0 d-flex align-items-center">
            <FaUtensils className="me-2" /> Apna Restaurant - Admin Panel
          </h1>
        </div>
      </header>

      {/* Add Dish Form */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Add New Dish</h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-4">
              <label className="form-label">Dish Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Butter Chicken"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-3">
              <label className="form-label">Price (₹)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="425"
                className="form-control"
                required
              />
            </div>
            <div className="col-md-5">
              <label className="form-label">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Tandoori chicken in rich tomato-cream sauce"
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Dish Image</label>
              <input
                type="file"
                name="image"
                onChange={handleChange}
                className="form-control"
                accept="image/*"
                required
              />
            </div>
            <div className="col-md-6 d-flex align-items-end">
              <button className="btn btn-primary w-100" type="submit">
                <FaPlus className="me-2" /> Add Dish
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Current Menu */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">Current Menu ({dishes.length} items)</h4>
        </div>
        <div className="card-body">
          <div className="row g-4">
            {dishes.map((dish) => (
              <div className="col-lg-3 col-md-6" key={dish._id}>
                <div className={`${styles.menuCard} card h-100`}>
                  <div className={styles.cardImgContainer}>
                    <img
                      src={`http://localhost:5000/uploads/${dish.image}`}
                      className="card-img-top"
                      alt={dish.name}
                      loading="lazy"
                    />
                    <div className={styles.priceBadge}>₹{dish.price}</div>
                  </div>
                  <div className={`${styles.cardBody} card-body`}>
                    <h5 className={styles.cardTitle}>{dish.name}</h5>
                    <p className={styles.cardText}>
                      {dish.description || 'No description available'}
                    </p>
                    <button
                      className="btn btn-danger w-100 mt-auto"
                      onClick={() => handleDelete(dish._id)}
                    >
                      <FaTrash className="me-2" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;