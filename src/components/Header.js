import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Header = () => {
    return (
        <>
   
    <div className="navbar">
        <div className="nav-logo border">
            <div className="logo"></div>
        </div>
        <div className="nav-address border">
            <p className="add-first">Deliver to</p>
            <div className="add-icon">
            <FontAwesomeIcon icon="fa-solid fa-location-dot" />
                <p className="add-second">India</p>
            </div>
        </div>
        <div className="nav-search">
            <select className="search-select">
                <option>All</option>
            </select>
            <input className="search-input" placeholder="Search Amazon" />
            <div className="search-icon"><FontAwesomeIcon icon="fa-solid fa-magnifying-glass" /></div>
        </div>

        <div className="nav-signin border">
            <p><span>Hello, sign in</span></p>
            <p className="nav-second">Account & Lists</p>
        </div>

        <div className="nav-return border">
            <p><span>Returns</span></p>
            <p className="nav-second">& Orders</p>
        </div>

        <div className="nav-cart border">
        <FontAwesomeIcon style={{fontSize: "30px"}} icon="fa-solid fa-cart-shopping" />
            Cart
        </div>
    </div>
   
    <div className="panel">
        <div className="panel-all">
        <FontAwesomeIcon icon="fa-solid fa-bars" />
            All
        </div>
        <div className="panel-ops">
            <p>Today's deal</p>
            <p>Customer Service</p>
            <p>Registry</p>
            <p>Gift Cards</p>
            <p>Sell</p>
        </div>
        <div className="panel-deals">
            Shop deals in Eletronics
        </div>
    </div>
   
        </>
    )
}

export default Header;