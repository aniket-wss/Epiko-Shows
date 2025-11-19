import React, { createContext, useState, useContext } from 'react';
import { useAuth } from './AuthContext';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: string;
}

interface WalletContextType {
  balance: number;
  transactions: Transaction[];
  addMoney: (amount: number) => Promise<void>;
  deductMoney: (amount: number) => Promise<void>;
  getTransactions: () => Promise<Transaction[]>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, updateUser } = useAuth();
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const balance = user?.wallet_balance || 0;

  const addMoney = async (amount: number) => {
    try {
      // Mock API call
      const newBalance = balance + amount;

      if (user) {
        updateUser({ ...user, wallet_balance: newBalance });
      }

      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'credit',
        amount,
        description: 'Money added to wallet',
        date: new Date().toISOString()
      };

      setTransactions([transaction, ...transactions]);
    } catch (error) {
      console.error('Add money error:', error);
      throw error;
    }
  };

  const deductMoney = async (amount: number) => {
    try {
      if (balance < amount) {
        throw new Error('Insufficient balance');
      }

      const newBalance = balance - amount;

      if (user) {
        updateUser({ ...user, wallet_balance: newBalance });
      }

      const transaction: Transaction = {
        id: Date.now().toString(),
        type: 'debit',
        amount,
        description: 'Ticket booking payment',
        date: new Date().toISOString()
      };

      setTransactions([transaction, ...transactions]);
    } catch (error) {
      console.error('Deduct money error:', error);
      throw error;
    }
  };

  const getTransactions = async (): Promise<Transaction[]> => {
    // Mock transactions
    const mockTransactions: Transaction[] = [
      {
        id: '1',
        type: 'credit',
        amount: 500,
        description: 'Money added to wallet',
        date: new Date(Date.now() - 86400000).toISOString()
      },
      {
        id: '2',
        type: 'debit',
        amount: 300,
        description: 'Ticket booking - The Dark Universe',
        date: new Date(Date.now() - 172800000).toISOString()
      }
    ];

    setTransactions(mockTransactions);
    return mockTransactions;
  };

  return (
    <WalletContext.Provider
      value={{
        balance,
        transactions,
        addMoney,
        deductMoney,
        getTransactions
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
