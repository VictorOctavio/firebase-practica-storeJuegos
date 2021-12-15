import {db} from '../Firebase'

//CONSTANTESS
const dataInicial = {
    productos: [],
    carrito: [],
    carritos: [],
    ofertas: [],
    destacados: []
}

//TYPES
const CREATE_PRODUCTO = 'CREATE_PRODUCTO'
const GET_PRODUCTO = 'GET_PRODUCTO'
const GET_PRODUCTO_OFF = 'GET_PRODUCTO_OFF'
const GET_PRODUCTO_DESTACADO = 'GET_PRODUCTO_DESTACADO'
const EDIT_PRODUCTO = 'EDIT_PRODUCTO'
const CARRITO_COMPRA = 'CARRITO_COMPRA'
const GET_CARRITO = 'GET_CARRITO'
const SUMA_CARRITO = 'SUMA_CARRITO'




//REDUCER
export default function adminReducer(state = dataInicial, action){
    switch(action.type){
        
        case CREATE_PRODUCTO:
            return {...state, ...action.payload}
        
            case GET_PRODUCTO:
            return {...state, productos: action.payload}
        
            case EDIT_PRODUCTO:
            return {...state, ...action.payload}
        
            case GET_PRODUCTO_OFF:
            return {...state, ofertas: action.payload}

            case GET_PRODUCTO_DESTACADO:
            return {...state, destacados: action.payload}

            case CARRITO_COMPRA:
            return {...state, carrito: action.payload}

            case GET_CARRITO:
            return {...state, carritos: action.payload}

            case SUMA_CARRITO:
            return {...state, totalCarrito: action.payload}

            default:
            return {...state}
    }
}

//ACCIONES

    //CREARPRODUCTOS
export const CrearProductoAction = (data) => async(dispatch, getState) => {

    try{

        const newProducto = {
            producto: data.producto,
            precio: data.precio,
            photoURL: data.photoURL,
            categoria: data.categoria,
            opciones: data.opciones
        }

        await db.collection('productos').add(newProducto)

        dispatch({
            type: CREATE_PRODUCTO,
            payload: 'exito'
        })
    
        console.log('AGREGADO CORRECTAMENTE')

    }catch(err){
        console.log(err)    
    }

}


    //OBTENER PRODUCTOS
export const GetProductoAction = () => async(dispatch) => {

    try{
        
        if(localStorage.getItem('getJuegos')){
            dispatch({
                type: GET_PRODUCTO,
                payload: JSON.parse(localStorage.getItem('getJuegos'))
            })
            console.log('accediendo local storage')
            return
        }

        const data = await db.collection('productos').get()
        const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
         
        localStorage.setItem('getJuegos', JSON.stringify(arrayData))

        dispatch({
            type: GET_PRODUCTO,
            payload: arrayData
        })

    }catch(err){
        console.log(err)
    }

}

    //OBTENER PRODUCTOS OFERTA
export const GetProductoOffAction = () => async(dispatch) => {

    try{
        
        if(localStorage.getItem('juegos-ofertas')){
            dispatch({
                type: GET_PRODUCTO_OFF,
                payload: JSON.parse(localStorage.getItem('juegos-ofertas'))
            })
            return
        }

        const data = await db.collection('productos').get()
        const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))

        const ofertasFilter = arrayData.filter(item => item.opciones === ('oferta'))

        localStorage.setItem('juegos-ofertas', JSON.stringify(ofertasFilter))
        
        dispatch({
            type: GET_PRODUCTO_OFF,
            payload: ofertasFilter
        })

    }catch(err){
        console.log(err)
    }

}

    //OBTENER PRODUCTOS Destacado
export const GetProductoDestacadoAction = () => async(dispatch) => {

        try{

            if(localStorage.getItem('juegos-destacados')){
                dispatch({
                    type: GET_PRODUCTO_DESTACADO,
                    payload: JSON.parse(localStorage.getItem('juegos-destacados'))
                })
                return
            }

            const data = await db.collection('productos').get()
            const arrayData = data.docs.map(doc => ({id:doc.id, ...doc.data()}))
    
            const destacadoFilter = arrayData.filter(item => item.opciones === ("destacado"))
            
            localStorage.setItem('juegos-destacados', JSON.stringify(destacadoFilter))

            dispatch({
                type: GET_PRODUCTO_DESTACADO,
                payload: destacadoFilter
            })
    
        }catch(err){
            console.log(err)
        }
    
    }


    //ELEMINAR PRODUCTO
export const DeletePoductoAction = (id) => async(dispatch, getState) => {

    const {productos} = getState().productos

    try{

        await db.collection('productos').doc(id).delete()
        const arrayData = productos.filter(item => item.id !== id)

        dispatch({
            type: GET_PRODUCTO,
            payload: arrayData
        })

    }catch(err){
        console.log(err)
    }

}


    //EDITAR PRODUCTO
export const EditProductoAction = (getProducto) => async(dispatch) => {

    try{

        await db.collection('productos').doc(getProducto.id).update({
            producto: getProducto.producto,
            precio: getProducto.precio,
            photoURL: getProducto.photoURL,
            categoria: getProducto.categoria,
            opciones: getProducto.opciones
        })
   
    }catch(err){
        console.log(err)
    }
}


    //CARRITO DE COMPRAS
export const CarritoAction = (data) => async(dispatch, getState) => {

    const {user} = getState().usuario

    try{ 

        const producto = {
                id: data.id,
                producto: data.producto,
                precio: data.precio,
                photoURL: data.photoURL,
                carrito: true
            }    
            
        await db.collection(user.email).doc(producto.id).set(producto)
        
        dispatch({
            type: CARRITO_COMPRA,
            payload: producto
       })

    }catch(err){
        console.log(err)
    }

}
    

//  CONSUMIR CARRITO DE COMPRAS
    export const getCarritoAction = () => async(dispatch, getState) => {

        const {user} = getState().usuario

        try{

           const data = await db.collection(user.email).get()
           const arrayData = data.docs.map(doc => ({id: doc.id, ...doc.data()}))

           dispatch({
                type: GET_CARRITO,
                payload: arrayData
           })
           

        }catch(err){
            console.log(err)
        }
    }


//  ELIMINAR PRODUCTO CARRITO DE COMPRASarrayData
export const DeleteCarritoAction = (id) => async(dispatch, getState) => {

    const {user} = getState().usuario
    const {carritos} = getState().productos

    try{

       await db.collection(user.email).doc(id).delete()
       const arrayData = carritos.filter(item => item.id !== id)


       dispatch({
            type: GET_CARRITO,
            payload: arrayData
       })

    }catch(err){
        console.log(err)
    }
}

export const SumarCarritoAction = () => async(dispatch, getState) => {

    const {carritos} = getState().productos;

    var precioTotal = 0;

    const suma = () => {
            carritos.forEach(element => {
         
                 var elementNum = parseInt(element.precio)
         
                 var precio = elementNum
         
                 precioTotal = precioTotal + precio
        
             })
    
             return(precioTotal)
        }
       
        try{
            suma()
            dispatch({
                type: SUMA_CARRITO,
                payload: precioTotal
            })
        }catch(err){
            console.log(err)
        }

}


export const GetJuegoAction = (juego) => () => {

    const producto = {
        id: juego.id,
        producto: juego.producto,
        precio: juego.precio,
        photoURL: juego.photoURL,
        categoria: juego.categoria,
        opciones: juego.opciones
    }
    
    localStorage.setItem('juego', JSON.stringify(producto))
    
    window.location = (`/juego/${juego.id}`)
    
}

