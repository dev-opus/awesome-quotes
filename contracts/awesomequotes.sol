// SPDX-License-Identifier: MIT  

pragma solidity >=0.7.0 <0.9.0;

/**
 * @title ERC20 Token Interface
 * @dev This interface defines the standard functions for ERC20 tokens.
 */

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

/**
 * @title AwesomeQuotes Contract
 * @dev This contract manages quotes, allowing creation, retrieval, and tipping.
 */
contract AwesomeQuotes {
    uint internal quotesLength = 0;
    address internal cUSD = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;

    /**
     * @dev Struct to store quote information.
     * @param owner Address of the quote owner.
     * @param author Author of the quote.
     * @param body Text body of the quote.
     * @param tips Number of tips received for the quote.
     * @param createdAt Creation timestamp of the quote.
     */
    struct Quote {
        address payable owner;
        string author;
        string body;
        uint tips;
        uint createdAt;
    }

    /**
     * @dev Mapping to store quotes by index.
     * The key is the index of the quote, and the value is a struct containing quote details.
     */
    mapping (uint => Quote) internal quotes;

    /**
     * @dev Event emitted when a new quote is created.
     * @param owner The address of the quote owner.
     * @param author The author of the quote.
     * @param body The text body of the quote.
     * @param tips The number of tips received for the quote.
     * @param createdAt The creation timestamp of the quote.
     */
    event QuoteCreated(
        address indexed owner,
        string author,
        string body,
        uint tips,
        uint createdAt
    );


    /**
     * @notice Creates a new quote with the given information.
     * @dev The function creates a new quote with the provided author and body,
     *      and associates it with the calling address. The creation timestamp
     *      is set to the current block's timestamp.
     * @param _createdAt Creation timestamp of the quote.
     * @param _author Author of the quote.
     * @param _body Text body of the quote.
     */
    function createQuote (
        uint _createdAt,
        string memory _author,
        string memory _body
    )   public {
        require(_createdAt <= block.timestamp, "Invalid creation time");
        require(bytes(_author).length > 0, "Author cannot be empty");
        require(bytes(_body).length > 0, "Body cannot be empty");
        uint _tips = 0;
        quotes[quotesLength] = Quote(
            payable (msg.sender),
            _author,
            _body,
            _tips,
            _createdAt
        );
        quotesLength++;

        emit QuoteCreated(
            msg.sender,
            _author,
            _body,
            _tips,
            _createdAt
        );
    }

    /**
     * @notice Retrieves the details of a quote at the given index.
     * @dev This function returns the owner, author, body, tips, and creation timestamp
     *      of the quote at the specified index.
     * @param _index Index of the quote.
     * @return Quote details: owner, author, body, tips, createdAt.
     */
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

    /**
     * @notice Tips a quote with the given index by transferring tokens.
     * @dev This function allows the caller to tip a quote's owner with the specified amount of tokens.
     *      It transfers tokens from the caller to the quote owner.
     * @param _index Index of the quote to be tipped.
     * @param _tip Amount of tokens to be tipped.
     */
    function tipQuote(uint _index, uint _tip) public payable {
        require(ERC20Token(cUSD).transferFrom(
            msg.sender,
            quotes[_index].owner,
            _tip    
        ), "Transfer Failed");
        quotes[_index].tips++;
    }

     /**
     * @notice Gets the total number of quotes stored.
     * @dev This function returns the current number of quotes stored in the contract.
     * @return Total number of quotes.
     */
    function getQuoteLength () public view returns (uint) {
        return quotesLength;
    }

 
}