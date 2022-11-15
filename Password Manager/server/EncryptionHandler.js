const crypto = require("crypto");
//variable that keeps the encryotion safe consists from 32 char
const secret = 'pppppppppppppppppppppppppppppppp';
//encryption function
const encrypt = (password) => {
//identifier for the encryption - generates a buffer with 16 bytes
const iv = Buffer.from(crypto.randomBytes(16));
//create what will encrypt the password - cipher and pass the algorithm, buffered secret, and iv
const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);
//the result of the encryption
const encryptedPassword = Buffer.concat([cipher.update(password), cipher.final()]);

return { iv: iv.toString("hex"), password: encryptedPassword.toString("hex")};
};

//decryption function
const decrypt = (encryption) => {
//create decipher that will decrypt the encrypted password
const decipher = crypto.createDecipheriv("aes-256-ctr", Buffer.from(secret), Buffer.from(encryption.iv,"hex"));
//create the result of decryption
const decryptedPassword = Buffer.concat([decipher.update(Buffer.from(encryption.password, "hex")), decipher.final()]);

return decryptedPassword.toString()
};

module.exports = {encrypt, decrypt};