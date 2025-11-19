import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export default function SignupScreen() {
  const router = useRouter();
  const { signup } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!name || !email || !phone || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    try {
      await signup(name, email, password, phone);
      router.replace('/');
    } catch (error) {
      Alert.alert('Signup Failed', 'Could not create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
          <View className="py-8">
            {/* Logo/Title */}
            <View className="mb-6">
              <Text className="text-primary text-4xl font-bold mb-2">Epiko Shows</Text>
              <Text className="text-text-secondary text-base">Create your account</Text>
            </View>

            {/* Signup Form */}
            <View className="mb-6">
              <Text className="text-white text-lg font-semibold mb-6">Sign Up</Text>

              <View className="mb-4">
                <Text className="text-text-secondary text-sm mb-2">Full Name</Text>
                <TextInput
                  placeholder="John Doe"
                  placeholderTextColor="#6c757d"
                  value={name}
                  onChangeText={setName}
                  className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
                />
              </View>

              <View className="mb-4">
                <Text className="text-text-secondary text-sm mb-2">Email</Text>
                <TextInput
                  placeholder="your@email.com"
                  placeholderTextColor="#6c757d"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
                />
              </View>

              <View className="mb-4">
                <Text className="text-text-secondary text-sm mb-2">Phone Number</Text>
                <TextInput
                  placeholder="+91 9876543210"
                  placeholderTextColor="#6c757d"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
                />
              </View>

              <View className="mb-4">
                <Text className="text-text-secondary text-sm mb-2">Password</Text>
                <TextInput
                  placeholder="Minimum 6 characters"
                  placeholderTextColor="#6c757d"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
                />
              </View>

              <View className="mb-6">
                <Text className="text-text-secondary text-sm mb-2">Confirm Password</Text>
                <TextInput
                  placeholder="Re-enter password"
                  placeholderTextColor="#6c757d"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
                />
              </View>

              <Button
                title="Create Account"
                onPress={handleSignup}
                loading={loading}
                fullWidth
                size="large"
              />
            </View>

            {/* Login Link */}
            <View className="flex-row justify-center items-center mb-8">
              <Text className="text-text-secondary">Already have an account? </Text>
              <TouchableOpacity onPress={() => router.back()}>
                <Text className="text-primary font-semibold">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
