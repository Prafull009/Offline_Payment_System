// import { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { Camera, X } from 'lucide-react-native';
// import { useWalletStore } from '@/store/walletStore';
// import { useRouter } from 'expo-router';
// import TransactionModal from '@/components/TransactionModal';
// import { CameraView, useCameraPermissions, CameraType } from 'expo-camera';

// export default function ScanScreen() {
//   const [permission, requestPermission] = useCameraPermissions();
//   const [scanned, setScanned] = useState(false);
//   const [showModal, setShowModal] = useState(false);
//   const [receiverInfo, setReceiverInfo] = useState({
//     walletAddress: '',
//     deviceId: '',
//   });
//   const { createTransaction } = useWalletStore();
//   const router = useRouter();

//   const handleBarCodeScanned = ({ data }: { data: string }) => {
//     setScanned(true);
//     try {
//       const scannedData = JSON.parse(data);
//       if (scannedData.walletAddress && scannedData.deviceId) {
//         setReceiverInfo(scannedData);
//         setShowModal(true);
//       } else {
//         Alert.alert('Invalid QR Code', 'The scanned QR code is not valid for payments.');
//         setScanned(false);
//       }
//     } catch (error) {
//       Alert.alert('Error', 'Could not process the QR code.');
//       setScanned(false);
//     }
//   };

//   const handleConfirmTransaction = (amount: number) => {
//     if (amount <= 0) {
//       Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
//       return;
//     }

//     createTransaction({
//       type: 'send',
//       amount,
//       receiverAddress: receiverInfo.walletAddress,
//       description: `Sent to ${receiverInfo.walletAddress.substring(0, 6)}...`,
//       date: new Date().toLocaleDateString(),
//     });

//     Alert.alert(
//       'Transaction Successful',
//       `₹${amount} sent successfully.`,
//       [{ text: 'OK', onPress: () => router && router.push('/') }]
//     );

//     setShowModal(false);
//     setScanned(false);
//   };

//   const handleCancelTransaction = () => {
//     setShowModal(false);
//     setScanned(false);
//   };

//   if (Platform.OS === 'web') {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.webContainer}>
//           <Camera size={64} color="#3366FF" />
//           <Text style={styles.webTitle}>QR Code Scanner</Text>
//           <Text style={styles.webDescription}>
//             QR code scanning is not available on web platforms. Please use this feature on a mobile device.
//           </Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!permission) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.loadingContainer}>
//           <Text style={styles.loadingText}>Loading camera permissions...</Text>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   if (!permission.granted) {
//     return (
//       <SafeAreaView style={styles.container}>
//         <View style={styles.permissionContainer}>
//           <Text style={styles.permissionTitle}>Camera access needed</Text>
//           <Text style={styles.permissionDescription}>
//             We need camera access to scan QR codes for payments.
//           </Text>
//           <TouchableOpacity
//             style={styles.permissionButton}
//             onPress={requestPermission}
//           >
//             <Text style={styles.permissionButtonText}>Grant permission</Text>
//           </TouchableOpacity>
//         </View>
//       </SafeAreaView>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <CameraView
//         style={styles.camera}
//         facing={CameraType.back}
//         onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
//         barcodeScannerSettings={{
//           barcodeTypes: ['qr'],
//         }}
//       >
//         <View style={styles.scanOverlay}>
//           <View style={styles.header}>
//             <TouchableOpacity 
//               style={styles.closeButton}
//               onPress={() => router && router.back()}
//             >
//               <X size={24} color="#FFFFFF" />
//             </TouchableOpacity>
//             <Text style={styles.headerTitle}>Scan QR Code</Text>
//             <View style={styles.placeholder} />
//           </View>

//           <View style={styles.scanFrame} />

//           <Text style={styles.scanInstructions}>
//             Point your camera at a QR code to scan
//           </Text>
//         </View>
//       </CameraView>

