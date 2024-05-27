async function main() {
    const PhraCoin = await ethers.getContractFactory("PhraCoin");
    const phraCoin = await PhraCoin.deploy();
  
    console.log("PhraCoin deployed to:", phraCoin.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error);
      process.exit(1);
    });
  