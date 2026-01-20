import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../Asset/Colors/colors";

interface CardViewProps {
  id: string;
  employeeCode: string;
  employeeName: string;
  email: string;
  employeeMobile: string;
  employeeRole: string;
  department: string;
  basicSalary: string;
  shiftTiming: string;
}

interface EmpCardViewProps {
  item: CardViewProps;
  onPress: () => void;
}

const EmpCardView = ({ item, onPress }: EmpCardViewProps) => {
  const initial = (item.employeeName?.trim()?.charAt(0) || "?").toUpperCase();

  return (
    <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.wrapper}>
      <View style={styles.card}>
        {/* Top row */}
        <View style={styles.topRow}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{initial}</Text>
          </View>

          <View style={styles.titleBlock}>
            <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">
              {item.employeeName}
            </Text>
            <Text style={styles.role} numberOfLines={1} ellipsizeMode="tail">
              {item.employeeRole}
            </Text>
          </View>
        </View>

        {/* Details */}
        <View style={styles.meta}>
          <MetaRow label="Email" value={item.email} />
          <MetaRow label="Dept" value={item.department} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const MetaRow = ({ label, value }: { label: string; value: string }) => {
  return (
    <View style={styles.metaRow}>
      <Text style={styles.metaLabel}>{label}</Text>
      <Text style={styles.metaValue} numberOfLines={1} ellipsizeMode="tail">
        {value || "-"}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: "#EEE",

    // shadow (iOS) + elevation (Android)
    
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  avatar: {
    height: 44,
    width: 44,
    borderRadius: 22,
    backgroundColor: "rgba(10, 173, 35, 0.12)",
    alignItems: "center",
    justifyContent: "center",
  },
  avatarText: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.gradientColorone ?? "#0AAD23",
  },
  titleBlock: { flex: 1 },
  name: { fontSize: 16, fontWeight: "700", color: "#111827" },
  role: { marginTop: 2, fontSize: 12, color: colors.subHeading },

  meta: { marginTop: 12, gap: 8 },
  metaRow: { flexDirection: "row", alignItems: "center" },
  metaLabel: { width: 52, fontSize: 12, color: "#6B7280" },
  metaValue: { flex: 1, fontSize: 13, color: "#111827" },
});

export { EmpCardView };
