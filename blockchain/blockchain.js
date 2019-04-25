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
  //this will add a new transaction to the block with a randomly generated ticket number
  addNewTransaction() {
    this.current_transaction.push({ ticketNumber: randomstring.generate(12) });
    return this.lastBlock();
  }
  //this will return the last block in the chain
  lastBlock() {
    return this.chain.slice(-1)[0];
  }
  //this will return the whole chain
  getChain() {
    return this.chain;
  }

  //this function should return the block with your ticket
  getTicket(reciept) {
    console.log("reciept: ", reciept);
    return this.chain.filter(
      block => block.transaction[0].ticketNumber === reciept
    );
  }
  // this will return a truthy value if the chain is empty
  isEmpty() {
    return this.chain.length === 0;
  }
}

module.exports = BlockChain;
