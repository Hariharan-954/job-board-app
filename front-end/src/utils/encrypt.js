// Convert PEM public key string to CryptoKey
async function importRsaPublicKey(pem) {
  const pemHeader = "-----BEGIN PUBLIC KEY-----";
  const pemFooter = "-----END PUBLIC KEY-----";
  const pemContents = pem.replace(pemHeader, "").replace(pemFooter, "").replace(/\s/g, "");
  const binaryDer = Uint8Array.from(atob(pemContents), c => c.charCodeAt(0));
  return await window.crypto.subtle.importKey(
    "spki",
    binaryDer.buffer,
    {
      name: "RSA-OAEP",
      hash: "SHA-256",
    },
    false,
    ["encrypt"]
  );
}

// Encrypt credentials using RSA-OAEP + SHA-256
export const encryptCredentials = async (data) => {
  try {
    const base64Key = process.env.REACT_APP_PUBLIC_KEY_BASE64;
    if (!base64Key) throw new Error("Missing public key in environment variables");

    // Decode base64 PEM public key string
    const publicKeyPem = atob(base64Key);

    // Import public key for encryption
    const publicKey = await importRsaPublicKey(publicKeyPem);

    // Encode data to Uint8Array
    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    // Encrypt using RSA-OAEP
    const encryptedBuffer = await window.crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey,
      encodedData
    );

    // Convert ArrayBuffer to base64 string
    return btoa(String.fromCharCode(...new Uint8Array(encryptedBuffer)));
  } catch (error) {
    console.error("Encryption Error:", error.message);
    throw error;
  }
};
