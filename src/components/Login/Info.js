import React from 'react'
import './login.css'

const Info = () => {
    return (
        <div className="pie-form">

            <div className="container pie-container">
                <div className="img-info">
                    <img alt="img" 
                    className="messi-img"
                    src="https://firebasestorage.googleapis.com/v0/b/follsclothing-a8076.appspot.com/o/messi.png?alt=media&token=ecef6944-94c8-4bc8-a43f-94106ec6cd63"/>
                    <img alt="img" 
                    className="ronaldo-img"
                    src="https://firebasestorage.googleapis.com/v0/b/follsclothing-a8076.appspot.com/o/cris.jpg?alt=media&token=c0235b1a-3a9d-489f-a310-46b592e30268"/>
                    <img alt="img" 
                    className="tevez-img"
                    src="https://firebasestorage.googleapis.com/v0/b/follsclothing-a8076.appspot.com/o/carlos.jpg?alt=media&token=77cd2a99-0d82-460d-a998-aa74c388a8c9"/>
                </div>

                <div className="text-info">
                    <h3>GAME CLAN</h3>
                    <p>Adquiere los mejores juegos del mercado al mejor precio con G4M3CL4N</p>
                </div>
            </div>
              
        </div>
    )
}

export default Info
