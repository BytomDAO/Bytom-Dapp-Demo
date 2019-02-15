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

export function listAddress(guid)
{
  return bytomAPI.sdk.accounts.listAddressUseServer(guid)
    .then(resp => resp[0])
}

export function listDappUTXO(params)
{
  const url = "/dapp/list-utxos"
  return axios({
    method: 'post',
    url,
    data: params
  }).then(response => {
    if(response.data.code === 200){
      return response.data.result.data[0];
    }
    else {
      throw response.data.msg
    }
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
    if(response.data.code === 200){
      return response.data.result;
    }else {
      throw response.data.msg
    }
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
    if(response.data.code === 200){
      return response.data.result;
    }else{
      throw response.data.msg
    }
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
    if(response.data.code === 200){
      return response.data.result;
    }else{
      throw response.data.msg
    }
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
    if(response.data.code === 200){
      return response.data.result;
    }else{
      throw response.data.msg
    }
  })
}
