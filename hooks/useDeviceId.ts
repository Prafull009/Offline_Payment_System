import { useState, useEffect } from 'react';
import Constants from 'expo-constants';

/**
 * Hook to get a unique device identifier.
 * In a real app, this would be handled securely with device-specific identifiers.
 */
export function useDeviceId(): string {
  const [deviceId, setDeviceId] = useState<string>('');

  useEffect(() => {
    // In a real app, we would use react-native-device-info or a similar library
    // For this demo, we'll generate a fake device ID based on installationId from Expo
    const generateDeviceId = () => {
      const installationId = Constants.installationId || '';
      // Create a device ID by combining installationId with some random characters
      const randomPart = Math.random().toString(36).substring(2, 10);
      const generatedId = installationId + randomPart;
      
      // Store in-memory for this session
      return generatedId;
    };

    // Set the device ID
    setDeviceId(generateDeviceId());
  }, []);

  return deviceId;
}