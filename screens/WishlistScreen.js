import React, { useContext } from 'react';
import { View, Text, FlatList, StyleSheet, Button } from 'react-native';
import { WishlistContext } from '../contexts/WishlistContext';

const WishlistScreen = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.price}>${item.price}</Text>
      <Button title="Remove" onPress={() => removeFromWishlist(item.id)} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={wishlistItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  itemContainer: { padding: 10, borderBottomWidth: 1, borderColor: '#ccc' },
  title: { fontSize: 16 },
  price: { fontSize: 14, color: '#888' },
});

export default WishlistScreen;
