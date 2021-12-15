import React from 'react'

//STYLE CSS
import './navbar.css'

//ROUTER DOM
import {Link, NavLink, withRouter} from "react-router-dom"

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignInAlt, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {singOutAction} from '../../Redux/loginDucks'
import {getCarritoAction} from '../../Redux/adminDucks'

const Navbar = (props) => {
    
    const dispatch = useDispatch()
    const sesionState = useSelector(store => store.usuario.active)
    const lengthCarrito = useSelector(store => store.productos.carritos)

    React.useEffect(() => {
        dispatch(getCarritoAction())
    }, [dispatch])


    const HandlesingOut = () => {

        dispatch(singOutAction())

        props.history.push('/login')

    }

    const getBom =  () => {
        window.onscroll = () => {
            const navDiv = document.querySelector('#nav')
            if(window.scrollY > 940){
                navDiv.classList.add("nav-principal2");
            }if(window.scrollY < 940){
                navDiv.classList.remove("nav-principal2");
            }
        }
    } 

    getBom()
    

    return (
        
            <nav className="nav-principal fixed-top mt-0" id="nav">
                <div className="navegation">
                    <div className="logo">
                        <li className="navbar-brand">
                            <Link className="home-logo" to="/">G4MECL4N</Link>
                        </li>
                    </div>

                    <div>
                        <Link className="enlaces" to="/todos-los-productos">Más Juegos</Link>

                        {
                            sesionState ? (
                                <>
                                    <Link className="btn btn-sm btn-carrito" to="/micarrito"><FontAwesomeIcon icon={faShoppingCart} className="icon"/>+{lengthCarrito.length}</Link>
                                    <button className="btn  btn-carrito"
                                    onClick={HandlesingOut}
                                    ><FontAwesomeIcon icon={faSignInAlt} className="icon"/> SALIR</button>
                                </>
                            ):(
                                <NavLink className="enlaces btn-carrito" to="/login">Iniciar Sesion</NavLink>
                            )
                        }

                    </div>
                </div>    
            </nav>
        
    )
}

export default withRouter(Navbar)
