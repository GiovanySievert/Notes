import React, {Component} from 'react';
import {Link} from 'react-router-dom';

export default class navBar extends Component {

    render() {
        return (
            <nav>          
                <div>
                    <ul>
                        <li>
                        </li>
                        <li>
                            <Link to="/notes">Suas Notas</Link>
                        </li>
                        <li>
                            <Link to="/create">Criar nota</Link>
                        </li>
                        <li>
                            <Link to="/">Sair</Link>
                        </li>
                    </ul>
                    </div>
            </nav>
          );
    };
};



