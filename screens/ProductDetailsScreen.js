import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Button, ScrollView } from 'react-native';
import { CartContext } from '../contexts/CartContext';
import { WishlistContext } from '../contexts/WishlistContext';

const ProductDetailsScreen = ({ route }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const { addToWishlist } = useContext(WishlistContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.title}>{product.title}</Text>
      <Text style={styles.price}>${product.price}</Text>
      <Text style={styles.description}>{product.description}</Text>
      <View style={styles.buttonContainer}>
        <Button title="Add to Cart" onPress={() => addToCart(product)} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Add to Wishlist" onPress={() => addToWishlist(product)} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, alignItems: 'center' },
  image: { width: 200, height: 200, resizeMode: 'contain', marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 },
  price: { fontSize: 16, color: '#888', marginBottom: 10 },
  description: { fontSize: 14, textAlign: 'center', marginBottom: 20 },
  buttonContainer: { marginVertical: 5, width: '80%' },
});

export default ProductDetailsScreen;
