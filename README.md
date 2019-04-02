# Bytom-Dapp-Demo


## What is this?
A simple deposit and profit bytom dapp demo, Bytom-Chrome-Extension needed before it can be used. 

## Setup
- Install [Node.js](https://nodejs.org) version 8 and the latest available npm@6.
- Install dependencies: `npm install`.

### Buffer Server
Before run all the project, you may need to set up you own [bufferserver](https://github.com/oysheng/bufferserver). Configure the proxy rules under the `webpack.config.js`.

### Deploy Contract
Currently we are manually deploy the contract using the [equity compiler tool](https://github.com/Bytom/equity), and configure the `control program` constants accordingly.

### Contract configuration
Network and smart contract control program's constants configurations are stored under the `contracts/configure.json.js` file.
You may edit the configure after an new control program is launched.

### Dapp logic
Under the `./src/components/util/submitContract.js`, you will see the basic and reusable logic, for developing a Dapp. Including the following steps:
- list utxo from buffer server
- create the custom contract transaction
- lock utxo
- call `window.bytom.advancedTransfer` to create the advanced Transaction
- update balance if success.

### Input and Output Object
#### Input
The first Input object must be spend utxo action, utxo will be selected according to the amount matches.

The second Spend Wallet Action, maybe needed if there is a exchanged. 
 
```
input.push(spendUTXOAction(utxo))
input.push(spendWalletAction(amount, GetContractArgs().assetDeposited))
```

#### Output
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


## Run the Project

Make sure the contracts are compiled, built the correct input output object and bufferserver is running.

Start the Webpack dev server.

`npm start`

Your server should now be running at http://127.0.0.1:8080

## Building the Project
   
`npm run build`
   
