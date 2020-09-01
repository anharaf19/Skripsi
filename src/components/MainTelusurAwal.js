import React, { Component } from 'react';
import Identicon from 'identicon.js';

class Main3 extends Component {

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
                //   const jeniskopi = this.jeniskopi.value
                //   const petani = this.petani.value
                //   const tanam = this.tanam.value
                //   const keterangan = this.keterangan.value
                //   const today =new Date()
                //   const tanggal = today.toString()
                //   const hashawal = ["Jenis Kopi : "+jeniskopi,"Petani : "+petani,"Ditanam di : "+tanam,"Keterangan : "+keterangan,"Tanggal : "+tanggal]
                //   ipfs.add(hashawal, (err, hash) => {
                //     if(err){
                //     return console.log(err);
                //     }
                //     console.log('https:/ipfs.infura.io/ipfs/'+hash,tanggal);
                //     this.props.createPost(hash,jeniskopi,petani,tanam,keterangan,tanggal)
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
                    className="form-control"
                    placeholder="hashawal ?"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Sumbit</button>
              </form>
              <p>&nbsp;</p>
              { this.props.posts.map((post, key) => {
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
                        <p>Jenis Kopi :{post.jeniskopi}</p>
                        <p>Petani :{post.petani}</p>
                        <p>Ditanam di :{post.tanam}</p>
                        <p>Keterangan :{post.keterangan}</p>
                        <p>Tanggal :{post.tanggal}</p>
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

export default Main3;
