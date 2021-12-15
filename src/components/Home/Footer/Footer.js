import React from 'react'
import './footer.css'

//Font
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faShippingFast, faCreditCard, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { faFacebookSquare, faInstagramSquare, faCcMastercard, faCcVisa } from '@fortawesome/free-brands-svg-icons'

//redux
import {useDispatch, useSelector} from 'react-redux'
import {SubsAction} from '../../../Redux/loginDucks'

//
import {withRouter} from 'react-router-dom'

const Footer = (props) => {

    const dispatch = useDispatch()
    const user = useSelector(store => store.usuario.active)
    const sub = useSelector(store => store.usuario.sub)


    const onsubmitSubs = (e) => {

        e.preventDefault()

        if(user){
            dispatch(SubsAction())
            return
        }
    
    }

    React.useEffect(() => {

        const subscripto = () => {
            if(user && localStorage.getItem('sub')){
                dispatch(SubsAction())
            }
        }

        subscripto()
        
    }, [dispatch, user])

    const handleSubRegistro = () => {
        props.history.push('/login')
    }

    return (
        <footer>
            <div className="container-footer">

                <div className="informacion">

                    <div className="compra">
                        <h2><FontAwesomeIcon icon={faLock} className="icon"/>COMPRA DE FORMA SEGURA</h2>
                        <p className="mb-0 text-info">Productos con garantia de 1 año</p>
                    </div>

                    <div className="entrega">
                        <h2><FontAwesomeIcon icon={faShippingFast} className="icon"/>ENTREGA EN LAS 24HS</h2>
                        <p className="mb-0 text-info">Envio de inmediato</p>
                    </div>

                    <div className="pagos">
                        <h2><FontAwesomeIcon icon={faCreditCard} className="icon"/>METODOS DE PAGO</h2>
                        <div className="formas-pago">
                            <FontAwesomeIcon icon={faCcMastercard} className="mx-1 iconcard mastercard"/>
                            <FontAwesomeIcon icon={faCcVisa} className="mx-1 iconcard visa"/>
                            <FontAwesomeIcon icon={faCreditCard} className="mx-1 iconcard creditcard"/>
                        </div>
                    </div>
                    
                </div>

                <div className="redes-sociales">

                    <div className="redes">
                        <div>
                            <h5>CONTACTANOS</h5>
                        </div>
                        <div className="enlaces-redes">
                        <a href="https://mail.google.com/mail/u/0/"><FontAwesomeIcon icon={faFacebookSquare} className="icon facebook"/></a>
                        <a href="https://mail.google.com/mail/u/0/"><FontAwesomeIcon icon={faInstagramSquare} className="icon instagram mx-2"/></a>
                        <a href="https://mail.google.com/mail/u/0/"><FontAwesomeIcon icon={faEnvelope} className="icon mail"/></a>
                        </div>
                    </div>
                    
                    <div className="formulario text-center">
                        <form onClick={onsubmitSubs}>
                            <h3  className="mb-0">SUSCRIBETE</h3>
                            <p className="text-info mb-0">Enterate de nuestros productos suscrbiendote</p>

                            {
                                !user ? (
                                    <button className="btn btn-outline-light my-2"
                                    onClick={handleSubRegistro}
                                    >SUSCRIBIRME</button>
                                ):(
                                !sub ? (
                                        <button className="btn btn-outline-light my-2">SUSCRIBIRME</button>
                                        ):(
                                        <button className="btn btn-success my-2" disabled>ESTAS SUBSCRIPTO</button>                                                  
                                    )  
                                )
                            }        
                        </form>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default withRouter(Footer)
