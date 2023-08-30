Solidity API
ERC20Token
This interface defines the standard functions for ERC20 tokens.

Contract
ERC20Token : contracts/dacade.sol

This interface defines the standard functions for ERC20 tokens.

Functions:
transfer
function transfer(address, uint256) external returns (bool)
approve
function approve(address, uint256) external returns (bool)
transferFrom
function transferFrom(address, address, uint256) external returns (bool)
totalSupply
function totalSupply() external view returns (uint256)
balanceOf
function balanceOf(address) external view returns (uint256)
allowance
function allowance(address, address) external view returns (uint256)
Events:
Transfer
event Transfer(address from, address to, uint256 value)
Approval
event Approval(address owner, address spender, uint256 value)
AwesomeQuotes
This contract manages quotes, allowing creation, retrieval, and tipping.

Contract
AwesomeQuotes : contracts/dacade.sol

This contract manages quotes, allowing creation, retrieval, and tipping.

Functions:
createQuote
function createQuote(uint256 _createdAt, string _author, string _body) public
Creates a new quote with the given information.

The function creates a new quote with the provided author and body, and associates it with the calling address. The creation timestamp is set to the current block's timestamp.

Parameters
Name	Type	Description
_createdAt	uint256	Creation timestamp of the quote.
_author	string	Author of the quote.
_body	string	Text body of the quote.
getQuote
function getQuote(uint256 _index) public view returns (address payable, string, string, uint256, uint256)
Retrieves the details of a quote at the given index.

This function returns the owner, author, body, tips, and creation timestamp of the quote at the specified index.

Parameters
Name	Type	Description
_index	uint256	Index of the quote.
Return Values
Name	Type	Description
[0]	address payable	Quote details: owner, author, body, tips, createdAt.
[1]	string	
[2]	string	
[3]	uint256	
[4]	uint256	
tipQuote
function tipQuote(uint256 _index, uint256 _tip) public payable
Tips a quote with the given index by transferring tokens.

This function allows the caller to tip a quote's owner with the specified amount of tokens. It transfers tokens from the caller to the quote owner.

Parameters
Name	Type	Description
_index	uint256	Index of the quote to be tipped.
_tip	uint256	Amount of tokens to be tipped.
getQuoteLength
function getQuoteLength() public view returns (uint256)
Gets the total number of quotes stored.

This function returns the current number of quotes stored in the contract.

Return Values
Name	Type	Description
[0]	uint256	Total number of quotes.
Events:
QuoteCreated
event QuoteCreated(address owner, string author, string body, uint256 tips, uint256 createdAt)
Event emitted when a new quote is created.

Parameters
Name	Type	Description
owner	address	The address of the quote owner.
author	string	The author of the quote.
body	string	The text body of the quote.
tips	uint256	The number of tips received for the quote.
createdAt	uint256	The creation timestamp of the quote.