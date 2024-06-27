import React, { useEffect, useState } from 'react';
import Creatable from 'react-select/creatable';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Card.css';
import { useNavigate } from 'react-router-dom';
import {  FaArrowLeft } from 'react-icons/fa';

const Card = ({ data, selectedType, selectedFlavour }) => {

const navigate = useNavigate();

  const [filterType, setFilterType] = useState('');
  const [sortOrder, setSortOrder] = useState('');
  const [filterPrice, setFilterPrice] = useState('');
  const [filterFlavour, setFilterFlavour] = useState('');
  const [activeType, setActiveType] = useState('none');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulate loading time
  }, []);

  const handleClick = (type) => {
    setActiveType(type);
    if (type === 'none') setFilterType('');
    else setFilterType(type);
  };

  useEffect(() => {
    if (selectedType) {
      setActiveType(selectedType);
    }
    setFilterType(selectedType);
  }, [selectedType]);

  useEffect(() => {
    setFilterFlavour(selectedFlavour);
  }, [selectedFlavour]);

  if (!data || data.length === 0) {
    return <p>No data available</p>;
  }

  const { category } = data[0];

  // Group data by type
  const groupedData = data.reduce((acc, item) => {
    if (item.type) {
      (acc[item.type] = acc[item.type] || []).push(item);
    }
    
    return acc;
  }, {});

 
  const filteredData = Object.keys(groupedData).reduce((acc, type) => {
    if ((!filterType || filterType === type) && groupedData[type].length > 0) {
      acc[type] = groupedData[type].filter(item => {
        const matchesFlavour = filterFlavour ? item.flavour === filterFlavour : true;
        return matchesFlavour;
      });

      if (sortOrder === 'A-Z') {
        acc[type].sort((a, b) => a.productName.localeCompare(b.productName));
      } else if (sortOrder === 'price-asc') {
        acc[type].sort((a, b) => a.price - b.price);
      }
    }
    return acc;
  }, {});

  const handleTypeChange = selectedOption => {
    setFilterType(selectedOption ? selectedOption.value : '');
  };

  const handleSortChange = selectedOption => {
    setSortOrder(selectedOption ? selectedOption.value : '');
  };

  const handlePriceChange = e => {
    setFilterPrice(e.target.value);
  };

  const handleFlavourChange = selectedOption => {
    setFilterFlavour(selectedOption ? selectedOption.value : '');
  };

  const sortOptions = [
    { value: '', label: 'None' },
    { value: 'A-Z', label: 'A-Z' },
    { value: 'price-asc', label: 'Price' },
  ];

  const flavourOption = [
    { value: '', label: 'All' },
    { value: 'Chocolate', label: 'Chocolate' },
    { value: 'Apple', label: 'Apple' },
    { value: 'Vanilla', label: 'Vanilla' },
    { value: 'Strawberry', label: 'Strawberry' },
    { value: 'Butterscotch', label: 'Butterscotch' },

    // Add more flavor options as needed
  ];


  
  const handleProductClicked = (id)=>{
    navigate(`/productDetails/${id}`);

  }
const handleLeftArrowClick=()=>{
  navigate('/');
}

  return (
    <div className="card-center">
      <div className="header-name">

        
        <p className='left-arrow-card' onClick={()=>handleLeftArrowClick()} > <FaArrowLeft  size={20}/></p>
        
        <p className={`header-name-${category}`}>{category}</p>
      </div>
      <div className="filter-controls">
        <label>
          Sort :
          <Creatable
            value={sortOptions.find(option => option.value === sortOrder)}
            onChange={handleSortChange}
            options={sortOptions}
            isSearchable
            className="select-input"
          />
        </label>
        {category === 'Biscuits' ? (
          <label>
            Max Price :
            <input
              type="number"
              value={filterPrice}
              onChange={handlePriceChange}
              className="price-input"
            />
          </label>
        ) : (
          <></>
        )}
        {category === 'Biscuits' ? (
          <></>
        ) : (
          <label>
            Flavour :
            <Creatable
              value={flavourOption.find(option => option.value === filterFlavour)}
              onChange={handleFlavourChange}
              options={flavourOption}
              isSearchable
              className="flavour-select-input"
            />
          </label>
        )}
      </div>
      {category === 'Cakes' &&
        <div className="type-div">
       {  isLoading ? (<>
        {Array(8).fill().map((_, index) => (
    <div className='types-div'>
     <Skeleton className="type-block" width={100} height={20} />

    </div>


        ))}

    
         
       </>) : 
       
       ( <>

       <div  className="types-div "  onClick={() => handleClick('none')} >

<p className={`type-block ${activeType === 'none' ? 'active' : ''}`}>All</p>
         
       </div>

        {Object.keys(groupedData).map((type, typeIndex) => (
          <div
            key={typeIndex}
            className="types-div"
            onClick={() => handleClick(type)}
          >
            <p className={`type-block ${activeType === type ? 'active' : ''}`}>{type === 'none' ? 'All' : type}</p>
          </div>
        ))}
      </>
      )
          
        
          }
        </div>
      }

      <div className={`card-list-div-${category}`}>
        <div className={'card-list-div'}>
          {isLoading ? (
            // Skeleton Loader
            <>
              {Array(8).fill().map((_, index) => (
              <div className='type-group'>
                  { category==='Cakes' && <h2 className={'type-name'}>
                    <Skeleton    />
                    </h2>}
               <div className='type-items'>     

                 { Array(8).fill().map((_, index) => (

<div key={index} className="card-list skeleton">
              
<Skeleton className="skeleton-img" height={145} />
<div className="item-details">
  <div className="np">
    <Skeleton className="skeleton-text" width={200} height={20} />
    <Skeleton className="skeleton-price" width={100} height={30} />
  </div>
</div>
</div>
               ))}          
               
              </div>
 
              </div>
              ))}
            </>
          ) : (
            Object.keys(filteredData).map((type, typeIndex) => (
              <div key={typeIndex} className="type-group">
                {filteredData[type].length === 0 ? (
                  <h1 className='no-data'></h1>
                ) : (
                  <>
                    <h2 className={type === 'none' ? '' : 'type-name'}>
                     <div>{type === 'none' ? '' : type}</div>
                    </h2>

                    <div className="type-items">
                      {filteredData[type].map((item, index) => (
                        <div key={index} className="card-list" onClick={()=>{handleProductClicked(item._id)}}>
                          <img src={item.image} alt={item.productName} />
                          <div className="item-details">
                            <div className="np">
                              <p className="item-name">{item.productName}</p>
                              <p className="item-price">{item.price} Rs</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
