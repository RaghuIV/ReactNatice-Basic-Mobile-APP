import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet, TextInput, Button } from 'react-native';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) =>
        product.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const fetchProducts = async () => {
    try {
      const res = await fetch('https://fakestoreapi.com/products');
      const data = await res.json();
      setProducts(data);
      setFilteredProducts(data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.itemContainer}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.navButtons}>
        <Button title="Cart" onPress={() => navigation.navigate('Cart')} />
        <Button title="Wishlist" onPress={() => navigation.navigate('Wishlist')} />
      </View>
      <TextInput
       style={styles.searchInput}
      placeholder="Search for products..."
      placeholderTextColor="#888"
      value={searchQuery}
     onChangeText={setSearchQuery}
       />
      <FlatList
        data={filteredProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  navButtons: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 },
  itemContainer: { flex: 1, margin: 5, backgroundColor: '#f8f8f8', padding: 10, borderRadius: 8 },
  image: { width: '100%', height: 100, resizeMode: 'contain' },
  title: { fontSize: 14, marginVertical: 5 },
  price: { fontWeight: 'bold' },
    searchInput: {
    height: 60,
    backgroundColor: '#f1f1f1', 
    borderRadius: 20,      
    paddingHorizontal: 20,    
    marginBottom: 10,
    fontSize: 16,
    color: '#333',
  },
});

export default ProductListScreen;
