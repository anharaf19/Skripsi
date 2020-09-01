import React, { Component } from 'react';
import Web3 from 'web3';
import Identicon from 'identicon.js';
import './App.css';
import Addhash from '../abis/Data.json'
import Navbar from './Navbar'
import Main from './MainTelusurData'

import {Link} from "react-router-dom";



class telusurdata extends Component {

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

    // this.createPost = this.createPost.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              posts={this.state.posts}
              createPost={this.createPost}
            />
        }
                  <Link to='./'>
                    <textbiasa>Kembali</textbiasa>
                </Link>
      </div>
    );
  }
}

export default telusurdata;
