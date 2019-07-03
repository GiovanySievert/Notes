import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar";
import {Link } from "react-router-dom"

const Notes = props => (
  <tr>
  <td>{props.notes.title}</td>
  <td>{props.notes.bodynote}</td>
  <td>
  <a href="#" onClick={() => { props.deleteNote(props.notes._id) }}>Deletar</a> | <Link to={"/edit/"+props.notes._id}>Editar</Link> 
  </td>
  </tr>
);
  
export default class NoteList extends Component {
  constructor(props) {
    super(props);
    this.deleteNote = this.deleteNote.bind(this)
    this.noteList = this.noteList.bind(this)
    
    this.state = {notes: []
    };
  };
  
  componentDidMount() {
    axios.get('http://localhost:3001/notes')
    .then(response => {
      this.setState({ notes: response.data })
    })
    .catch((error) => {
      console.log(error);
    })
  };
  
  deleteNote(id) {
    axios.delete('http://localhost:3001/notes/'+id)
    .then(response => { console.log(response.data)});
    this.setState({
      notes: this.state.notes.filter(el => el._id !== id)
    })
  };
  
  noteList() {
    return this.state.notes.map(currentnote => {
      return <Notes notes={currentnote} deleteNote={this.deleteNote} key={currentnote._id}/>
    })
  };
  
  render() {
    return (
      <div className="container">
        <Navbar /> 
        <div className="table responsive-table">
          <p>Você está logado!</p>  
          <p>Suas Notas</p>
          <table className=" table table-dark">
            <thead className="thead-light">
              <tr>
                <th>Titulo</th>
                <th>Conteudo</th>
                <th>Ações</th>
              </tr>
                  { this.noteList() } 
            </thead>
          </table>
        </div>
      </div>
      )
  }
};