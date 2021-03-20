//set the APIKEY 
const APIKEY = 'ckey_693c563ac29c41bcbccfbe9326d';

let urls_meta = []; 
let token_ids = [];
let myMap = new Map();

async function getTransactions(chain_id,id,address) {
  spinner.classList.add("show");
   let index = token_ids.indexOf(id);
   let txnMap = new Map();
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
    const url_txn = new URL(`https://api.covalenthq.com/v1/${chain_id}/tokens/${address}/nft_transactions/${id}/?`);
    await fetch(url_txn)
    .then((resp) => resp.json())
    .then(function(data){
      let items = data.data.items;
      if (items.length !== 0){
       let txns = data.data.items[0].nft_transactions;
       for (let txn of txns) {
         let tx_hash = txn.tx_hash;
         txnMap.set(tx_hash,[]);
        let log_events = txn.log_events
        for (let event of log_events) {
          if (new String(event.decoded).valueOf() !== new String("null").valueOf()){
           let name = event.decoded.name;
           let value = txnMap.get(tx_hash);
           value.push(name);
          }               
        }       
       } 
      }
     
    })
       let rowNum = index + 2;
       for (let k of txnMap.keys()){
         let logs = txnMap.get(k);
         let log_ss = ""; 
         for (let log of logs){
           let log_s = JSON.stringify(log).trim();
           log_ss =  log_ss + " " + log_s ;        
         }
         spinner.classList.remove("show");       
         tableRef.insertRow(rowNum).innerHTML  = `<td>Transaction Hash: ${k}</td>` +
          `<td><button onclick = "parent.open('https://etherscan.io/tx/${k}/')"> Transaction on etherscan</button></td>`+
          `<td><button onclick = "parent.open('https://api.covalenthq.com/v1/1/transaction_v2/${k}/?')">JSON from Covalent</button></td><br>`+ 
         `<div>Log Events: ${log_ss}</div>`+
        `<td></td><td></td><td></td><td></td><td></td><td></td>`;
      
       }
      }    
 
 
  function getTable(chain_id,address){
    const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0]; 
    spinner.classList.remove("show"); 
    tableRef.innerHTML = ""; 
    tableRef.innerHTML = 
  `<thead class="thead-dark"><tr>
        <th>Image</th>
        <th>Token ID</th>
        <th>Name</th>
        <th>Price</th>
        <th>Description</th>
        <th>Token URL</th>
        <th>Owner</th>
        <th>Support ERC</th>
        <th>Attributes</th>
        <th>Transaction details</th>
    </tr></thead><tbody class="body"></tbody><br>`

    for(let k of myMap.keys()){
      let arr = myMap.get(k);
      let image = arr[0];
      let name = arr[1];
      let price = arr[2];
      let des = arr[3];
      let url = arr[4];
      let owner = arr[5];
      let support_token = arr[6];
      let attr = arr[7]; 
      tableRef.insertRow().innerHTML =
    `<tr><td> <img src=${image} style=width:40px;height:40px;></td>`+
      `<td>${k}</td>`+
     `<td>${name}</td>`+
     `<td>${price} </td>`+
     `<td>${des} </td>`+
     `<td>${url} </td>`+
     `<td>${owner} </td>`+
     `<td>${support_token} </td>`+
     `<td>${attr} </td>` + 
     `<td><button onclick = 'getTransactions("`+chain_id+`","`+k+`","`+address+`")'>Show Transactions!</button></td></tr><br>`;
    
    }

  }

  async function getMetadata(chain_id, urls, address) {
    for(let url of urls){
      await fetch(url).then(res => res.json())
      .then(data => {
        let nft_data = data.data.items[0].nft_data[0];
        let tokenId = nft_data.token_id;
        token_ids.push(tokenId);
        let token_url = nft_data.token_url;
        let sup_str = "";
        let sup = nft_data.supports_erc;
        if (sup.length !== 0){
          for (let s of sup) {
            sup_str = s + " " + sup_str;
          }
        }
        let price = nft_data.token_quote_rate_eth;
        let owner = nft_data.owner;  
        if (new String(nft_data.external_data).valueOf() !== new String("null").valueOf()){     
        let ext = nft_data.external_data;
        let name = ext.name;
        let des = ext.description;
        let image = ext.image;
        let attributes = ext.attributes;
        let final_attr = "";
        if (Array.isArray(attributes)){
          if (attributes.length !== 0) {
          for (let a of attributes) {
            let a_s = JSON.stringify(a);
            final_attr = final_attr + "," + a_s;
            console.log(final_attr);
           }
          }
          else{
             final_attr = "null";
          }
        }
        else{ 
          if (new String(attributes).valueOf() !== new String("null").valueOf()){
            let aa_s = JSON.stringify(attributes);
            final_attr = final_attr + "," + aa_s;
            console.log(final_attr);

          }
          else{
             final_attr = "null";
          }
        }      
        myMap.set(tokenId,[image,name,price,des,token_url,owner,sup_str,final_attr]);
      }
      else{
        myMap.set(tokenId,[null,null,price,null,token_url,owner,sup_str,null])
      }
      });
    }
    getTable(chain_id,address); 
}

