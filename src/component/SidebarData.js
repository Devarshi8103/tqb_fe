import React from 'react'
import { FaBirthdayCake, FaCookie, FaCrosshairs, FaHome, FaIceCream, FaUtensils } from 'react-icons/fa'

export const SidebarData =[
    {
        path :   "/",
        name : "Home" , 
        icon : <FaHome /> 
    },
    {
      path :   "/cakes",
      name : "Cakes" , 
      icon : <FaBirthdayCake /> 
  },
  {
    path :   "/pastries",
    name : "Pastries" , 
    icon : <FaUtensils /> 
},
{
  path :   "/iceCream",
  name : "IceCream" , 
  icon : <FaIceCream /> 
},
{
  path :   "/biscuits",
  name : "Biscuits" , 
  icon : <FaCookie /> 
},

  ]

