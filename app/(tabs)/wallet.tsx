// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Copy, Share as ShareIcon } from 'lucide-react-native';
// import { useWalletStore } from '@/store/walletStore';
// import { useDeviceId } from '@/hooks/useDeviceId';
// import QRCodeDisplay from '@/components/QRCodeDisplay';

// export default function WalletScreen() {
//   const { balance, walletAddress } = useWalletStore();
//   const deviceId = useDeviceId();

//   const formatWalletAddress = (address: string) => {
//     if (!address) return '';
//     return `${address.substring(0, 9)}...${address.substring(address.length - 6)}`;
//   };

//   const handleCopyAddress = () => {
//     if (Platform.OS === 'web') {
//       navigator.clipboard.writeText(walletAddress);
//     } else {
//       // For native platforms, you would use Clipboard.setString
//       console.log('Copied wallet address:', walletAddress);
//     }
//   };

//   const handleShare = async () => {
//     const qrData = JSON.stringify({
//       walletAddress,
//       deviceId,
//     });

//     try {
//       if (Platform.OS === 'web') {
//         await navigator.share({
//           title: 'My Wallet Address',
//           text: `My wallet address: ${walletAddress}`,
//         });
//       } else {
//         await Share.share({
//           message: `My wallet address: ${walletAddress}`,
//         });
//       }
//     } catch (error) {
//       console.log('Error sharing:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Your Wallet</Text>
//       </View>

//       <ScrollView style={styles.content}>
//         <View style={styles.balanceCard}>
//           <Text style={styles.balanceLabel}>Available Balance</Text>
//           <Text style={styles.balanceAmount}>₹{balance.toFixed(2)}</Text>
//           <Text style={styles.walletAddressLabel}>Wallet Address</Text>
//           <View style={styles.walletAddressContainer}>
//             <Text style={styles.walletAddress}>{formatWalletAddress(walletAddress)}</Text>
//             <TouchableOpacity onPress={handleCopyAddress} style={styles.copyButton}>
//               <Copy size={16} color="#3366FF" />
//             </TouchableOpacity>
//           </View>
//         </View>

//         <View style={styles.qrCodeContainer}>
//           <Text style={styles.qrCodeLabel}>Your QR Code</Text>
//           <View style={styles.qrCodeWrapper}>
//             <QRCodeDisplay 
//               value={JSON.stringify({
//                 walletAddress,
//                 deviceId,
//               })} 
//               size={200} 
//             />
//           </View>
//           <Text style={styles.qrCodeHelp}>
//             Show this QR code to receive money from other users
//           </Text>
//         </View>

//         <View style={styles.actionButtonsContainer}>
//           <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
//             <ShareIcon size={20} color="#FFFFFF" style={styles.actionButtonIcon} />
//             <Text style={styles.actionButtonText}>Share Wallet Address</Text>
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F7F7F7',
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 20,
//     paddingTop: 20,
//     paddingBottom: 10,
//   },
//   title: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 24,
//     color: '#18181B',
//     flex: 1,
//     textAlign: 'center',
//   },
//   content: {
//     flex: 1,
//   },
//   balanceCard: {
//     backgroundColor: '#3366FF',
//     borderRadius: 16,
//     margin: 20,
//     padding: 20,
//     shadowColor: '#3366FF',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   balanceLabel: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 16,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 4,
//   },
//   balanceAmount: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 32,
//     color: '#FFFFFF',
//     marginBottom: 16,
//   },
//   walletAddressLabel: {
//     fontFamily: 'Inter-Medium',
//     fontSize: 14,
//     color: 'rgba(255, 255, 255, 0.8)',
//     marginBottom: 4,
//   },
//   walletAddressContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   walletAddress: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#FFFFFF',
//     flex: 1,
//   },
//   copyButton: {
//     padding: 8,
//   },
//   qrCodeContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 16,
//     margin: 20,
//     padding: 20,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 2,
//     elevation: 2,
//   },
//   qrCodeLabel: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 18,
//     color: '#18181B',
//     marginBottom: 16,
//   },
//   qrCodeWrapper: {
//     padding: 16,
//     backgroundColor: '#FFFFFF',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 4,
//     elevation: 1,
//     marginBottom: 16,
//   },
//   qrCodeHelp: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 14,
//     color: '#71717A',
//     textAlign: 'center',
//     paddingHorizontal: 16,
//   },
//   actionButtonsContainer: {
//     margin: 20,
//     marginTop: 10,
//   },
//   actionButton: {
//     backgroundColor: '#3366FF',
//     borderRadius: 12,
//     padding: 16,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#3366FF',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   actionButtonIcon: {
//     marginRight: 8,
//   },
//   actionButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#FFFFFF',
//   }
// });

import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Share, Platform, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Copy, Share as ShareIcon, Edit } from 'lucide-react-native';
import { useWalletStore } from '@/store/walletStore';
import { useDeviceId } from '@/hooks/useDeviceId';
import QRCodeDisplay from '@/components/QRCodeDisplay';
import { useState } from 'react';

