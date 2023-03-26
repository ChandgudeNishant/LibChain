import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { ethers } from "ethers";
//import { ethereum } from window ;
import Logo from "../assets/logo.png";
import LibChainABI from "./BookNFT.json";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBRow,
  MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from 'mdb-react-ui-kit';

export default function Dashboard() {
  //const [provider, setProvider] = useState();
  //const [contract, setContract] = useState();
  const [showBasic, setShowBasic] = useState(false);

  const [bookName, setBookName] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [bookId, setBookId] = useState('');
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const contractAddress = '0xdb69764dbA50A32965b43FD07f539595431bCa00';
  const [gotError, setGotError] = useState('');
 // const providerUrl = process.env.REACT_APP_PROVIDER_URL;
  //const privateKey = process.env.REACT_APP_PRIVATE_KEY;
  //const provider = new ethers.providers.JsonRpcProvider(providerUrl);
 // const provider = new ethers.providers.Web3Provider(window.ethereum);
 
  //const wallet = new ethers.Wallet(privateKey, provider);

  //const signer = provider.getSigner(accounts[0]);

  //const signer = provider.getSigner();

//  const contract = new ethers.Contract(contractAddress, LibChainABI.abi, provider);
 

 

    async function getAccountInfo() {
      if (typeof window.ethereum !== 'undefined') {
        try {
          // Connect to MetaMask
          await window.ethereum.request({ method: 'eth_requestAccounts' });

          // Create provider and signer objects
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();

          // Get account address
          const address = await signer.getAddress();
          setAddress(address);
          // Get account balance
          const balanceWei = await signer.getBalance();
          const balanceEth = ethers.utils.formatEther(balanceWei);
          setBalance(balanceEth);
        } catch (err) {
          console.error(err);
        }
      } else {
        console.log('MetaMask not detected');
      }
    }

    getAccountInfo();

    // async function requestAccount() {
    //   await ethereum.request({ method: 'eth_requestAccounts' });
    // }
    
  

  const addBook = async (event) => {
    //event.preventDefault();
    try{
     
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

      // Create Web3Provider instance
      const provider = new ethers.providers.Web3Provider(window.ethereum);
  
      // Create Signer instance
      const signer = provider.getSigner(accounts[0]);
  
      // Create contract instance
      const contract = new ethers.Contract(contractAddress, LibChainABI.abi, signer);
  
      // Call the contract function
      const tx = await contract.createNFT(bookName, authorName, bookId);
  
      // Wait for the transaction to be mined
      await tx.wait();
      setGotError('');
      // Show success message
      console.log('Book added successfully!');
      alert('Book added successfully!')
    // } catch (error) {
    //   //console.error('Error adding book:', error);
    //   //setErrorMessage(error.message);
    //   console.log(error.message.reason);
    //   console.log(error);
    }catch(error){
      console.error(error); // log the error to the console
      setGotError(`Error Please check the Book ID`);
    }

  
  //   await getAccountInfo();
  //  // const signer = provider.getSigner();
  //   const contractWithSigner = contract.connect(signer);
  //   const transaction = await contractWithSigner.createNFT(bookName, authorName, bookId);
  //   await transaction.wait();
  //   console.log('New book added to LibChain!');
  //   setBookName('');
  //   setAuthorName('');
  //   setBookId('');
  };

  const handleBookNameChange = (event) => {
    setBookName(event.target.value);
  };

  const handleAuthorNameChange = (event) => {
    setAuthorName(event.target.value);
  };

  const handleBookIdChange = (event) => {
    setBookId(event.target.value);
  };

  return (<>
       <MDBNavbar expand='lg' light bgColor='#0B0C10'>
    <MDBContainer fluid>
      <MDBNavbarToggler
        onClick={() => setShowBasic(!showBasic)}
        aria-controls='navbarExample01'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <MDBIcon fas icon='bars' />
      </MDBNavbarToggler>
        <MDBNavbarNav right className='mb-2 mb-lg-0'>
          <MDBNavbarItem active>
          <img src={Logo} alt="Logo.png"style={{height : '3rem'}}/>
          </MDBNavbarItem>
          <MDBNavbarItem>

            <MDBNavbarLink aria-current='page' href='/bookList'style={{padding : '1rem'}}>
              All Books
            </MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='/getDetails'style={{padding : '1rem'}}>Book Details</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='/register'style={{padding : '1rem'}}>Add Book</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='/issueReturn'style={{padding : '1rem'}}>Issue/Return</MDBNavbarLink>
          </MDBNavbarItem>
          <MDBNavbarItem>
            <MDBNavbarLink href='/transferBook'style={{padding : '1rem'}}>Transfer Book</MDBNavbarLink>
          </MDBNavbarItem>
          
        </MDBNavbarNav>
        <p className='accountAddress'><span style={{fontWeight:'bold'}}>Account Address:</span> <p className='under'>{address}</p></p>
    </MDBContainer>
  </MDBNavbar>
  <FormContainer>
    <h1>Add book to Library</h1>
  <form >

      <h1>Name of Book</h1>
      <MDBInput value={bookName} style={{margin: '1rem',size:"lg"}} onChange={handleBookNameChange}   label={<label style={{ color: "#66FCF1" }}> Name of Book </label>} id='formControlLg' type='text' size='lg' />
      <br></br>
      <h1>Name of Author</h1>
      <MDBInput value={authorName} style={{margin: '1rem',size:"lg"}} onChange={handleAuthorNameChange}  label={<label style={{ color: "#66FCF1" }}> Name of Author </label>} id='formControlLg' type='text' size='lg' />
      <br></br>
      <h1>Book Id</h1>
      <MDBInput value={bookId} style={{margin: '1rem',size:"lg"}} onChange={handleBookIdChange}  label={<label style={{ color: "#66FCF1" }}> Book Id </label>} id='formControlLg' type='number' size='lg' />
     <br></br>

 

    </form> 
  <MDBBtn type="submit" onClick={addBook}>Add</MDBBtn>
 <p>{gotError}</p>
 </FormContainer>
  </> );
}

