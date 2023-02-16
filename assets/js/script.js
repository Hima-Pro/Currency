async function exchange(from="EGP",to="RUB",amount=1){
  var response= await fetch(`https://currency-api-tdim.vercel.app/${from}/${to} exchange?amount=`+amount);
  if (response.ok) {
    let output = "";
    let data = await response.json();
    let result = Number(data.result);
    let amount = Number(data.amount);
    if(result==amount){
      output = `1${from} = ${result+to}`;
    } else{
      output = `${amount+to} - 1${from} = ${result+to}`;
    }
    window.toVal.value = output;
  } else {
    alert("Please check your internet connection !");
  }
}
    /*
    const getFlagEmoji = countryCode=>String.fromCodePoint(...[...countryCode.toUpperCase()].map(x=>0x1f1a5+x.charCodeAt()));
    getFlagEmoji("us");
    */