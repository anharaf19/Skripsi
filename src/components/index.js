import React from "react";
import {Link} from "react-router-dom";
import logo from './gambar/logo.png'
import masukan from './gambar/masukan.png'
import cari from './gambar/cari.png'
import standar from './gambar/standar.png'



const MainPage = () =>{
return (
    <div className="content mr-auto ml-auto">

      

    <h1>Aplikasi Ketertelusuran Komoditi Kopi</h1>
    <p>
    <textbiasa>Sebuah sarana guna membantu menelusuri komoditi kopi</textbiasa>
    </p>
    <img src={logo} className="App-logo" alt="logo" />

    <table cellPadding="75px" >
      <tr>
          <td>
          <Link to='./Adddata'>
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
      </tr>
    </table>
  </div>
)

};

export default MainPage;