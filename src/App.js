import React from 'react';
import './App.css';
import {BrowserRouter, Route} from "react-router-dom";

import noteList from "./components/noteList";
import noteEdit from "./components/noteEdit";
import createNote from "./components/createNote";
import createUser from "./components/createUser";
import login from "./components/login"

function App() {
  return (
    <BrowserRouter>
        <Route path="/" exact component={login} />
      <div>
        <Route path="/notes"  component={noteList} />
        <Route path="/edit/:id" component={noteEdit} />
        <Route path="/delete/:id" component={noteList} />
        <Route path="/create" component={createNote} />
        <Route path="/user"  component={createUser} />
      </div>
    </BrowserRouter>  
  );
}

export default App;
