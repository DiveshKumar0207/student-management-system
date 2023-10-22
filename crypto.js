// const crypto = require("crypto");

// const { publicKey, privateKey } = crypto.generateKeyPairSync("ec", {
//   namedCurve: "P-256", // Named curve for ES256
//   publicKeyEncoding: {
//     type: "spki",
//     format: "pem",
//   },
//   privateKeyEncoding: {
//     type: "pkcs8",
//     format: "pem",
//   },
// });

// console.log("Public Key:");
// console.log(publicKey);

// console.log("\nPrivate Key:");
// console.log(privateKey);

// ****below one if want to use in terminal
// ****it will directly make your required file, instead of copy-paste
// <<----> use in terminal <<---->>
// # Generate a private key
// openssl ecparam -name prime256v1 -genkey -noout -out private_key.pem

// # Extract the public key from the private key
// openssl ec -in private_key.pem -pubout -out public_key.pem
