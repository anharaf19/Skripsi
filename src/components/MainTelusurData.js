import React, { Component } from 'react';
import Identicon from 'identicon.js';
import IPFS from "../services/ipfs.service";

class MainTelusurData extends Component {

  componentDidMount() {
    // console.log(this.props.posts);
  }

  state = {
    data: this.props.posts.sort(function(a, b) {
      var dateA = new Date(a.tanggal), dateB = new Date(b.tanggal);
      return dateA - dateB;
    })
  }

  onSearchChange(e) {
    const sorted =  this.props.posts.sort(function(a, b) {
      var dateA = new Date(a.tanggal), dateB = new Date(b.tanggal);
      return dateA - dateB;
    })
    
    this.setState({
      data: e.target.value ? this.chainSearch(e.target.value, []) : sorted
    })
  }

  findByHash(hash) {
    return this.props.posts.find(data => data.hash === hash)
  }

  chainSearch(hash, collectedData = []) {
    const found = this.findByHash(hash)

    if (found) {
      collectedData.push(found)
      if (found.hash !== found.hashawal && found.hashawal !== '0') {
        return this.chainSearch(found.hashawal, collectedData)
      }
    }

    return collectedData
  }

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form 
                // onSubmit={(event) => {
                //   event.preventDefault()
                //   const IPFS = require('ipfs-mini');
                //   const ipfs = new IPFS({host:'ipfs.infura.io' , port : 5001, protocol:'https'});
                //   const hashawal = this.hashawal.value
                //   const petani = this.petani.value
                //   const tanam = this.tanam.value
                //   const keterangan = this.keterangan.value
                //   const datatelusur = ["Hash Awal : "+hashawal,"Petani : "+petani,"Ditanam di : "+tanam,"Keterangan : "+keterangan]
                //   ipfs.add(datatelusur, (err, hash) => {
                //     if(err){
                //     return console.log(err);
                //     }
                    
                //     console.log('https:/ipfs.infura.io/ipfs/'+hash);
                //     this.props.createPost('https:/ipfs.infura.io/ipfs/'+hashawal,'https:/ipfs.infura.io/ipfs/'+hash)
                //     alert("Data Berhasil disimpan dengan hash awal sebagai berikut ( "+hash+" ) harap hash tersebut disimpan guna mencari data tersebut kembali..")
                //     }
                //   ) 
                  
                // }}
                >
                <div className="form-group mr-sm-2">
                <label>Hash Awal :</label>
                  <input
                    id="hashawal"
                    type="input"
                    ref={(input) => { this.hashawal = input }}
                    onChange={(e) => {this.onSearchChange(e)}}
                    className="form-control"
                    placeholder="hashawal ?"
                    required />
                </div>
                {/* <button type="submit" className="btn btn-primary btn-block">Sumbit</button> */}
              </form>
              <p>&nbsp;</p>
              { this.state.data.map((post, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <img
                        className='mr-2'
                        width='30'
                        height='30'
                        src={`data:image/png;base64,${new Identicon(post.author, 30).toString()}`}
                      />
                      <small className="text-muted">{post.author}</small>
                    </div>
                    <ul id="postList" className="list-group list-group-flush">
                      <li className="list-group-item">
                        <p>Hash Awal : {post.hashawal}</p>
                        <p>Hash : {post.hash}</p>
                        <p>Email :{post.email}</p>                        
                        <p>Hak Akses : {post.hakakses}</p>                        
                        <p>Tanggal : {post.tanggal}</p>
                          { 
                            Object.keys(post.IPFSData).map(function(key) {
                              return <p>{key} : {post.IPFSData[key]}</p>
                            })
                          }
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default MainTelusurData;
