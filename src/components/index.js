import React, { Component } from "react";
import {Link} from "react-router-dom";
import logo from './gambar/logo.png'
import masukan from './gambar/masukan.png'
import cari from './gambar/cari.png'
import standar from './gambar/standar.png'
import AuthService from "../services/auth.service";


export default class MainPage extends Component {
  render() {
    const user = AuthService.getCurrentUser();
    let Form
    const isLoggedIn = !!user, hakakses = user ? user.hakakses : '';
  
    if (!isLoggedIn) {
      this.props.history.push("/login");
    }
  
    if (isLoggedIn && hakakses == "petani" ) {
      Form =  
      <tr>
      <td>
        <Link to='./TambahDataAwal'>
        <img src={masukan} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
        <p align='center'>Tambah Data</p>
        </Link>
      </td>
      <td>
      <Link to='./telusurdata'>
      <img src={cari} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
      <p align='center'>Telusuri Data</p>
      </Link>
      </td>
      <td>
      <Link to='./standar'>
      <img src={standar} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
      <p align='center'>Lihat Standar Data Kopi</p>
      </Link>
      </td>
  </tr>;
    } else if (isLoggedIn && hakakses == "distributor" ) {
      Form =  
      <tr>
      <td>
        <Link to='./TambahDataDistribusi'>
        <img src={masukan} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
        <p align='center'>Tambah Data</p>
        </Link>
      </td>
      <td>
      <Link to='./telusurdata'>
      <img src={cari} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
      <p align='center'>Telusuri Data</p>
      </Link>
      </td>
  </tr>;
    } else if (isLoggedIn && hakakses == "pengolah" ) {
      Form =  
      <tr>
      <td>
        <Link to='./TambahDataPengolahan'>
        <img src={masukan} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
        <p align='center'>Tambah Data</p>
        </Link>
      </td>
      <td>
      <Link to='./telusurdata'>
      <img src={cari} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
      <p align='center'>Telusuri Data</p>
      </Link>
      </td>
  </tr>;
    } else {
      Form =  
      <tr>
      <td>
      <Link to='./telusurdata'>
      <img src={cari} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
      <p align='center'>Telusuri Data</p>
      </Link>
      </td>
  </tr>;
    }
  
  return (
      <div className="content mr-auto ml-auto">
  
        
  
      <h1>Aplikasi Ketertelusuran Komoditi Kopi</h1>
      <p>
      <textbiasa>Sebuah sarana guna membantu menelusuri komoditi kopi</textbiasa>
      </p>
      <img src={logo} className="App-logo" alt="logo" />
      
      <div class="d-flex justify-content-center">
        <table cellPadding="75px" >
          {Form}
        </table>
      </div>
    </div>
  )
  }

};
