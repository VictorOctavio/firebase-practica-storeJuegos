import React from 'react'
import './productos.css'

//Components
import CarritoItem from '../Carrito/CarritoItem'
import Footer from '../Home/Footer/Footer'

//redux
import {useDispatch, useSelector} from 'react-redux'
import {GetProductoAction, GetJuegoAction} from '../../Redux/adminDucks'

//
import {withRouter} from 'react-router-dom'

const AllProductos = (props) => {

    //REDUX
    const dispatch = useDispatch()
    var Productos = useSelector(store => store.productos.productos)
    const carritoActive = useSelector(store => store.productos.carrito)

    //ESTADOS
        //TITLE INFO
        const [categoria, setCategorias] = React.useState('TODOS LOS JUEGOS')
        const [getPro, setGetPro] = React.useState(Productos)

    //PRODUCTOS
    React.useEffect(() => {
        dispatch(GetProductoAction())
    }, [dispatch])

    
    //Categoria
    const handleInfo = (e) => {

        setCategorias(e.target.name)
        
        setGetPro(Productos)

        if(e.target.name === 'TODOS LOS JUEGOS'){
            setGetPro(Productos)
        }

        if(e.target.name === 'ACCION'){
            const arrayFilter = Productos.filter(item => item.categoria === 'accion')
            setGetPro(arrayFilter)
        }

        if(e.target.name === 'AVENTURA'){
            const arrayFilter = Productos.filter(item => item.categoria === 'aventura')
            setGetPro(arrayFilter)
        }

        if(e.target.name === 'DEPORTE'){
            const arrayFilter = Productos.filter(item => item.categoria === 'deporte')
            setGetPro(arrayFilter)
        }

        if(e.target.name === 'TERROR'){
            const arrayFilter = Productos.filter(item => item.categoria === 'terror')
            setGetPro(arrayFilter)
        }

    }


    const handleCard = (item) => {
      dispatch(GetJuegoAction(item))
    }


    return (
       <React.Fragment>
            <nav className="fixed-top">
                <div className="categorias">
                    <button className="btn active" onClick={handleInfo} name="TODOS LOS JUEGOS">Todos</button>
                    <button className="btn" onClick={handleInfo} name="ACCION">Accion</button>
                    <button className="btn" onClick={handleInfo} name="AVENTURA">Aventuras</button>
                    <button className="btn" onClick={handleInfo} name="DEPORTE">Deporte</button>
                    <button className="btn" onClick={handleInfo} name="TERROR">Terror</button>
                </div>
            </nav>

            <div className="container listado-productos">
                <div className="row">
                    <div className="col-md-12 text-title">
                        {
                            <h2>{categoria}</h2>
                        }
                    </div>
                </div>

                 <div className="row fila-todos-juegos">
                { getPro.length <= 0 ? (
                        Productos.map(item => (
                            <div className="col-xs-8 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                                <div className="card">
                                    <img src={item.photoURL} alt="card-img" onClick={() => handleCard(item)}/>
    
                                    <div className="card-body">
    
                                        <div className="texts-productos">

                                            <h5 className="card-title">{item.producto}</h5>

                                            <div className="precios-productos">
                                                <span>{item.categoria}</span>
                                                <p className="card-text">${item.precio}</p>
                                            </div>

                                        </div>
                                        
                                        <div className="botones">
                                            <a href="https://mail.google.com/mail/u/0/" className="btn btn-outline-danger">COMPRAR</a> 
                                            {
                                                carritoActive && carritoActive.id === item.id ? (
                                                    <CarritoItem
                                                    disabled={true}
                                                    producto={item}
                                                    />
                                                ):(
                                                    <CarritoItem
                                                    disabled={false}
                                                    producto={item}
                                                    />
                                                )
                                            }
                                            
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                            ))
                    ):(
                        getPro.map(item => (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-3" key={item.id}>
                                <div className="card">
                                    <img src={item.photoURL} alt="card-img"/>
    
                                    <div className="card-body">
    
                                        <div className="texts-productos">

                                            <h5 className="card-title">{item.producto}</h5>

                                            <div className="precios-productos">
                                                <span>{item.categoria}</span>
                                                <p className="card-text">${item.precio}</p>
                                            </div>

                                        </div>
                                        
                                        <div className="botones">
                                            <a href="https://mail.google.com/mail/u/0/" className="btn btn-outline-danger">COMPRAR</a> 
                                            {
                                                carritoActive && carritoActive.id === item.id ? (
                                                    <CarritoItem
                                                    disabled={true}
                                                    producto={item}
                                                    />
                                                ):(
                                                    <CarritoItem
                                                    disabled={false}
                                                    producto={item}
                                                    />
                                                )
                                            }
                                            
                                        </div>
                                    </div>
    
                                </div>
                            </div>
                            ))
                        )

                }
                </div>

            </div>

            <Footer/>  
       </React.Fragment>
    )
}

export default withRouter(AllProductos)