//       <TransactionModal
//         visible={showModal}
//         receiverAddress={receiverInfo.walletAddress}
//         onConfirm={handleConfirmTransaction}
//         onCancel={handleCancelTransaction}
//       />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#000',
//   },
//   camera: {
//     flex: 1,
//   },
//   scanOverlay: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'space-between',
//     paddingVertical: 40,
//   },
//   header: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//   },
//   closeButton: {
//     width: 40,
//     height: 40,
//     borderRadius: 20,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   headerTitle: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 18,
//     color: '#FFFFFF',
//   },
//   placeholder: {
//     width: 40,
//   },
//   scanFrame: {
//     width: 250,
//     height: 250,
//     borderWidth: 2,
//     borderColor: '#3366FF',
//     alignSelf: 'center',
//     backgroundColor: 'transparent',
//     borderRadius: 16,
//   },
//   scanInstructions: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#FFFFFF',
//     textAlign: 'center',
//     paddingHorizontal: 40,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   loadingText: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#18181B',
//   },
//   permissionContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//     backgroundColor: '#F7F7F7',
//   },
//   permissionTitle: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 24,
//     color: '#18181B',
//     marginBottom: 12,
//   },
//   permissionDescription: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#71717A',
//     textAlign: 'center',
//     marginBottom: 24,
//   },
//   permissionButton: {
//     backgroundColor: '#3366FF',
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 12,
//   },
//   permissionButtonText: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 16,
//     color: '#FFFFFF',
//   },
//   webContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F7F7F7',
//     padding: 20,
//   },
//   webTitle: {
//     fontFamily: 'Inter-SemiBold',
//     fontSize: 24,
//     color: '#18181B',
//     marginTop: 16,
//     marginBottom: 12,
//   },
//   webDescription: {
//     fontFamily: 'Inter-Regular',
//     fontSize: 16,
//     color: '#71717A',
//     textAlign: 'center',
//     maxWidth: 300,
//   },
// });

import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Camera as CameraIcon, X, Check } from 'lucide-react-native';
import { useWalletStore } from '@/store/walletStore';
import { useRouter } from 'expo-router';
import TransactionModal from '@/components/TransactionModal';
import { Camera, CameraView, useCameraPermissions, CameraType } from 'expo-camera';
import QRCodeDisplay from '@/components/QRCodeDisplay';

interface VerificationData {
  status: string;
  senderAddress: string;
  receiverAddress: string;
  amount: number;
  timestamp: string;
  transactionId: string;
}

