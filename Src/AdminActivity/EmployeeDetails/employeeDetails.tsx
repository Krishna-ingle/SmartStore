import React, { useEffect, useState, useCallback } from "react";
import {
  SafeAreaView,
  View,
  Text,
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ApiHelper } from "../../Services/ApiHelper";
import Button from "../../UIComponent/button";
import { EmpCardView } from "./empCardView";
import { RootState } from "../../Redux/Store";

const StatisticsEmpData = ({
  stats = { totalEmployees: 0, onProbation: 0, supervisors: 0 },
}) => {
  return (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Employee Statistics</Text>

      <View style={styles.statsRow}>
        <StatBox label="Total" value={stats.totalEmployees} />
        <StatBox label="Probation" value={stats.onProbation} />
        <StatBox label="Supervisors" value={stats.supervisors} />
      </View>
    </View>
  );
};

type StatBoxProps = {
  label: string;
  value: number; // or string | number
};

const StatBox = ({ label, value }: StatBoxProps) => (
  <View style={styles.statBox}>
    <Text style={styles.statValue}>{value}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);


export const EmployeeDetails = () => {
  const navigation = useNavigation() as any;
  const currentShop = useSelector((state: RootState) => state.shop.currentShop);

  const [refreshing, setRefreshing] = useState(false);
  const [emps, setEmps] = useState([]);
  const [stats, setStats] = useState({ totalEmployees: 0, onProbation: 0, supervisors: 0 });

  const fetchEmpData = useCallback(async () => {
    try {
      const response = await ApiHelper.makeApiCall(`/vendor/employees/all`, "GET", null);
      const empData = Array.isArray(response?.employees) ? response.employees : [];
      setEmps(empData);
    } catch (e) {
      Alert.alert("Employee not found", "Contact Support Team");
    }
  }, []);

  const fetchStatisticsEmpData = useCallback(async () => {
    if (!currentShop?.id) return;

    try {
      const response = await ApiHelper.makeApiCall(
        `/vendor/employees/shop/${currentShop.id}/stats`,
        "GET",
        null
      );

      if (response?.success) setStats(response.stats);
      else setStats({ totalEmployees: 0, onProbation: 0, supervisors: 0 });
    } catch (e) {
      setStats({ totalEmployees: 0, onProbation: 0, supervisors: 0 });
    }
  }, [currentShop?.id]);

  useEffect(() => {
    fetchEmpData();
  }, [fetchEmpData]);

  useEffect(() => {
    fetchStatisticsEmpData();
  }, [fetchStatisticsEmpData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([fetchEmpData(), fetchStatisticsEmpData()]);
    setRefreshing(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={emps}
        keyExtractor={(item: any) => String(item.id)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.screenTitle}>Employee Details</Text>
            <StatisticsEmpData stats={stats} />
            <Text style={styles.sectionTitle}>Employees</Text>
          </View>
        }
        renderItem={({ item }) => (
          <EmpCardView
            item={item}
            onPress={() => navigation.navigate("SpecificEmpScreen", { empId: item.id })}
          />
        )}
        ListFooterComponent={<View style={{ height: 90 }} />}
      />

      <View style={styles.bottomBar}>
        <Button
          title="Add Employee"
          onPress={() => navigation.navigate("AddEmployeeScreen", { mode: "create" })}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F7F7F7" },
  listContent: { paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 },

  header: { gap: 12 },
  screenTitle: { fontSize: 18, fontWeight: "700", color: "#111827" },
  sectionTitle: { fontSize: 14, fontWeight: "600", color: "#374151", marginTop: 4 },

  statsCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEE",
  },
  statsTitle: { fontSize: 14, fontWeight: "700", color: "#111827", marginBottom: 10 },
  statsRow: { flexDirection: "row", gap: 10 },

  statBox: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },
  statValue: { fontSize: 20, fontWeight: "800", color: "#111827" },
  statLabel: { marginTop: 4, fontSize: 12, color: "#6B7280" },

  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    paddingHorizontal: 16,
    paddingBottom: 12,
    paddingTop: 8,
    backgroundColor: "#F7F7F7",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});
