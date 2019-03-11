# Bytom-Dapp-Demo


## what is this?
A simple deposit and profit bytom dapp demo, Bytom-Chrome-Extension needed before it can be used. 


## Setup
Make sure you have the NodeJs installed before you started.
start the webpack dev server:

```
npm start
```
Your server should now be running at http://127.0.0.1:8080 

### Contract configuration
Network and smart contract control program's constants configurations are stored under the `contracts/configure.json.js` file.
You may edit the configure after an new control program is launched.

*Note: Currently we are manually deploy the contract using the [equity compiler tool](https://github.com/Bytom/equity), and configure the constants accordingly.

### Input and Output Object
Since the contract type and logic are different, building the unlock action may be different.

```
if amountDeposited < billAmount {
      lock amountDeposited of assetDeposited with FixedLimitProfit(billAsset, totalAmountBill, totalAmountCapital, expireBlockHeight, additionalBlockHeight, banker, bankerKey)
      lock amountDeposited of billAsset with saver
      lock billAmount-amountDeposited of billAsset with FixedLimitCollect(assetDeposited, totalAmountBill, totalAmountCapital, dueBlockHeight, expireBlockHeight, additionalBlockHeight, banker, bankerKey)
    } else {
      lock amountDeposited of assetDeposited with FixedLimitProfit(billAsset, totalAmountBill, totalAmountCapital, expireBlockHeight, additionalBlockHeight, banker, bankerKey)
      lock billAmount of billAsset with saver
    }
```
Will need to be converted into
```
 if(amount < billAmount){
          output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
          output.push(controlAddressAction(amount, billAsset, address))
          output.push(controlProgramAction((BigNumber(billAmount).minus(BigNumber(amount))).toNumber(), billAsset, GetContractArgs().depositProgram))
        }else{
          output.push(controlProgramAction(amount, GetContractArgs().assetDeposited, GetContractArgs().profitProgram))
          output.push(controlAddressAction(billAmount, billAsset, address))
        }
```

## Building the Project
   
`npm run build`
   
