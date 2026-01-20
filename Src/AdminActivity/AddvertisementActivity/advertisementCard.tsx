import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

// Change to suit your theme
const BASE_GREEN = '#26bc43';

interface AdvertisementProps {
  title: string;
  imageUrl: string;
  offer: string;
  onClick: () => void;
}

const AdvertisementCard = ({ title, imageUrl, offer, onClick }: AdvertisementProps) => {
  return (
    <View style={styles.card}>
      {/* Image Section */}
      <Image
        source={{ uri: imageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      {/* Details Section */}
      <View style={styles.details}>
        {/* <Image
                  // source={{ uri: item.imageUrl || 'https://via.placeholder.com/150' }}
                  // style={styles.productImage}
                  resizeMode="cover"
                /> */}
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.offer}>{offer}</Text>
        <TouchableOpacity style={styles.button} onPress={onClick}>
          <Text style={styles.buttonText}>Click Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: BASE_GREEN,
    borderRadius: 20,
    overflow: 'hidden',
    margin: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  image: {
    width: '100%',
    height: 180,
    backgroundColor:'#e8f5e9',
  },
  details: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: BASE_GREEN,
    marginBottom: 10,
  },
  offer: {
    fontSize: 16,
    color: '#222',
    marginBottom: 16,
    fontWeight: '500',
  },
  button: {
    backgroundColor: BASE_GREEN,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    alignItems: 'center',
    alignSelf: 'stretch',
    marginTop: 6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default AdvertisementCard;
