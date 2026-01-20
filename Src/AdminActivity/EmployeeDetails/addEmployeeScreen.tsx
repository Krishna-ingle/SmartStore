import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/Store";
import InputText from "../../UIComponent/inputText";
import Button from "../../UIComponent/button";
import colors from "../../Asset/Colors/colors";
import { ApiHelper } from "../../Services/ApiHelper";

type Employee = {
  id: string;
  employeeName?: string;
  email?: string;
  employeeMobile?: string;
  employeeRole?: string;
  department?: string;
  basicSalary?: number | string;
  shiftTiming?: string;
};

type RouteParams = { mode: "create" } | { mode: "edit"; employee: Employee };

export const AddEmployeeScreen = () => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const params = route.params as RouteParams | undefined;

  const mode = params?.mode ?? "create";
  const isEdit = mode === "edit";

  const shopId = useSelector((state: RootState) => state.shop.currentShopId);

  const [employeeId, setEmployeeId] = useState<string | null>(null);
  const [employeeName, setEmployeeName] = useState("");
  const [email, setEmail] = useState("");
  const [employeePassword, setEmployeePassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [employeeMobile, setEmployeeMobile] = useState("");
  const [employeeRole, setEmployeeRole] = useState("");
  const [department, setDepartment] = useState("");
  const [basicSalary, setBasicSalary] = useState("");
  const [shiftTiming, setShiftTiming] = useState("");

  useEffect(() => {
    if (isEdit && params && "employee" in params && params.employee) {
      const e = params.employee;
      setEmployeeId(e.id ?? null);
      setEmployeeName(e.employeeName ?? "");
      setEmail(e.email ?? "");
      setEmployeeMobile(e.employeeMobile ?? "");
      setEmployeeRole(e.employeeRole ?? "");
      setDepartment(e.department ?? "");
      setBasicSalary(String(e.basicSalary ?? ""));
      setShiftTiming(e.shiftTiming ?? "");
      setEmployeePassword("");
      setConfirmPassword("");
    } else {
      setEmployeeId(null);
      setEmployeeName("");
      setEmail("");
      setEmployeePassword("");
      setConfirmPassword("");
      setEmployeeMobile("");
      setEmployeeRole("");
      setDepartment("");
      setBasicSalary("");
      setShiftTiming("");
    }
  }, [isEdit, params]);

  const validate = () => {
    if (!employeeName.trim()) return "Employee name is required";
    if (!employeeMobile.trim()) return "Mobile number is required";
    if (!employeePassword.trim()) return "Password is required";
    if (employeePassword !== confirmPassword) return "Password does not match";
    return null;
  };

  const handleSubmit = async () => {
    const err = validate();
    if (err) return Alert.alert("Error", err);

    try {
      const EmpData: any = {
        employeeName: employeeName.trim(),
        email: email.trim(),
        employeePassword: employeePassword.trim(),
        employeeMobile: employeeMobile.trim(),
        employeeRole: employeeRole.trim(),
        department: department.trim(),
        basicSalary: basicSalary.trim(),
        shiftTiming: shiftTiming.trim(),
      };

      if (isEdit && employeeId) {
        const result = await ApiHelper.makeApiCall(`/vendor/employees/${employeeId}`, "PUT", EmpData);
        if (result?.success === false) return Alert.alert("Error", result?.message ?? "Update failed");
        Alert.alert("Success", "Employee updated successfully");
        navigation.goBack();
      } else {
        const result = await ApiHelper.makeApiCall(`/vendor/employees/shop/${shopId}`, "POST", EmpData);
        if (result?.success === false) return Alert.alert("Error", result?.message ?? "Create failed");
        Alert.alert("Success", "Employee added successfully");
        navigation.goBack();
      }
    } catch (e) {
      Alert.alert("Error", isEdit ? "Failed to update employee" : "Failed to add employee");
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.safe}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>{isEdit ? "Edit Employee" : "Add Employee"}</Text>
          <Text style={styles.subtitle}>
            {isEdit ? "Update employee information" : "Enter employee information"}
          </Text>

          <View style={styles.card}>
            <InputText placeholder="Employee Name" value={employeeName} onChangeText={setEmployeeName} />
            <InputText placeholder="Email" value={email} onChangeText={setEmail} />

            <InputText
              placeholder={isEdit ? "New Password (required)" : "Set Password"}
              value={employeePassword}
              onChangeText={setEmployeePassword}
              secureTextEntry
            />
            <InputText
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />

            <InputText placeholder="Mobile Number" value={employeeMobile} onChangeText={setEmployeeMobile} />
            <InputText placeholder="Employee Role" value={employeeRole} onChangeText={setEmployeeRole} />
            <InputText placeholder="Department" value={department} onChangeText={setDepartment} />
            <InputText placeholder="Basic Salary" value={basicSalary} onChangeText={setBasicSalary} />
            <InputText placeholder="Shift Timing" value={shiftTiming} onChangeText={setShiftTiming} />
          </View>

          <View style={styles.btnWrap}>
            <Button
              title={isEdit ? "Update Employee" : "Add Employee"}
              onPress={handleSubmit}
              backgroundColor={colors.gradientColorTow}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.whiteBackground },
  container: {
    padding: 16,
    paddingBottom: 28, // prevents last button getting clipped
  },
  title: { fontSize: 18, fontWeight: "800", color: colors.headingBlackColor },
  subtitle: { marginTop: 6, fontSize: 13, fontWeight: "600", color: colors.subHeading },

  card: {
    marginTop: 14,
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: "#EEE",
    gap: 10,
  },

  btnWrap: { marginTop: 16 },
});
