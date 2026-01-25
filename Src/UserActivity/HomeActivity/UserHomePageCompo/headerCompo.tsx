import React, { useEffect, useMemo, useState } from "react";

import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Pressable,
  Platform,
  Modal,
  FlatList,
} from "react-native";
import colors from "../../../Asset/Colors/colors";
import { Bell, MenuIcon, PersonStanding, Search, ShoppingCart, User } from "lucide-react-native";
import LinearGradient from "react-native-linear-gradient";
import { AddverisementCerdViewCompo } from "./AdvertiseCardViewCompo";
import cities from "../../../Asset/Data/cities.json";
// redux
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { RootState } from "../../../Redux/Store";
import { setUserSelectCity } from "../../../Redux/Slices/userSelectedCitySlice";

const CITIES = ["Murtizapur", "Akola", "Karanja", "Amaravati", "Nagpur", "Badnera", "Shegaon"];

type Props = {
  locationTitle?: string;
  locationValue?: string;
  onPressBack?: () => void;
  query?: string;
  onChangeQuery?: (text: string) => void;
  onSubmitSearch?: () => void;
  onPressCart?: () => void;
  onPressBell?: () => void;
  onCityChange?: (city: string) => void;
};

export default function GroceryHeaderSearch({


  locationTitle = "Sai Nagar, Wandongri..",
  locationValue = "Set your location",
  onPressBack = () => { },
  query = "",
  onChangeQuery = () => { },
  onSubmitSearch = () => { },
  onPressCart = () => { },
  onPressBell = () => {
  },
  onCityChange = () => { },
}: Props) {


  const dispatch = useDispatch();
  const userData = useSelector((state: RootState) => state.userData.userData);


  const currentCity = useSelector(
    (state: RootState) => state.SelectedCity.selectCity,
    shallowEqual
  );

  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [cityQuery, setCityQuery] = useState("");


  const filteredCities = useMemo(() => {
    const s = cityQuery.trim().toLowerCase();
    if (!s) return cities.map(c => `${c.city}, ${c.state}`);
    return cities
      .map(c => `${c.city}, ${c.state}`)
      .filter(c => c.toLowerCase().includes(s));
  }, [cityQuery]);


  const closeCityModal = () => setIsCityModalOpen(false);

  const selectCity = (fullCityName: string) => {
    const cityName = fullCityName.split(',')[0];
    console.log('🚀 Dispatching city:', cityName);
    dispatch(setUserSelectCity(cityName));
    setIsCityModalOpen(false);
    setCityQuery("");
  };



  const PLACEHOLDERS = [
    "Search Milk, Curd, Paneer...",
    "Search Fruits, Vegetables...",
    "Search Snacks & Drinks...",
    "Search Personal Care...",
  ];

  const [hintIndex, setHintIndex] = useState(0);
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const id = setInterval(() => {
      if (!focused && (query ?? "").length === 0) {
        setHintIndex((p) => (p + 1) % PLACEHOLDERS.length);
      }
    }, 3000);

    return () => clearInterval(id); // important cleanup
  }, []);

  return (
    <LinearGradient
      colors={["#AFE79E", "#CFF5C2"]}
      locations={[0, 0.55, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
        backgroundColor: colors.gradientColorTow,
        paddingBottom: 10
      }}
    >
      <View style={styles.header}>
        <Text style={{
          color: "#0000f",
          fontSize: 24,
          fontWeight: '900'
        }}>Smart Store.</Text>
        <View style={styles.topRow}>

          <Pressable onPress={() => setIsCityModalOpen(true)} style={styles.locationBlock}>
            <View style={{ display: 'flex', flexDirection: 'row' }}>
              <View style={styles.locationLine}>
                <View style={styles.pinDot} />
                <Text style={styles.locationTitle}>{locationTitle}</Text>
              </View>

              <Text numberOfLines={1} style={styles.locationValue}>
                {currentCity && typeof currentCity === 'string' ? currentCity : userData?.city || "Select city"}
              </Text>
            </View>

          </Pressable>


          <Pressable
            onPress={onPressBell}
            style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]}
            hitSlop={10}
          >
            <Bell color={colors.headingBlackColor} size={22} fill={colors.headingBlackColor} />
          </Pressable>
          <View style={{ width: 10 }}>
          </View>
          <Pressable
            onPress={onPressBack}
            style={({ pressed }) => [styles.circleBtn, pressed && styles.pressed]}
            hitSlop={10}
          >
            <User color={colors.headingBlackColor} size={22} fill={colors.headingBlackColor} />
          </Pressable>


        </View>

        <View style={styles.searchRow}>
          <View style={styles.searchWrap}>
            <Pressable onPress={onSubmitSearch} style={styles.searchBtn} hitSlop={10}>
              <Search size={18} color={colors.gradientColorTow} />
            </Pressable>
            <TextInput
              value={query}
              onChangeText={onChangeQuery}
              placeholder={PLACEHOLDERS[hintIndex]}
              placeholderTextColor="#8a8a8a"
              style={styles.searchInput}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              returnKeyType="search"
              onSubmitEditing={onSubmitSearch}
            />

          </View>



        </View>


        <Modal
          visible={isCityModalOpen}
          transparent
          animationType="slide"
          onRequestClose={closeCityModal}  // ✅ FIX 1: Use function
        >
          <Pressable
            style={styles.backdrop}
            onPress={closeCityModal}        // ✅ FIX 2: Use function
          />

          <View style={styles.sheet}>
            <View style={styles.sheetHeader}>
              <Text style={styles.sheetTitle}>Select City</Text>
              <Pressable onPress={closeCityModal} hitSlop={10}>
                <Text style={styles.sheetClose}>✕</Text>
              </Pressable>
            </View>

            <View style={styles.citySearchWrap}>
              <TextInput
                value={cityQuery}
                onChangeText={setCityQuery}
                placeholder="Search city..."
                placeholderTextColor={colors.subHeading}
                style={styles.citySearchInput}
              />
            </View>

            <FlatList
              data={filteredCities}
              keyExtractor={(item) => item}
              keyboardShouldPersistTaps="handled"
              renderItem={({ item }) => {
                // ✅ FIX 3: Extract city name for comparison
                const cityName = item.split(',')[0];
                const active = cityName === currentCity;

                return (
                  <Pressable
                    onPress={() => selectCity(item)}
                    style={[styles.cityRow, active && styles.cityRowActive]}
                  >
                    <View style={[styles.radio, active && styles.radioActive]} />
                    <Text style={[styles.cityText, active && styles.cityTextActive]}>
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
              ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
            />
          </View>
        </Modal>

      </View>
    </LinearGradient>

  );
}


const styles = StyleSheet.create({
  header: {
    paddingTop: 8,
    paddingBottom: 24,
    paddingHorizontal: 14,
  },

  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  circleBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white
  },

  pressed: {
    opacity: Platform.OS === "ios" ? 0.75 : 1,
  },

  locationBlock: {
    flex: 1,
    alignItems: 'flex-start',
  },

  locationLine: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  pinDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: colors.headingBlackColor,
    opacity: 0.9,
  },

  locationTitle: {
    color: colors.subHeading,
    opacity: 0.9,
    fontSize: 14,
    fontWeight: "600",
  },

  locationValue: {
    marginTop: 2,
    color: colors.headingBlackColor,
    fontSize: 15.5,
    fontWeight: "800",
  },

  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  searchWrap: {
    flex: 1,
    height: 46,
    backgroundColor: colors.white,
    borderRadius: 10,
    paddingLeft: 14,
    paddingRight: 6,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.10,
    shadowRadius: 10,
    elevation: 5,
  },

  searchInput: {
    flex: 1,
    height: 46,
    color: colors.headingBlackColor,
    fontSize: 14.5,
  },

  searchBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },

  searchIcon: {
    color: colors.gradientColorone,
    fontSize: 18,
    fontWeight: "800",
  },



  // Modal styles
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.35)",
  },

  sheet: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: colors.white,
    borderTopLeftRadius: 22,
    borderTopRightRadius: 22,
    padding: 16,
    maxHeight: "70%",
  },

  sheetHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  sheetTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.headingBlackColor,
  },

  sheetClose: {
    fontSize: 18,
    color: colors.subHeading,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },

  citySearchWrap: {
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.whiteBackground,
    paddingHorizontal: 12,
    justifyContent: "center",
    marginBottom: 10,
  },

  citySearchInput: {
    fontSize: 14,
    color: colors.headingBlackColor,
  },

  cityRow: {
    height: 48,
    borderRadius: 14,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  cityRowActive: {
    backgroundColor: colors.greenBackground,
  },

  radio: {
    width: 10,
    height: 10,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#c7c7c7",
  },

  radioActive: {
    borderColor: colors.gradientColorone,
    backgroundColor: colors.gradientColorone,
  },

  cityText: {
    fontSize: 14.5,
    color: colors.headingBlackColor,
    fontWeight: "600",
  },

  cityTextActive: {
    color: colors.gradientColorTow,
  },
});
