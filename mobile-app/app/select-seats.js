import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { getSeats } from '../lib/api';

export default function SelectSeats() {
  const router = useRouter();
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [seats, setSeats] = useState([]);
  const [loading, setLoading] = useState(true);

  const seatPrice = 20;

  useEffect(() => {
    getSeats()
      .then((data) => {
        setSeats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch seats', err);
        setSeats([]);
        setLoading(false);
      });
  }, []);

  const toggleSeat = (seatId) => {
    setSelectedSeats((prev) =>
      prev.includes(seatId) ? prev.filter((id) => id !== seatId) : [...prev, seatId]
    );
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const handleProceed = () => {
    if (!selectedSeats.length) {
      alert('Please select a seat');
      return;
    }
    router.push({
      pathname: '/booking-summary',
      params: {
        selectedSeats: JSON.stringify(selectedSeats),
        subtotal: seatPrice * selectedSeats.length,
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}><Text style={{ color: '#ccc' }}>Loading seats...</Text></View>
    );
  }

  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.title}>Select Seat</Text>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#aaa' }]} /><Text style={styles.legendText}>Available</Text></View>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#444' }]}><Entypo name="cross" size={14} color="#fff" /></View><Text style={styles.legendText}>Unavailable</Text></View>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#fff' }]} /><Text style={styles.legendText}>Selected</Text></View>
      </View>

      {/* Screen View */}
      <View style={styles.screenContainer}><View style={styles.screenShape}><Text style={styles.screenText}>Screen</Text></View></View>

      {/* Seat Grid */}
      <View style={styles.gridWrapper}>
        {Object.keys(groupedSeats).map((row) => (
          <View key={row} style={styles.rowWrapper}>
            <Text style={styles.rowLabel}>{row}</Text>
            <View style={styles.rowSeats}>
              {groupedSeats[row].map((seat) => {
                const isSelected = selectedSeats.includes(seat.id);
                const isUnavailable = seat.status === 'unavailable';
                return (
                  <TouchableOpacity
                    key={seat.id}
                    style={[styles.seat, isSelected && styles.selected, isUnavailable && styles.unavailable]}
                    onPress={() => !isUnavailable && toggleSeat(seat.id)}
                    disabled={isUnavailable}
                  >
                    {isUnavailable && <Entypo name="cross" size={16} color="#fff" />}
                    {isSelected && !isUnavailable && <View style={styles.selectedDot} />}
                  </TouchableOpacity>
                );
              })}
            </View>
            <Text style={styles.rowLabel}>{row}</Text>
          </View>
        ))}
      </View>

      {/* Summary */}
      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>SEAT: {selectedSeats.join(', ')}</Text>
        <Text style={styles.summaryText}>SUB-TOTAL: RM{seatPrice * selectedSeats.length}</Text>
      </View>

      {/* Buttons */}
      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.btn, { backgroundColor: '#fff' }]}>
          <Text style={{ fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProceed} style={[styles.btn, { backgroundColor: '#888' }]}>
          <Text style={[styles.buttonText, { color: '#fff' }]}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginBottom: 16 },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  legend: { alignItems: 'center' },
  legendBox: { width: 20, height: 20, marginBottom: 4, justifyContent: 'center', alignItems: 'center' },
  legendText: { color: '#ccc', fontSize: 12 },
  screenContainer: { alignItems: 'center', marginBottom: 12 },
  screenShape: { width: '80%', height: 30, backgroundColor: '#444', borderTopLeftRadius: 80, borderTopRightRadius: 80, justifyContent: 'center', alignItems: 'center' },
  screenText: { color: '#fff', fontSize: 12 },
  gridWrapper: { marginBottom: 20 },
  rowWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rowLabel: { color: '#ccc', width: 20, textAlign: 'center', fontSize: 12 },
  rowSeats: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', flex: 1 },
  seat: { width: 30, height: 30, backgroundColor: '#aaa', borderRadius: 4, justifyContent: 'center', alignItems: 'center' },
  selected: { backgroundColor: '#fff' },
  unavailable: { backgroundColor: '#444' },
  selectedDot: { width: 10, height: 10, backgroundColor: '#000', borderRadius: 5 },
  summaryBox: { backgroundColor: '#000', borderTopWidth: 1, borderTopColor: '#fff', padding: 12, alignItems: 'center', marginBottom: 20 },
  summaryText: { color: '#fff', fontSize: 14, marginBottom: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, padding: 16, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },
});
