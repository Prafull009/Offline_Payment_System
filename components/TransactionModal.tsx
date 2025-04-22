import { useState } from 'react';
import { View, Text, StyleSheet, Modal, TouchableOpacity, TextInput, Platform } from 'react-native';
import { X } from 'lucide-react-native';
import { BlurView } from 'expo-blur';

interface TransactionModalProps {
  visible: boolean;
  receiverAddress: string;
  onConfirm: (amount: number) => void;
  onCancel: () => void;
  initialAmount: string;
}

export default function TransactionModal({
  visible,
  receiverAddress,
  onConfirm,
  onCancel,
  initialAmount
}: TransactionModalProps) {
  const [amount, setAmount] = useState(initialAmount);

  const handleConfirm = () => {
    const amountValue = parseFloat(amount);
    if (!isNaN(amountValue) && amountValue > 0) {
      onConfirm(amountValue);
      setAmount('');
    }
  };

  const handleCancel = () => {
    setAmount('');
    onCancel();
  };

  // Format the receiver address for display
  const formattedAddress = receiverAddress
    ? `${receiverAddress.substring(0, 8)}...${receiverAddress.substring(receiverAddress.length - 6)}`
    : '';

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
    >
      <View style={styles.overlay}>
        {Platform.OS !== 'web' && (
          <BlurView intensity={90} style={StyleSheet.absoluteFill} tint="dark" />
        )}
        
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Send Payment</Text>
            <TouchableOpacity style={styles.closeButton} onPress={handleCancel}>
              <X size={20} color="#71717A" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.receiverContainer}>
            <Text style={styles.receiverLabel}>To:</Text>
            <Text style={styles.receiverAddress}>{formattedAddress}</Text>
          </View>
          
          <View style={styles.amountContainer}>
            <Text style={styles.amountLabel}>Amount</Text>
            <View style={styles.amountInputContainer}>
              <Text style={styles.currencySymbol}>₹</Text>
              <TextInput
                style={styles.amountInput}
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                placeholder="0.00"
                placeholderTextColor="#A1A1AA"
                autoFocus
              />
            </View>
          </View>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={[
                styles.button, 
                styles.confirmButton,
                (!amount || parseFloat(amount) <= 0) && styles.disabledButton
              ]}
              onPress={handleConfirm}
              disabled={!amount || parseFloat(amount) <= 0}
            >
              <Text style={styles.confirmButtonText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: Platform.OS === 'web' ? 'rgba(0, 0, 0, 0.6)' : 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  modalTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#18181B',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F4F4F5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  receiverContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F4F4F5',
  },
  receiverLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#71717A',
    marginRight: 8,
  },
  receiverAddress: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#18181B',
  },
  amountContainer: {
    padding: 20,
  },
  amountLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#71717A',
    marginBottom: 8,
  },
  amountInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E4E4E7',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  currencySymbol: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    marginRight: 8,
  },
  amountInput: {
    flex: 1,
    fontFamily: 'Inter-SemiBold',
    fontSize: 24,
    color: '#18181B',
    padding: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 20,
  },
  button: {
    flex: 1,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButton: {
    backgroundColor: '#F4F4F5',
    marginRight: 8,
  },
  cancelButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#71717A',
  },
  confirmButton: {
    backgroundColor: '#3366FF',
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: '#A5B4FC',
  },
  confirmButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#FFFFFF',
  },
});