const FormContainer = styled.div`
height: 150vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #1F2833;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    //background-color: #38d6cb;
    border-radius: 2rem;
    padding: 3rem 8rem;
  }
  p{
    color :grey;
  }
  h3{
    color: white;
      text-transform: uppercase;
  }
  label{
    color: black;
      text-transform: uppercase;
  }
  h4{
    color: black;
      text-transform: uppercase;
  }
  input {
    background-color: transparent;
    padding: 1rem;
    border: 0.1rem solid #C5C6C7;
    border-radius: 0.4rem;
    color: white;
    width: 90%;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #997af0;
      outline: none;
    }
    &:textInput {
      background-color: #C5C6C7;
    }
  }
  button {
    background-color: #4cbab3;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #C5C6C7;
    }
  }
  span {
    color: black;
    text-transform: uppercase;
    font-weight: bold;

    a {
      color: black;
      text-decoration: none;
      font-weight: bold;
    }
  }

`;

//--------------------------------------------------------------------------------------------
// import React, { useState, useEffect } from 'react';
// import styled from "styled-components";
// import { ethers } from "ethers";
// //import { ethereum } from window ;
// import Logo from "../assets/logo.png";
// import LibChainABI from "./LibChain.json";

// const FormContainer = styled.div`
//   width: 90%;
//   margin: auto;
//   padding: 2em;
//   background-color: #fff;
//   border-radius: 10px;
//   box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
//   text-align: center;
// `;

// export default function Dashboard() {
//   //const [provider, setProvider] = useState();
//   //const [contract, setContract] = useState();
//   const [bookName, setBookName] = useState('');
//   const [authorName, setAuthorName] = useState('');
//   const [bookId, setBookId] = useState('');

