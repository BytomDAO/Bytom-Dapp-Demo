import axios from "axios/index";

//Api call using bytomAPI sdk
export function listAddress(guid)
{
  return bytomAPI.sdk.accounts.listAddressUseServer(guid)
    .then(resp => resp[0])
}

//Api call from Buffer server
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
  return post(url, params).then(resp => resp.data)
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