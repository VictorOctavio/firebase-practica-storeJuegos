import React from 'react'
import './admin.css'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCogs } from '@fortawesome/free-solid-svg-icons'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {GetProductoAction} from '../../Redux/adminDucks'
import {DeletePoductoAction} from '../../Redux/adminDucks'


const ListProductos = (props) => {

    //Redux
    const dispatch = useDispatch()
    const listproductos = useSelector(store => store.productos.productos)

    React.useEffect(() => {
        dispatch(GetProductoAction())
    }, [dispatch])

    //DELETE PRODUCTO
        const handleDeleteProducto = (id) => {
            dispatch(DeletePoductoAction(id))
        }

    //EDIR PRODUCTO
        const handleEditProducto = (item) => {

            props.setModoEdit(true)

            props.setGetProducto({
                id: item.id,
                producto: item.producto,
                precio: item.precio,
                photoURL: item.photoURL,
                categoria: item.categoria,
                opciones: item.opciones,
                carrito: item.carrito
            })

        }

    return (
        <div className="list-productos">
                <h3>Listado de productos</h3>

                <table className="table table-striped table-dark">
                    <thead>
                        <tr>
                            <th scope="col">Producto Nombre</th>
                            <th scope="col">Producto Imagen</th>
                            <th scope="col"><FontAwesomeIcon icon={faCogs}/> Configuraciones</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            listproductos.map(item => (
                                <tr key={item.id}>
                                    <td>{item.producto}</td>
                                    <td><img src={item.photoURL} width="60px" alt="imgphoto"/></td>
                                    <td>
                                        <div className="buttons">
                                            <button className="btn btn-danger mx-1"
                                            onClick={() => handleDeleteProducto(item.id)}
                                            >Eliminar</button>

                                            <button className="btn btn-warning mx-1"
                                            onClick={() => handleEditProducto(item)}
                                            >Editar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
    )
}

export default ListProductos
