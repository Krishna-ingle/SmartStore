import React, { useState } from "react";
import { Alert } from "react-native";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

const UserRegistration: React.FC = () => {
  const [fullName, setFullName] = useState("");
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = () => {
    console.log("Full Name:", fullName);
    console.log("City:", city);
    console.log("Area:", area);
    console.log("Address:", address);
    Alert.alert("Registration Submitted!");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>User Registration</Text>

      {/* Input Fields */}
      <TextInput
        style={styles.input}
        placeholder="Enter Full Name"
        value={fullName}
        onChangeText={setFullName}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Area"
        value={area}
        onChangeText={setArea}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter Your Address"
        value={address}
        onChangeText={setAddress}
      />

      {/* Submit Button */}
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "darkgreen",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default UserRegistration;
