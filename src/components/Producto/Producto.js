import React from 'react'
import './producto.css'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCreditCard, faStar } from '@fortawesome/free-solid-svg-icons'
import { faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons'
import CarritoItem from '../Carrito/CarritoItem'

import {withRouter} from 'react-router-dom'

//Components
import Recomendado from './Recomendado'

const Producto = (props) => {

    const juego = JSON.parse(localStorage.getItem('juego'))
    
    const handleVolver = () => {
        props.history.push('/todos-los-productos')
    }

    return(
        <section className="producto">
                <div className="row container-juego">

                    <div className="col-sm-12 col-lg-6 col-md-5 img-juego">
                        <img src={juego.photoURL} alt="img"/>
                    </div>
        
                    <div className="col-sm-12  col-lg-6 col-md-7 descripcion-juego">
                        <div className="header">
                            <h3>{juego.producto}</h3>
                            <p>{juego.categoria}  <FontAwesomeIcon icon={faStar} className="icon"/> <FontAwesomeIcon icon={faStar} className="icon"/> <FontAwesomeIcon icon={faStar} className="icon"/></p>
                        </div>
        
                        <div className="body">
        
                            <span>${juego.precio}</span>
        
                            <div className="pagos">
                                <h6><FontAwesomeIcon icon={faCreditCard} className="icon mb-1"/></h6>
                                <h6><FontAwesomeIcon icon={faCcMastercard} className="icon mb-1"/></h6>
                                <h6><FontAwesomeIcon icon={faCcVisa} className="icon mb-1"/></h6>
                            </div>
        
                            <div className="botones">
                                <button className="btn btn-warning mx-1">COMPRAR JUEGO</button>
                                <CarritoItem
                                    disabled={false}
                                    producto={juego}
                                />
                            </div>
                        </div>
        
                        <div className="footer">
                            <button className="btn mx-1 redirec" onClick={handleVolver}>Seguir Comprando</button>
                            <button className="btn btn-success mx-1">Contactar</button>
                        </div>
                    </div>
        
                </div>


                <div className="container-recomendado">
                    <h3>JUEGOS QUE PODRIAN GUSTARTE</h3>
                    <Recomendado
                        categoria={juego.categoria}
                        id={juego.id}
                    />
                </div>

        </section> 
    ) 

}

export default withRouter(Producto)
