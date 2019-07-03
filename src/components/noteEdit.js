import React, { Component } from 'react';
import axios from 'axios';
import Navbar from "../components/navbar";

export default class EditNote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeNote = this.onChangeNote.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    
    this.state = {
      title: '',
      bodynote: '',
    }
  };
  
  componentDidMount() {
    axios.get('http://localhost:3001/notes/'+this.props.match.params.id)
    .then(response => {
      this.setState({
        title: response.data.title,
        bodynote: response.data.bodynote,
      })   
    })
    .catch(function (error) {
      console.log(error);
    })
  };
  
  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    })
  }
  
  onChangeNote(e) {
    this.setState({
      bodynote: e.target.value
    })
  };
  
  onSubmit(event) {
    event.preventDefault();
    const notes = {
      title: this.state.title,
      bodynote: this.state.bodynote,
    };

    axios.post('http://localhost:3001/notes/update/' + this.props.match.params.id, notes)
    .then(res => console.log(res.data));
    window.location = '/notes'
  };
  
  render() {
    return (
      <div className="container">
        <Navbar />
        <div className="form-group input-group">
          <p>Edite o título da nota.</p>
          <form onSubmit={this.onSubmit}>
            <div> 
              <input  className="form-group note-title" required value={this.state.title} onChange={this.onChangeTitle}>
              </input>
            </div>
            <p>Edite o conteúdo da nota.</p>
            <div> 
              <textarea type="text" rows="15" cols="5" className="form-control note-body" required value={this.state.bodynote} 
              onChange={this.onChangeNote}
              />
            </div>
            <button type="submit" className="btn btn-dark" >Salvar nota</button>
          </form>
        </div>
      </div>
      )
    }
};