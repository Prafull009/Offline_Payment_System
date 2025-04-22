import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowUp, ArrowDown, ChevronRight } from 'lucide-react-native';
import { useWalletStore } from '@/store/walletStore';
import { Transaction } from '@/types/wallet';

export default function TransactionsScreen() {
  const { transactions } = useWalletStore();
  const [activeFilter, setActiveFilter] = useState<'all' | 'sent' | 'received'>('all');

  const filteredTransactions = transactions.filter(transaction => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'sent') return transaction.type === 'send';
    if (activeFilter === 'received') return transaction.type === 'receive';
    return true;
  });

  const renderTransaction = ({ item }: { item: Transaction }) => {
    return (
      <TouchableOpacity style={styles.transactionItem}>
        <View style={styles.transactionIconContainer}>
          {item.type === 'send' ? (
            <ArrowUp size={18} color="#FF3B30" />
          ) : (
            <ArrowDown size={18} color="#00C851" />
          )}
        </View>
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionTitle}>{item.description}</Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
        </View>
        <View style={styles.transactionAmountContainer}>
          <Text
            style={[
              styles.transactionAmount,
              { color: item.type === 'send' ? '#FF3B30' : '#00C851' }
            ]}
          >
            {item.type === 'send' ? '-' : '+'} ₹{item.amount}
          </Text>
          <ChevronRight size={16} color="#A1A1AA" />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Transaction History</Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'all' && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter('all')}
        >
          <Text style={[
            styles.filterButtonText,
            activeFilter === 'all' && styles.activeFilterButtonText
          ]}>
            All
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'sent' && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter('sent')}
        >
          <Text style={[
            styles.filterButtonText,
            activeFilter === 'sent' && styles.activeFilterButtonText
          ]}>
            Sent
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.filterButton,
            activeFilter === 'received' && styles.activeFilterButton
          ]}
          onPress={() => setActiveFilter('received')}
        >
          <Text style={[
            styles.filterButtonText,
            activeFilter === 'received' && styles.activeFilterButtonText
          ]}>
            Received
          </Text>
        </TouchableOpacity>
      </View>

      {filteredTransactions.length > 0 ? (
        <FlatList
          data={filteredTransactions}
          renderItem={renderTransaction}
          keyExtractor={(item, index) => `transaction-${index}`}
          contentContainerStyle={styles.transactionsList}
        />
      ) : (
        <View style={styles.emptyStateContainer}>
          <Text style={styles.emptyStateTitle}>No Transactions</Text>
          <Text style={styles.emptyStateDescription}>
            Your transaction history will appear here.
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  title: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    flex: 1,
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: '#F4F4F5',
  },
  activeFilterButton: {
    backgroundColor: '#3366FF',
  },
  filterButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#71717A',
  },
  activeFilterButtonText: {
    color: '#FFFFFF',
  },
  transactionsList: {
    paddingHorizontal: 20,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  transactionIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F7F7F7',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#18181B',
  },
  transactionDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    marginTop: 2,
  },
  transactionAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  transactionAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    marginRight: 8,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#18181B',
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
  },
});