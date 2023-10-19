const crypto = require("crypto");

// Generate an RSA key pair
// const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa", {
//   modulusLength: 2048, // You can adjust the key size as needed
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });

const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
  namedCurve: "P-256", // Named curve for ES256
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

// # Generate a private key
// openssl ecparam -name prime256v1 -genkey -noout -out private_key.pem

// # Extract the public key from the private key
// openssl ec -in private_key.pem -pubout -out public_key.pem

console.log("Public Key:");
console.log(publicKey);

console.log("\nPrivate Key:");
console.log(privateKey);
