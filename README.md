# Bytom-Dapp-Demo(Front-end)
A simple deposit and profit bytom dapp demo, Bytom-Chrome-Extension needed before it can be used.

## Contract configuration
Network and smart contract control program configurations are stored under the `configure.json.js` file.
You may edit the configure after an new control program is launched.

### Send transaction
After the banker deploy the FixedLimitCollect smart contract. The users can use the dapp demo to build an input and output object. 
Send an smart contract transaction based on the either [Deposit smart contract](https://github.com/Bytom/equity/blob/master/compiler/equitytest/FixedLimitCollect)
 or [Profit smart contract](https://github.com/Bytom/equity/blob/master/compiler/equitytest/FixedLimitProfit).
 
### Injection of Chrome-Extension
Since the [chrome-extension](https://github.com/Bytom/Bystore) injected the global bytom into the window. 
Use the `window.bytom.advancedTransfer` to send a transaction. Note that `window.bytom.advancedTransfer` contain
`buildTx`, `signTx` and `submitTx`.
