export const encryptCredentials = async (data) => {
  try {
    const base64Key = process.env.REACT_APP_PUBLIC_KEY_BASE64;

    if (!base64Key) {
      throw new Error('Missing public key in environment variables');
    }

    const publicKeyPem = atob(base64Key); // Convert base64 -> PEM string

    const publicKey = await importRsaPublicKey(publicKeyPem, 'RSA-OAEP');

    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encodedData
    );

    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer))); // Return base64 string
  } catch (error) {
    console.error('Encryption Error:', error.message);
    throw error;
  }
};

// Helper to convert PEM -> CryptoKey
async function importRsaPublicKey(pem, alg) {
  // Remove header, footer, and line breaks
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.replace(pemHeader, '').replace(pemFooter, '').replace(/\s/g, '');
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));

  return await window.crypto.subtle.importKey(
    'spki',
    binaryDer.buffer,
    {
      name: alg,
      hash: 'SHA-256',
    },
    false,
    ['encrypt']
  );
}
