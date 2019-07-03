import React, { Component } from 'react';
import {Link} from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super()
        this.state = {msg: ''}
    };
    
    onSubmit(event){
        event.preventDefault();
        const requestInfo = {
            method: 'POST',
            body:JSON.stringify({user:this.user.value,password:this.password.value}),
            headers: new Headers({
                'Content-type': 'application/json'
            })
        }

        fetch('http://localhost:3001/users/auth', requestInfo)
        .then(response => {
            if (response.ok) {
                return response.text();
            }
            else {
                throw new Error ('Usuario ou senha invalidos');
            }
        })
        .then(token => {
            this.props.history.push('notes');
        })
        .catch(error => {
            this.setState({msg:error.message});
        })
    };

    render() {
        return (
            <div className="login-box">
                <p>Login</p>
                <span>{this.state.msg}</span>
                <form onSubmit={this.onSubmit.bind(this)}>
                    <input type="text" className="form-control" placeholder=" Usuario" ref={(input) => this.user = input}/>
                    <input type="password" className="form-control" placeholder=" Senha" ref={(input) => this.password = input}/>
                    <button className="btn btn-dark btn-sm" type="submit">Acessar</button>
                </form>
                <Link to="/user">Não possui conta?</Link>
            </div>
            );
        } 
};
    
    