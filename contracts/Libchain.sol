//SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract BookNFT {
    struct Book {
        string name;
        string author;
        uint256 tokenId;
        bool isAvailable;
        address renter;
        address owner;
    }
    
    mapping(uint256 => Book) public books;
    Book[]book;
    address public owner; // Add a state variable to store the contract owner address

    constructor() {
    owner = msg.sender; // Initialize the contract owner as the deployer address
}

    function createNFT(string memory _name, string memory _author, uint256 _tokenId) public {
        require(msg.sender == owner, "Only the contract owner can create NFTs"); // Check if the caller is the owner
        require(books[_tokenId].tokenId == 0, "Token ID already exists");
        book.push(books[_tokenId] = Book(_name, _author, _tokenId, true, address(0), msg.sender));
    }
    
    function rentNFT(uint256 _tokenId, address _issuer) public {
        require(books[_tokenId].tokenId != 0, "Invalid token ID");
        require(books[_tokenId].isAvailable, "Book is not available for rent");
        books[_tokenId].isAvailable = false;
        books[_tokenId].renter = _issuer;
    }
    
    function returnNFT(uint256 _tokenId) public {
        require(books[_tokenId].tokenId != 0, "Invalid token ID");
        require(!books[_tokenId].isAvailable, "Book is already available");
        books[_tokenId].isAvailable = true;
        books[_tokenId].renter = address(0);
    }
    
function transferNFT(address _to, uint256 _tokenId) public {
    require(books[_tokenId].tokenId != 0, "Invalid token ID");
    require(msg.sender == books[_tokenId].renter, "Only the renter can transfer the book");

    // If the book is currently rented, update the renter address to the new owner
    if (!books[_tokenId].isAvailable) {
        books[_tokenId].renter = _to;
    }
    
    books[_tokenId].renter = _to;
}

    
    function getBookDetails(uint256 _tokenId) public view returns (string memory, string memory, bool, address, address) {
        require(books[_tokenId].tokenId != 0, "Invalid token ID");
        return (books[_tokenId].name, books[_tokenId].author, books[_tokenId].isAvailable, books[_tokenId].renter, books[_tokenId].owner);
    }

    function getBookList() public view returns(Book[] memory){
            return book;
    }
}