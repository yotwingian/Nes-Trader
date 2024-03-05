import { useState, useContext, useEffect } from "react";
import { GlobalContext } from "../components/GlobalContext.jsx";

export default function AddItem() {
  const { items } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    id: 0,
    title: '',
    releaseYear: '',
    genre: '',
    description: '',
    img: '',
    startDateTime: '',
    endDateTime: '',
    startPrice: '',
    reservePrice: ''
  });

  useEffect(() => {
    const newId = items.length > 0 ? items[items.length - 1].id + 1 : 1;
    setFormData(prevFormData => ({
      ...prevFormData,
      id: newId
    }));
  }, [items]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("OK!");

        setFormData({
          id: formData.id + 1, 
          title: '',
          releaseYear: '',
          genre: '',
          description: '',
          img: '',
          startDateTime: '',
          endDateTime: '',
          startPrice: '',
          reservePrice: ''
        });
      } else {
        
        console.log("Fel!");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Title:</label>
      <input type="text" name="title" value={formData.title} onChange={handleChange} required />

      <label>Release Year:</label>
      <input type="text" name="releaseYear" value={formData.releaseYear} onChange={handleChange} required />

      <label>Genre:</label>
      <input type="text" name="genre" value={formData.genre} onChange={handleChange} required />

      <label>Description:</label>
      <textarea name="description" value={formData.description} onChange={handleChange} required />

      <label>Image URL:</label>
      <input type="url" name="img" value={formData.img} onChange={handleChange} required />

      <label>Start Date:</label>
      <input type="datetime-local" name="startDateTime" value={formData.startDateTime} onChange={handleChange} required />

      <label>End Date:</label>
      <input type="datetime-local" name="endDateTime" value={formData.endDateTime} onChange={handleChange} required />

      <label>Start Price:</label>
      <input type="number" name="startPrice" value={formData.startPrice} onChange={handleChange} required />

      <label>Reserve Price:</label>
      <input type="number" name="reservePrice" value={formData.reservePrice} onChange={handleChange} required />

      <button type="submit">Submit</button>
    </form>
  );
}
