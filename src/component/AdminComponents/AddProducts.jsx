import React, { useEffect, useState } from "react";
import "../AdminComponents/AddProducts.css";
import { FaArrowLeft, FaImage, FaPen, FaTrashAlt } from "react-icons/fa";
import Creatable from "react-select/creatable";
import axios from "axios";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export default function AddProducts() {
  const navigate = useNavigate();

  const flavourOptions = [
    { value: "Apple", label: "Apple" },
    { value: "Blackforest", label: "Blackforest" },
    { value: "Blue Berry", label: "Blue Berry" },
    { value: "Butterscotch", label: "Butter Scotch" },
    { value: "Chocolate", label: "Chocolate" },
    { value: "Chocolate Almond", label: "Chocolate Almond" },
    { value: "Faluda", label: "Faluda" },
    { value: "Icecream Faluda", label: "Icecream Faluda" },
    { value: "Kit Kat", label: "Kit Kat" },
    { value: "Litchi", label: "Litchi" },
    { value: "Mango", label: "Mango" },
    { value: "Mangorabdi", label: "Mango Rabdi" },
    { value: "Pan Gulkand", label: "Pan Gulkand" },
    { value: "Pineapple", label: "Pine Apple" },
    { value: "Pineapple", label: "Pine Apple" },
    { value: "Pista", label: "Pista" },
    { value: "Rasmalai", label: "Rasmalai" },
    { value: "Red Velvet", label: "Red Velvet" },
    { value: "Strawberry", label: "Strawberry" },
    { value: "Vanilla", label: "Vanilla" },
  ];

  const weightOptions = [
    { value: 0.5, label: "500gm" },
    { value: 1, label: "1kg" },
    { value: 1.5, label: "1.5kg" },
    { value: 2, label: "2kg" },
    { value: 3, label: "3kg" },
    { value: 0.25, label: "250gm" },
  ];

  const categoryOptions = [
    { value: "Cakes", label: "Cake" },
    { value: "Pastries", label: "Pastry" },
    { value: "Biscuits", label: "Biscuit" },
    { value: "Ice-Creams", label: "Ice-Cream" },
  ];

  const typesOptions = [
    { value: "none", label: "none" },
    { value: "BirthDay Cakes", label: "BirthDay Cake" },
    { value: "Anniversary Cakes", label: "Anniversary Cake" },
    { value: "Mother's Day Cakes", label: "Mothers day Cake" },
    { value: "Wedding Cakes", label: "Wedding Cake" },
    { value: "Photo Cakes", label: "Photo Cake" },
    { value: "Theme Cakes", label: "Theme Cake" },
    { value: "Customized Cakes", label: "Customized Cake" },
  ];

  const [products, setProducts] = useState([]);
  const [image, setImage] = useState("");
  const [placeImage, setPlaceImage] = useState("");
  const [category, setCategory] = useState(categoryOptions[0]);
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState(0);
  const [weight, setWeight] = useState(weightOptions[0]);
  const [flavour, setFlavour] = useState(flavourOptions[0]);
  const [type, setType] = useState(typesOptions[0]);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [productInfo, setProductInfo] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const changeData = () => {
      const newFormData = new FormData();
      newFormData.append("image", image);
      newFormData.append("category", category.value);
      newFormData.append("productName", productName);
      newFormData.append("price", price);
      newFormData.append("weight", weight.value);
      newFormData.append("flavour", flavour.value);
      newFormData.append("type", type.value);
      setFormData(newFormData);
    };
    changeData();
    setProductInfo({
      _id: editId,
      image,
      category: category.value,
      productName,
      price,
      weight: weight.value,
      flavour: flavour.value,
      type: type.value,
    });
  }, [image, category, productName, price, weight, flavour, type]);

  useEffect(() => {
    console.log({ formData });
  }, [formData]);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:3001/products");
        setProducts(res.data);
        setLoading(false);
      } catch (error) {
        console.log("error");
      }
    };
    fetchProducts();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(file);
        setPlaceImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    if (editId) {
      axios
        .get(`http://localhost:3001/product/${editId}`)
        .then((response) => {
          const { image, category, productName, price, weight, flavour, type } =
            response.data;
          setPlaceImage(image);
          setImage(image);
          setCategory(
            categoryOptions.find((option) => option.value === category)
          );
          setProductName(productName);
          setPrice(price);
          setWeight(weightOptions.find((option) => option.value === weight));
          setFlavour(flavourOptions.find((option) => option.value === flavour));
          setType(typesOptions.find((option) => option.value === type));
        })
        .catch((error) => {
          console.error("Axios error:", error);
        });
    }
  }, [editId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      (!category || !productName || !price || !weight || !flavour) &&
      !isEdit
    ) {
      return;
    }

    try {
      console.log({ formData });
      console.log({ productInfo });
      if (isEdit) {
        formData.append("_id", editId);
        await axios.put(`http://localhost:3001/product/${editId}`, productInfo, 
          // {
          // headers: {
          //   "Content-Type": "multipart/form-data",
          // },
        
        );
        setIsEdit(false);
      } else {
        await axios.post("http://localhost:3001/admin/add-products", productInfo, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
      }

      setImage("");
      setCategory(categoryOptions[0]);
      setProductName("");
      setPrice(0);
      setWeight(weightOptions[0]);
      setFlavour(flavourOptions[0]);
      setType(typesOptions[0]);
      document.getElementById("image").value = "";
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const deleteProduct = (id) => {
    axios
      .delete(`http://localhost:3001/product/${id}`)
      .then(() => {
        console.log("deleted ok");
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };
  const handleLeftArrow = () => {
    navigate("/admin/home");
  };

  return (
    <>
      <FaArrowLeft
        className="left-arrow"
        onClick={() => handleLeftArrow()}
        size={20}
      />

      <h2 className="add-products">Add Products</h2>
      <div className="form">
        <form onSubmit={handleSubmit} className="form-start">
          <div className="image-select">
            {image ? (
              <img src={placeImage} alt="Selected" className="selected-image" />
            ) : (
              <div className="image-placeholder">
                Select Image <FaImage size={70} />{" "}
              </div>
            )}
            <input
              className="image-input"
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>

          <div className="form-inputs">
            <div className="input-div">
              <label className="form-label" htmlFor="category">
                Category:
              </label>
              <Creatable
                className="dropdown"
                value={category}
                onChange={(value) => {
                  console.log(value);
                  setCategory(value);
                }}
                options={categoryOptions}
                isSearchable={true}
              />
            </div>
            <div className="input-div">
              <label className="form-label" htmlFor="productName">
                Product Name:
              </label>
              <input
                className="form-control"
                type="text"
                id="productName"
                name="productName"
                placeholder="Product Name"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label className="form-label" htmlFor="price">
                Price:
              </label>
              <input
                className="form-control"
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="input-div">
              <label className="form-label" htmlFor="weight">
                Weight:
              </label>
              <Creatable
                className="dropdown"
                value={weight}
                onChange={(value) => setWeight(value)}
                options={weightOptions}
                isSearchable={true}
              />
            </div>
            <div className="input-div">
              <label className="form-label" htmlFor="flavour">
                Flavour:
              </label>
              <Creatable
                className="dropdown"
                value={flavour}
                onChange={(value) => setFlavour(value)}
                options={flavourOptions}
                isSearchable={true}
              />
            </div>
            <div className="input-div">
              <label className="form-label" htmlFor="type">
                Type:
              </label>
              <Creatable
                className="dropdown"
                value={type}
                onChange={(value) => setType(value)}
                options={typesOptions}
                isSearchable={true}
              />
            </div>
            <div className="btn">
              <button type="submit">{isEdit ? "Update" : "Add"}</button>
            </div>
          </div>
        </form>
      </div>
      <div className="products-container">
        {loading ? (
          <>
            <Loader />{" "}
          </>
        ) : (
          Object.entries(
            products.reduce((acc, product) => {
              if (!acc[product.category]) {
                acc[product.category] = {};
              }
              if (!acc[product.category][product.type]) {
                acc[product.category][product.type] = [];
              }
              acc[product.category][product.type].push(product);
              return acc;
            }, {})
          ).map(([category, types], index) => (
            <div key={index} className={`category-${category}`}>
              <h2 className="ch">{category}</h2>
              {Object.entries(types).map(([type, products], idx) => (
                <div key={idx} className={`type-${type}`}>
                  <p className="types">{type === "none" ? "" : type}</p>
                  <hr />
                  <div className="header">
                    <p>Name</p>
                    <p>Flavour</p>
                    <p>Price</p>
                    <p>Weight</p>
                  </div>
                  <div className="products-list">
                    {products.map((product, index) => (
                      <div key={index} className="product-card">
                        <div className="product-img">
                          <img src={product.image} alt={product.productName} />
                        </div>
                        <div className="product-details">
                          <p className="product-name">{product.productName}</p>
                          <p className="product-price">{product.flavour}</p>
                          <p className="product-info">{product.price} Rs</p>
                          <p>{product.weight} kg</p>
                        </div>
                        <div className="btns">
                          <div>
                            <FaPen
                              className="pen"
                              onClick={() => {
                                setIsEdit(true);
                                setEditId(product._id);
                              }}
                            />
                          </div>
                          <FaTrashAlt
                            className="trash"
                            onClick={() => {
                              deleteProduct(product._id);
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))
        )}
      </div>
    </>
  );
}

// import React, { useEffect, useState } from 'react';
// import '../AdminComponents/AddProducts.css';
// import { FaEdit, FaImage, FaPen, FaTrash, FaTrashAlt } from 'react-icons/fa';
// import Creatable from 'react-select/creatable';
// import axios from 'axios';

// export default function AddProducts() {
//   const flavourOptions = [
//     { value: 'Apple', label: 'Apple' },
//     { value: 'Blackforest', label: 'Blackforest' },
//     { value: 'Blue Berry', label: 'Blue Berry' },
//     // Add other flavour options here
//   ];

//   const weightOptions = [
//     { value: 0.5, label: '500gm' },
//     { value: 1, label: '1kg' },
//     { value: 1.5, label: '1.5kg' },
//     // Add other weight options here
//   ];

//   const categoryOptions = [
//     { value: 'Cake', label: 'Cake' },
//     { value: 'Pastry', label: 'Pastry' },
//     { value: 'Biscuit', label: 'Biscuit' },
//     // Add other category options here
//   ];

//   const [products, setProducts] = useState([]);
//   const [image, setImage] = useState('');
//   const [placeImage, setPlaceImage] = useState('');
//   const [category, setCategory] = useState(categoryOptions[0]);
//   const [productName, setProductName] = useState('');
//   const [price, setPrice] = useState(0);
//   const [weight, setWeight] = useState(weightOptions[0]);
//   const [flavour, setFlavour] = useState(flavourOptions[0]);
//   const [isEdit, setIsEdit] = useState(false);
//   const [editId, setEditId] = useState('');

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await axios.get('http://localhost:3001/products');
//         setProducts(res.data);
//       } catch (error) {
//         console.log("error");
//       }
//     };
//     fetchProducts();
//   }, [products]);

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = (event) => {
//         setImage(file);
//         setPlaceImage(event.target.result);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleChangeCategory = (value) => {
//     console.log("ct : ",value);
//     setCategory(value);
//   };

//   const handleChangeProductName = (e) => {
//     console.log("pn : ",e.target.value);
//     setProductName(e.target.value);
//   };

//   const handleChangePrice = (e) => {
//       console.log("pr : ",e.target.value);
//     setPrice(e.target.value);
//   };

//   const handleChangeWeight = (value) => {
//     console.log("wt : ",value);
//     setWeight(value);
//   };

//   const handleChangeFlavour = (value) => {
//     console.log("fl : ",value);
//     setFlavour(value);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     console.log('Category:', category);
// console.log('ProductName:', productName);
// console.log('Price:', price);
// console.log('Weight:', weight);
// console.log('Flavour:', flavour);

//     // if ((!category || !productName || !price || !weight || !flavour) && !isEdit) {
//     //   return;
//     // }

//       const formData = new FormData();
//       formData.append('image', image);
//       formData.append('category', category.value);
//       formData.append('productName', productName);
//       formData.append('price', price);
//       formData.append('weight', weight.value);
//       formData.append('flavour', flavour.value);

//       console.log('after : Category:', category);
//       // console.log('ProductName:', productName);
//       // console.log('Price:', price);
//       // console.log('Weight:', weight);
//       // console.log('Flavour:', flavour);

//       console.log("form data : ", formData);
//       try {

//       if (isEdit) {
//         await axios.put(`http://localhost:3001/product/${editId}`, formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         setIsEdit(false);
//       } else {
//         const res = await axios.post('http://localhost:3001/admin/add-products', formData, {
//           headers: {
//             'Content-Type': 'multipart/form-data',
//           },
//         });
//         console.log(res.data);
//       }

//       setImage('');
//       setCategory(categoryOptions[0]);
//       setProductName('');
//       setPrice(0);
//       setWeight(weightOptions[0]);
//       setFlavour(flavourOptions[0]);
//       document.getElementById('image').value = '';
//     } catch (error) {
//       console.error('Error adding product:', error);
//     }
//   };

//   const deleteProduct = (id) => {
//     axios.delete(`http://localhost:3001/product/${id}`)
//       .then(() => {
//         console.log("deleted ok");
//       })
//       .catch((error) => {
//         console.log("Error", error);
//       });
//   };

//   return (
//     <>
//       <h2>Add Products</h2>
//       <div className="form">
//         <form onSubmit={handleSubmit} className='form-start'>
//           <div className='image-select'>
//             <input className='image-input' type="file" id="image" name="image" accept="image/*" onChange={handleImageChange} />
//           </div>
//           <div className='form-inputs'>
//             <div className="input-div">
//               <label className="form-label" htmlFor="category">Category:</label>
//               <Creatable className="dropdown" value={category} onChange={handleChangeCategory} options={categoryOptions} isSearchable={true} />
//             </div>
//             <div className="input-div">
//               <label className="form-label" htmlFor="productName">Product Name:</label>
//               <input className="form-control" type="text" id="productName" name="productName" placeholder="Product Name" value={productName} onChange={handleChangeProductName} />
//             </div>
//             <div className="input-div">
//               <label className="form-label" htmlFor="price">Price:</label>
//               <input className="form-control" type="number" id="price" name="price" placeholder="Price" value={price} onChange={handleChangePrice} />
//             </div>
//             <div className="input-div">
//               <label className="form-label" htmlFor="weight">Weight:</label>
//               <Creatable className="dropdown" value={weight} onChange={handleChangeWeight} options={weightOptions} isSearchable={true} />
//             </div>
//             <div className="input-div">
//               <label className="form-label" htmlFor="flavour">Flavour:</label>
//               <Creatable className="dropdown" value={flavour} onChange={handleChangeFlavour} options={flavourOptions} isSearchable={true} />
//             </div>
//             <div className='btn'>
//               <button type="submit"> {isEdit ? 'Update' : 'Add'}</button>
//             </div>
//           </div>
//         </form>
//       </div>

// <div className='products-container'>
//   {Object.keys(products.reduce((acc, product) => {
//     if (!acc[product.category]) {
//       acc[product.category] = [];
//     }
//     acc[product.category].push(product);
//     return acc;
//   }, {})).map((category, index) => (
//     <div key={index} className={`category-${category}`}>
//       <h2>{category}</h2>
//       <div className='header'>
//         <p > Name </p>
//         <p> Flavour </p>
//         <p> Price </p>
//         <p> Weight </p>

//       </div>
//       <div className='products-list'>
//         {products
//           .filter(product => product.category === category)
//           .map((product, index) => (
//             <div key={index} className='product-card'>
//               <div className='product-img'>
//                 <img src={product.image} alt={product.productName} />
//               </div>
//               <div className='product-details'>
//                 <p className='product-name'>{product.productName} </p>
//                 <p className='product-price'>{product.flavour} </p>
//                 <p className='product-info'>
//                   {product.price} Rs
//                 </p>
//                 <p>{product.weight} kg </p>
//                 </div>
//                 <div className='btns'>
//                 <div><FaPen className='pen' onClick={() => { setIsEdit(true); setEditId(product._id); }} /></div>

//                   <FaTrashAlt className='trash' onClick={()=>{deleteProduct(product._id)}}/>
//                 </div>
//             </div>
//           ))}
//       </div>
//     </div>
//   ))}
// </div>
//     </>
//   );
// };