//   const providerUrl = process.env.REACT_APP_PROVIDER_URL;
//   const privateKey = process.env.REACT_APP_PRIVATE_KEY;
//   //const provider = new ethers.providers.JsonRpcProvider(providerUrl);
//  // const provider = new ethers.providers.Web3Provider(window.ethereum);
 
//   //const wallet = new ethers.Wallet(privateKey, provider);

//   const contractAddress = '0xd5F529A6F3cbf142af588E2f4f9E5F769b0Dd32b';
//   //const signer = provider.getSigner(accounts[0]);

//   //const signer = provider.getSigner();

// //  const contract = new ethers.Contract(contractAddress, LibChainABI.abi, provider);
 

//   const [address, setAddress] = useState('');
//   const [balance, setBalance] = useState('');
  
//     async function getAccountInfo() {
//       if (typeof window.ethereum !== 'undefined') {
//         try {
//           // Connect to MetaMask
//           await window.ethereum.request({ method: 'eth_requestAccounts' });

//           // Create provider and signer objects
//           const provider = new ethers.providers.Web3Provider(window.ethereum);
//           const signer = provider.getSigner();

//           // Get account address
//           const address = await signer.getAddress();
//           setAddress(address);
//           // Get account balance
//           const balanceWei = await signer.getBalance();
//           const balanceEth = ethers.utils.formatEther(balanceWei);
//           setBalance(balanceEth);
//         } catch (err) {
//           console.error(err);
//         }
//       } else {
//         console.log('MetaMask not detected');
//       }
//     }

//     getAccountInfo();

//     // async function requestAccount() {
//     //   await ethereum.request({ method: 'eth_requestAccounts' });
//     // }
    
  
//     console.log(address);

//   const addBook = async (event) => {
//     //event.preventDefault();
//     try{
//       const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });

//       // Create Web3Provider instance
//       const provider = new ethers.providers.Web3Provider(window.ethereum);
  
//       // Create Signer instance
//       const signer = provider.getSigner(accounts[0]);
  
//       // Create contract instance
//       const contract = new ethers.Contract(contractAddress, LibChainABI.abi, signer);
  
//       // Call the contract function
//       const tx = await contract.createNFT(bookName, authorName, bookId);
  
//       // Wait for the transaction to be mined
//       await tx.wait();
  
//       // Show success message
//       console.log('Book added successfully!');
//     } catch (error) {
//       console.error('Error adding book:', error);
//     }
  
//   //   await getAccountInfo();
//   //  // const signer = provider.getSigner();
//   //   const contractWithSigner = contract.connect(signer);
//   //   const transaction = await contractWithSigner.createNFT(bookName, authorName, bookId);
//   //   await transaction.wait();
//   //   console.log('New book added to LibChain!');
//   //   setBookName('');
//   //   setAuthorName('');
//   //   setBookId('');
//   };

//   const handleBookNameChange = (event) => {
//     setBookName(event.target.value);
//   };

//   const handleAuthorNameChange = (event) => {
//     setAuthorName(event.target.value);
//   };

//   const handleBookIdChange = (event) => {
//     setBookId(event.target.value);
//   };

//   return (
//     <FormContainer>
//       <div className="brand">
//         <img src={Logo} alt="LibChain.png" />
//       </div>
//       {/* {provider && contract ? ( */}
//         <>
//         <p>{address}</p>
//           <label>Name of Book</label>
//           <input type="text" value={bookName} onChange={handleBookNameChange} placeholder="Name of Book" name="Name of Book" required />
//           <label>Name of Author</label>
//           <input type="text" value={authorName} onChange={handleAuthorNameChange} placeholder="Name of Author" name="Author Name" required />
//           <label>Book Id</label>
//           <input type="text" value={bookId} onChange={handleBookIdChange} placeholder="Eg:- 0001" name="Book Id" required />
//           <button type="submit" onClick={addBook}>ADD</button>
//         </>
//       {/* ) : (
//         <button onClick={connectWallet}>Connect Wallet</button>
//       )} */}
//     </FormContainer>
//   );
// }
