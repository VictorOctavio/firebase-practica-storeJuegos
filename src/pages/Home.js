import React from 'react'

//Components
import Portada from '../components/Home/Portada'
import Ofertas from '../components/Home/Ofertas/Ofertas'
import Destacados from '../components/Home/ListDestacados/Destacados'
import Footer from '../components/Home/Footer/Footer'
import Acercade from '../components/Home/Acercade/Acercade'

const Home = () => {
    return (
        <React.Fragment>

          <Portada />

          <Ofertas/>

          <Destacados/>

          <Acercade/>

          <Footer/>
          
        </React.Fragment>
    )
}

export default Home
