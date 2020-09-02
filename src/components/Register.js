import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";

import AuthService from "../services/auth.service";

const required = value => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const email = value => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vnama = value => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The nama must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = value => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeHakAkses = this.onChangeHakAkses.bind(this);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);

    this.state = {
      nama: "",
      hakakses: "petani",
      email: "",
      password: "",
      successful: false,
      message: ""
    };
  }
  
  componentDidMount() {
    if (!!AuthService.getCurrentUser()) {
      this.props.history.push("/");
      window.location.reload();
    }
  }

  onChangeName(e) {
    this.setState({
      nama: e.target.value
    });
  }

  onChangeHakAkses(e) {
      console.log(e.target.value)
    this.setState({
        hakakses: e.target.value
    });
    
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }

  handleRegister(e) {
    e.preventDefault();

    this.setState({
      message: "",
      successful: false
    });

    this.form.validateAll();

    if (this.checkBtn.context._errors.length === 0) {
      AuthService.register(
        this.state.nama,
        this.state.hakakses,
        this.state.email,
        this.state.password
      ).then(
        response => {
          this.setState({
            message: response.data.message,
            successful: true
          });

          this.props.history.push("/login");
        },
        error => {
          let resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

        if (typeof resMessage == 'object' || typeof resMessage == 'array') {
            let messages = '';
            for (let messagesKey in resMessage) {
                for (let key in resMessage[messagesKey]) {
                    messages += resMessage[messagesKey][key]
                }
            }
            resMessage = messages;
        }

        this.setState({
            successful: false,
            message: resMessage
          });
        }
      );
    }
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="card card-container">

          <div class="card-header text-left font-weight-bold">
            Login
          </div>

          <Form
            onSubmit={this.handleRegister}
            ref={c => {
              this.form = c;
            }}
            className="m-2"
          >
            {!this.state.successful && (
              <div>
                <div className="form-group row">
                  <label htmlFor="nama" className="col-sm-2 col-form-label">Nama</label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="nama"
                      value={this.state.nama}
                      onChange={this.onChangeName}
                      validations={[required, vnama]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="hakakses" className="col-sm-2 col-form-label">Hak Akses</label>
                  <div className="col-sm-10">
                    <select
                      className="form-control"
                      name="hakakses"
                      value={this.state.hakakses}
                      onChange={this.onChangeHakAkses}
                      validations={[required]}
                    >
                          {['petani', 'distributor', 'pengolah', 'konsumen'].map(option => (
                          <option key={option} value={option}>
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                          </option>
                          ))}
                    </select>
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                  <div className="col-sm-10">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={this.state.email}
                      onChange={this.onChangeEmail}
                      validations={[required, email]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                  <div className="col-sm-10">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={this.state.password}
                      onChange={this.onChangePassword}
                      validations={[required, vpassword]}
                    />
                  </div>
                </div>

                <div className="form-group row">
                  <div className="col-md-10 offset-md-2">
                    <button className="btn btn-primary btn-block">Sign Up</button>
                  </div>
                </div>
              </div>
            )}

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}
            <CheckButton
              style={{ display: "none" }}
              ref={c => {
                this.checkBtn = c;
              }}
            />
          </Form>
        </div>
      </div>
    );
  }
}