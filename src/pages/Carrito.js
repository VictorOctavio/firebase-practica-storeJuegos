import React from 'react'
import '../components/Carrito/carrito.css'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {getCarritoAction, DeleteCarritoAction, SumarCarritoAction} from '../Redux/adminDucks'

//components
import Footer from '../components/Home/Footer/Footer'

const consulta = 'https://api.whatsapp.com/send?phone=543794067930&text=Bienvenido%20a%20G4M3CL4N%20Dejanos%20tu%20consulta%20respecto%20al%20juegos,%20GRACIAS!'

const CarritoCompras = () => {

    //REDUX
    const dispatch = useDispatch()
    const userData = useSelector(store => store.usuario.user)
    const carritoItems = useSelector(store => store.productos.carritos)
    const totalCarrito = useSelector(store => store.productos.totalCarrito)


    //LLAMAR CARRITO
    React.useEffect(() => {

        const getCarrito = () => {
            dispatch(getCarritoAction())
        }

        getCarrito()
        
    }, [dispatch])

    const DeleteProducto = (id) => {
        dispatch(DeleteCarritoAction(id))
    }

    const getPrecio = () => {
        dispatch(SumarCarritoAction())
    }
    getPrecio()

    return (
        <React.Fragment>
        <div className="carritoContainer">
            <section className="section-carrito">

            
                <div className="header-carrito">
                    <div className="datos-user">
                        <img src={userData.photoURL} alt="img-user" width="50px"/>
                        <h6>{userData.name}</h6>
                    </div>    
                    <h3>MI CARRITO</h3>
                </div>

                <div className="main-carrito">

                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th scope="col">Nombre</th>
                                <th scope="col">Precio</th>
                                <th scope="col" className="text-center">Editar Carrito</th>
                            </tr>
                        </thead>
                        <tbody>
                        {
                            carritoItems.map(item => (
                                <tr key={item.producto}>
                                    <td>{item.producto}</td>
                                    <td>${item.precio}</td>
                                    <td className="text-center">
                                        <a className="btn btn-warning btn-sm mx-1" href={consulta} target="_black">Consultar</a>      
                                        <button className="btn btn-danger btn-sm mx-1" onClick={() => DeleteProducto(item.id)}>Eliminar</button>
                                    </td>
                                    
                                </tr>
                            ))
                        }
                            <tr className="total">
                                <td><h3>TOTAL</h3></td>
                                <td><h3>${totalCarrito}</h3></td>
                                <td><button className="btn btn-light btn-sm btn-block">Finalizar Compra</button></td>
                            </tr>
                        </tbody>
                    </table> 

                </div>

            </section>
        </div>
        <Footer/>
        </React.Fragment>
    )
}

export default CarritoCompras