function getTokens(){
  const spinner = document.getElementById("spinner");
  const tableRef = document.getElementById('tokenTable').getElementsByTagName('tbody')[0];
  const ul = document.getElementById('metadata');
  tableRef.innerHTML = "";
  ul.innerHTML = "";
  spinner.classList.add("show");
  let selection_ = document.querySelector("#tokenType");
   let type = selection_.options[selection_.selectedIndex];
   let chain_id = "";
   let address = "";
  if (new String(type.value).valueOf() == new String("hashmask").valueOf()){
    address = '0xc2c747e0f7004f9e8817db2ca4997657a7746928';
    chain_id = "1";
  }
  else if (new String (type.value).valueOf() == new String("cryptoPunk").valueOf()){
    address = "0xb47e3cd837ddf8e4c57f05d70ab865de6e193bbb";
    chain_id = "1";
  }
  else if (new String(type.value).valueOf() == new String("rarible").valueOf()){
    address = "0xd07dc4262bcdbf85190c01c996b4c06a461d2430";
    chain_id = "1";
  }
  else if (new String(type.value).valueOf() == new String("sorare").valueOf()){
    address="0x629a673a8242c2ac4b7b8c5d8735fbeac21a6205";
    chain_id = "1";
  }
  else if (new String(type.value).valueOf() == new String("axieInfinity").valueOf()){
    address="0xf5b0a3efb8e8e4c201e2a935f110eaaf3ffecb8d";
    chain_id = "1";
  }
  else if (new String(type.value).valueOf() == new String("zora").valueOf()){
    address=" 0xabEFBc9fD2F806065b4f3C237d4b59D9A97Bcac7";
    chain_id = "1";
  }
  

  //can add more cases here supprt multi-chain
  let number = document.getElementById('number').value||'0';
  let size = document.getElementById('size').value||'5';
  const url = new URL(`https://api.covalenthq.com/v1/${chain_id}/tokens/${address}/nft_token_ids/?page-number=` + number + `&page-size=` + size + `&key=`+ APIKEY);
  fetch(url)
  .then((resp) =>resp.json())
  .then(function(data){
    let tokens = data.data.items;
    ul.innerHTML = 
    `<li>Chain ID: ${chain_id}</Li>`+
    `<li>NFT contract address: ${address}</li>`+
    `<li>Contract Name:${tokens[0].contract_name} </li>`+
    `<li>Ticker Symbol:${tokens[0].contract_ticker_symbol}</li>`
    tokens.map(function(token){
      const url_meta = new URL(`https://api.covalenthq.com/v1/${chain_id}/tokens/${address}/nft_metadata/${token.token_id}`);
    url.search = new URLSearchParams({
      key: APIKEY
    })
        urls_meta.push(url_meta); 
    })
    getMetadata(chain_id,urls_meta, address);
    
})
}
