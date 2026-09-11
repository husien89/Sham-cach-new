import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';

const TransactionScreen = ({ route }) => {
  const { token } = route.params;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get('http://YOUR_BACKEND_IP:5000/api/transactions', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTransactions(response.data.transactions);
      } catch (error) {
        Alert.alert('خطأ', 'فشل في جلب سجل التحويلات');
      }
    };
    fetchTransactions();
  }, [token]);

  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <Text style={styles.transactionType}>{item.type === 'send' ? 'إرسال' : 'استلام'}</Text>
      <Text style={styles.transactionAmount}>${item.amount.toFixed(2)}</Text>
      <Text style={styles.transactionDate}>{new Date(item.date).toLocaleDateString('ar-EG')}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>سجل التحويلات</Text>
      <FlatList
        data={transactions}
        renderItem={renderTransaction}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  transactionItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#eee',
  },
  transactionType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  transactionAmount: {
    fontSize: 16,
    marginVertical: 5,
  },
  transactionDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default TransactionScreen;
