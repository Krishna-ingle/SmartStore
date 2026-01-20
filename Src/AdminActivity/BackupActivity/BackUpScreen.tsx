// BackupActivity/BackUpScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  ScrollView
} from 'react-native';
import colors from '../../Asset/Colors/colors';
import { Calendar } from 'lucide-react-native';

// ✅ Define TypeScript interfaces
interface DateItem {
  id: string;
  date: string;
  display: string;
}

interface DeliveryItem {
  id: string;
  orderNumber: string;
  customerName: string;
  date: string;
  status: string;
  amount: number;
  items: number;
}

interface DeliveryCardProps {
  item: DeliveryItem;
}

interface BackupButtonProps {
  title: string;
  onPress: () => void;
  color: string;
}

// Dummy date data
const dummyDates: DateItem[] = [
  { id: '1', date: '2025-09-01', display: 'Sep 1' },
  { id: '2', date: '2025-09-02', display: 'Sep 2' },
  { id: '3', date: '2025-09-03', display: 'Sep 3' },
  { id: '4', date: '2025-09-04', display: 'Sep 4' },
  { id: '5', date: '2025-09-05', display: 'Sep 5' },
  { id: '6', date: '2025-09-06', display: 'Sep 6' },
];

// Dummy delivery data
const deliveryHistoryData: DeliveryItem[] = [
  { 
    id: '1', 
    orderNumber: 'ORD-001', 
    customerName: 'Shree Ram', 
    date: '2025-09-01', 
    status: 'Delivered',
    amount: 1250,
    items: 3
  },
  { 
    id: '2', 
    orderNumber: 'ORD-002', 
    customerName: 'Hanumanji', 
    date: '2025-09-02', 
    status: 'Pending',
    amount: 890,
    items: 2
  },
  { 
    id: '3', 
    orderNumber: 'ORD-003', 
    customerName: 'Krishna', 
    date: '2025-09-03', 
    status: 'Delivered',
    amount: 2100,
    items: 5
  },
  { 
    id: '4', 
    orderNumber: 'ORD-004', 
    customerName: "Radha", 
    date: '2025-09-04', 
    status: 'Delivered',
    amount: 750,
    items: 1
  },
  { 
    id: '5', 
    orderNumber: 'ORD-005', 
    customerName: 'Sita Mata', 
    date: '2025-09-05', 
    status: 'Pending',
    amount: 1680,
    items: 4
  },
];

const BackUpScreen: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>('2025-09-01');

  // Filter data based on selected date
  const filteredData = deliveryHistoryData.filter(item => 
    item.date === selectedDate
  );

  const handleDateSelection = (date: string): void => {
    setSelectedDate(date);
  };

  const handleBackupType = (type: string): void => {
    console.log(`${type} backup selected`);
    // Add your backup logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Dummy Calendar */}
      <View style={styles.calendarContainer}>
        <View style={{ display:'flex',flexDirection: 'row',alignContent:'space-around',justifyContent:'space-between' }}>
        <Text style={styles.sectionTitle}>Select Date</Text>
        <Calendar size={24} color={colors.gradientColorTow} strokeWidth={2} style={{ marginLeft: 10 }} />
        </View>
        <Text style={styles.headerSubtitle}>Select date to view delivery history</Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          style={styles.dateScroll}
        >
          {dummyDates.map((dateItem) => (
            <TouchableOpacity
              key={dateItem.id}
              style={[
                styles.dateButton,
                selectedDate === dateItem.date && styles.selectedDateButton
              ]}
              onPress={() => handleDateSelection(dateItem.date)}
            >
              <Text
                style={[
                  styles.dateText,
                  selectedDate === dateItem.date && styles.selectedDateText
                ]}
              >
                {dateItem.display}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Delivery History Cards */}
      <View style={styles.historyContainer}>
        <Text style={styles.sectionTitle}>
          Delivery History ({filteredData.length} records)
        </Text>
        
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DeliveryCard item={item} />}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
        />
      </View>

      {/* Backup Type Buttons */}
      <View style={styles.backupTypeContainer}>
        <Text style={styles.sectionTitle}>Backup Options</Text>
        <View style={styles.buttonRow}>
          {/* <BackupButton 
            title="" 
            onPress={() => handleBackupType('Full')}
            color="#22c55e"
          /> */}
          <BackupButton 
            title="Upload Drive" 
            onPress={() => handleBackupType('Quick')}
            color="#3b82f6"
          />
          <BackupButton 
            title="Download" 
            onPress={() => handleBackupType('Restore')}
            color="#f59e0b"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// ✅ Delivery Card Component with TypeScript
const DeliveryCard: React.FC<DeliveryCardProps> = ({ item }) => {
  const getStatusColor = (status: string): string => {
    return status === 'Delivered' ? '#22c55e' : '#f59e0b';
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.orderInfo}>
          <Text style={styles.orderNumber}>{item.orderNumber}</Text>
          <Text style={styles.customerName}>{item.customerName}</Text>
        </View>
        <View style={[
          styles.statusBadge, 
          { backgroundColor: getStatusColor(item.status) }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
      
      <View style={styles.cardDetails}>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Amount</Text>
          <Text style={styles.detailValue}>₹{item.amount}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Items</Text>
          <Text style={styles.detailValue}>{item.items}</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Date</Text>
          <Text style={styles.detailValue}>{item.date}</Text>
        </View>
      </View>
    </View>
  );
};

// ✅ Backup Button Component with TypeScript
const BackupButton: React.FC<BackupButtonProps> = ({ title, onPress, color }) => {
  return (
    <TouchableOpacity 
      style={[styles.backupButton, { backgroundColor: color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.backupButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

// ✅ Empty State Component with TypeScript
const EmptyState: React.FC = () => {
  return (
    <View style={styles.emptyState}>
      <Text style={styles.emptyTitle}>No Records Found</Text>
      <Text style={styles.emptyText}>
        No delivery records found for the selected date.
        Try selecting a different date.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  headerSubtitle: {
    marginBottom:10,
    fontSize: 14,
    color: '#6b7280',
  },
  calendarContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 15,
  },
  dateScroll: {
    flexDirection: 'row',
  },
  dateButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginRight: 10,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#e5e7eb',
    backgroundColor: '#ffffff',
  },
  selectedDateButton: {
    backgroundColor: colors.gradientColorTow,
    borderColor: colors.gradientColorTow,
  },
  dateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6b7280',
  },
  selectedDateText: {
    color: '#ffffff',
  },
  historyContainer: {
    flex: 1,
    padding: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  customerName: {
    fontSize: 14,
    color: '#6b7280',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailItem: {
    alignItems: 'center',
  },
  detailLabel: {
    fontSize: 12,
    color: '#9ca3af',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 20,
  },
  backupTypeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  backupButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  backupButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default BackUpScreen;
  