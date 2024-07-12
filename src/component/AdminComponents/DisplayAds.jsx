import React, { useState, useEffect } from 'react';
import { FaImage, FaTrash , FaArrowLeft } from 'react-icons/fa';
import axios from 'axios';
import './DisplayAds.css';
import Loader from '../Loader';

import { useNavigate } from 'react-router-dom';

export default function DisplayAds() {
  const [carouselImage, setCarouselImage] = useState('');
  const [placeCarouselImage, setPlaceCarouselImage] = useState('');
  const [carouselImages, setCarouselImages] = useState([]);
  const [loading , setLoading] = useState(true);

  const navigate = useNavigate();
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File selected:', file); // Debugging log
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        console.log('FileReader result:', event.target.result); // Debugging log
        setCarouselImage(file);
        setPlaceCarouselImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddBtn = async (e) => {
    e.preventDefault();

    try {
      
      const formData = new FormData();
      formData.append('image', carouselImage);

      await axios.post('https://tqb-be.onrender.com/upload-carousel-images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setCarouselImage('');
     

      console.log('done!');
      fetchCarouselImages(); // Refresh the carousel images after adding a new one
    } catch (e) {
      console.log('Error uploading data:', e);
    }
  };

  const fetchCarouselImages = async () => {
    try {
      const res = await axios.get('https://tqb-be.onrender.com/carousel-images');
      console.log('Image data:', res.data);
      setCarouselImages(res.data);
      setLoading(false);
    } catch (error) {
      console.log('Error fetching carousel images:', error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const handleDeleteImage = async (imageId) => {
    try {
      await axios.delete(`https://tqb-be.onrender.com/delete-carousel-image/${imageId}`);
      console.log('Image deleted!');
      fetchCarouselImages(); // Refresh the carousel images after deletion
    } catch (error) {
      console.log('Error deleting image:', error);
    }
  };
  const handleLeftArrow =()=>{
 
    navigate('/admin/home');

  }

  return (
    <div> 
      <FaArrowLeft  className='left-arrow' onClick={()=>handleLeftArrow()}  size={20}/>
      <h2 className='carousel-image-header'>Carousel Images</h2>

      <div className='carousel-image-select'>
        {carouselImage ? (
          <img src={placeCarouselImage} alt='Selected' className='carousel-selected-image' />
        ) : (
          <div className='carousel-image-placeholder'>
            Select Image <FaImage size={70} />
          </div>
        )}
        <label htmlFor='image' className='carousel-image-input-label'>
          <input
            className='carousel-image-input'
            type='file'
            id='image'
            name='image'
            accept='image/*'
            onChange={handleImageChange}
          />
        </label>
      </div>
      <div className='carousel-add-btn'>
        <button onClick={handleAddBtn}>Add</button>
      </div>

     { loading ? <Loader/> : <div className='carousel-images'>

        {  carouselImages.map((image, index) => (
          <div key={index} className='carousel-image'>
           <div>  <FaTrash  className='carousel-trash-icon'  onClick={() => handleDeleteImage(image._id)}/>   <img src={image.carouselImage} alt={`Carousel ${index}`} /> 
          
           </div>
          
          </div>
           
            
        ))}
      
          
      </div>}
    </div>
  );
}
