import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Ionicons, Entypo } from '@expo/vector-icons';
import { getSeats } from '../lib/api';

export default function BookingScreen() {
  const router = useRouter();
  const { movieId } = useLocalSearchParams();

  const [location, setLocation] = useState('');
  const [cinemaLocation, setCinemaLocation] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [seats, setSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [loadingSeats, setLoadingSeats] = useState(true);

  const [locationOpen, setLocationOpen] = useState(false);
  const [cinemaOpen, setCinemaOpen] = useState(false);

  const seatPrice = 20;

  const [refreshing, setRefreshing] = useState(false);


  const [locationItems, setLocationItems] = useState([
    { label: 'Kuala Lumpur', value: 'Kuala Lumpur' },
    { label: 'Petaling Jaya', value: 'Petaling Jaya' },
    { label: 'Putrajaya', value: 'Putrajaya' },
    { label: 'Shah Alam', value: 'Shah Alam' },
  ]);

  const locations = [
    { name: 'Kuala Lumpur', cinemas: ['GSC Mid Valley'] },
    { name: 'Petaling Jaya', cinemas: ['TGV 1 Utama'] },
    { name: 'Putrajaya', cinemas: ['GSC IOI City Mall'] },
    { name: 'Shah Alam', cinemas: ['MBO Setia City Mall'] },
  ];


  const [cinemaItems, setCinemaItems] = useState([]);

  const times = ['9:20AM', '11:40AM', '1:30PM', '3:30PM', '5:40PM', '7:30PM', '9:20PM'];

  useEffect(() => {
    const fetchSeats = () => {
      setRefreshing(true);
      getSeats()
        .then((data) => {
          setSeats(data);
          setLoadingSeats(false);
        })
        .catch((err) => {
          console.error('Error fetching seats:', err);
          setLoadingSeats(false);
        })
        .finally(() => {
          setRefreshing(false);
        });
    };

    fetchSeats();
    const intervalId = setInterval(fetchSeats, 5000);

    return () => clearInterval(intervalId);
  }, []);



  const toggleSeat = (seatId) => {
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(id => id !== seatId) : [...prev, seatId]
    );
  };

  const groupedSeats = seats.reduce((acc, seat) => {
    if (!acc[seat.row]) acc[seat.row] = [];
    acc[seat.row].push(seat);
    return acc;
  }, {});

  const handleProceed = () => {
    if (!location || !cinemaLocation || !bookingTime || selectedSeats.length === 0) {
      alert('Please complete all selections.');
      return;
    }

    router.push({
      pathname: '/booking-summary',
      params: {
        movieId,
        location,
        cinemaLocation,
        bookingTime,
        selectedSeats: JSON.stringify(selectedSeats),
        subtotal: seatPrice * selectedSeats.length,
      },
    });
  };

  return (
    <ScrollView style={{ backgroundColor: '#000' }} contentContainerStyle={{ padding: 16 }}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => router.back()} style={{ marginBottom: 10 }}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Text style={styles.title}>Ticket Booking</Text>

      {/* Top Subheading */}
      <Text style={styles.subheading}>Where would you like to see the movie? Kindly select as appropriate</Text>

      {/* Ticket Pricing Boxes */}
      <View style={styles.ticketBoxContainer}>
        <View style={styles.ticketBox}><Text style={styles.ticketLabel}>Tickets from</Text><Text style={styles.ticketPrice}>NGN 2000 - NGN 5000</Text></View>
        <View style={styles.ticketBox}><Text style={styles.ticketLabel}>Tickets from</Text><Text style={styles.ticketPrice}>NGN 1500 - NGN 4500</Text></View>
      </View>

      <Text style={styles.label}>Location</Text>
      <View style={{ zIndex: 3000, marginBottom: 16 }}>
        <DropDownPicker
          open={locationOpen}
          value={location}
          items={locationItems}
          setOpen={setLocationOpen}
          setValue={setLocation}
          setItems={setLocationItems}
          placeholder="Select Location"
          onChangeValue={(value) => {
            setLocation(value);
            setCinemaLocation(null);
            const cinemas = locations.find(loc => loc.name === value)?.cinemas || [];
            setCinemaItems(cinemas.map(c => ({ label: c, value: c })));
          }}
          listMode="SCROLLVIEW"
        />
      </View>

      <Text style={styles.label}>Cinema Location</Text>
      <View style={{ zIndex: 2000, marginBottom: 16 }}>
        <DropDownPicker
          open={cinemaOpen}
          value={cinemaLocation}
          items={cinemaItems}
          setOpen={setCinemaOpen}
          setValue={setCinemaLocation}
          setItems={setCinemaItems}
          placeholder="Select Cinema Hall"
          disabled={!location}
          listMode="SCROLLVIEW"
        />
      </View>


      <Text style={styles.label}>Select a date</Text>
      <DateTimePicker value={selectedDate} mode="date" display="default" onChange={(e, date) => date && setSelectedDate(date)} />

      <Text style={styles.label}>Available Time</Text>
      <View style={styles.timeContainer}>
        {times.map((time) => (
          <TouchableOpacity key={time} style={[styles.timeSlot, bookingTime === time && styles.selectedTime]} onPress={() => setBookingTime(time)}>
            <Text style={styles.timeText}>{time}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {refreshing && (
        <View style={{ marginBottom: 10, alignItems: 'center' }}>
          <ActivityIndicator size="small" color="#aaa" />
          <Text style={{ color: '#aaa', fontSize: 12, marginTop: 4 }}>Refreshing seats...</Text>
        </View>
      )}


      <Text style={styles.title}>Select Seat</Text>
      <View style={styles.legendContainer}>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#aaa' }]} /><Text style={styles.legendText}>Available</Text></View>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#444' }]}><Entypo name="cross" size={14} color="#fff" /></View><Text style={styles.legendText}>Unavailable</Text></View>
        <View style={styles.legend}><View style={[styles.legendBox, { backgroundColor: '#fff' }]} /><Text style={styles.legendText}>Selected</Text></View>
      </View>

      <View style={styles.screenContainer}>
        <View style={styles.screenShape}>
          <Text style={styles.screenText}>Screen</Text>
        </View>
      </View>


      {loadingSeats ? <ActivityIndicator color="#fff" /> : (
        <View style={styles.gridWrapper}>
          {Object.keys(groupedSeats).map((row) => (
            <View key={row} style={styles.rowWrapper}>
              <Text style={styles.rowLabel}>{row}</Text>
              <View style={styles.rowSeats}>
                {groupedSeats[row].map((seat) => {
                  const isSelected = selectedSeats.includes(seat.id);
                  const isUnavailable = seat.status === 'unavailable';
                  return (
                    <TouchableOpacity key={seat.id} style={[styles.seat, isSelected && styles.selected, isUnavailable && styles.unavailable]} onPress={() => !isUnavailable && toggleSeat(seat.id)} disabled={isUnavailable}>
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
      )}

      <View style={styles.summaryBox}>
        <Text style={styles.summaryText}>SEAT: {selectedSeats.map(id => `#${id}`).join(' ')}</Text>
        <Text style={styles.summaryText}>SUB-TOTAL: RM{seatPrice * selectedSeats.length}</Text>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={() => router.back()} style={[styles.btn, { backgroundColor: '#fff' }]}>
          <Text style={{ fontWeight: 'bold' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleProceed} style={[styles.btn, { backgroundColor: '#888' }]}>
          <Text style={{ fontWeight: 'bold', color: '#fff' }}>Proceed</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#eee',
    color: '#000',
    width: '100%',
  },
  inputAndroid: {
    fontSize: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 8,
    backgroundColor: '#eee',
    color: '#000',
    width: '100%',
  },
  iconContainer: {
    top: 14,
    right: 12,
  }
});


const styles = StyleSheet.create({
  title: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginVertical: 16 },
  subheading: { color: '#ccc', fontSize: 13, marginBottom: 16 },
  ticketBoxContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  ticketBox: { backgroundColor: '#222', padding: 16, borderRadius: 8, width: '48%' },
  ticketLabel: { color: '#ccc', fontSize: 12 },
  ticketPrice: { color: '#fff', fontWeight: 'bold', fontSize: 14, marginTop: 4 },
  label: {
    color: '#fff',
    fontSize: 14,
    marginVertical: 10,
  },
  pickerContainer: {
    backgroundColor: '#eee',
    borderRadius: 8,
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  timeContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 16 },
  timeSlot: { padding: 10, borderBottomWidth: 2, borderBottomColor: '#fff', minWidth: 70, alignItems: 'center' },
  selectedTime: { backgroundColor: '#888' },
  timeText: { color: '#fff' },
  legendContainer: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  legend: { alignItems: 'center' },
  legendBox: { width: 20, height: 20, marginBottom: 4, justifyContent: 'center', alignItems: 'center' },
  legendText: { color: '#ccc', fontSize: 12 },
  gridWrapper: { marginBottom: 20 },
  rowWrapper: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  rowLabel: { color: '#ccc', width: 20, textAlign: 'center', fontSize: 12 },
  rowSeats: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    transform: [{ translateX: 0 }], 
  },
  
  seat: {
    width: 30,
    height: 30,
    backgroundColor: '#aaa',
    borderRadius: 15, 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4, 
  },
  
  selected: { backgroundColor: '#fff' },
  unavailable: { backgroundColor: '#444' },
  selectedDot: { width: 10, height: 10, backgroundColor: '#000', borderRadius: 5 },
  summaryBox: { backgroundColor: '#000', borderTopWidth: 1, borderTopColor: '#fff', padding: 12, alignItems: 'center', marginBottom: 20 },
  summaryText: { color: '#fff', fontSize: 14, marginBottom: 2 },
  footer: { flexDirection: 'row', justifyContent: 'space-between' },
  btn: { flex: 1, padding: 16, borderRadius: 8, alignItems: 'center', marginHorizontal: 4 },

  screenContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },

  screenShape: {
    width: '85%',
    height: 30,
    backgroundColor: '#444',
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  screenText: {
    color: '#fff',
    fontSize: 12,
  },

  dropdown: {
    backgroundColor: '#333',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    zIndex: 1000, 
  },


});




