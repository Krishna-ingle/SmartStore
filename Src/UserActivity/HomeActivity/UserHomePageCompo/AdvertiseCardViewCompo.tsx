import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View,
  LayoutChangeEvent,
} from "react-native";

const ADS = [
  require("../../../Asset/Icon&img/Images/Adimg1.png"),
  require("../../../Asset/Icon&img/Images/Adimg1.png"),
  require("../../../Asset/Icon&img/Images/Adimg1.png"),
];

export const AddverisementCerdViewCompo = () => {
  const listRef = useRef<FlatList>(null);
  const [index, setIndex] = useState(0);
  const [w, setW] = useState(0);

  const canRun = w > 0 && ADS.length > 1;

  // autoplay
  useEffect(() => {
    if (!canRun) return;

    const id = setInterval(() => {
      setIndex((prev) => {
        const next = (prev + 1) % ADS.length;
        listRef.current?.scrollToIndex({ index: next, animated: true });
        return next;
      });
    }, 3000);

    return () => clearInterval(id);
  }, [canRun]);

  const onLayout = (e: LayoutChangeEvent) => {
    setW(e.nativeEvent.layout.width);
  };

  return (
    <SafeAreaView>
      <View style={styles.wrapper} onLayout={onLayout}>
        {w > 0 && (
          <FlatList
            ref={listRef}
            data={ADS}
            keyExtractor={(_, i) => String(i)}
            horizontal
            pagingEnabled
            snapToInterval={w}
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            bounces={false}
            renderItem={({ item }) => (
              <ImageBackground
                source={item}
                style={[styles.slide, { width: w }]}
                imageStyle={styles.bgImage}
                resizeMode="cover"   // use "contain" if you want full image with empty space
              />
            )}
            onMomentumScrollEnd={(e) => {
              const newIndex = Math.round(e.nativeEvent.contentOffset.x / w);
              setIndex(newIndex);
            }}
            getItemLayout={(_, i) => ({
              length: w,
              offset: w * i,
              index: i,
            })}
          />
        )}

        {/* Dots */}
        <View style={styles.dots}>
          {ADS.map((_, i) => (
            <View
              key={i}
              style={[styles.dot, i === index && styles.dotActive]}
            />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    height: 150,          // increase height if you want bigger banner
    borderRadius: 12,
    overflow: "hidden",
  },
  slide: {
    height: "100%",
  },
  bgImage: {
    borderRadius: 12,
  },
  dots: {
    position: "absolute",
    bottom: -1,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "center",
    gap: 6,
    marginTop:10
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 6,
    backgroundColor: "rgba(255,255,255,0.55)",
  },
  dotActive: {
    width: 16,
    backgroundColor: "rgba(255,255,255,0.95)",
  },
});
