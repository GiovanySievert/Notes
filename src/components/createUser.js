import React, { Component } from 'react';
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeUser = this.onChangeUser.bind(this);
    this.onChangePass = this.onChangePass.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      user: '',
      password: '',
      msg: ''
    }
  };
  
  onChangeUser(e) {
    this.setState({
      user: e.target.value
    })
  };
  
  onChangePass(e) {
    this.setState({
      password: e.target.value
    })
  };

  onSubmit(e) {
    e.preventDefault();
    const users = {
      user: this.state.user,
      password: this.state.password
    };
    
    axios.post('http://localhost:3001/users/add', users)
    .then(res => console.log(res.data))
      window.location = '/notes';
    
    this.setState({
      user: '',
      password: '',
      msg: 'Usuarios adicionado'
    })
  };
  
  render() {
    return (
      <div className="user-register">
        <p>Crie um novo usuario!</p> 
        <span>{this.state.msg}</span>
        <form onSubmit={this.onSubmit}>
          <div>
            <input type="text" required className="form-control" value={this.state.user} onChange={this.onChangeUser} placeholder=" Usuario"/>
          </div>
        </form>
        <form onSubmit={this.onSubmit}>
          <div>
            <input type="text" required className="form-control" value={this.state.password} onChange={this.onChangePass} placeholder=" Senha"/>
          </div>
        </form>
        <button type="submit" className="btn btn-dark btn-sm" onClick={this.onSubmit}>Login</button>
      </div>    
      )
    }
};
  
  