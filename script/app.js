const apiKey = 'EK-vncu9-51vUCob-GuGwA';
const url = 'https://api.ethplorer.io/getAddressInfo/';
const listWallet = document.getElementById('list-wallet');
const submitButton = document.getElementById('submit');
const tableWallet = document.getElementById('table__wallet');
var tableTest = [];

submitButton.addEventListener('click',function(e){
    e.preventDefault();
    const arrWallet = listWallet.value.split('\n');
    getData(arrWallet);
})

function getData(arrWallet){
    const arrWallets = arrWallet.map((item)=> url+item+"?apiKey="+apiKey);
    arrWallets.forEach((item,index) => {
        axios.get(item).then(res=> render(res.data,index));
    });
    
}
function render(resData,index){
    if(resData.tokens != null){
        var listToken = resData.tokens.map(item=>"<td>"+item.tokenInfo.symbol+":"+Number(item.balance)/(Math.pow(10,Number(item.tokenInfo.decimals)))+"</td>");
    }
    const testTable =  "<tr><td>"+index+"</td><td>"+resData.address+"</td><td>ETH :"+resData.ETH.balance+"</td>"+listToken.join('');
    tableTest.push(testTable);
    tableWallet.innerHTML=tableTest.join('');
    sleep(1000);
}

function sleep(milliseconds) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }