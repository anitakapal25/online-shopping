import React from "react";

const Footer = () => {
    return (
        <>
        <div class="foot-panel1">
            Back to top
        </div>
        <div class="foot-panel2">
            <ul>
                <p>Get to Know Us</p>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Careers</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Blog</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>About Amazon</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Investor Relations</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Amazon Devices</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Amazon Science</a>
            </ul>
            <ul>
                <p>Make Money with Us</p>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Sell products on Amazon</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Sell on Amazon Business</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Sell apps on Amazon</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Become an Affiliate</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Advertise Your Products</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Self-Publish with Us</a>
            </ul>
            <ul>
                <p>Amazon Payment Products</p>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Amazon Business Card</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Shop with Points</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Reload Your Balance</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Amazon Currency Converter</a>
                
            </ul>
            <ul>
                <p>Let Us Help You</p>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Your Account</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Your Orders</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Shipping Rates & Policies</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Returns & Replacements</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Manage Your Content and Devices</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none' }}>Amazon Assistant</a>
            </ul>
        </div>
        <div class="foot-panel3">
             <div class="logo"></div>
        </div>
        <div class="foot-panel4">
            <div class="pages">
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none',color:"white" }}>Conditions of Use</a>
                <a href="/" onClick={(e) => {e.preventDefault()}}  style={{ textDecoration: 'none',color:"white" }}> Privacy Notice</a>
                <p>© 1996-2024, Amazon.com, Inc. or its affiliates</p>
            </div>
       </div>
        </>
    )
}

export default Footer