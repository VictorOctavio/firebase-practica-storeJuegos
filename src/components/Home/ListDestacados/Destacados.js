import React from 'react'
import './productos.css'

//redux
import {useDispatch, useSelector} from 'react-redux'
import {GetProductoDestacadoAction, getCarritoAction, GetJuegoAction} from '../../../Redux/adminDucks'

//components
import CarritoItem from '../../Carrito/CarritoItem'

//witchROuter
import {withRouter} from 'react-router-dom'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

const Destacados = (props) => {

    const dispatch = useDispatch()
    const destacados = useSelector(store => store.productos.destacados)
    const carritoActive = useSelector(store => store.productos.carrito)

    React.useEffect(() => {
        dispatch(GetProductoDestacadoAction())
        dispatch(getCarritoAction())
    }, [dispatch])

    const handleAllProductos = () => {
        window.location.href = "/todos-los-productos"
    }

    const handleCard = (item) => {
        dispatch(GetJuegoAction(item))
    }

    return (        
            <div className="container">
                <div className="row">
                    <div className="col-md-12 text-destacado">
                        <h2>JUEGOS DESTACADOS</h2>
                    </div>
                </div>

                <div className="row fila-juegos">
                    {
                        destacados.map(item => (
                        <div className="col-xs-8 col-sm-6 col-md-4 col-lg-3 carta" key={item.id}>
                            <div className="card">
                                <img src={item.photoURL} alt="card-img" onClick={() => handleCard(item)}/>

                                <div className="card-body">

                                    <div className="textos">
                                        <h5 className="card-title">
                                            {item.producto}
                                        </h5>
                                        <div className="precio-destacado">
                                            <span><FontAwesomeIcon icon={faStar}/>DESTACADO</span>
                                            <p className="card-text">${item.precio}</p>
                                        </div>         
                                    </div>
                                    
                                    <div className="botones">
                                        <a href="#" className="btn btn-outline-danger">COMPRAR</a>
                                       { 
                                        carritoActive.carrito && carritoActive.id === item.id ? (
                                                <CarritoItem
                                                producto={item}
                                                disabled={true}
                                                />
                                            ):(
                                                <CarritoItem
                                                producto={item}
                                                disabled={false}
                                                />
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                        ))
                    }
                </div>

                <div className="row btn-productos">
                    <div className="col-md-12 text-center mt-4">
                        <button className="btn btn-dark"
                            onClick={handleAllProductos}
                        >VER MAS PRODUCTOS</button>
                    </div>
                </div>
            </div>
    )
}

export default withRouter(Destacados)
