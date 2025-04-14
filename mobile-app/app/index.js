import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { getMovies } from '../lib/api'; 

export default function HomeScreen() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMovies()
      .then(setMovies)
      .catch(() => Alert.alert('Error', 'Failed to load movies from server.'))
      .finally(() => setLoading(false));
  }, []);

  const renderMovieItem = ({ item }) => (
    <Link href={{ pathname: '/details', params: { movieId: item.id.toString() } }} asChild>
      <TouchableOpacity style={{ marginRight: 12 }}>
        <View style={{ width: 140 }}>
          <View style={{ height: 200, borderRadius: 12, backgroundColor: '#333' }} />
          <Text numberOfLines={1} style={{ color: 'white', fontWeight: 'bold', marginTop: 6 }}>
            {item.title}
          </Text>
          <Text style={{ color: 'gray', fontSize: 12 }}>{item.duration} mins</Text>
        </View>
      </TouchableOpacity>
    </Link>
  );

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'black' }}>
        <ActivityIndicator size="large" color="#ccc" />
      </View>
    );
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: 'black', padding: 20 }}>
      {/* Header */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <View>
          <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold' }}>Hello, Raymond 👋</Text>
          <Text style={{ color: 'gray' }}>Want to go see a movie? Get your ticket today</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="white" />
      </View>

      {/* Search */}
      <TextInput
        placeholder="Search by movies or cinema hall"
        placeholderTextColor="#888"
        style={{
          backgroundColor: '#222',
          color: 'white',
          paddingHorizontal: 16,
          paddingVertical: 10,
          borderRadius: 10,
          marginBottom: 24,
        }}
      />

      {/* New Releases */}
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>New Releases</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Popular */}
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 16 }}>Popular in cinemas</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />

      {/* Recommended */}
      <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginVertical: 16 }}>Recommended for you</Text>
      <FlatList
        data={movies}
        renderItem={renderMovieItem}
        horizontal
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </ScrollView>
  );
}
