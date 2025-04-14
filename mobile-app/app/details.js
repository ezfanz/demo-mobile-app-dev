import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome, FontAwesome6, Ionicons, AntDesign } from '@expo/vector-icons';
import { getMovieById } from '../lib/api';

export default function DetailScreen() {
  const router = useRouter();
  const { movieId } = useLocalSearchParams();
  const [movie, setMovie] = useState(null);
  const [activeTab, setActiveTab] = useState('details');

  useEffect(() => {
    if (movieId) {
      getMovieById(movieId)
        .then(res => {
          setMovie(res);
        })
        .catch(err => {
          console.error('Failed to load movie:', err);
        });
    }
  }, [movieId]);

  if (!movie) {
    return (
      <View style={{ flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: '#ccc' }}>Loading movie details...</Text>
      </View>
    );
  }

  const formatTitle = (title) => {
    const words = title.trim().split(' ');
    if (words.length <= 1) return title;
    const lastWord = words.pop();
    return `${words.join(' ')}\n${lastWord}`;
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 16, position: 'absolute', top: 40, left: 10, zIndex: 1 }}>
        <TouchableOpacity onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.videoContainer}>
        <FontAwesome name="play-circle" size={64} color="#fff" />
        <View style={styles.cornerIcons}>
          <Ionicons name="resize-outline" size={20} color="#fff" style={{ marginRight: 12 }} />
          <Ionicons name="volume-high" size={20} color="#fff" />
        </View>
        <Text style={styles.trailerLabel}>TRAILER</Text>
      </View>

      <View style={styles.contentContainer}>
        <View style={styles.topRow}>
          <View style={styles.posterWrapper}>
            <Image
              source={{ uri: movie.poster_url || 'https://via.placeholder.com/100x150.png?text=No+Image' }}
              style={styles.poster}
            />
          </View>

          <View style={styles.infoBlock}>
            <Text style={styles.title}>{formatTitle(movie.title)}</Text>
            <Text style={{ color: 'gray', fontSize: 10 }}>{movie.poster_url}</Text>

            <View style={styles.metaRowCombined}>
              <View style={styles.metaItem}>
                <FontAwesome name="calendar" size={14} color="#ccc" />
                <Text style={styles.metaText}> {movie.release_date || 'N/A'}</Text>
              </View>

              <View style={styles.metaItem}>
                <FontAwesome6 name="comment-alt" size={14} color="#ccc" />
                <Text style={styles.metaText}>{movie.age_rating}</Text>
              </View>

              <View style={styles.metaItem}>
                <FontAwesome6 name="clock" size={14} color="#ccc" />
                <Text style={styles.metaText}> {movie.duration} mins</Text>
              </View>

              <View style={styles.metaItem}>
                <View style={styles.starContainer}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FontAwesome
                      key={star}
                      name={star <= movie.rating ? 'star' : 'star-o'}
                      size={14}
                      color="#FFD700"
                      style={styles.starIcon}
                    />
                  ))}
                </View>
                <Text style={styles.metaText}> {movie.rating}/5 (20)</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.heartIcon}>
            <FontAwesome name="heart-o" size={20} color="#fff" />
          </TouchableOpacity>
        </View>

        {/* Tabs Section */}
        <View style={styles.tabs}>
          <TouchableOpacity onPress={() => setActiveTab('details')}>
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTab]}>Movie Details</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('reviews')}>
            <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTab]}>Ratings & Reviews</Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'details' ? (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Full synopsis</Text>
            <Text style={styles.sectionContent}>{movie.description}</Text>

            <Text style={styles.sectionTitle}>Casts</Text>
            <Text style={styles.sectionContent}>{movie.casts || 'Not available'}</Text>

            <Text style={styles.sectionTitle}>Director</Text>
            <Text style={styles.sectionContent}>{movie.director || 'Not available'}</Text>

            <Text style={styles.sectionTitle}>Writers</Text>
            <Text style={styles.sectionContent}>{movie.writers || 'Not available'}</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <View style={styles.ratingSummary}>
              <Text style={styles.ratingScore}>⭐ {movie.rating}</Text>
              <Text style={styles.ratingCount}>(20 Reviews)</Text>
            </View>

            {[5, 4, 3, 2, 1].map((stars) => {
              const count = stars === 5 ? 8 : stars === 4 ? 6 : stars === 3 ? 4 : stars === 2 ? 2 : 0;
              return (
                <View key={stars} style={styles.ratingRow}>
                  <Text style={styles.starRow}>{'★'.repeat(stars)}</Text>
                  <View style={styles.ratingBarBackground}>
                    <View style={[styles.ratingBarFill, { width: `${(count / 8) * 100}%` }]} />
                  </View>
                  <Text style={styles.reviewCount}>({count})</Text>
                </View>
              );
            })}

            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>Customer Reviews</Text>
              <TouchableOpacity>
                <Text style={styles.seeAll}>see all</Text>
              </TouchableOpacity>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewTitle}>★ ★ ★ ★ ☆</Text>
                <Text style={styles.reviewBody}>INTERESTING MOVIE{''}Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
              </View>
              <View style={styles.reviewCard}>
                <Text style={styles.reviewTitle}>★ ★ ☆ ☆ ☆</Text>
                <Text style={styles.reviewBody}>NOT SPECIAL{''}Lorem ipsum dolor sit amet, elit. Tortor enim auctor.</Text>
              </View>
            </ScrollView>
          </View>
        )}
      </View>
      {/* Book Ticket Button */}
      <TouchableOpacity
        style={styles.bookButton}
        onPress={() =>
          router.push({
            pathname: '/booking',
            params: {
              movieId: movie.id.toString(),
            },
          })
        }
      >
        <Text style={styles.bookButtonText}>Book Ticket</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    backgroundColor: '#666',
    height: 220,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  trailerLabel: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#000',
    color: '#fff',
    paddingHorizontal: 6,
    fontSize: 10,
    borderRadius: 4,
  },
  cornerIcons: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
  },
  contentContainer: {
    backgroundColor: '#121212',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -30,
  },
  topRow: {
    flexDirection: 'row',
    marginBottom: 16,
    position: 'relative',
  },
  posterWrapper: {
    width: 80,
    height: 100,
    backgroundColor: '#444',
    borderRadius: 6,
    padding: 2,
  },
  poster: {
    width: '100%',
    height: '100%',
    borderRadius: 4,
  },
  infoBlock: {
    marginLeft: 12,
    flex: 1,
  },
  title: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metaRowCombined: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 4,
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
    flexShrink: 1,
  },
  metaText: {
    color: '#ccc',
    fontSize: 13,
    marginLeft: 4,
  },
  starContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  starIcon: {
    marginRight: 2,
  },
  heartIcon: {
    position: 'absolute',
    right: 0,
    top: 4,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    marginTop: 10,
    marginBottom: 16,
  },
  tabText: {
    color: '#888',
    fontWeight: '600',
    marginRight: 20,
    paddingBottom: 6,
  },
  activeTab: {
    color: '#fff',
    borderBottomWidth: 2,
    borderBottomColor: '#fff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#bbb',
    fontWeight: 'bold',
    marginTop: 10,
  },
  sectionContent: {
    color: '#eee',
    marginBottom: 6,
    fontSize: 13,
  },
  ratingSummary: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  ratingScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 8,
  },
  ratingCount: {
    fontSize: 14,
    color: '#aaa',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starRow: {
    width: 60,
    color: '#aaa',
  },
  ratingBarBackground: {
    height: 6,
    flex: 1,
    backgroundColor: '#333',
    marginHorizontal: 8,
    borderRadius: 3,
  },
  ratingBarFill: {
    height: 6,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  reviewCount: {
    color: '#aaa',
    width: 30,
    textAlign: 'right',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  seeAll: {
    color: '#999',
    fontSize: 13,
    textDecorationLine: 'underline',
  },
  reviewCard: {
    backgroundColor: '#222',
    borderRadius: 8,
    padding: 12,
    marginRight: 10,
    width: 200,
  },
  reviewTitle: {
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  reviewBody: {
    color: '#ccc',
    fontSize: 13,
  },
  bookButton: {
    backgroundColor: '#888',
    padding: 14,
    alignItems: 'center',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 20,
  },
  
  bookButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  
});
