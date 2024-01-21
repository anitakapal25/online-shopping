import React from 'react'

function Body() {
  return (
    <>
     <div className="hero-section">
        <div className="hero-msg">
            You are on amazon.com. You can also shop on Amazon India for millions of products with fast local delivery. <a>Click here to go to amazon.in</a>
        </div>
   </div>

   <div className="shop-section">
        <div className="box1 box">
            <div className="box-content">
                <h2>Deals in PCs</h2>
                <div className="box-img" style={{backgroundImage: 'url("/box1.jpg")'}}></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box2 box">
            <div className="box-content">
                <h2>Toys under 250</h2>
                <div className="box-img" Style="background-image: url('/box2.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box3 box">
            <div className="box-content">
                <h2>Lunar New Year</h2>
                <div className="box-img" Style="background-image: url('/box3.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box4 box">
            <div className="box-content">
                <h2>Smartwatches</h2>
                <div className="box-img" Style="background-image: url('/box4.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box1 box">
            <div className="box-content">
                <h2>Player's paradise here</h2>
                <div className="box-img" Style="background-image: url('/box5.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box2 box">
            <div className="box-content">
                <h2>Deals on shoes</h2>
                <div className="box-img" Style="background-image: url('/box6.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box3 box">
            <div className="box-content">
                <h2>Office furniture</h2>
                <div className="box-img" Style="background-image: url('/box7.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
        <div className="box4 box">
            <div className="box-content">
                <h2>Personal Care under 100</h2>
                <div className="box-img" Style="background-image: url('/box9.jpg');"></div>
                <p>See more</p>
            </div>
        </div>
   </div>
    </>
  )
}

export default Body