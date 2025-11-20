import { Stack } from 'expo-router';
import { AuthProvider } from '../context/AuthContext';
import { BookingProvider } from '../context/BookingContext';
import { WalletProvider } from '../context/WalletContext';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

// Import global CSS for web
if (Platform.OS === 'web') {
  require('../global.css');
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <WalletProvider>
        <BookingProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: {
                backgroundColor: '#1a1a2e',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
              contentStyle: {
                backgroundColor: '#1a1a2e',
              },
            }}
          >
            <Stack.Screen
              name="index"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="auth/login"
              options={{ title: 'Login', headerShown: false }}
            />
            <Stack.Screen
              name="auth/signup"
              options={{ title: 'Sign Up', headerShown: false }}
            />
            <Stack.Screen
              name="movie/[id]"
              options={{ title: 'Movie Details' }}
            />
            <Stack.Screen
              name="booking/theatre-selection"
              options={{ title: 'Select Theatre' }}
            />
            <Stack.Screen
              name="booking/seat-selection"
              options={{ title: 'Select Seats' }}
            />
            <Stack.Screen
              name="booking/payment"
              options={{ title: 'Payment' }}
            />
            <Stack.Screen
              name="booking/confirmation"
              options={{ title: 'Booking Confirmed', headerShown: false }}
            />
            <Stack.Screen
              name="profile/wallet"
              options={{ title: 'My Wallet' }}
            />
            <Stack.Screen
              name="profile/bookings"
              options={{ title: 'My Bookings' }}
            />
          </Stack>
        </BookingProvider>
      </WalletProvider>
    </AuthProvider>
  );
}
