import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);

  useEffect(() => {
    loadWishlist();
  }, []);

  const loadWishlist = async () => {
    try {
      const wishlist = await AsyncStorage.getItem('wishlist');
      if (wishlist !== null) {
        setWishlistItems(JSON.parse(wishlist));
      }
    } catch (e) {
      console.log('Error loading wishlist:', e);
    }
  };

  const addToWishlist = async (item) => {
    const updatedWishlist = [...wishlistItems, item];
    setWishlistItems(updatedWishlist);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  const removeFromWishlist = async (id) => {
    const updatedWishlist = wishlistItems.filter((item) => item.id !== id);
    setWishlistItems(updatedWishlist);
    await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
