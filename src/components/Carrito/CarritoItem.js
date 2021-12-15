import React from 'react'
import './carrito.css'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus, faShoppingCart } from '@fortawesome/free-solid-svg-icons'

import {withRouter} from 'react-router-dom'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {getCarritoAction, CarritoAction} from '../../Redux/adminDucks'

const CarritoItem = (props) => {
    
    const dispatch = useDispatch()
    const active = useSelector(store => store.usuario.active)    

    const handleGetProducto = () => {

       if(!active){
            props.history.push('/login')
            return
       }else{
        
        const data = props.producto
        
        dispatch(CarritoAction(data))

        dispatch(getCarritoAction())

        }


    }
    return (
        <>
        {
            props.disabled ? (
                <button className="btn btn-warning" disabled
                    onClick={handleGetProducto}
                    title="prueba"
                    ><FontAwesomeIcon icon={faCartPlus} className="button-carrito"/>
                </button>
            ):(
                <button className="btn btn-warning"
                    onClick={handleGetProducto}
                    title="Agregar a lista de deseado"
                    ><FontAwesomeIcon icon={faShoppingCart} className="button-carrito"/>
                </button>
            )
        }
        </>
    )
}

export default withRouter(CarritoItem)
