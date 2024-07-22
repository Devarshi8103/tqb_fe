import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Creatable from 'react-select/creatable';
import './Data.css';
import Loader from '../Loader';
import RevenueList from './RevenueList';
import {  FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';




export default function Data() {
  const [expenses, setExpenses] = useState([]);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    customer: null,
    month: null,
    year: null,
    category: null,
    flavour: null,
  });
  const [showModal, setShowModal] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState(null);

  useEffect(() => {
    const fetchExpenses = async () => {
      try {
        const response = await axios.get('https://tqb-be.onrender.com/expense/expense-data');
        const sortedExpenses = response.data.sort((a, b) => new Date(b.formattedDate) - new Date(a.formattedDate));
        setExpenses(sortedExpenses);
        setFilteredExpenses(sortedExpenses);
        setLoading(false); 
      } catch (error) {
        console.error('Error fetching expenses:', error);
      }
    };

    fetchExpenses();
  }, []);

  useEffect(() => {
    filterData();
  }, [filter]);

  const filterData = () => {
    let filtered = expenses;

    if (filter.customer) {
      filtered = filtered.filter(expense => expense.customerName === filter.customer.value);
    }

    if (filter.month) {
      filtered = filtered.filter(expense => new Date(expense.formattedDate).toISOString().slice(0, 7) === filter.month.value);
    }

    if (filter.year) {
      filtered = filtered.filter(expense => new Date(expense.formattedDate).getFullYear() === parseInt(filter.year.value, 10));
    }

    if (filter.category) {
      filtered = filtered.filter(expense => expense.category === filter.category.value);
    }

    if (filter.flavour) {
      filtered = filtered.filter(expense => expense.flavour === filter.flavour.value);
    }

    setFilteredExpenses(filtered);
  };

  const getUniqueCustomers = () => {
    return [...new Set(expenses.map(expense => expense.customerName))].map(customer => ({ value: customer, label: customer }));
  };

  const getUniqueMonths = () => {
    return [...new Set(expenses.map(expense => {
      const date = new Date(expense.formattedDate);
      return date.toISOString().slice(0, 7);
    }))].map(month => {
      const [year, monthNumber] = month.split('-');
      const date = new Date(year, monthNumber - 1);
      const formattedMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });
      return { value: month, label: formattedMonth };
    });
  };

  const getUniqueYears = () => {
    return [...new Set(expenses.map(expense => new Date(expense.formattedDate).getFullYear()))].map(year => ({ value: year, label: year }));
  };

  const getUniqueCategories = () => {
    return [...new Set(expenses.map(expense => expense.category))].map(category => ({ value: category, label: category }));
  };

  const getUniqueFlavours = () => {
    return [...new Set(expenses.map(expense => expense.flavour))].map(flavour => ({ value: flavour, label: flavour }));
  };

  const handleFilterChange = (selectedOption, actionMeta) => {
    setFilter(prevFilter => ({
      ...prevFilter,
      [actionMeta.name]: selectedOption,
    }));
  };

  const getUniqueDates = () => {
    const uniqueDates = [...new Set(filteredExpenses.map((expense) => expense.formattedDate))];
    return uniqueDates;
  };

  const groupExpensesByDateAndCustomer = () => {
    const groupedExpenses = {};
    filteredExpenses.forEach((expense) => {
      if (!groupedExpenses[expense.formattedDate]) {
        groupedExpenses[expense.formattedDate] = {};
      }
      if (!groupedExpenses[expense.formattedDate][expense.customerName]) {
        groupedExpenses[expense.formattedDate][expense.customerName] = {
          mobileNumber: expense.mobileNumber,
          expenses: [],
        };
      }
      groupedExpenses[expense.formattedDate][expense.customerName].expenses.push(expense);
    });
    return groupedExpenses;
  };

  const calculateTotalRevenue = (expenses) => {
    return expenses.reduce((total, expense) => total + (expense.price * expense.quantity), 0);
  };

  const getCustomerWiseTotalRevenue = () => {
    const customerWiseRevenue = {};
    filteredExpenses.forEach((expense) => {
      if (!customerWiseRevenue[expense.customerName]) {
        customerWiseRevenue[expense.customerName] = 0;
      }
      customerWiseRevenue[expense.customerName] += expense.price * expense.quantity;
    });
    return customerWiseRevenue;
  };

  const getDayWiseTotalRevenue = () => {
    const dayWiseRevenue = {};
    getUniqueDates().forEach((date) => {
      const dayExpenses = filteredExpenses.filter(expense => expense.formattedDate === date);
      dayWiseRevenue[date] = calculateTotalRevenue(dayExpenses);
    });
    return dayWiseRevenue;
  };

  const getMonthWiseTotalRevenue = () => {
    const monthWiseRevenue = {};
    filteredExpenses.forEach((expense) => {
      const month = new Date(expense.formattedDate).toISOString().slice(0, 7);
      const [year, monthNumber] = month.split('-');
      const date = new Date(year, monthNumber - 1);
      const formattedMonth = date.toLocaleString('default', { month: 'long', year: 'numeric' });

      if (!monthWiseRevenue[formattedMonth]) {
        monthWiseRevenue[formattedMonth] = 0;
      }
      monthWiseRevenue[formattedMonth] += expense.price * expense.quantity;
    });
    return monthWiseRevenue;
  };

  const getYearWiseTotalRevenue = () => {
    const yearWiseRevenue = {};
    filteredExpenses.forEach((expense) => {
      const year = new Date(expense.formattedDate).getFullYear();
      if (!yearWiseRevenue[year]) {
        yearWiseRevenue[year] = 0;
      }
      yearWiseRevenue[year] += expense.price * expense.quantity;
    });
    return yearWiseRevenue;
  };

  const getCategoryWiseTotalRevenue = () => {
    const categoryWiseRevenue = {};
    filteredExpenses.forEach((expense) => {
      const category = expense.category;
      if (!categoryWiseRevenue[category]) {
        categoryWiseRevenue[category] = 0;
      }
      categoryWiseRevenue[category] += expense.price * expense.quantity;
    });
    return categoryWiseRevenue;
  };

  const getFlavourWiseTotalRevenue = () => {
    const flavourWiseRevenue = {};
    filteredExpenses.forEach((expense) => {
      const flavour = expense.flavour;
      if (!flavourWiseRevenue[flavour]) {
        flavourWiseRevenue[flavour] = 0;
      }
      flavourWiseRevenue[flavour] += expense.price * expense.quantity;
    });
    return flavourWiseRevenue;
  };

  const handleExpenseDoubleClick = (expense) => {
    setExpenseToDelete(expense);
    setShowModal(true);
  };

  const handleDeleteExpense = async () => {
    try {
      await axios.delete(`https://tqb-be.onrender.com/expense/${expenseToDelete._id}`);
      setExpenses(expenses.filter(exp => exp._id !== expenseToDelete._id));
      setFilteredExpenses(filteredExpenses.filter(exp => exp._id !== expenseToDelete._id));
      setShowModal(false);
      setExpenseToDelete(null);
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  const sortRevenue = [
    {  name:"Year",
      title :"Year",
       list :getYearWiseTotalRevenue(),
      
    },
    {  name:'Month',
      title :"Month",
       list :getMonthWiseTotalRevenue(),
      
    },
    {  name:'Customer',
      title :"Customer",
       list :getCustomerWiseTotalRevenue(),
      
    },
    {  name:'Category',
      title :"Category",
       list :getCategoryWiseTotalRevenue(),
      
    },
    {  name:'Flavour',
      title :"Flavour",
       list :getFlavourWiseTotalRevenue(),
      
    },
    
    
    ]

  const [active , setActive] = useState(false);
  const [title , setTitle] = useState('');
  const [list , setList] = useState();

  const handleActive = (t , l )=>{
    setActive(true);
    setTitle(t);
    setList(l);
  }
const handleArrowClick = ()=>{
  setActive(false);
  setTitle('');
  setList();
  
}
const handleLeftArrow = ()=>{
  navigate('/admin/home');
}

  return (
     
    <div className="expenses-div">
       <FaArrowLeft  className={`left-arrow ${active}`}  onClick={()=>handleLeftArrow()}  size={20}/>
   
     <div  className='expense-header-left-arrow'> 
     <div className={`left-arrow-ex ${active} `} > {
       <FaArrowLeft  size={20} onClick={()=>handleArrowClick()}/>
      }</div>
      <h2 className='expense-manager'>Expense Manager</h2>
   
      </div>
    
     <div className='type-div data'>
        
        {sortRevenue.map((sr , index)=>(
      <div key={index} className={`types-div ${active}`} onClick={()=> handleActive(sr.title ,sr.list ) } >
              <p className={`type-block ${title === sr.name  ? 'active' : ''}`}  > {sr.name} </p>
  
            </div> ))}

            </div>

            { active ? ( 
              <RevenueList title={title} revenueData={list} />
             ) :
            (  <>
               
          



         
      <div className="filters">
        <label className='label-table'>
          <div>Customer:</div>
          <div className="select-container">
            <Creatable
              name="customer"
              value={filter.customer}
              onChange={handleFilterChange}
              options={getUniqueCustomers()}
              isClearable
            />
          </div>
        </label>

        <label className='label-table'>
          <div>Month:</div>
          <div className="select-container">
            <Creatable
              name="month"
              value={filter.month}
              onChange={handleFilterChange}
              options={getUniqueMonths()}
              isClearable
            />
          </div>
        </label>

        <label className='label-table'>
          <div>Year:</div>
          <div className="select-container">
            <Creatable
              name="year"
              value={filter.year}
              onChange={handleFilterChange}
              options={getUniqueYears()}
              isClearable
            />
          </div>
        </label>

        <label className='label-table'>
          <div>Category:</div>
          <div className="select-container">
            <Creatable
              name="category"
              value={filter.category}
              onChange={handleFilterChange}
              options={getUniqueCategories()}
              isClearable
            />
          </div>
        </label>

        <label className='label-table'>
          <div>Flavour:</div>
          <div className="select-container">
            <Creatable
              name="flavour"
              value={filter.flavour}
              onChange={handleFilterChange}
              options={getUniqueFlavours()}
              isClearable
            />
          </div>
        </label>
      </div>

      {filter.customer && (
        <>
          <div className='filter-wise-div'>
            <ul className='customer-list'>
              {Object.entries(getCustomerWiseTotalRevenue()).length > 0 ? (
                Object.entries(getCustomerWiseTotalRevenue()).map(([customerName, totalRevenue]) => (
                  <li className='filter-wise' key={customerName}>
                    <span className='customer-name'>{customerName}:</span>
                    <span className='filter-wise-total'>{totalRevenue} Rs</span>
                  </li>
                ))
              ) : (
                <li className='filter-wise'>
                  <span className='customer-name'>No Data</span>
                </li>
              )}
            </ul>
            <hr />
            <ul className='category-data-list'>
              {Object.entries(getCategoryWiseTotalRevenue()).map(([category, totalRevenue]) => (
                <li className='filter-wise' key={category}>
                  <span className='category-data-name'>{category}:</span>
                  <span className='filter-wise-total'>{totalRevenue} Rs</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {filter.month && (
        <>
          <div className='filter-wise-div'>
            <ul className='customer-list'>
              {Object.entries(getMonthWiseTotalRevenue()).length > 0 ? (
                Object.entries(getMonthWiseTotalRevenue()).map(([month, totalRevenue]) => (
                  <li className='filter-wise' key={month}>
                    <span className='customer-name'>{month}:</span>
                    <span className='filter-wise-total'>{totalRevenue} Rs</span>
                  </li>
                ))
              ) : (
                <li className='filter-wise'>
                  <span className='customer-name'>No Data</span>
                </li>
              )}
            </ul>
            <hr />
            <ul className='category-data-list'>
              {Object.entries(getCategoryWiseTotalRevenue()).map(([category, totalRevenue]) => (
                <li className='filter-wise' key={category}>
                  <span className='category-data-name'>{category}:</span>
                  <span className='filter-wise-total'>{totalRevenue} Rs</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {filter.year && (
        <>
          <div className='filter-wise-div'>
            <ul className='customer-list'>
              {Object.entries(getYearWiseTotalRevenue()).length > 0 ? (
                Object.entries(getYearWiseTotalRevenue()).map(([year, totalRevenue]) => (
                  <li className='filter-wise' key={year}>
                    <span className='customer-name'>{year}:</span>
                    <span className='filter-wise-total'>{totalRevenue} Rs</span>
                  </li>
                ))
              ) : (
                <li className='filter-wise'>
                  <span className='customer-name'>No Data</span>
                </li>
              )}
            </ul>
            <hr />
            <ul className='category-data-list'>
              {Object.entries(getCategoryWiseTotalRevenue()).map(([category, totalRevenue]) => (
                <li className='filter-wise' key={category}>
                  <span className='category-data-name'>{category}:</span>
                  <span className='filter-wise-total'>{totalRevenue} Rs</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {filter.category && (
        <>
          <div className='filter-wise-div'>
            <ul className='customer-list'>
              {Object.entries(getCategoryWiseTotalRevenue()).length > 0 ? (
                Object.entries(getCategoryWiseTotalRevenue()).map(([category, totalRevenue]) => (
                  <li className='filter-wise' key={category}>
                    <span className='customer-name'>{category}:</span>
                    <span className='filter-wise-total'>{totalRevenue} Rs</span>
                  </li>
                ))
              ) : (
                <li className='filter-wise'>
                  <span className='customer-name'>No Data</span>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      {filter.flavour && (
        <>
          <div className='filter-wise-div'>
            <ul className='customer-list'>
              {Object.entries(getFlavourWiseTotalRevenue()).length > 0 ? (
                Object.entries(getFlavourWiseTotalRevenue()).map(([flavour, totalRevenue]) => (
                  <li className='filter-wise' key={flavour}>
                    <span className='customer-name'>{flavour}:</span>
                    <span className='filter-wise-total'>{totalRevenue} Rs</span>
                  </li>
                ))
              ) : (
                <li className='filter-wise'>
                  <span className='customer-name'>No Data</span>
                </li>
              )}
            </ul>
          </div>
        </>
      )}

      <h2 className='expense-history'>Expenses History</h2>
      {loading ? (
        <Loader />
      ) : (
        <div className="expense-items">
          {getUniqueDates().map((date) => (
            <div key={date} className="date-card">
              <div className="date-header">
                <h3 className='date-info'>{date}</h3>
                <span className="date-total">
                  {Object.entries(getDayWiseTotalRevenue()).map(([d, totalRevenue]) => (
                    <div key={d}>{d === date ? (<span className='total-month-revenue'>{totalRevenue} Rs</span>) : null}</div>
                  ))}
                </span>
              </div>
              {Object.entries(groupExpensesByDateAndCustomer()[date]).map(([customerName, customerData]) => (
                <div key={customerName} className="customer-card">
                  <div className='customer-info-div'>
                    <div>Customer Name: <b>{customerName}</b></div>
                    <div className='mobile-no'>{customerData.mobileNumber && <p>Mobile No: {customerData.mobileNumber}</p>}</div>
                  </div>
                  <div >
                  <table className="customer-expenses">
  <thead>
    <tr className='tr-head'>
      <th>Category</th>
      <th>Product Name</th>
      <th>Price</th>
      <th>Weight</th>
      <th>Quantity</th>
      <th>Total</th>
    </tr>
  </thead>
  <tbody>
    {customerData.expenses.map((expense) => (
      <tr key={expense._id} className="expense-item" onDoubleClick={() => handleExpenseDoubleClick(expense)}>
        <td><div className="td-scroll">{expense.category}</div></td>
        <td><div className="td-scroll">{expense.productName}</div></td>
        <td><div className="td-scroll">{expense.price} Rs</div></td>
        <td><div className="td-scroll">{expense.weight * 1000} gm</div></td>
        <td><div className="td-scroll">{expense.quantity}</div></td>
        <td><div className="td-scroll">{expense.quantity * expense.price} Rs</div></td>
      </tr>
    ))}
  </tbody>
</table>

                    <div className="total-revenue">
                      Total Cost: {calculateTotalRevenue(customerData.expenses)} Rs
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>Confirm Deletion</h2>
            <p>Are you sure you want to delete this expense?</p>
            <div className="modal-actions">
              <button className='modal-delete-btn' onClick={handleDeleteExpense}>Delete</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
              </>

)

}
    </div>
    
  );
}


