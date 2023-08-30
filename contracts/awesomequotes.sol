// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

interface ERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract AwesomeQuotes {
    uint internal quotesLength = 0;
    address internal cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    struct Quote {
        address payable owner;
        string author;
        string body;
        uint tips;
        uint createdAt;
    }

    mapping (uint => Quote) internal quotes;

    function createQuote (
        uint _createdAt,
        string memory _author,
        string memory _body
    )   public {
        uint _tips = 0;
        quotes[quotesLength] = Quote(
            payable (msg.sender),
            _author,
            _body,
            _tips,
            _createdAt
        );
        quotesLength++;
    }

    function getQuote (uint _index) public view returns 
    (address payable, string memory, string memory, uint, uint ) 
    {
        return (
            quotes[_index].owner,
            quotes[_index].author,
            quotes[_index].body,
            quotes[_index].tips,
            quotes[_index].createdAt
        );
    }

       function tipQuote(uint _index, uint _tip) public payable {
        require(ERC20Token(cUSD).transferFrom(
            msg.sender,
            quotes[_index].owner,
            _tip

        ), "Transfer Failed");
        quotes[_index].tips++;
    }

    function getQuoteLength () public view returns (uint) {
        return quotesLength;
    }

 
}