import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import { ethers } from "ethers";
//import { ethereum } from window ;
import Logo from "../assets/logo.png";
import LibChainABI from "./BookNFT.json";
import { useNavigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBInput,
  MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from 'mdb-react-ui-kit';

export default function Issue() {
  let navigate = useNavigate();

  const [showBasic, setShowBasic] = useState(false);
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [bookDetails,setBookDetails] = useState('');
  const [bookId, setBookId] = useState('');
  const[available,setAvailable] = useState('');
  const [renter,setReneter] = useState('');
  const [noreturn, setNoreturn]= useState('');
  const [bookNotIssued,setBookNotIssued] = useState([]);

  const contractAddress = '0xdb69764dbA50A32965b43FD07f539595431bCa00';
  const accounts =  window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(accounts[0]);
  const contract = new ethers.Contract(contractAddress, LibChainABI.abi, signer);

  useEffect(() => {
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
  }, []);



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
   
// console.log(books);


    const handleBookIdChange = (event) => {
      setBookId(event.target.value);
    };
  

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
  <h2 style={{alignItems:'center'}}>Get Details of the book </h2>
  <MDBInput 
  label={<label style={{ color: "#66FCF1" }}>
      Book ID 
    </label>} id='typeNumber' value={bookId} onChange={handleBookIdChange} style={{ margin: '1rem', size: "lg" }} type='number' required />      
  <MDBBtn style={{alignItems:'center'}} onClick={details} >Get</MDBBtn>
          
          <div className='details'>
          <p>Book Name: <span className='data'>{bookDetails.bookName}</span></p>
          <p>Author Name: <span className='data'>{bookDetails.authorName}</span></p>
          <p>Availability: <span className='data'>{bookDetails.availability ? 'Yes' : 'No'}</span></p>
          <p>Issued by: <span className='data'>{bookDetails.renter}</span></p>
          <p>Owned by: <span className='data'>{bookDetails.owner}</span></p>


          </div>
<br></br>

          
  </FormContainer>
  </>);

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
    background-color: #38d6cb;
    border-radius: 2rem;
    padding: 3rem 15rem;
  }
  p{
    color :white;
  }
  h2 {
    color: white;
    text-transform: captalize;
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
  label{
    color: white;
  }
  span {
    color: #66FCF1;
    text-transform: uppercase;
    a {
      color: #4e0eff;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
