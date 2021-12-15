import React from 'react'
import './producto.css'

//REDUX
import {useDispatch} from 'react-redux'
import {GetJuegoAction} from '../../Redux/adminDucks'

const Recomendado = ({categoria, id}) => {

    const dispatch = useDispatch()

    const recomendados = JSON.parse(localStorage.getItem('getJuegos'))

    const handleCard = (item) => {
        dispatch(GetJuegoAction(item))
    }

    return (    
        <div className="row">

            <div className="juego-recomendados col-md-12">
            {
                recomendados.map((item) => (
                    item.categoria === categoria && item.id !== id ? (
                    <div className="card col-12 col-sm-6 col-md-4" key={item.id}>
                        <img src={item.photoURL} alt="juego-recomendada"
                            onClick={() => handleCard(item)}
                            className="img-fluid"
                        />
    
                        <div className="card-body">
    
                            <div className="header">
                                <h5 className="card-title">{item.producto}</h5>
                                <div className="precio-recomendado">
                                    <span>PARA TI</span> 
                                    <p className="card-text">${item.precio}</p>
                                </div>
                            </div>
    
    
    
                            <div className="comprar">
                                <a href="#" className="btn btn-warning btn-block">Comprar</a>
                            </div>
    
                        </div>
                    </div>
                    ):(
                        null
                    )
                ))
            }
            </div>

        </div>
    )
}

export default Recomendado
