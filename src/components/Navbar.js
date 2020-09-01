import React, { Component } from 'react';
import Identicon from 'identicon.js';
import AuthService from "../services/auth.service";
import { useLocation } from 'react-router-dom'

class Navbar extends Component {
  state = {
    isLoggedIn: !!AuthService.getCurrentUser(),
    domain: (window.location.href).split("/")[0] + "//" + (window.location.href).split("/")[2],
  }

  logout = () => {
    AuthService.logout();
    document.location.href = this.state.domain + '/login'
    window.location.reload();
  }

  render() {
    return ( !this.state.isLoggedIn ? '' :
      <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        <a
          className="navbar-brand col-sm-3 col-md-2 mr-0"
          href="/"
          rel="noopener noreferrer"
        >
          Aplikasi Ketertelusuran Kopi
        </a>
        <ul className="navbar-nav px-3">
          <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
            {window.location.pathname == '/' ? (<button className="btn btn-sm btn-default mr-2 text-white" onClick={this.logout}>Logout</button>) : ''}
            <small className="text-secondary">
              <small id="account">{this.props.account}</small>
            </small>
            { this.props.account
              ? <img
                className='ml-2'
                width='30'
                height='30'
                src={`data:image/png;base64,${new Identicon(this.props.account, 30).toString()}`}
              />
              : <span></span>
            }
          </li>
        </ul>
      </nav>
    );
  }
}

export default Navbar;
