import React, { useState,useEffect } from 'react';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBCollapse
} from 'mdb-react-ui-kit';
import Logo from '../assets/logo.png';
import { height, padding } from '@mui/system';
import styled from "styled-components";
import { ethers } from "ethers";
import { useNavigate } from 'react-router-dom';


export default function Dashboard() {
  const [showBasic, setShowBasic] = useState(false);

  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');

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
  }, []);  let navigate = useNavigate();







  return (
    <header>
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
      <div className='p-5 text-center bg-light'>
        <h1 className='mb-3'>Welcome to</h1>
        <h4 className='mb-3'>LibChain</h4>
        <a className='btn btn-primary' href='/bookList' role='button' style={{margin: '1rem',padding: '1rem 4.3rem'}} >
            Books
        </a>
        <br >
        </br>
        <a className='btn btn-primary' href='/register' role='button' style={{padding:'1rem 3.7rem'}}>
          Add book
        </a>
        <br >
        </br>
        <a className='btn btn-primary' href='/issueReturn' role='button'style={{margin: '1rem',padding: '1rem 3rem'}}>
          Issue/Return
        </a>
        <br >
        </br>
        <a className='btn btn-primary' href='/transferBook' role='button' style={{padding:'1rem 2.7rem'}}>
          Transfer Book
        </a>
      </div>
      </FormContainer>
    </header>
  );
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
    background-color: #45A29E;
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
