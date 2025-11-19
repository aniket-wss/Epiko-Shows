import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import { Button } from '../../components/common/Button';

export default function LoginScreen() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    setLoading(true);
    try {
      await login(email, password);
      router.replace('/');
    } catch (error) {
      Alert.alert('Login Failed', 'Invalid credentials. Please try again.');
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
        <View className="flex-1 px-6 justify-center">
          {/* Logo/Title */}
          <View className="mb-8">
            <Text className="text-primary text-4xl font-bold mb-2">Epiko Shows</Text>
            <Text className="text-text-secondary text-base">Book your favorite movies</Text>
          </View>

          {/* Login Form */}
          <View className="mb-6">
            <Text className="text-white text-lg font-semibold mb-6">Login to your account</Text>

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

            <View className="mb-6">
              <Text className="text-text-secondary text-sm mb-2">Password</Text>
              <TextInput
                placeholder="Enter your password"
                placeholderTextColor="#6c757d"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                className="bg-background-card text-white px-4 py-3 rounded-lg text-base"
              />
            </View>

            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              fullWidth
              size="large"
            />

            {/* Demo Credentials */}
            <View className="mt-4 bg-background-card p-3 rounded-lg">
              <Text className="text-text-secondary text-xs text-center">
                Demo: Use any email and password to login
              </Text>
            </View>
          </View>

          {/* Signup Link */}
          <View className="flex-row justify-center items-center">
            <Text className="text-text-secondary">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/signup')}>
              <Text className="text-primary font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
