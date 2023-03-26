import React, { useState, useEffect } from 'react';
import styled from "styled-components";
import LibChainABI from "./BookNFT.json";
import { ethers } from "ethers";
import Logo from "../assets/logo.png";
import { useNavigate } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBNavbarToggler,
  MDBContainer,
  MDBIcon,
  MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody
} from 'mdb-react-ui-kit';







export default function BookList() {

  const [showBasic, setShowBasic] = useState(false);
  const [books,setBooks] = useState([]);
  const contractAddress = '0xdb69764dbA50A32965b43FD07f539595431bCa00';
  const accounts =  window.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner(accounts[0]);
  const contract = new ethers.Contract(contractAddress, LibChainABI.abi, signer);
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
  }, []);


  useEffect(() => {

    const AllBooks = async () => {
      const books = await contract.getBookList();
      setBooks(books);
    };
   contract && AllBooks();
    },[contract]);
  

  let navigate = useNavigate();

  
  return(
    <> 
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
<h1>List of Books</h1>
      <MDBTable  align='middle'>
      <MDBTableHead>

        <tr>
          <th scope='col'><p> Name</p></th>
          <th scope='col'><p>Author</p></th>
          <th scope='col'><p>Book ID</p></th>
          <th scope='col'><p>Owner</p></th>
        </tr>
      </MDBTableHead>
      {books.map((book) => {
        return (
      <MDBTableBody key={book.tokenId}>
        <tr>
          <td>
            <div className='d-flex align-items-center'>

              <div className='ms-3'>
                <p className='fw-bold mb-1'>{book.name}</p>
              </div>
            </div>
          </td>
          <td>
            <p className='fw-normal mb-1'>{book.author}</p>
          </td>
          <td>
             <p>{book.tokenId.toNumber()}  </p>

          </td>

          <td>
            <MDBBtn color='link' rounded size='sm'>
             <p>{book.owner}</p>
            </MDBBtn>
          </td>
        </tr>
        
      </MDBTableBody>
      );
    })}  </MDBTable>
    </FormContainer>
    </> 

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
  p{
    color: white;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #38d6cb;
    border-radius: 2rem;
    padding: 3rem 15rem;
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
