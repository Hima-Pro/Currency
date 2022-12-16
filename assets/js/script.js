function exchange(from="EGP",to="RUB",amount=1){
  fetch(`https://currency-api-tdim.vercel.app/${from}+vs+${to}`)
  .then(res=>res.json()).then(res=>{
    var result=Number(res.result);
    callback([Number(result.toFixed(2)),Number((result*amount).toFixed(2))],from,to);
  });
}
function callback(res,from,to,out=""){
  if(res[1]>=res[0]){
    out=`${res[1]+to} - 1${from} = ${res[0]+to}`;
  } else{
    out=`1${from} = ${res[0]+to}`;
  }
  window.toVal.value=out;
}
    /*
    const getFlagEmoji = countryCode=>String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt()));
    getFlagEmoji("us");
    */