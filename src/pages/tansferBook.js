import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import LibChainABI from "./BookNFT.json";
import { ethers } from "ethers";
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

export default function Login() {
  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookDetails,setBookDetails] = useState('');
  const [bookId, setBookId] = useState('');
  const[available,setAvailable] = useState('');
  const [renter,setReneter] = useState('');
  const [books,setBooks] = useState([]);
  const [recipient,setRecipient] = useState('');

  const contractAddress = '0xdb69764dbA50A32965b43FD07f539595431bCa00';
  const accounts =  window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(accounts[0]);
  const contract = new ethers.Contract(contractAddress, LibChainABI.abi, signer);

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
    
    const details = async (event) => {
      try{
 
        const data = await contract.getBookDetails(bookId);
        setBookDetails({
          bookName: data[0],
          authorName: data[1],
          availability:data[2],
          renter:data[3],
          owner:data[4],
        });
        // Wait for the transaction to be mined
    
        // Show success message
        console.log(data);
    return data;
      }catch(error){
        console.error(error); // log the error to the console
        }
    };
    const transferBook = async (event) => {
      //event.preventDefault();
      const get = await details();
      try{
        if(get[2] === false){
          if (get[3]=== address) {
          
            setReneter('');
            const tx = await contract.transferNFT(recipient,bookId);

            await tx.wait();
            console.log(`The book with id ${bookId} transferred to ${recipient}`);
            alert('Transferred !!!')
        }
        else{
          console.log(`The book with ${bookId} id is not issued by you`)
          setReneter(`The book with ${bookId} id is not issued by you`)
        }
      }
    else{
      console.log(`The book with ${bookId} id is not issued`);
        
    }
      }catch(error){
        console.error(error); // log the error to the console
        }
    };

    const handleBookIdChange = (event) => {
      setBookId(event.target.value);
    };
    const handleRecipientChange = (event) => {
      setRecipient(event.target.value);
    };

    
  let navigate = useNavigate();
  return(<>
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
      <form >
    <h2>Transfer Book</h2>
      <h1>Book Id-</h1>
      <MDBInput value={bookId} style={{margin: '1rem',size:"lg"}} onChange={handleBookIdChange} label={<label style={{ color: "#66FCF1" }}> Book Id </label>} id='formControlLg' type='number' size='lg' />
      <br></br>
      <h1>Transfer to-</h1>
      <MDBInput value={recipient} style={{margin: '1rem',size:"lg"}} onChange={handleRecipientChange}  label={<label style={{ color: "#66FCF1" }}>Address </label>} id='formControlLg' type='text' size='lg' />
      <br></br>
    </form> 
  <MDBBtn type="submit" style={{alignItems:'center'}} onClick={transferBook}>Transfer</MDBBtn>
   <p>{renter}</p>
   </FormContainer>
    </>  );

}
const FormContainer = styled.div`
height: 100vh;
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
    padding: 3rem 15rem;
  }
  h2 {
    color: white;
    text-transform: captalize;
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
    margin: 1rem;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: captalize;
    &:hover {
      background-color: #C5C6C7;
    }
  }
  span {
    color: white;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
