import axios from 'axios'

export function spendUTXOAction(utxo){
  return {
    "type": "spend_utxo",
    "output_id": utxo
  }
}

export function contractArguments(amount, address){
  return [
    {
      "type": "integer",
      "value": amount
    },
    {
      "type": "address",
      "value": address
    },
    {
      "type": "data",
      "value": ""
    }
  ]
}

export function spendWalletAction(amount, asset){
  return {
    "amount": amount,
    "asset": asset,
    "type": "spend_wallet"
  }
}

export function controlProgramAction(amount, asset, program){
  return {
    "amount": amount,
    "asset": asset,
    "control_program": program,
    "type": "control_program"
  }
}

export function controlAddressAction(amount, asset, address){
  return {
    "amount": amount,
    "asset": asset,
    "address": address,
    "type": "control_address"
  }
}

export function listAddress(guid)
{
  return bytomAPI.sdk.accounts.listAddressUseServer(guid)
    .then(resp => resp[0])
}

export function listDappUTXO(params)
{
  let url
  switch (window.bytom.defaultAccount.net){
    case "testnet":
      url = "/dapptestnet/list-utxos"
      break
    default:
      url = "/dapp/list-utxos"
  }
  return post(url, params).then(resp => resp.data[0])
}

export function updateUtxo(params)
{
  let url
  switch (window.bytom.defaultAccount.net) {
    case "testnet":
      url = "/dapptestnet/update-utxo"
      break
    default:
      url = "/dapp/update-utxo"
  }
  return post(url, params)
}

export function updateBalances(params)
{
  let url
  switch (window.bytom.defaultAccount.net) {
    case "testnet":
      url = "/dapptestnet/update-balance"
      break
    default:
      url = "/dapp/update-balance"
  }
  return post(url, params)
}

export function listBalances(params)
{
  let url
  switch (window.bytom.defaultAccount.net) {
    case "testnet":
      url = "/dapptestnet/list-balances"
      break
    default:
      url = "/dapp/list-balances"
  }
  return post(url, params)
}

function post(url, params){
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    if(response.data.code === 200){
      return response.data.result;
    }else{
      throw response.data.msg
    }
  })
}
