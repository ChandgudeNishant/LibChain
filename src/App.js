//import logo from './logo.svg';
import './App.css';
import Login from "./pages/login";
import Dashboard from './pages/dashboard';
//import Verify from './pages/verify';
import Register from './pages/register';
import BookList from './pages/bookList';
import Issue from './pages/issue-returnBook';
import TransferBook from './pages/tansferBook';
import GetDetails from './pages/getDetails';
import abi from './pages/BookNFT.json';
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  // const [state, setState] = useState({
  //   provider: null,
  //   signer: null,
  //   contract: null,
  // });
  // const [account, setAccount] = useState("None");
  // useEffect(() => {
  //   const connectWallet = async () => {
  //     const contractAddress = "0xf6B0816171d3caD8F03dC54e896D6068b5B544C6";
  //     const contractABI = abi.abi;
  //     try {
  //       const { ethereum } = window;

  //       if (ethereum) {
  //         const account = await ethereum.request({
  //           method: "eth_requestAccounts",
  //         });

  //         window.ethereum.on("chainChanged", () => {
  //           window.location.reload();
  //         });

  //         window.ethereum.on("accountsChanged", () => {
  //           window.location.reload();
  //         });
  //         const providerUrl = process.env.REACT_APP_PROVIDER_URL;

  //         const provider = new ethers.providers.JsonRpcProvider(providerUrl);
  //         const signer = provider.getSigner();
  //         const contract = new ethers.Contract(
  //           contractAddress,
  //           contractABI,
  //           signer
  //         );
  //         setAccount(account);
  //         setState({ provider, signer, contract });
  //       } else {
  //         alert("Please install metamask");
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   connectWallet();
  // }, []);
  return (
  
    <Router>
    <Routes>
    <Route path='/' element={<Login/>}/>
    <Route path='dashboard' element={<Dashboard/>}/>
    <Route path='getDetails' element={<GetDetails/>}/>
    <Route path='register' element={<Register/>}/>
    <Route path= 'bookList' element={<BookList/>}/>
    <Route path= 'issueReturn' element={<Issue/>}/>
    <Route path= 'transferBook' element={<TransferBook/>}/>

  </Routes>
  </Router>
    

    
  );
}

export default App;