export default function WalletScreen() {
  const { balance, walletAddress } = useWalletStore();
  const deviceId = useDeviceId();
  const [amount, setAmount] = useState('0.00');
  const [isEditingAmount, setIsEditingAmount] = useState(false);

  const formatWalletAddress = (address: string) => {
    if (!address) return '';
    return `${address.substring(0, 9)}...${address.substring(address.length - 6)}`;
  };

  const handleCopyAddress = () => {
    if (Platform.OS === 'web') {
      navigator.clipboard.writeText(walletAddress);
    } else {
      // For native platforms, you would use Clipboard.setString
      console.log('Copied wallet address:', walletAddress);
    }
  };

  const handleShare = async () => {
    const qrData = JSON.stringify({
      walletAddress,
      deviceId,
      amount: parseFloat(amount),
    });

    try {
      if (Platform.OS === 'web') {
        await navigator.share({
          title: 'My Payment Request',
          text: `Please pay ₹${amount} to wallet address: ${walletAddress}`,
        });
      } else {
        await Share.share({
          message: `Please pay ₹${amount} to wallet address: ${walletAddress}`,
        });
      }
    } catch (error) {
      console.log('Error sharing:', error);
    }
  };

  const getQRValue = () => {
    return JSON.stringify({
      walletAddress,
      deviceId,
      amount: parseFloat(amount),
    });
  };

  const toggleEditAmount = () => {
    setIsEditingAmount(!isEditingAmount);
  };

  const handleAmountChange = (text: string) => {
    // Remove any non-numeric characters except decimal point
    const filteredText = text.replace(/[^0-9.]/g, '');
    
    // Ensure only one decimal point
    const parts = filteredText.split('.');
    if (parts.length > 2) {
      return;
    }

    setAmount(filteredText);
  };

  const saveAmount = () => {
    // Format to 2 decimal places
    const formattedAmount = parseFloat(amount || '0').toFixed(2);
    setAmount(formattedAmount);
    setIsEditingAmount(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Wallet</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.balanceCard}>
          <Text style={styles.balanceLabel}>Available Balance</Text>
          <Text style={styles.balanceAmount}>₹{balance.toFixed(2)}</Text>
          <Text style={styles.walletAddressLabel}>Wallet Address</Text>
          <View style={styles.walletAddressContainer}>
            <Text style={styles.walletAddress}>{formatWalletAddress(walletAddress)}</Text>
            <TouchableOpacity onPress={handleCopyAddress} style={styles.copyButton}>
              <Copy size={16} color="#3366FF" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.paymentAmountContainer}>
          <Text style={styles.paymentAmountLabel}>Payment Request Amount</Text>
          
          {isEditingAmount ? (
            <View style={styles.amountEditContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={handleAmountChange}
                keyboardType="numeric"
                autoFocus
                selectTextOnFocus
              />
              <TouchableOpacity style={styles.saveButton} onPress={saveAmount}>
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.amountDisplayContainer}>
              <Text style={styles.amountDisplay}>₹{amount}</Text>
              <TouchableOpacity onPress={toggleEditAmount} style={styles.editButton}>
                <Edit size={16} color="#3366FF" />
              </TouchableOpacity>
            </View>
          )}
          <Text style={styles.amountHelp}>
            This amount will be included in your payment QR code
          </Text>
        </View>

        <View style={styles.qrCodeContainer}>
          <Text style={styles.qrCodeLabel}>Your Payment QR Code</Text>
          <View style={styles.qrCodeWrapper}>
            <QRCodeDisplay 
              value={getQRValue()} 
              size={200} 
            />
          </View>
          <Text style={styles.qrCodeHelp}>
            Show this QR code to receive ₹{amount} from other users
          </Text>
        </View>

        <View style={styles.actionButtonsContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handleShare}>
            <ShareIcon size={20} color="#FFFFFF" style={styles.actionButtonIcon} />
            <Text style={styles.actionButtonText}>Share Payment Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  balanceCard: {
    backgroundColor: '#3366FF',
    borderRadius: 16,
    margin: 20,
    padding: 20,
    shadowColor: '#3366FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  balanceLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  balanceAmount: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    color: '#FFFFFF',
    marginBottom: 16,
  },
  walletAddressLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 4,
  },
  walletAddressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  walletAddress: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  copyButton: {
    padding: 8,
  },
  paymentAmountContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    marginBottom: 10,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  paymentAmountLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#18181B',
    marginBottom: 16,
  },
  amountDisplayContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  amountDisplay: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 32,
    color: '#18181B',
  },
  editButton: {
    marginLeft: 12,
    padding: 8,
  },
  amountEditContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  currencySymbol: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    marginRight: 4,
  },
  amountInput: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    borderBottomWidth: 2,
    borderBottomColor: '#3366FF',
    paddingVertical: 4,
    minWidth: 100,
    textAlign: 'center',
  },
  saveButton: {
    backgroundColor: '#3366FF',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginLeft: 12,
  },
  saveButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#FFFFFF',
  },
  amountHelp: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
  },
  qrCodeContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 20,
    marginTop: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  qrCodeLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#18181B',
    marginBottom: 16,
  },
  qrCodeWrapper: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
    marginBottom: 16,
  },
  qrCodeHelp: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  actionButtonsContainer: {
    margin: 20,
    marginTop: 10,
  },
  actionButton: {
    backgroundColor: '#3366FF',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3366FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  actionButtonIcon: {
    marginRight: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  }
});