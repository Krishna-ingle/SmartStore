import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');

interface FirstTimeShopAdd {
  visible: boolean;
  onSetupShop: () => void;
  onSkip: () => void;
  vendorName?: string;
}

const FirstTimeShopAdd: React.FC<FirstTimeShopAdd> = ({
  visible,
  onSetupShop,
  onSkip,
  vendorName = "Vendor"
}) => {
  const [scaleValue] = useState(new Animated.Value(0));

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        tension: 50,
        friction: 8,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      statusBarTranslucent={true}
    >
      <View style={styles.modalOverlay}>
        <Animated.View 
          style={[
            styles.cardContainer,
            {
              transform: [{ scale: scaleValue }]
            }
          ]}
        >
          <LinearGradient
            colors={['#4CAF50', '#45a049', '#2E7D32']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.headerGradient}
          >
            <View style={styles.headerContent}>
              <Text style={styles.headerIcon}>🏪</Text>
              <Text style={styles.welcomeText}>Welcome, {vendorName}!</Text>
              <Text style={styles.subHeaderText}>
                Let's set up your digital store
              </Text>
            </View>
          </LinearGradient>

          <View style={styles.contentSection}>
            <View style={styles.featureContainer}>
              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>🏪</Text>
                </View>
                <Text style={styles.featureText}>Create your shop profile</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>📦</Text>
                </View>
                <Text style={styles.featureText}>Add your products</Text>
              </View>

              <View style={styles.featureItem}>
                <View style={styles.featureIconContainer}>
                  <Text style={styles.featureEmoji}>📈</Text>
                </View>
                <Text style={styles.featureText}>Start selling & earning</Text>
              </View>
            </View>

            <View style={styles.motivationSection}>
              <Text style={styles.motivationText}>
                "Your journey to digital success starts here. Join thousands of vendors already growing their business with SmartStore."
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.setupButton}
                onPress={onSetupShop}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#4CAF50', '#45a049']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.setupButtonGradient}
                >
                  <Text style={styles.buttonEmoji}>🚀</Text>
                  <Text style={styles.setupButtonText}>Setup My Shop</Text>
                </LinearGradient>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.skipButton}
                onPress={onSkip}
                activeOpacity={0.7}
              >
                <Text style={styles.skipButtonText}>I'll do this later</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.decorativeCircle1} />
          <View style={styles.decorativeCircle2} />
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: width * 0.9,
    maxWidth: 400,
    backgroundColor: '#fff',
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.3,
    shadowRadius: 20,
  },
  headerGradient: {
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  headerContent: {
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: 50,
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  subHeaderText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    fontWeight: '400',
  },
  contentSection: {
    padding: 25,
  },
  featureContainer: {
    marginBottom: 25,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureEmoji: {
    fontSize: 20,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  motivationSection: {
    backgroundColor: '#F5F5F5',
    padding: 20,
    borderRadius: 12,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: '#4CAF50',
  },
  motivationText: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    lineHeight: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    gap: 12,
  },
  setupButton: {
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#4CAF50',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  setupButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
    gap: 8,
  },
  buttonEmoji: {
    fontSize: 20,
  },
  setupButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    color: '#666',
    fontSize: 16,
    fontWeight: '500',
  },
  decorativeCircle1: {
    position: 'absolute',
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(76, 175, 80, 0.1)',
    top: -50,
    right: -50,
  },
  decorativeCircle2: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(76, 175, 80, 0.05)',
    bottom: 20,
    left: -30,
  },
});

export default FirstTimeShopAdd;
