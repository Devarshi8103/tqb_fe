import React, { useEffect, useState, useContext } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Cursor, useTypewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Home.css';
import axios from 'axios';
import Footer from '../Footer';
import { FaBirthdayCake, FaCookie, FaIceCream, FaUtensils } from 'react-icons/fa';

import { ProductContext } from '../Contexts/ProductsContext';

export default function Home() {
  const [text] = useTypewriter({
    words: ['CAKES', 'PASTRIES', 'HAPPINESS'],
    loop: {},
  });

  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [carouselImages, setCarouselImages] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [cakesByFlavour, setCakesByFlavour] = useState([]);
  const [cakesByType, setCakesByType] = useState([]);
  const [loading, setLoading] = useState(true);
  const [carouselLoading, setCarouselLoading] = useState(true);

  const navigate = useNavigate();
  const products = useContext(ProductContext);
  

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://tqb-be.onrender.com/products');
        const data = res.data;
        console.log("pd : ", products );
        console.log("data: ", data);

        const productMap = new Map();
        const categoryMap = new Map();
        const cakesFlavourMap = new Map();
        const cakesTypeMap = new Map();

        data.forEach(product => {
          if (product.type && product.type.toLowerCase() !== 'none' && !productMap.has(product.type)) {
            productMap.set(product.type, product.image);
          }
          if (product.category) {
            if (!categoryMap.has(product.category)) {
              categoryMap.set(product.category, []);
            }
            categoryMap.get(product.category).push({
               id :product._id,
              flavour: product.flavour,
              image: product.image,
              name: product.productName,
              price: product.price,
            });

            // Group cakes by flavour
            if (product.category.toLowerCase() === 'cakes') {
              if (!cakesFlavourMap.has(product.flavour)) {
                cakesFlavourMap.set(product.flavour, []);
              }
              cakesFlavourMap.get(product.flavour).push({
                id:product._id,
                image: product.image,
                name: product.productName,
                price: product.price,
              });

                // Group cakes by type
                if (!cakesTypeMap.has(product.type)) {
                  cakesTypeMap.set(product.type, []);
                }
                cakesTypeMap.get(product.type).push({
                  id: product._id,
                  flavour: product.flavour,
                  image: product.image,
                  name: product.productName,
                  price: product.price,
                });
            }
          }
        });

        const uniqueProductsArray = Array.from(productMap, ([type, image]) => ({ type, image }));
        const categoryProductsArray = Array.from(categoryMap, ([category, products]) => ({ category, products }));
        const cakesByFlavourArray = Array.from(cakesFlavourMap, ([flavour, products]) => ({ flavour, products }));
        const cakesByTypeArray = Array.from(cakesTypeMap, ([type, products]) => ({ type, products }));

        console.log("Check id : ", categoryProductsArray);
        setUniqueProducts(uniqueProductsArray);
        setCategoryProducts(categoryProductsArray);
        setCakesByFlavour(cakesByFlavourArray);
        setCakesByType(cakesByTypeArray); 
      }
       catch (error) {
        console.log("error");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const fetchCarouselImages = async () => {
    try {
      setCarouselLoading(true);
      const res = await axios.get('https://tqb-be.onrender.com/carousel-images');
      console.log('Image data:', res.data);
      setCarouselImages(res.data);
      setCarouselLoading(false);
    } catch (error) {
      console.log('Error fetching carousel images:', error);
    }
  };

  useEffect(() => {
    fetchCarouselImages();
  }, []);

  const handleTypeClick = (type) => {
    navigate(`/cakes?type=${type}`);
  };

  const handleFlavourClick = (flavour) => {
    navigate(`/cakes?flavour=${flavour}`);
  };

  const handleViewAllClick = (category) => {
    navigate(`/${category}`);
  };

  const handleProductClicked = (id)=>{
    navigate(`/productDetails/${id}`);

  }

  return (
    <>
      <div className='home-div'>
        <div className="home-carousel-images">
          {carouselLoading ? (
            <Skeleton className='home-image' height={190} />
          ) : (
            <Carousel autoPlay interval={3000}  infiniteLoop={true} showThumbs={false} showStatus={false}  swipeable={true}>
              {carouselImages.map((image, index) => (
                <div key={index}>
                  <img className='home-image' src={image.carouselImage} alt="images" />
                </div>
              ))}
            </Carousel>
          )}
        </div>
      </div>
      <div className='types-list'>
        {loading ? (
       Array(8).fill().map((_, index) => ( 
        <div key={index} className='type-item'>
          <Skeleton className='type-image'  />
           <Skeleton  width={122} />
        </div>
      ))
      ) : (
          uniqueProducts.map((product, index) => (
            <div
              key={index}
              className='type-item'
              onClick={() => handleTypeClick(product.type)}
            >
              <img className='type-image' src={product.image} alt={product.type} />
              <p>{product.type}</p>
            </div>
          ))
        )}
      </div>

      <div className='text-effect'>
        {/* <img src="https://fthmb.tqn.com/ZhiQaxbYq2Rs4ee4vjTR77j2WZo=/3918x2736/filters:fill(auto,1)/high-angle-view-of-multi-colored-baking-devices-692741553-5a1f2e32eb4d52001aed7d72.jpg" alt="" /> */}
        <img src="https://res.cloudinary.com/dxtqtupqn/image/upload/v1719567263/text_effect_background_image/bg-image.jpg" alt="" />
        <h1 style={{ color: 'white' }}> WE BAKE
          <span style={{ color: '#ffdd00', fontWeight: 'bold', marginLeft: '10px' }}>{text}</span>
          <span className='cursor'><Cursor /></span>
        </h1>
      </div>

      <div className='category-list'>
        {/* <h1 className='cakes-header'>Cake Flavours <FaBirthdayCake /></h1> */}
        {loading ? (
           
             <Skeleton  className='category-product skeleton' style={{marginTop:'50px'}} count={5}  height={330}  />

 
           ) : (
          categoryProducts.map((categoryItem, index) => (
            <div key={index} className={`category-item ${categoryItem.category}`}>
              <div className='category-name-view-all'>
                <p className='category-name'>{categoryItem.category === 'Cakes' ? '' : categoryItem.category}
                  <>
                    {categoryItem.category === 'Pastries' && <FaUtensils className='' />}
                    {categoryItem.category === 'Ice-Creams' && <FaIceCream className='fa-icons' />}
                    {categoryItem.category === 'Biscuits' && <FaCookie className='fa-icons' />}
                  </>
                </p>
                {categoryItem.category === 'Cakes' ? '' : <p className='view-all' onClick={() => handleViewAllClick(categoryItem.category)}>View All</p>}
              </div>


              <div className={`category-products`}>
                {categoryItem.category === 'Cakes' ? <div className={`category-list ${categoryItem.category}`}>
                <h1 className='cakes-header'>Cake <FaBirthdayCake /></h1>
                  {cakesByType.map((typeItem, index) => (
                    <div key={index} className={`category-item`}>
                      <div className='category-name-view-all'>
                        <p className='category-name'>{typeItem.type}</p>
                        <p className='view-all' onClick={() => handleTypeClick(typeItem.type)}>View All</p>
                      </div>
                      <div className='category-products'>
                        {typeItem.products.map((product, idx) => (
                          <div key={idx} className='category-product' onClick={()=>{handleProductClicked(product.id)}}>
                            <img className='product-category-image' src={product.image} alt={product.name} />
                            <p className='category-item-name'>{product.name}</p>
                            <p className='category-item-price'>{product.price} Rs</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div> : categoryItem.products.map((product, idx) => (
                  <div key={idx} className='category-product'  onClick={()=>{handleProductClicked(product.id)}}>
                    <img className='product-category-image' src={product.image} alt={product.name} />
                    <p className='category-item-name'>{product.name}</p>
                    <p className='category-item-price'>{product.price} Rs</p>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      <Footer />
    </>
  );
}
