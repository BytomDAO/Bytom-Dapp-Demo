import axios from 'axios'

export function spendUTXOAction(utxo, amount, address){
  return {
    "type": "spend_utxo",
    "output_id": utxo,
    "arguments": [
      {
        "type": "integer",
        "raw_data": {
          "value": amount
        }
      },
      {
        "type": "address",
        "raw_data": {
          "value": address
        }
      },
      {
        "type": "data",
        "raw_data": {
          "value": ""
        }
      }
    ]
  }
}

export function spendWalletAction(amount, asset){
  return {
    "amount": amount,
    "asset_id": asset,
    "type": "spend_wallet"
  }
}

export function controlProgramAction(amount, asset, program){
  return {
    "amount": amount,
    "asset_id": asset,
    "control_program": program,
    "type": "control_program"
  }
}

export function controlAddressAction(amount, asset, address){
  return {
    "amount": amount,
    "asset_id": asset,
    "address": address,
    "type": "control_address"
  }
}

export function listUTXO(params)
{
  const url = "/api/api/v1/btm/q/list-utxos"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result.data[0];
  })
}

export function listAddress(params)
{
  const url = "/api/api/v1/btm//account/list-addresses"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result.data[0];
  })
}

export function listDappUTXO(params)
{
  const url = "/dapp/list-utxos"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result.data[0];
  })
}

export function updateBase(params)
{
  const url = "/dapp/update-base"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result;
  })
}

export function updateUtxo(params)
{
  const url = "/dapp/update-utxo"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result;
  })
}

export function updateBalances(params)
{
  const url = "/dapp/update-balance"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result;
  })
}

export function listBalances(params)
{
  const url = "/dapp/list-balances"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    return response.data.result;
  })
}
