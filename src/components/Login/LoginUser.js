import React from 'react'
import './login.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGoogle } from '@fortawesome/free-brands-svg-icons'
import Info from './Info'

//REDUX
import {useDispatch, useSelector} from 'react-redux'
import {loginUserAction} from '../../Redux/loginDucks'

//
import {withRouter} from 'react-router-dom'

const LoginUser = (props) => {

    const dispatch = useDispatch()
    const active = useSelector(store => store.usuario.active)
    const loading = useSelector(store => store.usuario.loading)


    React.useEffect(() => {
        if(active){
            props.history.push('/')
        }
    }, [props.history, active])


    const handleSesion = () => {

        dispatch(loginUserAction())

        if(active){
            props.history.push('/')
        }
    }

    return (
        <>
        <div className="loginContainer">
            
            <div className="sesionPhoto">
                <img alt="img-sesion"
                    src="https://firebasestorage.googleapis.com/v0/b/follsclothing-a8076.appspot.com/o/ney.jpg?alt=media&token=270df0d1-ed33-428b-9060-155e274d0e5e"
                />
            </div>


            <div className="sesion">
                <div className="title">
                    <h5>INICIAR SESION</h5>
                </div>

                <div className="boton-sesion">
                    <button className="btn btn-dark btn-block"
                    onClick={handleSesion}
                    disabled={loading}
                    ><FontAwesomeIcon icon={faGoogle} className="icon"/>Iniciar con Google
                    </button>
                </div>
            </div>
        </div>

        <Info/>
        </>
    )
}

export default withRouter(LoginUser)
