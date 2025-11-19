import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, SafeAreaView, Alert, TextInput, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { useWallet } from '../../context/WalletContext';
import { Button } from '../../components/common/Button';

export default function WalletScreen() {
  const router = useRouter();
  const { user } = useAuth();
  const { balance, transactions, addMoney, getTransactions } = useWallet();
  const [showAddMoneyModal, setShowAddMoneyModal] = useState(false);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getTransactions();
  }, []);

  const quickAmounts = [100, 200, 500, 1000, 2000];

  const handleAddMoney = async () => {
    const amountNum = parseFloat(amount);

    if (!amountNum || amountNum <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount');
      return;
    }

    if (amountNum > 50000) {
      Alert.alert('Limit Exceeded', 'Maximum ₹50,000 can be added at once');
      return;
    }

    setLoading(true);
    try {
      await addMoney(amountNum);
      setShowAddMoneyModal(false);
      setAmount('');
      Alert.alert('Success', `₹${amountNum} added to your wallet successfully!`);
    } catch (error) {
      Alert.alert('Failed', 'Could not add money. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="flex-1">
        {/* Balance Card */}
        <View className="bg-gradient-to-r bg-primary p-6 m-4 rounded-lg">
          <Text className="text-white/80 text-sm mb-2">Available Balance</Text>
          <Text className="text-white text-4xl font-bold mb-4">₹{balance.toFixed(2)}</Text>

          <View className="flex-row items-center">
            <View className="flex-1 mr-2">
              <TouchableOpacity
                onPress={() => setShowAddMoneyModal(true)}
                className="bg-white/20 py-3 rounded-lg"
              >
                <Text className="text-white text-center font-semibold">+ Add Money</Text>
              </TouchableOpacity>
            </View>
            <View className="flex-1 ml-2">
              <View className="bg-white/20 py-3 rounded-lg">
                <Text className="text-white text-center text-xs">Loyalty Points</Text>
                <Text className="text-white text-center font-bold text-lg">
                  {user?.loyalty_points || 0}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Transaction History */}
        <View className="px-4 pb-6">
          <Text className="text-white text-lg font-bold mb-3">Transaction History</Text>

          {transactions.length === 0 ? (
            <View className="bg-background-card p-6 rounded-lg">
              <Text className="text-text-secondary text-center">No transactions yet</Text>
            </View>
          ) : (
            transactions.map(transaction => (
              <View
                key={transaction.id}
                className="bg-background-card p-4 rounded-lg mb-3 flex-row justify-between items-center"
              >
                <View className="flex-1">
                  <Text className="text-white font-semibold">{transaction.description}</Text>
                  <Text className="text-text-secondary text-xs mt-1">
                    {formatDate(transaction.date)}
                  </Text>
                </View>
                <Text
                  className={`font-bold text-lg ${
                    transaction.type === 'credit' ? 'text-accent-success' : 'text-primary'
                  }`}
                >
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>

      {/* Add Money Modal */}
      <Modal
        visible={showAddMoneyModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddMoneyModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-background-card rounded-t-3xl p-6">
            <View className="flex-row justify-between items-center mb-6">
              <Text className="text-white text-xl font-bold">Add Money</Text>
              <TouchableOpacity onPress={() => setShowAddMoneyModal(false)}>
                <Text className="text-text-secondary text-2xl">×</Text>
              </TouchableOpacity>
            </View>

            {/* Amount Input */}
            <View className="mb-4">
              <Text className="text-text-secondary text-sm mb-2">Enter Amount</Text>
              <View className="bg-background border border-text-secondary rounded-lg px-4 py-3 flex-row items-center">
                <Text className="text-white text-xl mr-2">₹</Text>
                <TextInput
                  placeholder="0"
                  placeholderTextColor="#6c757d"
                  value={amount}
                  onChangeText={setAmount}
                  keyboardType="numeric"
                  className="text-white text-xl flex-1"
                />
              </View>
            </View>

            {/* Quick Amount Buttons */}
            <View className="mb-6">
              <Text className="text-text-secondary text-sm mb-2">Quick Add</Text>
              <View className="flex-row flex-wrap">
                {quickAmounts.map(amt => (
                  <TouchableOpacity
                    key={amt}
                    onPress={() => setAmount(amt.toString())}
                    className="bg-background border border-primary rounded-lg px-4 py-2 mr-2 mb-2"
                  >
                    <Text className="text-primary font-semibold">₹{amt}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <Button
              title="Add Money"
              onPress={handleAddMoney}
              loading={loading}
              fullWidth
              size="large"
            />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
