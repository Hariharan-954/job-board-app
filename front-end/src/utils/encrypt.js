import JSEncrypt from 'jsencrypt';

export const encryptCredentials = (data) => {
  try {
    const base64Key = process.env.REACT_APP_PUBLIC_KEY_BASE64;

    if (!base64Key) throw new Error('Missing public key in environment variables');

    const PUBLIC_KEY = atob(base64Key); // base64 → PEM string

    const encryptor = new JSEncrypt();
    encryptor.setPublicKey(PUBLIC_KEY);

    const encrypted = encryptor.encrypt(JSON.stringify(data));
    if (!encrypted) throw new Error('Encryption failed.');

    return encrypted;
  } catch (error) {
    console.error('Encryption Error:', error.message);
    throw error;
  }
};
