export function matchesUTXO(array, amount){
  let result = array[0]
  const length = array.length
  if( length > 0 ){
    for(let i = 0; i < length; i++){
      const resp = array[i]
      if( resp.amount === amount ){
        result = resp
        break
      }else if( resp.amount < amount ){
        if(i > 0){
          result = array[i-1]
        }
        break
      }else if( i === length-1 ){
        result =  array[length-1]
      }
    }
  }
  return result
}