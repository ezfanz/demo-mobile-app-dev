import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, Entypo } from '@expo/vector-icons';

export default function BookingConfirmation() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.checkmarkCircle}>
        <Ionicons name="checkmark" size={60} color="#000" />
      </View>

      <Text style={styles.title}>Congratulations!</Text>
      <Text style={styles.subtitle}>
        Your ticket purchase is successful, a confirmation has been sent to your e-mail
      </Text>

      <View style={styles.buttonRow}>
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.btnOutline}>
          <Ionicons name="arrow-back" size={18} color="#fff" />
          <Text style={styles.btnText}>Main menu</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/ticket')} style={styles.btnOutline}>
          <Entypo name="ticket" size={18} color="#fff" />
          <Text style={styles.btnText}>View ticket</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  checkmarkCircle: {
    backgroundColor: '#ccc',
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  title: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  subtitle: {
    color: '#ccc',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 16,
  },
  btnOutline: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    gap: 6,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
