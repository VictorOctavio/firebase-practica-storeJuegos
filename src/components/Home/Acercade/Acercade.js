import React from 'react'
import './acercade.css'

//img
const IMG = 'https://firebasestorage.googleapis.com/v0/b/tienda-581c0.appspot.com/o/acercade.jpg?alt=media&token=142b9496-68f3-40f3-880b-1d8ac8ad8595'

const Acercade = () => {
    return (
        <div className="acercade-container" id="acerca-de">
            <div className="container">
                <div className="row">
                        <div className="col-md-6 galerias-acercade">
                            <img alt="img-acercade" src={IMG}/>
                        </div>

                        <div className="col-md-6 info-acercade">
                            <h3>INFORMACION</h3>
                            <p>G4M3CL4N es la empresa lider encargada de brindar servicio de ventas de viedeojuegos en todas las plataformas</p>
                        </div>
                </div>
            </div>
        </div>
    )
}

export default Acercade
