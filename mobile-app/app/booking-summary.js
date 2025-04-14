import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image, TextInput } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getMovieById } from '../lib/api'; 
import { useEffect, useState } from 'react';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function BookingSummary() {
  const router = useRouter();
  const { movieId, location, cinemaLocation, bookingTime, selectedSeats, subtotal } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [endTime, setEndTime] = useState('');

  const serviceCharge = 50;
  const foodBeverage = 5400;
  const total = Number(subtotal) + serviceCharge + foodBeverage;

  useEffect(() => {
    getMovieById(movieId).then((data) => {
      setMovie(data);

      const time = calculateEndTime(bookingTime, data.duration); 
      setEndTime(time);
    });
  }, []);

    const calculateEndTime = (start, durationInMinutes) => {
        if (!start || !durationInMinutes) return '';

        const [time, period] = start.split(/(?=[AP]M)/);
        const [hour, minute] = time.split(':').map(Number);
        const startTime = new Date();
        const offsetHour = period === 'PM' && hour !== 12 ? hour + 12 : hour;
        startTime.setHours(offsetHour);
        startTime.setMinutes(minute);

        // Add duration in minutes
        startTime.setMinutes(startTime.getMinutes() + parseInt(durationInMinutes));

        return startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

  if (!movie) return <Text style={{ color: '#fff', padding: 16 }}>Loading...</Text>;

  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={styles.container}>
      <Text style={styles.title}>Booking Summary</Text>

          {/* Back Button */}
          <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 10 }}>
              <Ionicons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>


      {/* Ticket Stub */}
      <View style={styles.ticketBox}>
        <View style={styles.ticketTop}>
          <View style={styles.posterPlaceholder} />
          <View style={{ flex: 1 }}>
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <Text style={styles.movieMeta}>{movie.genre}</Text>
            <Text style={styles.movieMeta}>{movie.runtime}</Text>
            <Text style={styles.movieMeta}>English, IMDb 3D</Text>
            <Text style={styles.movieMeta}>Classic Tickets</Text>
          </View>
        </View>

        <View style={styles.dottedDivider} />

        <View style={styles.ticketBottom}>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Cinema</Text>
            <Text style={styles.infoValue}>{cinemaLocation}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Date</Text>
            <Text style={styles.infoValue}>{new Date().toDateString()}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Seat</Text>
            <Text style={styles.infoValue}>{JSON.parse(selectedSeats).join(', ')}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>Start</Text>
            <Text style={styles.infoValue}>{bookingTime}</Text>
          </View>
          <View style={styles.infoBlock}>
            <Text style={styles.infoLabel}>End</Text>
            <Text style={styles.infoValue}>{endTime}</Text>
          </View>
        </View>
      </View>

      {/* Pricing Breakdown */}
      <View style={styles.breakdownBox}>
        <Text style={styles.breakdownTitle}>Tickets</Text>
        <View style={styles.priceRow}>
          <Text style={styles.breakdownText}>Classic tickets [x{JSON.parse(selectedSeats).length}]</Text>
          <Text style={styles.breakdownText}>RM {subtotal}</Text>
        </View>

        <Text style={styles.breakdownTitle}>Food & Beverage</Text>
        <View style={styles.priceRow}>
          <Text style={styles.breakdownText}>Fresh XL Combo [x2]</Text>
          <Text style={styles.breakdownText}>RM {foodBeverage}</Text>
        </View>

        <Text style={styles.breakdownTitle}>Charges</Text>
        <View style={styles.priceRow}>
          <Text style={styles.breakdownText}>Service charge</Text>
          <Text style={styles.breakdownText}>RM {serviceCharge}</Text>
        </View>

        <TextInput placeholder="Promo Code" placeholderTextColor="#aaa" style={styles.promoInput} />
      </View>

      {/* Total & Button */}
      <View style={styles.totalBox}>
        <Text style={styles.totalText}>Total Amount Payable</Text>
        <Text style={styles.totalAmount}>RM {total}</Text>
      </View>

          <TouchableOpacity
              style={styles.proceedBtn}
              onPress={() => {
                  router.push({
                      pathname: '/food-beverages',
                      params: {
                          movieId,
                          location,
                          cinemaLocation,
                          bookingTime,
                          selectedSeats,
                          subtotal,
                      },
                  });
              }}
          >
              <Text style={styles.proceedText}>Proceed to payment</Text>
          </TouchableOpacity>
      </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 16 },
  ticketBox: { backgroundColor: '#111', borderRadius: 8, marginBottom: 20 },
  ticketTop: { flexDirection: 'row', padding: 16 },
  posterPlaceholder: { width: 80, height: 100, backgroundColor: '#444', borderRadius: 8, marginRight: 12 },
  movieTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
  movieMeta: { color: '#ccc', fontSize: 12, marginTop: 2 },
  dottedDivider: { borderTopWidth: 1, borderColor: '#333', borderStyle: 'dashed', marginHorizontal: 16 },
  ticketBottom: { padding: 16, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  infoBlock: { width: '45%', marginBottom: 12 },
  infoLabel: { fontSize: 12, color: '#aaa' },
  infoValue: { fontSize: 14, color: '#fff' },
  breakdownBox: { backgroundColor: '#111', borderRadius: 8, padding: 16, marginBottom: 20 },
  breakdownTitle: { fontSize: 14, color: '#ccc', marginTop: 8 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 },
  breakdownText: { color: '#fff', fontSize: 13 },
  promoInput: { backgroundColor: '#333', color: '#fff', padding: 10, borderRadius: 6, marginTop: 12 },
  totalBox: { alignItems: 'center', marginBottom: 20 },
  totalText: { fontSize: 14, color: '#ccc' },
  totalAmount: { fontSize: 20, fontWeight: 'bold', color: '#fff', marginTop: 4 },
  proceedBtn: { backgroundColor: '#888', padding: 16, borderRadius: 8, alignItems: 'center' },
  proceedText: { fontWeight: 'bold', color: '#fff' },
});
