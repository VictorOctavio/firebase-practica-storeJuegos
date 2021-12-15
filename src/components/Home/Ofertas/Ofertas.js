import React from 'react'
import './destacados.css'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {GetProductoOffAction, GetJuegoAction} from '../../../Redux/adminDucks'


const Ofertas = () => {

    const dispatch = useDispatch()
 
    const ofertas = useSelector(store => store.productos.ofertas)


    React.useEffect(() => {

        dispatch(GetProductoOffAction())

    }, [dispatch])

    const handleCard = (item) => {
        dispatch(GetJuegoAction(item))
    }

    return (
        <div className="divcontainer">
        <div className="destacado-title">
            <h2>OFERTAS SEMANAL</h2>
        </div>

        <div className="row destacado-container">
            <div className="juegos-container">
                {
                    ofertas.map(item => (
                    <div className="card col-12 col-sm-6 col-md-4 col-lg-3 col-xl-2" key={item.id}>

                        <img src={item.photoURL} alt="img-destacada"
                        className="img-fluid" onClick={() => handleCard(item)}
                        />

                        <div className="card-body">

                            <div className="primera-linea">
                                <h5 className="card-title">{item.producto}</h5>
                                <div className="precio-off">
                                    <span>OFERTA</span> 
                                    <p className="card-text">${item.precio}</p>
                                </div>
                            </div>



                            <div className="segunda-linea">
                                <a href="#" className="btn btn-outline-danger btn-block">Comprar</a>
                            </div>

                        </div>
                    </div>
                    ))  
                }
            </div>
        </div>
        </div>
    )
}

export default Ofertas
