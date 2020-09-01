import React from "react";
import {Link} from "react-router-dom";
import logo from './gambar/logo.png'
import masukan from './gambar/masukan.png'
import cari from './gambar/cari.png'
import standar from './gambar/standar.png'





const telusurdata = () =>{
return (
    <div className="content mr-auto ml-auto">
    <h1>Silahkan Pilih Data yang akan ditelusuri</h1>
    <table cellPadding="75px" >
      <tr>
          <td>
          <Link to='./telusurdataawal'>
          <img src={masukan} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
          <p align='center'>Data Awal</p>
          </Link>
          </td>
          <td>
          <Link to='./telusurdatatelusur'>
          <img src={cari} align='center' width="150px" height="150px" className="App-logo" alt="logo" />
          <p align='center'>Data Telusur</p>
          </Link>
          </td>

      </tr>
    </table>
    <Link to='./'>
                    <textbiasa>Kembali</textbiasa>
                </Link>
  </div>
)

};

export default telusurdata;