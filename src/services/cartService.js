import axios from 'axios';
import axiosInstance from '../axios';
import { checkIfUserIsLoggedIn } from '../middleware/middleware';
import { useNavigate } from "react-router-dom";
const API_URL = '/cart'; // Update with your actual API URL

const cartService = {
  // Get user's cart
  getCart: async () => {
    try {
      if(!checkIfUserIsLoggedIn){
        redirect("/login")
        return;
      }

      const response = await axiosInstance.get(`${API_URL}/getUserCart  `, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {    
      throw error.response?.data?.message || 'Failed to fetch cart';
    }
  },

  // Add item to cart
  addToCart: async (productId, quantity, price) => {
    console.log("fasgs")
    // console.log(checkIfUserIsLoggedIn())
    try {
      if (!checkIfUserIsLoggedIn()) {
        
        throw new Error("User not logged in");
      }

      // if(!checkIfUserIsLoggedIn()){
      //   // const navigate = useNavigate();
      //   console.log(checkIfUserIsLoggedIn())
      //   window.AbortControllerlocation.href = "/login"
      //   // navigate("/login");
      //   return;
      // }
      const response = await axiosInstance.post(
        `${API_URL}/addToCart`,
        { productId, quantity, price },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to add item to cart';
    }
  },

  // Remove item from cart
  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/removeItemFromCart/${productId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to remove item from cart';
    }
  },

  // Clear entire cart
  clearCart: async () => {
    try {
      const response = await axiosInstance.delete(`${API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response?.data?.message || 'Failed to clear cart';
    }
  },
};

export default cartService; 