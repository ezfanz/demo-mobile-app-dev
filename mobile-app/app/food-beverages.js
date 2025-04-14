import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

const foodItems = [
  { id: 1, name: 'Fresh XL Combo', price: 5400, description: 'Double large popcorn and 4 pepsi', category: 'Combo', discount: '10%' },
  { id: 2, name: 'Tasty Combo', price: 3500, description: '2 Shawarma, fries & Pepsi', category: 'Combo' },
  { id: 3, name: 'Yummy combo', price: 6500, description: '2 hotdogs, 2 Lays chips & 4 pepsi', category: 'Food/Snacks' },
  { id: 4, name: 'Fresh Combo', price: 2500, description: 'Large popcorn & candy with pepsi', category: 'Beverages' },
];

export default function FoodBeverages() {
  const router = useRouter();
  const { movieId, location, cinemaLocation, bookingTime, selectedSeats, subtotal } = useLocalSearchParams();

  const [activeTab, setActiveTab] = useState('Combo');
  const [cart, setCart] = useState({});

  const handleQuantityChange = (id, delta) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [id]: newQty };
    });
  };

  const totalFoodCost = Object.entries(cart).reduce((sum, [id, qty]) => {
    const item = foodItems.find(f => f.id === parseInt(id));
    return sum + (item?.price || 0) * qty;
  }, 0);

  const itemCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);

  const handleConfirm = () => {
    router.push({
      pathname: '/payment',
      params: {
        movieId,
        location,
        cinemaLocation,
        bookingTime,
        selectedSeats,
        subtotal: parseInt(subtotal) + totalFoodCost,
      },
    });
  };

  const handleSkip = () => {
    router.push({
      pathname: '/payment',
      params: {
        movieId,
        location,
        cinemaLocation,
        bookingTime,
        selectedSeats,
        subtotal,
      },
    });
  };

  const filteredItems = foodItems.filter(item => item.category === activeTab);

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.back}>←</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Beverages & Food</Text>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skip}>Skip →</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
        {['Combo', 'Food/Snacks', 'Beverages'].map(tab => (
          <TouchableOpacity key={tab} onPress={() => setActiveTab(tab)} style={[styles.tab, activeTab === tab && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView contentContainerStyle={styles.itemsContainer}>
        {filteredItems.map(item => (
          <View key={item.id} style={styles.item}>
            <View style={styles.imagePlaceholder} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemDesc}>{item.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.price}>RM{item.price.toLocaleString()}</Text>
                {item.discount && <Text style={styles.discount}>{item.discount} off</Text>}
              </View>
              <View style={styles.qtyRow}>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, -1)} style={styles.qtyBtn}><Text style={styles.qtyText}>-</Text></TouchableOpacity>
                <Text style={styles.qtyCount}>{cart[item.id] || 0}</Text>
                <TouchableOpacity onPress={() => handleQuantityChange(item.id, 1)} style={styles.qtyBtn}><Text style={styles.qtyText}>+</Text></TouchableOpacity>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Footer Summary */}
      <View style={styles.footer}>
        <View style={styles.summary}>
          <Text style={styles.footerLabel}>ITEM</Text>
          <Text style={styles.footerValue}>{itemCount}</Text>
          <Text style={styles.footerLabel}>SUB-TOTAL</Text>
          <Text style={styles.footerValue}>RM{totalFoodCost.toLocaleString()}</Text>
        </View>
        <TouchableOpacity onPress={handleConfirm} style={styles.confirmBtn}>
          <Text style={styles.confirmText}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 16, alignItems: 'center' },
  back: { color: '#fff', fontSize: 18 },
  headerTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  skip: { color: '#fff', fontSize: 14 },
  tabs: { flexDirection: 'row', borderBottomWidth: 1, borderColor: '#222' },
  tab: { flex: 1, padding: 12, alignItems: 'center' },
  tabText: { color: '#aaa' },
  activeTab: { borderBottomWidth: 2, borderColor: '#fff' },
  activeTabText: { color: '#fff' },
  itemsContainer: { padding: 16 },
  item: { flexDirection: 'row', backgroundColor: '#111', borderRadius: 10, padding: 10, marginBottom: 12 },
  imagePlaceholder: { width: 80, height: 80, backgroundColor: '#444', borderRadius: 8, marginRight: 12 },
  itemName: { color: '#fff', fontWeight: 'bold' },
  itemDesc: { color: '#aaa', fontSize: 12, marginBottom: 4 },
  priceRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  price: { color: '#fff' },
  discount: { color: 'orange', fontSize: 12 },
  qtyRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  qtyBtn: { backgroundColor: '#333', paddingHorizontal: 10, paddingVertical: 4, borderRadius: 4 },
  qtyText: { color: '#fff' },
  qtyCount: { marginHorizontal: 10, color: '#fff' },
  footer: { borderTopWidth: 1, borderTopColor: '#222', paddingVertical: 12, paddingHorizontal: 16, backgroundColor: '#000' },
  summary: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  footerLabel: { color: '#aaa', fontSize: 14 },
  footerValue: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
  confirmBtn: { backgroundColor: '#888', borderRadius: 8, alignItems: 'center', padding: 16 },
  confirmText: { color: '#fff', fontWeight: 'bold' },
});
