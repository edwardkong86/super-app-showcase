import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  ImageBackground,
} from 'react-native';
import LinearGradient from "react-native-linear-gradient";
// import {useNavigation} from '@react-navigation/native';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// import {RootStackParamList} from '../navigation/MainNavigator';
import assets from "../assets";
import BankingService, { BankingAccount } from '../services/BankingService';
import { useAuth } from 'auth/AuthContext';

// type AccountDashboardScreenNavigationProp = NativeStackNavigationProp<
//   RootStackParamList,
//   'AccountDashboard'
// >;

interface Card {
  id: string;
  name: string;
  type: string;
  balance: string;
  lastPaid?: string;
  cardNumber: string;
  bgColor: string[];
  textColor: string;
}

interface DepositAccount {
  id: string;
  name: string;
  type: string;
  accountNumber: string;
  balance: string;
  lastTransaction?: string;
  bgColor: string[];
  textColor: string;
  isPrimary?: boolean;
}

const AccountDashboardScreen = () => {
  // const navigation = useNavigation<AccountDashboardScreenNavigationProp>();
  const [selectedTab, setSelectedTab] = useState('Deposits');
  const [bankingAccounts, setBankingAccounts] = useState<BankingAccount[]>([]);
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const authContext = useAuth();
  const bankingService = BankingService.shared;

  // Set auth context in banking service
  React.useEffect(() => {
    bankingService.setAuthContext(authContext);
  }, [authContext]);

  // Check authentication state before making API calls
  const isAuthenticated = authContext.isAuthenticated;
  const currentUser = authContext.getCurrentUser();
  const authLoading = authContext.isLoading;
  // console.log("currentUser",authContext)

  const tabs = ['Deposits', 'Cards', 'Financing', 'Investment'];

  // Fetch banking data when authenticated
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      fetchBankingData();
    } else if (!authLoading && !isAuthenticated) {
      setLoading(false);
    }
  }, [isAuthenticated, authLoading]);

  const fetchBankingData = async () => {
    try {
      // Don't fetch if not authenticated
      if (!isAuthenticated) {
        console.log('User not authenticated, skipping banking data fetch');
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      
      const response = await bankingService.getBankingSummary();
      const accounts = bankingService.parseAccountsFromResponse(response.result);
      console.log("accounts", accounts, response)
      
      setBankingAccounts(accounts);
      
      // Calculate total balance
      // const total = accounts.reduce((sum, account) => sum + account.balance, 0);
      setTotalBalance(response.result.total);
      
    } catch (err) {
      console.error('Failed to fetch banking data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load banking data');
      // Fallback to mock data on error
      setBankingAccounts([]);
      setTotalBalance(0);
    } finally {
      setLoading(false);
    }
  };

  const depositAccounts: DepositAccount[] = [
    {
      id: '1',
      name: 'MAE',
      type: "Zakri's Daily Account",
      accountNumber: '8888 1213 8888',
      balance: 'RM 1,200.00',
      lastTransaction: '31 Dec 2025, 12:00 AM',
      bgColor: ['#FFFFFF', '#FFB300', '#FFCD90'],
      textColor: '#000000',
      isPrimary: true,
    },
    {
      id: '2',
      name: 'Savings Account-i',
      type: 'Savings Account',
      accountNumber: '8888 1313 8888',
      balance: 'RM 18,800.00',
      lastTransaction: '31 Dec 2025, 12:00 AM',
      bgColor: ['#FEFFDE', '#6ADAA8', '#FFCD90'],
      textColor: '#000000',
    },
    {
      id: '3',
      name: 'Tabung',
      type: 'Self contribution',
      accountNumber: '',
      balance: 'RM 200.00',
      bgColor: ['#FFFFFF', '#FFB300', '#FFCD90'],
      textColor: '#000000',
    },
    {
      id: '4',
      name: 'Islamic Fixed Deposit',
      type: 'Fixed Deposit',
      accountNumber: '8888 1313 8888',
      balance: 'RM 8,000.00',
       bgColor: ['#FEFFDE', '#6ADAA8', '#FFCD90'],
      textColor: '#000000',
    },
  ];

  const cards: Card[] = [
    {
      id: '1',
      name: 'Manchester United Visa Card',
      type: 'Credit Card',
      balance: 'RM 8,000.00',
      cardNumber: '**** 8888',
      lastPaid: '31 Dec 2025',
      bgColor: ['#1e3a8a', '#3b82f6'],
      textColor: '#ffffff',
    },
    {
      id: '2',
      name: 'Shell easiGo',
      type: 'Prepaid Card',
      balance: 'RM 2,000.00',
      cardNumber: '**** 8888',
      lastPaid: '31 Dec 2025, 12:00 AM',
      bgColor: ['#059669', '#10b981'],
      textColor: '#ffffff',
    },
    {
      id: '3',
      name: 'Maybank Visa Debit Card',
      type: 'Platinum',
      balance: '',
      cardNumber: '**** 8888',
      bgColor: ['#dc2626', '#ef4444'],
      textColor: '#ffffff',
    },
    {
      id: '4',
      name: 'Maybank Global Access',
      type: 'Mastercard World Debit',
      balance: '',
      cardNumber: '**** 8888',
      bgColor: ['#374151', '#6b7280'],
      textColor: '#ffffff',
    },
  ];

  const renderDepositAccount = (account: DepositAccount) => (
    <TouchableOpacity key={account.id} style={styles.cardContainer}>
      <LinearGradient
        colors={account.bgColor}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <ImageBackground 
            style={{flex:1, borderRadius: 12, padding: 16, }}
            resizeMode="repeat"
            source={assets.stripe}
            imageStyle={{ opacity: 0.3 }}>
          <View style={styles.cardHeader}>
            <View style={[styles.accountHeaderRow]}>
              <Text style={[styles.cardName, {color: account.textColor}]}>
                {account.name}
              </Text>
              {account.isPrimary && (
                <View style={styles.primaryBadge}>
                  <Text style={styles.primaryText}>Primary</Text>
                </View>
              )}
            </View>
            <Text style={[styles.cardType, {color: account.textColor}]}>
              {account.type}
            </Text>
            {account.accountNumber && (
              <Text style={[styles.accountNumber, {color: account.textColor}]}>
                {account.accountNumber}
              </Text>
            )}
          </View>
          {account.lastTransaction && (
            <Text style={[styles.lastTransaction, {color: account.textColor}]}>
              Last transaction: {account.lastTransaction}
            </Text>
          )}
          <View style={styles.cardFooter}>
            <Text style={[styles.cardBalance, {color: account.textColor}]}>
              {account.balance}
            </Text>
          </View>
        </ImageBackground>
      </LinearGradient>
    </TouchableOpacity>
  );

  const renderCard = (card: Card) => (
    <TouchableOpacity key={card.id} style={styles.cardContainer}>
      <LinearGradient
        colors={card.bgColor}
        style={styles.cardGradient}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}>
        <View style={styles.cardHeader}>
          <Text style={[styles.cardName, {color: card.textColor}]}>
            {card.name}
          </Text>
          <Text style={[styles.cardType, {color: card.textColor}]}>
            {card.type}
          </Text>
        </View>
        {card.lastPaid && (
          <Text style={[styles.lastPaid, {color: card.textColor}]}>
            Last paid: {card.lastPaid}
          </Text>
        )}
        <View style={styles.cardFooter}>
          {card.balance && (
            <Text style={[styles.cardBalance, {color: card.textColor}]}>
              {card.balance}
            </Text>
          )}
          <Text style={[styles.cardNumber, {color: card.textColor}]}>
            {card.cardNumber}
          </Text>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* <StatusBar backgroundColor="#ff6b35" barStyle="light-content" /> */}
      
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View>
            <Text style={styles.appName}>Maybank2u</Text>
            {currentUser && (
              <Text style={styles.welcomeText}>
                Welcome, {currentUser.name || currentUser.email || 'User'}
              </Text>
            )}
          </View>
          <TouchableOpacity>
            <Text style={styles.menuDots}>⋯</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.balanceLabel}>
          {selectedTab === 'Deposits' ? 'Total balance' : 'Total outstanding balance'}
        </Text>
        <Text style={styles.balanceAmount}>
          {loading ? 'Loading...' : 
           error ? 'Error loading balance' :
           selectedTab === 'Deposits' ? 
             bankingService.formatCurrency(totalBalance) : 
             'RM 10,000.00'
          }
        </Text>
      </View>

      <View style={styles.tabContainer}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              selectedTab === tab && styles.activeTab,
            ]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {selectedTab === 'Deposits' && (
        <>
          <View style={styles.balanceSection}>
            <View style={styles.balanceRow}>
              <Text style={styles.sectionLabel}>Spendable funds</Text>
              <Text style={styles.sectionAmount}>
                {loading ? 'Loading...' : 
                 error ? 'Error' :
                 bankingService.formatCurrency(
                   bankingAccounts
                     .filter(acc => acc.type.toUpperCase().includes('S') || acc.type.toUpperCase().includes('D'))
                     .reduce((sum, acc) => sum + acc.balance, 0)
                 )
                }
              </Text>
            </View>
          </View>

          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
              <TouchableOpacity onPress={fetchBankingData} style={styles.retryButton}>
                <Text style={styles.retryText}>Retry</Text>
              </TouchableOpacity>
            </View>
          )}

          <ScrollView style={styles.cardsScrollView}>
            {/* Show API data if available, otherwise fall back to mock data */}
            {bankingAccounts.length > 0 ? (
              bankingAccounts.map((account, index) => {
                const mockAccount: DepositAccount = {
                  id: account.id,
                  name: account.name,
                  type: account.type,
                  accountNumber: account.accountNumber || '',
                  balance: bankingService.formatCurrency(account.balance),
                  lastTransaction: account.lastTransaction,
                  bgColor: index === 0 ? ['#FFFFFF', '#FFB300', '#FFCD90'] : ['#FEFFDE', '#6ADAA8', '#FFCD90'],
                  textColor: '#000000',
                  isPrimary: account.isPrimary,
                };
                return renderDepositAccount(mockAccount);
              })
            ) : (
              !loading && depositAccounts.map(renderDepositAccount)
            )}
            
            <View style={styles.balanceSection}>
              <View style={styles.balanceRow}>
                <Text style={styles.sectionLabel}>Locked-in savings</Text>
                <Text style={styles.sectionAmount}>
                  {loading ? 'Loading...' : 
                   error ? 'Error' :
                   bankingService.formatCurrency(
                     bankingAccounts
                       .filter(acc => acc.type.toLowerCase().includes('fixed') || acc.type.toLowerCase().includes('tabung'))
                       .reduce((sum, acc) => sum + acc.balance, 0)
                   )
                  }
                </Text>
              </View>
            </View>
            
            {/* Show API data if available, otherwise fall back to mock data */}
            {bankingAccounts.length > 0 ? (
              bankingAccounts.map((account, index) => {
                const mockAccount: DepositAccount = {
                  id: account.id,
                  name: account.name,
                  type: account.type,
                  accountNumber: account.accountNumber || '',
                  balance: bankingService.formatCurrency(account.balance),
                  lastTransaction: account.lastTransaction,
                  bgColor: index % 2 === 0 ? ['#FFFFFF', '#FFB300', '#FFCD90'] : ['#FEFFDE', '#6ADAA8', '#FFCD90'],
                  textColor: '#000000',
                  isPrimary: false,
                };
                return renderDepositAccount(mockAccount);
              })
            ) : (
              !loading && depositAccounts.map(renderDepositAccount)
            )}
          </ScrollView>
        </>
      )}

      {selectedTab === 'Cards' && (
        <>
          <View style={styles.treatsContainer}>
            <TouchableOpacity style={styles.treatsRow}>
              <Text style={styles.treatsText}>TreatsPoints: 120,390 pts</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.cardsScrollView}>
            {cards.map(renderCard)}
          </ScrollView>
        </>
      )}

      {(selectedTab !== 'Cards' && selectedTab !== 'Deposits') && (
        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>{selectedTab} coming soon</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#ff6b35',
    paddingHorizontal: 20,
    paddingVertical: 16,
    // paddingTop: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  welcomeText: {
    fontSize: 12,
    color: '#ffffff',
    opacity: 0.9,
    marginTop: 2,
  },
  menuDots: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#ffffff',
    marginBottom: 8,
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    paddingVertical: 4,
    paddingHorizontal: 4,
    alignItems: 'center',
    marginHorizontal: 2,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#ffa500',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#ffffff',
  },
  treatsContainer: {
    backgroundColor: '#ffffff',
    marginTop: 1,
    paddingHorizontal: 16,
  },
  treatsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  treatsText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333333',
  },
  chevron: {
    fontSize: 20,
    color: '#cccccc',
    fontWeight: 'bold',
  },
  cardsScrollView: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: 16,
  },
  cardContainer: {
    marginHorizontal: 0,
    marginBottom: 16,
    borderRadius: 12,
    padding: 12,
    overflow: 'hidden',
  },
  cardGradient: {
    borderRadius: 12,
    // padding: 16,
    minHeight: 120,
  },
  cardHeader: {
    marginBottom: 8,
  },
  cardName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  cardType: {
    fontSize: 14,
    opacity: 0.9,
  },
  lastPaid: {
    fontSize: 12,
    opacity: 0.8,
    marginBottom: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardBalance: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardNumber: {
    fontSize: 14,
    opacity: 0.9,
  },
  comingSoon: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  comingSoonText: {
    fontSize: 16,
    color: '#666666',
  },
  balanceSection: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 1,
  },
  balanceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionLabel: {
    fontSize: 14,
    color: '#666666',
  },
  sectionAmount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
  },
  accountHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  primaryBadge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  primaryText: {
    fontSize: 10,
    color: '#000000',
    fontWeight: '500',
  },
  accountNumber: {
    fontSize: 12,
    opacity: 0.8,
    marginTop: 2,
  },
  lastTransaction: {
    fontSize: 10,
    opacity: 0.7,
    marginBottom: 12,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#f44336',
  },
  errorText: {
    color: '#c62828',
    fontSize: 14,
    marginBottom: 8,
  },
  retryButton: {
    backgroundColor: '#f44336',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  retryText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
  },
});

export default AccountDashboardScreen;