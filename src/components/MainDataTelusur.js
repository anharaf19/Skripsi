import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main2 extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '1000px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const IPFS = require('ipfs-mini');
                  const ipfs = new IPFS({host:'ipfs.infura.io' , port : 5001, protocol:'https'});
                  const hashawal = this.hashawal.value
                  const lokasi = this.lokasi.value
                  const keterangan = this.keterangan.value
                  const today =new Date()
                  const tanggal = today.toString()
                  const datatelusur = ["Hash Awal : "+hashawal,"Lokasi : "+lokasi,"Keterangan : "+keterangan,"Tanggal : "+tanggal]
                  ipfs.add(datatelusur, (err, hash) => {
                    if(err){
                    return console.log(err);
                    }
                    
                    console.log('https:/ipfs.infura.io/ipfs/'+hash);
                    this.props.createPost(hashawal,hash,lokasi,keterangan,tanggal)
                    alert("Data Berhasil disimpan")
                    }
                  ) 
                  
                }}>
                <div className="form-group mr-sm-2">
                  <label>Hash Awal :</label>
                  <input
                    id="hashawal"
                    type="text"
                    ref={(input) => { this.hashawal = input }}
                    className="form-control"
                    placeholder="Hash Awal ?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <label>Lokasi :</label>
                  <input
                    id="lokasi"
                    type="text"
                    ref={(input) => { this.lokasi = input }}
                    className="form-control"
                    placeholder="Lokasi ?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                <label>Keterangan :</label>
                  <textarea
                    id="keterangan"
                    type="textarea"
                    ref={(input) => { this.keterangan = input }}
                    className="form-control"
                    placeholder="Keterangan ?"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sumbit</button>
              </form>
              <p>&nbsp;</p>
              {/* { this.props.posts.map((post, key) => {
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
                        <p>{post.hashawal}</p>
                        <p>{post.hashtelusur}</p>
                      </li>
                    </ul>
                  </div>
                )
              })} */}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main2;
