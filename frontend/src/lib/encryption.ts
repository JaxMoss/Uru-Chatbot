import CryptoJS from 'crypto-js';

// Constants for encryption
const DEFAULT_KEY = 'default-encryption-key';

/**
 * Encrypts sensitive data with a user-specific key
 */
export const encryptData = (data: string, userKey: string): string => {
  if (!data || !userKey) return '';
  try {
    return CryptoJS.AES.encrypt(data, userKey).toString();
  } catch (error) {
    console.error('Encryption failed:', error);
    return '';
  }
};

/**
 * Decrypts sensitive data with a user-specific key
 */
export const decryptData = (encryptedData: string, userKey: string): string => {
  if (!encryptedData || !userKey) return '';
  try {
    const bytes = CryptoJS.AES.decrypt(encryptedData, userKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption failed:', error);
    return '';
  }
};

/**
 * Generates a device-specific key for additional encryption layer
 */
export const generateDeviceKey = (): string => {
  // SSR-safe check for browser environment
  if (typeof window === 'undefined') {
    return DEFAULT_KEY;
  }
  
  try {
    // Create a unique device identifier based on browser fingerprint
    const browserInfo = [
      navigator.userAgent,
      navigator.language,
      screen.colorDepth,
      screen.width,
      screen.height
    ].join('|');
    
    // Use MD5 instead of SHA256 to avoid potential math issues
    return CryptoJS.MD5(browserInfo).toString();
  } catch (error) {
    console.error('Failed to generate device key:', error);
    return DEFAULT_KEY;
  }
};

/**
 * Securely stores API key in localStorage with encryption
 */
export const storeApiKey = (apiKey: string): void => {
  if (!apiKey || typeof window === 'undefined') return;
  
  try {
    // Get user ID from auth context to use as encryption key
    const userId = localStorage.getItem('userId') || 'default-user';
    const deviceKey = generateDeviceKey();
    const encryptionKey = `${userId}-${deviceKey}`;
    
    // Double encryption
    const encryptedKey = encryptData(apiKey, encryptionKey);
    localStorage.setItem('encrypted_api_key', encryptedKey);
  } catch (error) {
    console.error('Failed to store API key:', error);
  }
};

/**
 * Retrieves and decrypts API key from localStorage
 */
export const getApiKey = (): string | null => {
  // SSR-safe check for browser environment
  if (typeof window === 'undefined') {
    return null;
  }
  
  try {
    const encryptedKey = localStorage.getItem('encrypted_api_key');
    if (!encryptedKey) return null;
    
    // Get user ID from auth context to use as encryption key
    const userId = localStorage.getItem('userId') || 'default-user';
    const deviceKey = generateDeviceKey();
    const encryptionKey = `${userId}-${deviceKey}`;
    
    return decryptData(encryptedKey, encryptionKey);
  } catch (error) {
    console.error('Failed to get API key:', error);
    return null;
  }
};

/**
 * Removes API key from localStorage
 */
export const clearApiKey = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem('encrypted_api_key');
  } catch (error) {
    console.error('Failed to clear API key:', error);
  }
};
