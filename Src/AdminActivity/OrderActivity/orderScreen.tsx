// OrderActivity/orderScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TouchableOpacity, 
  SafeAreaView,
  Alert
} from 'react-native';
import { 
  CheckCircle, 
  Circle, 
  User, 
  Truck, 
  Store,
  Users
} from 'lucide-react-native';
import colors from '../../Asset/Colors/colors';

// TypeScript interfaces
interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  amount: number;
  items: number;
  assignedTo: string | null;
  employeeName: string | null;
  orderTime: string;
  deliveryType: 'counter' | 'delivery';
  address?: string;
}

// Sample orders data
const ordersData: Order[] = [
  {
    id: '1',
    orderNumber: 'HMD-001',
    customerName: 'Rajesh Kumar',
    customerPhone: '+91 98765 43210',
    amount: 1850,
    items: 8,
    assignedTo: null,
    employeeName: null,
    orderTime: '09:15 AM',
    address: '123, Green Park, Sector 5, New Delhi',
    deliveryType: 'delivery'
  },
  {
    id: '2',
    orderNumber: 'CNT-001',
    customerName: 'Anita Singh',
    customerPhone: '+91 87654 32109',
    amount: 850,
    items: 4,
    assignedTo: null,
    employeeName: null,
    orderTime: '10:30 AM',
    deliveryType: 'counter'
  },
  {
    id: '3',
    orderNumber: 'HMD-002',
    customerName: 'Deepak Mehta',
    customerPhone: '+91 76543 21098',
    amount: 2100,
    items: 10,
    assignedTo: 'EMP001',
    employeeName: 'Priya Sharma',
    orderTime: '09:30 AM',
    address: '456, Blue Hills, Phase 2, Gurgaon',
    deliveryType: 'delivery'
  },
  {
    id: '4',
    orderNumber: 'CNT-002',
    customerName: 'Vikram Patel',
    customerPhone: '+91 65432 10987',
    amount: 1200,
    items: 6,
    assignedTo: null,
    employeeName: null,
    orderTime: '10:45 AM',
    deliveryType: 'counter'
  },
  {
    id: '5',
    orderNumber: 'HMD-003',
    customerName: 'Kavita Jain',
    customerPhone: '+91 54321 09876',
    amount: 1350,
    items: 7,
    assignedTo: null,
    employeeName: null,
    orderTime: '10:00 AM',
    address: '789, Rose Garden, Block A, Noida',
    deliveryType: 'delivery'
  }
];

