import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = ({ route }) => {
  const { token } = route.params;
  const [user, setUser] = useState(null);
  const [balance, setBalance] = useState(0);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('http://YOUR_BACKEND_IP:5000/api/users/me', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data.user);
        setBalance(response.data.user.balance || 0);
      } catch (error) {
        Alert.alert('خطأ', 'فشل في جلب بيانات المستخدم');
      }
    };
    fetchUserData();
  }, [token]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>مرحبًا، {user?.name || 'مستخدم'}</Text>
      <Text style={styles.balance}>رصيدك: ${balance.toFixed(2)}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Transactions', { token })}
      >
        <Text style={styles.buttonText}>سجل التحويلات</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  balance: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#007AFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
