import {db, auth, firebase} from '../Firebase'

//CONSTANTES
const dataInicial = {
    loading: false,
    active: false,
}


//TYPES
const LOADING = 'LOAGING'
const USER_EXITO = 'USER_EXITO'
const SINGOUT_USER = 'SINGOUT_USER'
const SUB_EXITO = 'SUB_EXITO'


//REDUCER
export default  function loginReducer(state = dataInicial, action){
    switch(action.type){

        case USER_EXITO:
            return {...state, loading: false, active:true, user: action.payload}

        case SINGOUT_USER:
            return {...dataInicial}

        case SUB_EXITO:
            return {...state, sub: action.payload}

        default:
            return {...state}
    }
}

//ACCIONES
    //iniciar sesion usuario && guardar en firebase
export const loginUserAction = () => async(dispatch) => {
    
    dispatch({
        type:LOADING
    })

    try{
        //VENTANA GOOGLE + CAPTURAMOS EL USER
        const provider = new firebase.auth.GoogleAuthProvider();
        const res = await auth.signInWithPopup(provider)

        const user = {
            uid: res.user.uid,
            name: res.user.displayName,
            email: res.user.email,
            photoURL: res.user.photoURL
        }

        const userDB = await db.collection('users').doc(user.email).get()

        if(userDB.exists){
            
            //EXISTE EL USUARIO DEVOLVEME
            dispatch({
                type: USER_EXITO,
                payload: userDB.data()
            })

            localStorage.setItem('user', JSON.stringify(userDB.data()))

        }else{

            await db.collection('users').doc(user.email).set(user)
            dispatch({
                type: USER_EXITO,
                payload: user
            })

            localStorage.setItem('user', JSON.stringify(user))

        }

    }catch(err){
        console.log(err)
    }

}

    //Leer sesion del usuario LOCAL STORAGE REFRESH
export const readUserAction = () => (dispatch) => {

    if(localStorage.getItem('user')){
        dispatch({
            type: USER_EXITO,
            payload: JSON.parse(localStorage.getItem('user'))
        })
        return
    }
} 



    //cerrar Sesion Usuario
export const singOutAction = () => (dispatch) => {

    auth.signOut()
    dispatch({
        type: SINGOUT_USER
    })

    localStorage.removeItem('user')
    localStorage.removeItem('sub')
}


    //SUBS USUARIOS
export const SubsAction = () => async(dispatch, getState) => {
    
    const {user} = getState().usuario

    try{

        if(localStorage.getItem('sub')){
            dispatch({
                type: SUB_EXITO,
                payload: true
            })
            return
        }

        const data = {
            email: user.email,
            name: user.name,
            sub: true
        }
        
        await db.collection('subs').doc(data.email).set(data)

        localStorage.setItem('sub', JSON.stringify(data))

        dispatch({
            type: SUB_EXITO,
            payload: true
        })

    }catch(err){
        console.log(err)
    }

}
