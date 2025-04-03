import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { CartContext } from '../contexts/CartContext';

const CartScreen = () => {
  const { cartItems, removeFromCart, getTotal } = useContext(CartContext);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Button title="Remove" onPress={() => removeFromCart(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
      <Text style={styles.total}>Total: ${getTotal().toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  itemContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16 },
  price: { fontSize: 14, color: '#888' },
  total: { fontSize: 18, fontWeight: 'bold', textAlign: 'center', marginTop: 20 },
});

export default CartScreen;
