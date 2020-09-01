
import React, { Component } from 'react';
import './App.css';
import Navbar from './Navbar';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import Addhash from '../abis/Datatelusur.json';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  Redirect
} from "react-router-dom";

import MainPage from "./index";
import NotFoundPage from"./404";
import DataAwal from"./DataAwal";
import DataTelusur from"./DataTelusur";
import standar from"./standar";
import Adddata from"./Adddata";
import telusurdata from"./telusurdata";
import telusurdataawal from"./telusurdataawal";
import telusurdatatelusur from"./telusurdatatelusur";

class App extends Component {

  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = Addhash.networks[networkId]
    if(networkData) {
      const addhash = web3.eth.Contract(Addhash.abi, networkData.address)
      this.setState({ addhash })
      const postCount = await addhash.methods.postCount().call()
      this.setState({ postCount })
      // Load Posts
      for (var i = 1; i <= postCount; i++) {
        const post = await addhash.methods.posts(i).call()
        this.setState({
          posts: [...this.state.posts, post]
        })
      }
      this.setState({ loading: false})
    } else {
      window.alert('Addhash contract not deployed to detected network.')
    }
  }
    constructor(props) {
    super(props)
    this.state = {
      account: '',
      addhash: null,
      postCount: 0,
      posts: [],
      loading: true
    }
  }
  render() {
    return(
      <div className='App'>
        <div>
        <Navbar account={this.state.account} />
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <Router>
                <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/DataAwal" component={DataAwal} />
                <Route exact path="/DataTelusur" component={DataTelusur} />
                <Route exact path="/standar" component={standar} />
                <Route exact path="/Adddata" component={Adddata} />
                <Route exact path="/telusurdata" component={telusurdata} />
                <Route exact path="/telusurdataawal" component={telusurdataawal} />
                <Route exact path="/telusurdatatelusur" component={telusurdatatelusur} />
                <Redirect to="/404" />
                </Switch>
              </Router>
            </main>
          </div>
        </div>
      </div>
      </div>
    );

  }
}

export default App;
