export interface Transaction {
  type: 'send' | 'receive';
  amount: number;
  receiverAddress: string;
  description: string;
  date: string;
}