export default function ScanScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showAcknowledgement, setShowAcknowledgement] = useState(false);
  const [receiverInfo, setReceiverInfo] = useState({
    walletAddress: '',
    deviceId: '',
    amount: 0,
  });
  const { createTransaction, walletAddress } = useWalletStore();
  const [verificationData, setVerificationData] = useState<VerificationData | null>(null);
  const router = useRouter();

  // const handleBarCodeScanned = ({ data }: { data: string }) => {
  //   setScanned(true);
  //   try {
  //     const scannedData = JSON.parse(data);
  //     if (scannedData.walletAddress && scannedData.deviceId) {
  //       // Check if amount is included in the QR code
  //       const amount = scannedData.amount !== undefined ? parseFloat(scannedData.amount) : 0;
        
  //       setReceiverInfo({
  //         walletAddress: scannedData.walletAddress,
  //         deviceId: scannedData.deviceId,
  //         amount: amount,
  //       });
        
  //       // If amount is already specified in QR, we can bypass the amount input
  //       if (amount > 0) {
  //         // Directly show confirmation or process payment
  //         handleConfirmTransaction(amount);
  //       } else {
  //         // Show modal to enter amount
  //         setShowModal(true);
  //       }
  //     } else {
  //       Alert.alert('Invalid QR Code', 'The scanned QR code is not valid for payments.');
  //       setScanned(false);
  //     }
  //   } catch (error) {
  //     Alert.alert('Error', 'Could not process the QR code.');
  //     setScanned(false);
  //   }
  // };
  const handleBarCodeScanned = ({ data }: { data: string }) => {
    setScanned(true);
    try {
      const scannedData = JSON.parse(data);
      
      // Check if this is an acknowledgement QR code (has status and transactionId)
      if (scannedData.status && scannedData.transactionId) {
        // Handle acknowledgement QR code scanning
        handleAcknowledgementScan(scannedData);
        return;
      }
      
      // Regular payment QR code handling
      if (scannedData.walletAddress && scannedData.deviceId) {
        // Check if amount is included in the QR code
        const amount = scannedData.amount !== undefined ? parseFloat(scannedData.amount) : 0;
        
        setReceiverInfo({
          walletAddress: scannedData.walletAddress,
          deviceId: scannedData.deviceId,
          amount: amount,
        });
        
        // If amount is already specified in QR, we can bypass the amount input
        if (amount > 0) {
          // Directly show confirmation or process payment
          handleConfirmTransaction(amount);
        } else {
          // Show modal to enter amount
          setShowModal(true);
        }
      } else {
        Alert.alert('Invalid QR Code', 'The scanned QR code is not valid for payments.');
        setScanned(false);
      }
    } catch (error) {
      Alert.alert('Error', 'Could not process the QR code.');
      setScanned(false);
    }
  };
  
  // New function to handle acknowledgement QR scanning
  const handleAcknowledgementScan = (data: any) => {
    if (data.receiverAddress === walletAddress) {
      // Create a receive transaction using the existing createTransaction function
      createTransaction({
        type: 'receive',
        amount: data.amount,
        receiverAddress: walletAddress, // This is the current wallet
        description: `Received ₹${data.amount} from ${data.senderAddress.substring(0, 6)}...`,
        date: new Date().toLocaleDateString(),
        // You can add this if your Transaction type supports it
        // transactionId: data.transactionId 
      });
      
      // Show verification screen
      setVerificationData(data);
    } else {
      // This acknowledgement is not for this wallet
      Alert.alert(
        'Not Your Transaction',
        'This payment verification is for a different wallet.',
        [{ text: 'OK', onPress: () => setScanned(false) }]
      );
    }
  };

  // const handleAcknowledgementScan = (data: any) => {
  //   setVerificationData(data);
  // };

  const handleConfirmTransaction = (amount: number) => {
    if (amount <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount greater than 0.');
      return;
    }

    createTransaction({
      type: 'send',
      amount,
      receiverAddress: receiverInfo.walletAddress,
      description: `Sent ₹${amount} to ${receiverInfo.walletAddress.substring(0, 6)}...`,
      date: new Date().toLocaleDateString(),
    });

    // Show acknowledgement QR instead of alert
    setShowModal(false);
    setShowAcknowledgement(true);
  };

  const getAcknowledgementQRValue = () => {
    return JSON.stringify({
      status: 'success',
      senderAddress: walletAddress,
      receiverAddress: receiverInfo.walletAddress,
      amount: receiverInfo.amount,
      timestamp: new Date().toISOString(),
      transactionId: `txn_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    });
  };

  const handleCancelTransaction = () => {
    setShowModal(false);
    setScanned(false);
  };

  const handleDone = () => {
    setShowAcknowledgement(false);
    setScanned(false);
    router && router.push('/');
  };

  if (verificationData) {
    return (
      <SafeAreaView style={styles.acknowledgeContainer}>
        <View style={styles.acknowledgeContent}>
          <View style={styles.successHeader}>
            <View style={styles.successIconContainer}>
              <Check size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Transaction Verified</Text>
            <Text style={styles.successAmount}>₹{verificationData.amount.toFixed(2)}</Text>
          </View>
          
          <View style={styles.verificationDetails}>
            <Text style={styles.verificationTitle}>Transaction Details</Text>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Transaction ID:</Text>
              <Text style={styles.detailValue}>{verificationData.transactionId}</Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Sender:</Text>
              <Text style={styles.detailValue}>
                {verificationData.senderAddress.substring(0, 6)}...
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Receiver:</Text>
              <Text style={styles.detailValue}>
                {verificationData.receiverAddress.substring(0, 6)}...
              </Text>
            </View>
            
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Date:</Text>
              <Text style={styles.detailValue}>
                {new Date(verificationData.timestamp).toLocaleString()}
              </Text>
            </View>
          </View>
          
          <TouchableOpacity 
            style={styles.doneButton} 
            onPress={() => {
              setVerificationData(null);
              setScanned(false);
              router && router.push('/');
            }}
          >
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (showAcknowledgement) {
    return (
      <SafeAreaView style={styles.acknowledgeContainer}>
        <View style={styles.acknowledgeContent}>
          <View style={styles.successHeader}>
            <View style={styles.successIconContainer}>
              <Check size={32} color="#FFFFFF" />
            </View>
            <Text style={styles.successTitle}>Payment Successful!</Text>
            <Text style={styles.successAmount}>₹{receiverInfo.amount.toFixed(2)}</Text>
            <Text style={styles.successDescription}>
              Your payment to {receiverInfo.walletAddress.substring(0, 6)}... was successful.
            </Text>
          </View>
          
          <View style={styles.qrContainer}>
            <Text style={styles.qrTitle}>Acknowledgement QR</Text>
            <View style={styles.qrWrapper}>
              <QRCodeDisplay
                value={getAcknowledgementQRValue()}
                size={200}
              />
            </View>
            <Text style={styles.qrDescription}>
              Show this QR to the recipient as proof of payment
            </Text>
          </View>
          
          <TouchableOpacity style={styles.doneButton} onPress={handleDone}>
            <Text style={styles.doneButtonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.webContainer}>
          <CameraIcon size={64} color="#3366FF" />
          <Text style={styles.webTitle}>QR Code Scanner</Text>
          <Text style={styles.webDescription}>
            QR code scanning is not available on web platforms. Please use this feature on a mobile device.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading camera permissions...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.permissionContainer}>
          <Text style={styles.permissionTitle}>Camera access needed</Text>
          <Text style={styles.permissionDescription}>
            We need camera access to scan QR codes for payments.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <CameraView
        style={styles.camera}
        facing='back'
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={styles.scanOverlay}>
          <View style={styles.header}>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={() => router && router.back()}
            >
              <X size={24} color="#FFFFFF" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Scan QR Code</Text>
            <View style={styles.placeholder} />
          </View>

          <View style={styles.scanFrame} />

          <Text style={styles.scanInstructions}>
            Point your camera at a payment QR code to scan
          </Text>
        </View>
      </CameraView>

      <TransactionModal
        visible={showModal}
        receiverAddress={receiverInfo.walletAddress}
        onConfirm={handleConfirmTransaction}
        onCancel={handleCancelTransaction}
        initialAmount={receiverInfo.amount > 0 ? receiverInfo.amount.toString() : ''}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  scanOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'space-between',
    paddingVertical: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#FFFFFF',
  },
  placeholder: {
    width: 40,
  },
  scanFrame: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: '#3366FF',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 16,
  },
  scanInstructions: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#18181B',
  },
  permissionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F7F7',
  },
  permissionTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    marginBottom: 12,
  },
  permissionDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    marginBottom: 24,
  },
  permissionButton: {
    backgroundColor: '#3366FF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
  },
  permissionButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  webContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    padding: 20,
  },
  webTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    marginTop: 16,
    marginBottom: 12,
  },
  webDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
    maxWidth: 300,
  },
  // Acknowledgement screen styles
  acknowledgeContainer: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  acknowledgeContent: {
    flex: 1,
    padding: 20,
  },
  successHeader: {
    alignItems: 'center',
    marginVertical: 24,
  },
  successIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  successTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    marginBottom: 8,
  },
  successAmount: {
    fontFamily: 'Inter-Bold',
    fontSize: 32,
    color: '#18181B',
    marginBottom: 12,
  },
  successDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#71717A',
    textAlign: 'center',
  },
  qrContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 24,
  },
  qrTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#18181B',
    marginBottom: 16,
  },
  qrWrapper: {
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
  qrDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#71717A',
    textAlign: 'center',
    paddingHorizontal: 16,
  },
  doneButton: {
    backgroundColor: '#3366FF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#3366FF',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  doneButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
  // Add to your styles
verificationDetails: {
  backgroundColor: '#FFFFFF',
  borderRadius: 16,
  padding: 20,
  marginBottom: 24,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.05,
  shadowRadius: 2,
  elevation: 2,
},
verificationTitle: {
  fontFamily: 'Inter-SemiBold',
  fontSize: 18,
  color: '#18181B',
  marginBottom: 16,
  alignSelf: 'center',
},
detailRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingVertical: 8,
  borderBottomWidth: 1,
  borderBottomColor: '#F4F4F5',
},
detailLabel: {
  fontFamily: 'Inter-Medium',
  fontSize: 14,
  color: '#71717A',
},
detailValue: {
  fontFamily: 'Inter-SemiBold',
  fontSize: 14,
  color: '#18181B',
},
});