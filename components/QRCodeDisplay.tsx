import { View, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';

interface QRCodeDisplayProps {
  value: string;
  size?: number;
}

export default function QRCodeDisplay({ value, size = 200 }: QRCodeDisplayProps) {
  // Make sure the value is not empty to avoid errors
  const qrValue = value || 'https://example.com';

  return (
    <View style={styles.container}>
      <QRCode
        value={qrValue}
        size={size}
        color="#18181B"
        backgroundColor="#FFFFFF"
        logoBackgroundColor="#FFFFFF"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});