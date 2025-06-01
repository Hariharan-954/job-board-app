import crypto from 'crypto';
import dotenv from 'dotenv';

dotenv.config();

const privateKey = Buffer.from(process.env.PRIVATE_KEY_BASE64, 'base64').toString('utf-8');


export const decryptRSA = (encryptedBase64) => {
  try {
    if (!encryptedBase64) {
      throw new Error('No encrypted input provided');
    }

    if (!privateKey) {
      throw new Error('Private key not found in environment variables');
    }

    const buffer = Buffer.from(encryptedBase64, 'base64');

    const decrypted = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
      },
      buffer
    );

    return decrypted.toString('utf8');
  } catch (error) {
    console.error('RSA Decryption Error:', error.message);
    return null; // Optional: or throw error if you want to handle it outside
  }
};
