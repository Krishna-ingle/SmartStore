import React, { useState } from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import {
  Milk,
  Sandwich,
  UtensilsCrossed,
  IceCreamBowl,
  Package,       // fallback icon
} from "lucide-react-native";

const DAIRY_CATEGORIES = [
  { id: "all", label: "All", Icon: Package },
  { id: "milk", label: "Milk", Icon: Milk },                // exists in lucide [web:104]
  { id: "curd", label: "Curd", Icon: UtensilsCrossed },
  { id: "paneer", label: "Paneer", Icon: Sandwich },
  { id: "butter", label: "Butter", Icon: Sandwich },
  { id: "cheese", label: "Cheese", Icon: Sandwich },
  { id: "ghee", label: "Ghee", Icon: Package },
  { id: "icecream", label: "Ice Cream", Icon: IceCreamBowl },
];

type Props = {
  value?: string;
  onChange?: (id: string) => void;
};

export function DairyCategoryRow({ value = "all", onChange = () => { } }: Props) {
  const [active, setActive] = useState(value);

  const select = (id: string) => {
    setActive(id);
    onChange(id);
  };

  return (
    <View style={styles.wrap}>
      <FlatList
        data={DAIRY_CATEGORIES}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => {
          const isActive = item.id === active;
          const Icon = item.Icon;

          return (
            <Pressable onPress={() => select(item.id)} style={styles.item}>
              <Icon size={26} color={isActive ? "#111" : "#666"} />
              <Text style={[styles.label, isActive && styles.labelActive]}>
                {item.label}
              </Text>
              <View style={[styles.underline, isActive && styles.underlineActive]} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { paddingHorizontal: 14},
  listContent: { gap: 22, paddingRight: 10 },
  item: { alignItems: "center", justifyContent: "center", paddingVertical: 6 },
  label: { marginTop: 6, fontSize: 14, color: "#666", fontWeight: "600" },
  labelActive: { color: "#111" },
  underline: {
    marginTop: 8,
    height: 3,
    width: 28,
    borderRadius: 99,
    backgroundColor: "transparent",
  },
  underlineActive: { backgroundColor: "#111" },
});
