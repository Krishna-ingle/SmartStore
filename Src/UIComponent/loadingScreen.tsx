import React, { useEffect, useRef, useState } from 'react';
import { 
  View, 
  Animated, 
  StyleSheet, 
  Text, 
  Modal, 
  StatusBar,
  Dimensions 
} from 'react-native';
import LoadingManager from '../Services/LoadingManager';
import colors from '../Asset/Colors/colors';

interface LoadingState {
  isLoading: boolean;
  message: string;
  requestId: string;
}

const { width } = Dimensions.get('window');

const LoadingScreen: React.FC = () => {
  const [loadingState, setLoadingState] = useState<LoadingState | null>(null);
  const dot1 = useRef(new Animated.Value(0)).current;
  const dot2 = useRef(new Animated.Value(0)).current;
  const dot3 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const unsubscribe = LoadingManager.subscribe((state) => {
      setLoadingState(state);
      
      if (state?.isLoading) {
        startAnimations();
      }
    });

    return unsubscribe;
  }, []);

  const startAnimations = (): void => {
    const animateDot = (dot: Animated.Value, delay: number) => {
      return Animated.sequence([
        Animated.delay(delay),
        Animated.timing(dot, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(dot, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ]);
    };

    Animated.loop(
      Animated.parallel([
        animateDot(dot1, 0),
        animateDot(dot2, 200),
        animateDot(dot3, 400),
      ])
    ).start();
  };

  const getDotStyle = (dot: Animated.Value) => ({
    opacity: dot.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1],
    }),
    transform: [
      {
        scale: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0.8, 1.3],
        }),
      },
      {
        translateY: dot.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -12],
        }),
      },
    ],
  });

  if (!loadingState?.isLoading) return null;

  return (
    <Modal transparent visible={loadingState.isLoading} animationType="fade">
      <StatusBar backgroundColor="rgba(0,0,0,0.8)" barStyle="light-content" />
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.dotsContainer}>
            <Animated.View style={[styles.dot, getDotStyle(dot1)]} />
            <Animated.View style={[styles.dot, getDotStyle(dot2)]} />
            <Animated.View style={[styles.dot, getDotStyle(dot3)]} />
          </View>
          <Text style={styles.messageText}>{loadingState.message}</Text>
          <Text style={styles.subText}>SmartStore</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 30,
    alignItems: 'center',
    minWidth: width * 0.7,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
    height: 30,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.gradientColorTow,
    marginHorizontal: 6,
  },
  messageText: {
    fontSize: 18,
    color: '#333333',
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  subText: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
});

export default LoadingScreen;