const OrderScreen: React.FC = () => {
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'all' | 'delivery' | 'counter'>('all');

  // Filter orders based on active tab
  const getFilteredOrders = (): Order[] => {
    if (activeTab === 'all') return ordersData;
    return ordersData.filter(order => order.deliveryType === activeTab);
  };

  // Toggle order selection
  const toggleOrderSelection = (orderId: string): void => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter(id => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  // Select all visible orders
  const selectAllOrders = (): void => {
    const visibleOrderIds = getFilteredOrders().map(order => order.id);
    setSelectedOrders(visibleOrderIds);
  };

  // Clear all selections
  const clearSelection = (): void => {
    setSelectedOrders([]);
  };

  // Assign selected orders to employee
  const assignToEmployee = (): void => {
    if (selectedOrders.length === 0) {
      Alert.alert('No Orders Selected', 'Please select orders to assign.');
      return;
    }

    Alert.alert(
      'Assign Employee',
      `Assign ${selectedOrders.length} orders to employee?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Assign', 
          onPress: () => {
            // Here you would typically open an employee selection modal
            // For now, we'll just show a success message
            Alert.alert('Success', `${selectedOrders.length} orders assigned successfully!`);
            setSelectedOrders([]);
          }
        }
      ]
    );
  };

  const renderOrderCard = ({ item }: { item: Order }) => {
    const isSelected = selectedOrders.includes(item.id);
    const isAssigned = item.assignedTo !== null;

    return (
      <TouchableOpacity
        style={[
          styles.card,
          isSelected && styles.selectedCard,
          isAssigned && styles.assignedCard
        ]}
        onPress={() => toggleOrderSelection(item.id)}
        activeOpacity={0.8}
      >
        {/* Selection Indicator */}
        <View style={styles.selectionContainer}>
          {isSelected ? (
            <CheckCircle size={24} color={colors.gradientColorTow} />
          ) : (
            <Circle size={24} color="#d1d5db" />
          )}
        </View>

        {/* Order Content */}
        <View style={styles.cardContent}>
          {/* Header */}
          <View style={styles.cardHeader}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>{item.orderNumber}</Text>
              <Text style={styles.orderTime}>{item.orderTime}</Text>
            </View>
            <View style={styles.typeIcon}>
              {item.deliveryType === 'delivery' ? (
                <Truck size={20} color="#f59e0b" />
              ) : (
                <Store size={20} color="#3b82f6" />
              )}
            </View>
          </View>

          {/* Customer Info */}
          <Text style={styles.customerName}>{item.customerName}</Text>
          <Text style={styles.customerPhone}>{item.customerPhone}</Text>
          
          {/* Address for delivery orders */}
          {item.address && (
            <Text style={styles.address} numberOfLines={2}>
              📍 {item.address}
            </Text>
          )}

          {/* Order Details */}
          <View style={styles.orderDetails}>
            <Text style={styles.amount}>₹{item.amount}</Text>
            <Text style={styles.items}>{item.items} items</Text>
          </View>

          {/* Assignment Status */}
          {isAssigned ? (
            <View style={styles.assignedBadge}>
              <User size={14} color={colors.gradientColorTow} />
              <Text style={styles.assignedText}>
                Assigned to {item.employeeName}
              </Text>
            </View>
          ) : (
            <View style={styles.unassignedBadge}>
              <Text style={styles.unassignedText}>Not Assigned</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>
    );
  };

  const filteredOrders = getFilteredOrders();
  const unassignedOrders = filteredOrders.filter(order => !order.assignedTo);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>
          {selectedOrders.length} of {filteredOrders.length} orders selected
        </Text>
      </View>

      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'all' && styles.activeFilterTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text style={[styles.filterText, activeTab === 'all' && styles.activeFilterText]}>
            All ({ordersData.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'delivery' && styles.activeFilterTab]}
          onPress={() => setActiveTab('delivery')}
        >
          <Truck size={16} color={activeTab === 'delivery' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.filterText, activeTab === 'delivery' && styles.activeFilterText]}>
            Delivery ({ordersData.filter(o => o.deliveryType === 'delivery').length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.filterTab, activeTab === 'counter' && styles.activeFilterTab]}
          onPress={() => setActiveTab('counter')}
        >
          <Store size={16} color={activeTab === 'counter' ? '#ffffff' : '#6b7280'} />
          <Text style={[styles.filterText, activeTab === 'counter' && styles.activeFilterText]}>
            Counter ({ordersData.filter(o => o.deliveryType === 'counter').length})
          </Text>
        </TouchableOpacity>
      </View>

      {/* Selection Controls */}
      {filteredOrders.length > 0 && (
        <View style={styles.selectionControls}>
          <TouchableOpacity style={styles.controlButton} onPress={selectAllOrders}>
            <Text style={styles.controlButtonText}>Select All</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.controlButton} onPress={clearSelection}>
            <Text style={styles.controlButtonText}>Clear Selection</Text>
          </TouchableOpacity>

          <Text style={styles.unassignedCount}>
            {unassignedOrders.length} unassigned orders
          </Text>
        </View>
      )}

      {/* Orders List */}
      <FlatList
        data={filteredOrders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrderCard}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        extraData={selectedOrders} // Re-render when selection changes
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        }
      />

      {/* Assign Employee Button */}
      {selectedOrders.length > 0 && (
        <View style={styles.bottomAction}>
          <TouchableOpacity style={styles.assignButton} onPress={assignToEmployee}>
            <Users size={20} color="#ffffff" />
            <Text style={styles.assignButtonText}>
              Assign Employee ({selectedOrders.length})
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
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
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 4,
  },
  
  // Filter Tabs
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterTab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    marginRight: 10,
    gap: 6,
  },
  activeFilterTab: {
    backgroundColor: colors.gradientColorTow,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6b7280',
  },
  activeFilterText: {
    color: '#ffffff',
  },
  
  // Selection Controls
  selectionControls: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  controlButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    backgroundColor: '#e5e7eb',
    marginRight: 10,
  },
  controlButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#374151',
  },
  unassignedCount: {
    flex: 1,
    textAlign: 'right',
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '500',
  },

  // Order Card
  listContainer: {
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCard: {
    borderColor: colors.gradientColorTow,
    backgroundColor: '#f0fdf4',
  },
  assignedCard: {
    opacity: 0.7,
  },
  selectionContainer: {
    marginRight: 12,
    marginTop: 2,
  },
  cardContent: {
    flex: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  orderInfo: {
    flex: 1,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1f2937',
  },
  orderTime: {
    fontSize: 12,
    color: '#6b7280',
    marginTop: 2,
  },
  typeIcon: {
    marginLeft: 8,
  },
  customerName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
  },
  customerPhone: {
    fontSize: 13,
    color: '#6b7280',
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 16,
    marginBottom: 8,
  },
  orderDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: colors.gradientColorTow,
  },
  items: {
    fontSize: 14,
    color: '#6b7280',
  },
  assignedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
    gap: 4,
  },
  assignedText: {
    fontSize: 12,
    color: colors.gradientColorTow,
    fontWeight: '500',
  },
  unassignedBadge: {
    backgroundColor: '#fef3c7',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 6,
  },
  unassignedText: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '500',
  },

  // Bottom Action
  bottomAction: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.gradientColorTow,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  assignButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },

  // Empty State
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: '#9ca3af',
  },
});

export default OrderScreen;
