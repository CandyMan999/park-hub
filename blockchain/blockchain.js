const hash = require("object-hash");
const randomstring = require("randomstring");

class BlockChain {
  constructor() {
    //create chain
    this.chain = [];
    //transaction
    this.current_transaction = [];
  }

  addNewBlock(prevHash) {
    const block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      companyName: "Park Hub",
      transaction: this.current_transaction,
      prevHash
    };

    //put hash
    this.hash = hash(block);

    //Add to Chain
    this.chain.push(block);
    this.current_transaction = [];
    // add the previous hash to the chain and if its the first block just mark it as the genesis block
    if (this.chain.length === 1) {
      block.prevHash = "genesis";
    } else {
      this.chain[block.index - 2].prevHash = this.hash;
    }
    return block;
  }

  addNewTransaction() {
    this.current_transaction.push({ ticketNumber: randomstring.generate(12) });
    return this.lastBlock();
  }

  lastBlock() {
    return this.chain.slice(-1)[0];
  }

  getChain() {
    return this.chain;
  }

  isEmpty() {
    return this.chain.length === 0;
  }
}

module.exports = BlockChain;
