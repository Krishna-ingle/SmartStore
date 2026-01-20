import React, { useCallback, useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    RefreshControl,
    Touchable,
    TouchableOpacity,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { ApiHelper } from "../../Services/ApiHelper";
import colors from "../../Asset/Colors/colors";
import { Container, Delete, DeleteIcon, Edit, Edit2Icon, LucideDelete, Navigation } from "lucide-react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "@react-navigation/elements";
type Employee = {
    id: string;
    employeeCode: string;
    employeeName: string;
    email: string;
    employeeMobile: string;
    shopId: string;
    vendorId: string;
    employeeRole: string;
    department: string;
    isActive: boolean;
    isVerified: boolean;
    onProbation: boolean;
    basicSalary: number;
    shiftTiming: string;
    createdAt: string;
    lastLoginAt: string;
    canProcessOrders: boolean;
    canManageInventory: boolean;
    canAccessReports: boolean;
    isSupervisor: boolean;
    totalSales: number;
    ordersProcessed: number;
    customerRating: number;
};

type RouteParams = { empId: string };

const Row = ({ label, value }: { label: string; value: any }) => (
    <View style={styles.row}>
        <Text style={styles.rowLabel}>{label}</Text>
        <Text style={styles.rowValue} numberOfLines={2}>
            {String(value ?? "-")}
        </Text>
    </View>
);

const Chip = ({ text, type }: { text: string; type: "good" | "warn" | "neutral" }) => {
    const bg =
        type === "good"
            ? colors.greenBackground
            : type === "warn"
                ? "#fff3cd"
                : "#eef2ff";

    const fg =
        type === "good"
            ? colors.gradientColorTow
            : type === "warn"
                ? "#8a6d3b"
                : "#3b5bdb";

    return (
        <View style={[styles.chip, { backgroundColor: bg }]}>
            <Text style={[styles.chipText, { color: fg }]}>{text}</Text>
        </View>
    );
};


export const SpecificEmpScreen = () => {
    const navigate = useNavigation() as any;
    const route = useRoute();
    const { empId } = route.params as RouteParams; // route params via useRoute() [web:78]

    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [emp, setEmp] = useState<Employee | null>(null);

    const normalizeEmployee = (response: any): Employee | null => {
        // handles: {employee: {...}} OR {data: {...}} OR {...}
        const maybe = response?.employee ?? response?.data ?? response;
        if (maybe && typeof maybe === "object" && maybe.id) return maybe as Employee;
        return null;
    };

    const fetchEmpData = useCallback(async () => {
        try {
            setLoading(true);

            const response = await ApiHelper.makeApiCall(
                `/vendor/employees/${empId}`,
                "GET",
                null
            );

            const employee = normalizeEmployee(response);
            if (!employee) {
                setEmp(null);
                Alert.alert("Employee not found");
                return;
            }

            setEmp(employee);
        } catch (error) {
            setEmp(null);
            Alert.alert("Problem Occurred");
        } finally {
            setLoading(false);
        }
    }, [empId]);

    useEffect(() => {
        fetchEmpData();
    }, [fetchEmpData]);

    const onRefresh = async () => {
        setRefreshing(true);
        await fetchEmpData();
        setRefreshing(false);
    };

    const initials =
        emp?.employeeName
            ?.split(" ")
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase())
            .join("") || "NA";

    const salary =
        typeof emp?.basicSalary === "number"
            ? new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 0,
            }).format(emp.basicSalary)
            : "-"; // Intl is a clean approach for currency-like formatting [web:52]



    const deleteEmp = async () => {
  try {
    Alert.alert(
      "Delete employee",
      "Are you sure you want to delete this employee?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const response = await ApiHelper.makeApiCall(
              `/vendor/employees/${empId}`,
              "DELETE",
              null
            );

            // depending on your ApiHelper, you may get {success:true,...}
            if (response?.success === false) {
              Alert.alert("Error", response?.message ?? "Delete failed");
              return;
            }

            Alert.alert("Success", "Employee deleted successfully");
            navigate.goBack(); // or navigation.navigate("EmployeeDetails")
          },
        },
      ]
    );
  } catch (error) {
    Alert.alert("Error", "Failed to delete employee");
  }
};

    return (
        <SafeAreaView style={styles.safe}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                } // ScrollView + RefreshControl pattern [web:40]
            >
                <Text style={styles.screenTitle}>Employee Profile</Text>
                <Text style={styles.screenSub}>Emp Code: {emp?.employeeCode}</Text>

                {loading ? (
                    <View style={styles.centerBox}>
                        <ActivityIndicator size="large" color={colors.gradientColorTow} />
                        <Text style={styles.loadingText}>Loading employee...</Text>
                    </View>
                ) : !emp ? (
                    <View style={styles.centerBox}>
                        <Text style={styles.emptyText}>No employee data.</Text>
                    </View>
                ) : (
                    <>
                        {/* Header card */}
                        <View style={styles.headerCard}>
                            <View style={styles.avatar}>
                                <Text style={styles.avatarText}>{initials}</Text>
                            </View>

                            <View style={{ flex: 1 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={styles.name}>{emp.employeeName}</Text>
                                    <TouchableOpacity onPress={() => {
                                        navigate.navigate("AddEmployeeScreen", {
                                            mode: "edit",
                                            employee: emp,
                                        });
                                    }}>
                                        <View style={{
                                            backgroundColor: 'rgba(255, 213, 213, 0.5)', borderRadius: 10,
                                            width: 40, height: 40, justifyContent: 'center', alignItems: 'center'
                                        }}>
                                            <Edit size={20} color={'rgba(246, 40, 40, 1)'} />
                                        </View>
                                    </TouchableOpacity>

                                </View>
                                <Text style={styles.role}>
                                    {emp.employeeRole} • {emp.department}
                                </Text>


                                <View style={styles.chipsRow}>
                                    <Chip
                                        text={emp.isActive ? "Active" : "Inactive"}
                                        type={emp.isActive ? "good" : "warn"}
                                    />
                                    <Chip
                                        text={emp.isVerified ? "Verified" : "Not Verified"}
                                        type={emp.isVerified ? "good" : "neutral"}
                                    />
                                    {emp.onProbation ? <Chip text="Probation" type="warn" /> : null}
                                </View>
                            </View>
                        </View>

                        {/* Contact */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Contact</Text>
                            <Row label="Mobile" value={emp.employeeMobile} />
                            <Row label="Email" value={emp.email} />
                        </View>

                        {/* Inforfation */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Information</Text>
                            <Row label="Code" value={emp.employeeCode} />
                            <Row label="Shift" value={emp.shiftTiming} />
                            <Row label="Salary" value={salary} />
                        </View>
                        {/* Stats */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Todays Work</Text>
                            <Row label="Sales" value={emp.totalSales} />
                            <Row label="Orders" value={emp.ordersProcessed} />
                            <Row label="Rating" value={emp.customerRating} />
                        </View>

                        {/* Permissions */}
                        <View style={styles.sectionCard}>
                            <Text style={styles.sectionTitle}>Permissions</Text>
                            <Row label="Orders" value={emp.canProcessOrders ? "Allowed" : "Not allowed"} />
                            <Row label="Inventory" value={emp.canManageInventory ? "Allowed" : "Not allowed"} />
                            <Row label="Reports" value={emp.canAccessReports ? "Allowed" : "Not allowed"} />
                            <Row label="Supervisor" value={emp.isSupervisor ? "Yes" : "No"} />
                        </View>



                        {/* Meta */}
                        {/* <View style={styles.sectionCard}>
              <Text style={styles.sectionTitle}>Meta</Text>
              <Row label="Employee ID" value={emp.id} />
              <Row label="Shop ID" value={emp.shopId} />
              <Row label="Vendor ID" value={emp.vendorId} />
              <Row label="Created" value={emp.createdAt} />
              <Row label="Last login" value={emp.lastLoginAt} />
            </View> */}
                    </>
                )}
                <TouchableOpacity onPress={() => {
                    deleteEmp();
                }}>
                    <View style={{
                        backgroundColor: 'rgba(244, 197, 197, 1)',
                        width: '90%', height: 40, alignItems: 'center', justifyContent: 'center',
                        alignSelf:'center',flexDirection:'row',padding:10,borderRadius:10,
                    }}>
                        <LucideDelete size={40} color={'red'} />
                        <Text>Delete Employee</Text>
                    </View>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safe: { flex: 1, backgroundColor: colors.whiteBackground }, // SafeAreaView usage [web:41]
    scrollContent: { padding: 16, paddingBottom: 24 },

    screenTitle: {
        fontSize: 20,
        fontWeight: "900",
        color: colors.headingBlackColor,
    },
    screenSub: {
        marginTop: 4,
        color: colors.subHeading,
        fontWeight: "700",
        marginBottom: 12,
    },

    centerBox: {
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "center",
    },
    loadingText: { marginTop: 10, color: colors.subHeading, fontWeight: "700" },
    emptyText: { color: colors.subHeading, fontWeight: "800" },

    headerCard: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        flexDirection: "row",
        gap: 12,
        borderWidth: 1,
        borderColor: "#eee",
    },
    avatar: {
        height: 58,
        width: 58,
        borderRadius: 29,
        backgroundColor: colors.greenBackground,
        justifyContent: "center",
        alignItems: "center",
    },
    avatarText: {
        fontSize: 20,
        fontWeight: "900",
        color: colors.gradientColorTow,
    },
    name: {
        fontSize: 18,
        fontWeight: "900",
        color: colors.headingBlackColor,
    },
    role: {
        marginTop: 2,
        fontSize: 13,
        color: colors.subHeading,
        fontWeight: "700",
    },

    chipsRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        marginTop: 10,
    },
    chip: {
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 999,
    },
    chipText: {
        fontSize: 12,
        fontWeight: "800",
    },

    sectionCard: {
        marginTop: 12,
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 14,
        borderWidth: 1,
        borderColor: "#eee",
    },
    sectionTitle: {
        fontSize: 14,
        fontWeight: "900",
        color: colors.headingBlackColor,
        marginBottom: 10,
    },

    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start",
        paddingVertical: 8,
        borderTopWidth: 1,
        borderTopColor: "#f1f1f1",
    },
    rowLabel: {
        width: 95,
        fontSize: 13,
        color: colors.subHeading,
        fontWeight: "800",
    },
    rowValue: {
        flex: 1,
        textAlign: "right",
        fontSize: 13,
        color: colors.headingBlackColor,
        fontWeight: "800",
    },
});
