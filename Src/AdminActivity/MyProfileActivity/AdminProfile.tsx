import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Image,
  ActivityIndicator,
} from 'react-native';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Store,
  Calendar,
  Settings,
  Edit3,
  LogOut,
  Bell,
  Shield,
  HelpCircle,
  FileText,
  Camera,
  ChevronRight,
  CreditCard,
  Building,
  Hash,
  CheckCircle,
  XCircle,
  Clock,
  Star,
  DollarSign,
  Package,
} from 'lucide-react-native';
import { ApiHelper } from '../../Services/ApiHelper';

const { width } = Dimensions.get('window');

interface AdminProfileProps {
  navigation?: any;
}

interface VendorProfileData {
  id: string;
  fullName: string | null;
  email: string;
  mobile: string;
  mobileOptional: string | null;
  businessDescription: string | null;
  businessAddress: string | null;
  pinCode: string | null;
  gstNumber: string | null;
  upiId: string | null;
  isVerified: boolean;
  isActive: boolean;
  isApproved: boolean;
  emailVerified: boolean;
  mobileVerified: boolean;
  createdAt: string;
  totalOrders: number;
  totalRevenue: number;
  rating: number;
}

const AdminProfileScreen: React.FC<AdminProfileProps> = ({ navigation }) => {
  const [profileData, setProfileData] = useState<VendorProfileData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    getProfileData();
  }, []);

  const getProfileData = async () => {
    try {
      const response = await ApiHelper.makeApiCall('/vendor/profile', 'GET');
      console.log('Profile Data:', response);
      
      if (response?.vendor) {
        setProfileData(response.vendor);
      }
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status: boolean) => (
    <View style={[styles.statusBadge, status ? styles.statusVerified : styles.statusPending]}>
      {status ? <CheckCircle size={12} color="#22c55e" /> : <XCircle size={12} color="#ef4444" />}
      <Text style={[styles.statusText, status ? styles.statusVerifiedText : styles.statusPendingText]}>
        {status ? 'Verified' : 'Pending'}
      </Text>
    </View>
  );

  const renderProfileHeader = () => (
    <View style={styles.headerContainer}>
      <View style={styles.profileImageContainer}>
        <View style={styles.profileImagePlaceholder}>
          <User color="#fff" size={40} />
        </View>
        <TouchableOpacity style={styles.cameraButton}>
          <Camera color="#22c55e" size={16} />
        </TouchableOpacity>
      </View>

      <View style={styles.profileInfo}>
        <Text style={styles.profileName}>
          {profileData?.fullName || 'Name Not Provided'}
        </Text>
        <Text style={styles.profileRole}>Vendor</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Package color="#22c55e" size={16} />
            <Text style={styles.statText}>{profileData?.totalOrders || 0} Orders</Text>
          </View>
          <View style={styles.statItem}>
            <Star color="#22c55e" size={16} />
            <Text style={styles.statText}>{profileData?.rating || 0}/5 Rating</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.editButton}>
        <Edit3 color="#22c55e" size={18} />
      </TouchableOpacity>
    </View>
  );

  const renderPersonalInfoCard = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Personal Information</Text>
      
      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <Mail color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Email</Text>
          <Text style={styles.infoValue}>{profileData?.email}</Text>
        </View>
        {getStatusBadge(profileData?.emailVerified || false)}
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <Phone color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Primary Mobile</Text>
          <Text style={styles.infoValue}>{profileData?.mobile}</Text>
        </View>
        {getStatusBadge(profileData?.mobileVerified || false)}
      </View>

      {profileData?.mobileOptional && (
        <View style={styles.infoItem}>
          <View style={styles.infoIcon}>
            <Phone color="#666" size={20} />
          </View>
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Optional Mobile</Text>
            <Text style={styles.infoValue}>{profileData.mobileOptional}</Text>
          </View>
        </View>
      )}
    </View>
  );

  const renderBusinessInfoCard = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Business Information</Text>
      
      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <Store color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Business Description</Text>
          <Text style={styles.infoValue}>
            {profileData?.businessDescription || 'Not Provided'}
          </Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <MapPin color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Business Address</Text>
          <Text style={styles.infoValue}>
            {profileData?.businessAddress || 'Not Provided'}
          </Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <Hash color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>PIN Code</Text>
          <Text style={styles.infoValue}>
            {profileData?.pinCode || 'Not Provided'}
          </Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <Building color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>GST Number</Text>
          <Text style={styles.infoValue}>
            {profileData?.gstNumber || 'Not Provided'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPaymentDetailsCard = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Payment Details</Text>
      
      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <CreditCard color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>UPI ID</Text>
          <Text style={styles.infoValue}>
            {profileData?.upiId || 'Not Provided'}
          </Text>
        </View>
      </View>

      <View style={styles.infoItem}>
        <View style={styles.infoIcon}>
          <DollarSign color="#666" size={20} />
        </View>
        <View style={styles.infoContent}>
          <Text style={styles.infoLabel}>Total Revenue</Text>
          <Text style={styles.infoValue}>
            ₹{profileData?.totalRevenue?.toFixed(2) || '0.00'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.addPaymentButton}>
        <Text style={styles.addPaymentText}>+ Add Bank Details</Text>
      </TouchableOpacity>
    </View>
  );

  const renderAccountStatusCard = () => (
    <View style={styles.infoCard}>
      <Text style={styles.cardTitle}>Account Status</Text>
      
      <View style={styles.statusGrid}>
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Account Active</Text>
          {getStatusBadge(profileData?.isActive || false)}
        </View>
        
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Verified</Text>
          {getStatusBadge(profileData?.isVerified || false)}
        </View>
        
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Approved</Text>
          {getStatusBadge(profileData?.isApproved || false)}
        </View>
        
        <View style={styles.statusItem}>
          <Text style={styles.statusLabel}>Registration Date</Text>
          <Text style={styles.statusValue}>
            {profileData?.createdAt ? formatDate(profileData.createdAt) : 'N/A'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderMenuCard = () => (
    <View style={styles.menuCard}>
      <Text style={styles.cardTitle}>Account Settings</Text>
      
      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Settings color="#666" size={20} />
        </View>
        <Text style={styles.menuText}>General Settings</Text>
        <ChevronRight color="#ccc" size={16} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Bell color="#666" size={20} />
        </View>
        <Text style={styles.menuText}>Notifications</Text>
        <ChevronRight color="#ccc" size={16} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <CreditCard color="#666" size={20} />
        </View>
        <Text style={styles.menuText}>Payment Settings</Text>
        <ChevronRight color="#ccc" size={16} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <Shield color="#666" size={20} />
        </View>
        <Text style={styles.menuText}>Privacy & Security</Text>
        <ChevronRight color="#ccc" size={16} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.menuItem}>
        <View style={styles.menuIcon}>
          <HelpCircle color="#666" size={20} />
        </View>
        <Text style={styles.menuText}>Help & Support</Text>
        <ChevronRight color="#ccc" size={16} />
      </TouchableOpacity>
    </View>
  );

  const renderLogoutButton = () => (
    <TouchableOpacity style={styles.logoutButton}>
      <LogOut color="#ef4444" size={20} />
      <Text style={styles.logoutText}>Sign Out</Text>
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#22c55e" />
          <Text style={styles.loadingText}>Loading Profile...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        style={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderProfileHeader()}
        {renderPersonalInfoCard()}
        {renderBusinessInfoCard()}
        {renderPaymentDetailsCard()}
        {renderAccountStatusCard()}
        {renderMenuCard()}
        {renderLogoutButton()}
        <View style={styles.bottomSpacing} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },

  // Header Styles
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  profileImageContainer: {
    position: 'relative',
    marginRight: 16,
  },
  profileImagePlaceholder: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraButton: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f0f0f0',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 4,
  },
  profileRole: {
    fontSize: 14,
    color: '#22c55e',
    fontWeight: '600',
    marginBottom: 8,
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  statText: {
    fontSize: 12,
    color: '#6b7280',
    marginLeft: 4,
    fontWeight: '500',
  },
  editButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f0f9f0',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Info Card Styles
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1f2937',
    marginBottom: 16,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  infoIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    color: '#1f2937',
    fontWeight: '600',
  },

  // Status Badge Styles
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  statusVerified: {
    backgroundColor: '#f0fdf4',
  },
  statusPending: {
    backgroundColor: '#fef2f2',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    marginLeft: 4,
  },
  statusVerifiedText: {
    color: '#22c55e',
  },
  statusPendingText: {
    color: '#ef4444',
  },

  // Status Grid Styles
  statusGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statusItem: {
    width: '48%',
    marginBottom: 16,
  },
  statusLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
    marginBottom: 4,
  },
  statusValue: {
    fontSize: 14,
    color: '#1f2937',
    fontWeight: '600',
  },

  // Payment Button Styles
  addPaymentButton: {
    marginTop: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#f0f9f0',
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#22c55e',
    borderStyle: 'dashed',
  },
  addPaymentText: {
    color: '#22c55e',
    fontWeight: '600',
    fontSize: 14,
  },

  // Menu Card Styles
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },

  // Logout Button Styles
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#fee2e2',
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutText: {
    fontSize: 16,
    color: '#ef4444',
    fontWeight: '600',
    marginLeft: 8,
  },

  // Bottom Spacing
  bottomSpacing: {
    height: 20,
  },
});

export default AdminProfileScreen;
