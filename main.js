const BlockChain = require("./blockchain/blockchain");
const hash = require("object-hash");
require("dotenv").config();

let blockChain = new BlockChain();

const validProof = proof => {
  const guessHash = hash(proof);
  console.log("Hashing: ", guessHash);

  return guessHash === hash(Number(process.env.PROOF));
};

const proofOfWork = () => {
  let proof = 0;
  while (true) {
    if (!validProof(proof)) {
      proof++;
    } else {
      break;
    }
  }
  return proof;
};

if (proofOfWork() === Number(process.env.PROOF)) {
  blockChain.addNewTransaction();
  // adding a check here for the creation of the first block.. because if no blocks exsit yet there will not be a prevHash
  blockChain.addNewBlock(
    blockChain.lastBlock() && blockChain.lastBlock().prevHash
  );
  blockChain.addNewTransaction();
  blockChain.addNewBlock(blockChain.lastBlock().prevHash);
  blockChain.addNewTransaction();
  blockChain.addNewBlock(blockChain.lastBlock().prevHash);
  blockChain.addNewTransaction();
  blockChain.addNewBlock(blockChain.lastBlock().prevHash);
}

console.log("Chain: ", blockChain.chain);
console.log(
  "This persons ticket and transaction: ",
  blockChain.getTicket(blockChain.chain[1].transaction[0].ticketNumber)
);
