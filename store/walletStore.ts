import { create } from 'zustand';
import { Transaction } from '@/types/wallet';

interface WalletState {
  balance: number;
  walletAddress: string;
  transactions: Transaction[];
  recentTransactions: Transaction[];
  
  createTransaction: (transaction: Transaction) => void;
}

export const useWalletStore = create<WalletState>((set) => {
  // Generate a fake wallet address
  const generateWalletAddress = () => {
    const chars = '0123456789abcdef';
    return '0x' + Array(40).fill(0).map(() => chars[Math.floor(Math.random() * chars.length)]).join('');
  };

  // Generate some sample transactions
  const sampleTransactions: Transaction[] = [
    {
      type: 'receive',
      amount: 500,
      receiverAddress: generateWalletAddress(),
      description: 'Received from Amit',
      date: '12/03/2025',
    },
    {
      type: 'send',
      amount: 150,
      receiverAddress: generateWalletAddress(),
      description: 'Sent to Priya',
      date: '10/03/2025',
    },
    {
      type: 'receive',
      amount: 300,
      receiverAddress: generateWalletAddress(),
      description: 'Received from Vikram',
      date: '05/03/2025',
    },
  ];

  return {
    balance: 5000, // Fixed initial wallet balance as specified
    walletAddress: generateWalletAddress(),
    transactions: sampleTransactions,
    recentTransactions: sampleTransactions.slice(0, 3),
    
    createTransaction: (transaction: Transaction) => set(state => {
      // Create a new transaction and update the balance
      const newBalance = transaction.type === 'send' 
        ? state.balance - transaction.amount 
        : state.balance + transaction.amount;
      
      const updatedTransactions = [transaction, ...state.transactions];
      
      return {
        balance: newBalance,
        transactions: updatedTransactions,
        recentTransactions: updatedTransactions.slice(0, 3),
      };
    }),
  };
});