var contract;

$(document).ready(function () {
    web3=new Web3(web3.currentProvider);
    var address="0x614b4A2fAbe423314cC0202ed879749615B7F3B5";
    var abi=[
        {
            "inputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "votedEvent",
            "type": "event"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "name": "candidates",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                },
                {
                    "internalType": "string",
                    "name": "name",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "party",
                    "type": "string"
                },
                {
                    "internalType": "uint256",
                    "name": "vote_count",
                    "type": "uint256"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "getCandidates",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "uint256",
                            "name": "id",
                            "type": "uint256"
                        },
                        {
                            "internalType": "string",
                            "name": "name",
                            "type": "string"
                        },
                        {
                            "internalType": "string",
                            "name": "party",
                            "type": "string"
                        },
                        {
                            "internalType": "uint256",
                            "name": "vote_count",
                            "type": "uint256"
                        }
                    ],
                    "internalType": "struct Election.Candidate[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "string",
                    "name": "wallet",
                    "type": "string"
                }
            ],
            "name": "hasVoted",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [],
            "name": "test",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        },
        {
            "constant": false,
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "id",
                    "type": "uint256"
                }
            ],
            "name": "vote",
            "outputs": [],
            "payable": false,
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "constant": true,
            "inputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "name": "voters",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "payable": false,
            "stateMutability": "view",
            "type": "function"
        }
    ];
    contract=new web3.eth.Contract(abi,address);
    contract.methods.test().call().then(function (text) {
        $('#network').html(text);
        try{
            ethereum.enable();
        }
        catch{
            alert("Please allow portal to access your accounts");
            ethereum.enable();
        }
        contract.methods.getCandidates().call().then(function (data)
        {
            var html="";
            console.log(data);
            for (i=0 ;i<data.length;i++) {
                console.log(data[i].name);
                html+="<div class='col-sm-9 text-secondary' style='color: darkblue' id='"+data[i].id+"'>"+data[i].name+" : "+data[i].party+"  <span class='badge alert-success'>"+data[i].vote_count+"</span>  <button name='"+data[i].id+"' id='vote' class='btn btn-info'>Vote</button> </div><br>";
            }
            console.log("value: "+$('#hash').text());
            contract.methods.hasVoted($('#hash').text()).call().then(function(result)
            {
                if(result=="True")
                {
                    $('button').prop('disabled',true);
                    $('#voted').html("You have already voted!");
                }
            })
            $('#candidates').html(html);
            $('button').click(function(e)
            {
                var id=parseInt(e.target.name);
                console.log(id);
                web3.eth.getAccounts().then(function(accounts)
                    {
                        console.log(accounts)
                        var acc=accounts[0];
                        console.log(acc);
                        return contract.methods.vote(id).send({from:acc});
                    }).then(function(msg)
                    {
                        console.log(msg);
                        $('button').prop('disabled',true);
                        $('#voted').html("You have already voted!");
                    })             
            })
        })
    })
})