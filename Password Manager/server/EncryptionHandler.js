const crypto = require("crypto");
//variable that keeps the encryotion safe consists from 32 char
const secret = 'pppppppppppppppppppppppppppppppp';
//encryption function
const encrypt = (password) => {

//identifier for the encryption - generates a buffer with 16 bytes
const iv = Buffer.from(crypto.randomBytes(16));
//create what will encrypt the password - cipher and pass the algorithm, buffered secret, and iv
const cipher = crypto.createCipheriv("aes-256-ctr", Buffer.from(secret), iv);
}

//decryption function
const decrypt = (encryption) => {

}

module.exports = {encrypt, decrypt};