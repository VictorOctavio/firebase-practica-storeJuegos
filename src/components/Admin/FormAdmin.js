import React from 'react'
//styles
import './admin.css'

//Components
import ListProductos from './ListProductos'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

//REDUX
import {useDispatch} from 'react-redux'
import {CrearProductoAction} from '../../Redux/adminDucks'
import {EditProductoAction} from '../../Redux/adminDucks'
 
const imgDefault = 'https://firebasestorage.googleapis.com/v0/b/tienda-581c0.appspot.com/o/default.png?alt=media&token=29879911-2cef-4873-b8fb-9ecaae40e41b'
const FormAdmin = () => {

    //DISPATCH REDUX
    const dispatch = useDispatch()

    //ESTADOS
        //Objeto Producto
        const [getProducto, setGetProducto] = React.useState({
            producto: '',
            precio: 0,
            photoURL: imgDefault,
            categoria: 'accion',
            opciones: 'destacado',
            carrito: false
        })
        //MODO EDIT
        const [modoEdit, setModoEdit] = React.useState(false)


    //OBETENER PRODUCTO STATE
    const getData = (e) => {

        setGetProducto({
            ...getProducto,
            [e.target.name]: e.target.value
        })
        
    }

    //SUBMIT
    const onSubmitProducto = (e) => {
        
        e.preventDefault()

        //Validamos campos
        if(!getProducto.producto.trim()){
            console.log('CAMPO OBLIGATORIO')
        }

        if(!modoEdit){
            dispatch(CrearProductoAction(getProducto))

            setGetProducto({
                producto: '',
                precio: 0,
                photoURL: imgDefault,
                categoria: 'accion',
                opciones: 'destacado',
                carrito: false
            })
            
        }else{

            dispatch(EditProductoAction(getProducto))

            setGetProducto({
                producto: '',
                precio: 0,
                photoURL: imgDefault,
                categoria: 'accion',
                opciones: 'destacado',
                carrito: false
            })
        }
        
        
    }

    return (
        <div className="container">
            <div className="row form-container">

                <div className="col-md-6">
                    <form onSubmit={onSubmitProducto}>
                        {
                            modoEdit ? (
                                <h3>Editar Producto</h3>
                            ):(
                                <h3>Agregar Producto</h3>
                            )
                        }

                        <input className="form-control" type="text" maxLength="15"
                        name="producto"
                        placeholder="Producto:"
                        onChange={getData}
                        value={getProducto.producto}
                        />

                        <input className="form-control my-3" type="text" maxLength="6"
                        name="precio"
                        placeholder="Producto:"
                        onChange={getData}
                        value={getProducto.precio}
                        />

                        <input className="form-control my-3" type="text"
                        name="photoURL"
                        placeholder="photoURL:"
                        onChange={getData}
                        value={getProducto.photoURL}
                        />

                        <div className="caracteristica-producto">
                            <div className="categoria">
                                <select name="categoria" className="form-control" onChange={getData} value={getProducto.categoria}>
                                    <option value="accion">Accion</option>
                                    <option value="aventura">Aventura</option>
                                    <option value="deporte">Deporte</option>
                                    <option value="terror">Terror</option>
                                </select>
                            </div>
                            
                            <div className="">
                                <select name="opciones" className="form-control my-2" onChange={getData} value={getProducto.opciones}>
                                    <option value="destacado">Destacar</option>
                                    <option value="oferta">Ofertar</option>
                                    <option value="nada">No hacer nada</option>
                                </select>
                            </div> 
                        </div>

                        {
                            modoEdit ? (
                                <button className="btn btn-warning btn-block my-4">Editar</button>
                            ):(
                                <button className="btn btn-outline-success btn-block my-4">Agregar</button>      
                            )
                        }

                    </form> 
                </div>

                <div className="col-md-6 card-container ">
                    <div className="card">
                        <img src={getProducto.photoURL} alt="img-producto"/>
                        <div className="card-body">
                            <div className="primera-linea">
                                <h5 className="card-title">{getProducto.producto}</h5>
                                <p className="card-text">${getProducto.precio}</p>
                            </div>

                            <div className="segunda-linea">
                                <a href="https://mail.google.com/mail/u/0/" 
                                className="btn btn-outline-danger btn-block disabled">Comprar</a>
                               <button className="btn btn-danger disabled"><FontAwesomeIcon icon={faShoppingCart}/></button>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


            <div className="listContainer">
                <ListProductos
                    setGetProducto={setGetProducto}
                    setModoEdit={setModoEdit}
                />
            </div>
        </div>
    )
}

export default FormAdmin
