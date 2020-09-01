import React, { Component } from 'react';
import Identicon from 'identicon.js';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import AuthService from "../services/auth.service";

class MainDataDistribusi extends Component {

  state = {
    startDate: new Date(),
    jeniskopi : 'Arabika',
    user: AuthService.getCurrentUser()

  };
 
  handleChange = date => {
    this.setState({
      startDate: date
    });
  };
  
  onChangejeniskopi = e => {
    console.log(e.target.value)
  this.setState({
      jeniskopi: e.target.value
  });
  
}
  render() {
    const required = value => {
      if (!value) {
        return (
          <div className="alert alert-danger" role="alert">
            This field is required!
          </div>
        );
      }
    };
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
                  const nama = this.nama.value
                  const lokasi = this.lokasi.value
                  const keterangan = this.keterangan.value
                  const today =new Date()
                  const tanggal = today.toString()
                  const tanggaldistribusi = this.state.startDate
                  const Data = JSON.stringify({"Nama":nama,"Lokasi":lokasi,"Tanggal Distribusi":tanggaldistribusi,"Keterangan":keterangan})
                  ipfs.add(Data, (err, hash) => {
                    if(err){
                    return console.log(err);
                    }
                    console.log('https:/ipfs.infura.io/ipfs/'+hash);
                    this.props.createPost(hashawal,hash,this.state.user.email, this.state.user.hakakses,tanggal)
                    alert("Data Berhasil disimpan dengan hash awal sebagai berikut ( "+hash+" ) harap hash tersebut disimpan guna mencari data tersebut kembali..")
                    }
                  ) 
                  
                }}>
                <div className="form-group mr-sm-2">
                <label>Hash Awal:</label>
                  <input
                    id="hashawal"
                    type="text"
                    ref={(input) => { this.hashawal = input }}
                    className="form-control"
                    placeholder="hashawal?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                <label>Nama Distributor:</label>
                  <input
                    id="nama"
                    type="text"
                    ref={(input) => { this.nama = input }}
                    className="form-control"
                    placeholder="Nama Distributor?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                <label>Lokasi Pendistribusian :</label>
                  <input
                    id="lokasi"
                    type="text"
                    ref={(input) => { this.lokasi = input }}
                    className="form-control"
                    placeholder="lokasi ?"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                      <label>Tanggal Distribusi:</label>
                      <DatePicker
                      selected={this.state.startDate}
                      onChange={this.handleChange}
                      />
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
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default MainDataDistribusi;
