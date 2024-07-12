import React, { useEffect, useState } from 'react';
import './ViewAllBill.css';
import axios from 'axios'; 
import Loader from '../Loader';
import {   FaTrash, FaWhatsapp} from 'react-icons/fa';


export default function ViewAllBill({reload}) {
    const [groupedBills, setGroupedBills] = useState({});
    const [loading , setLoading]= useState(true); 

    useEffect(() => {
        const fetchBills = async () => {
            try {
                const response = await axios.get('https://tqb-be.onrender.com/invoice');
                const sortedBills = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
                
                const billsByDate = sortedBills.reduce((acc, bill) => {
                    const date = new Date(bill.date).toLocaleDateString('en-GB', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric'
                    });
                    if (!acc[date]) {
                        acc[date] = [];
                    }
                    acc[date].push(bill);
                    return acc;
                }, {});
                setGroupedBills(billsByDate);
                setLoading(false);
               
            } catch (error) {
                console.log("Error fetching bills", error);
            }
        };

        fetchBills();
    }, [reload]); 

    const handleViewBill = (billId) => {
        const url = `https://thequeenbaker.netlify.app/invoiceViewer/${billId}`;
        window.open(url, '_blank'); 
    };

    const handleDeleteBill = async (billId) => {
        setGroupedBills(true);
        try {
            await axios.delete(`https://tqb-be.onrender.com/invoice/${billId}`);
            // Update state to remove the deleted bill
            const updatedBills = Object.entries(groupedBills).reduce((acc, [date, bills]) => {
                const filteredBills = bills.filter(bill => bill._id !== billId);
                if (filteredBills.length > 0) {
                    acc[date] = filteredBills;
                }
                return acc;
            }, {});
            setGroupedBills(updatedBills);
            setLoading(false);
        } catch (error) {
            console.log("Error deleting bill", error);
        }
    };

   const  handleShareBill = (id, customerName , mobileNumber)=>{

    const url = `https://thequeenbaker.netlify.app/invoiceViewer/${id}`;
    const message = `Hi ${customerName}, \n\nView your Bill here: ${url} \n\nThanks For Shopping From \n *The Queen Baker* \n#WeBakeHappiness`;

    const whatsappUrl = `https://wa.me/91${mobileNumber}?text=${encodeURIComponent(message)}`;

    // setMsg(whatsappUrl);
    window.open(whatsappUrl, '_blank');



   }

    return (
        <div>


            { loading ? <> <Loader/></>  : Object.entries(groupedBills).map(([date, bills], index) => (
                <div key={index}>
                    {/* Date header */}
                    <div className='date-header-bill' >
                        <h2>{date}</h2>
                    </div>
                    {/* List of bills for the date */}
                    {bills.map((bill, billIndex) => (
                        <div key={billIndex} className='Name-mobile-bill'>
                            <p className='name-on-bill'><b>{bill.customerName}</b></p>
                            <p className='mobile-on-bill'><b>{bill.mobileNumber}</b></p>
                            <button className='view-bill' onClick={() => handleViewBill(bill._id)}> View </button>
                            <span className='delete-bill' onClick={() => handleDeleteBill(bill._id)}> <FaTrash size={20}/> </span>
                            <span className='share-bill' onClick={() => handleShareBill(bill._id , bill.customerName ,bill.mobileNumber  )}> <FaWhatsapp size={20}/> </span>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
