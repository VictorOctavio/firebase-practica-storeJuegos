import React from 'react'

//Router
import {BrowserRouter as Router, Switch, Route} from "react-router-dom"

//Componentes
import Home from './pages/Home'
import Admin from './pages/Admin'
import Productos from './pages/Productos'
import Login from './pages/Login'
import CarritoCompras from './pages/Carrito'
import Juego from './pages/Juego'

//NAVEGATION
import Navbar from './components/Navegation/Navbar'

function App() {

  return (
    <React.Fragment>
     
      <Router>
        <Navbar/>
        <Switch>

          <Route path="/" exact component={Home} />

          <Route path="/admin" exact component={Admin}/>

          <Route path="/todos-los-productos" exact component={Productos}/>

          <Route path="/login" exact component={Login}/>

          <Route path="/micarrito" exact component={CarritoCompras}/>

          <Route path={`/juego/:id`} exact component={Juego}/>

        </Switch>        
      </Router>

    </React.Fragment>

  );
}

export default App;
