import React from 'react'
import { ImSpoonKnife } from 'react-icons/im'

function Header() {
    return (
        <header className='header' style={{ backgroundImage: `url(https://images.unsplash.com/photo-1585735119301-232c1633d439?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80)` }}>
            <div className='layer'>
                <div className="container">
                    <nav className='logo-wrapper'>
                        <div className='logo'>
                            <ImSpoonKnife className='brand' />
                        </div>
                    </nav>
                    <div className='header-text' >
                        <h1>Edamam</h1>
                        <p>Recipe Search API</p>
                    </div>

                </div>
            </div>
        </header>
    )
}

export default Header
