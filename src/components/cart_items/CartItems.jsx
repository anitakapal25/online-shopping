import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../context/ShopContext'
import remove_icon from '../assets/cart_cross_icon.png'
import { useNavigate } from 'react-router-dom';

export const CartItems = () => {
  const {all_product,cartItems,removeFromCart,getTotalCartAmount} = useContext(ShopContext)
  const navigate = useNavigate();

  async function handleCheckout() {
    const res = await loadScript("https://checkout.razorpay.com/v1/checkout.js");
    
    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      const items = {       
        items: all_product.filter(item => cartItems[item.id] > 0).map(item => ({
          id: item.id,
          name: item.name,
          price: item.new_price,
          quantity: cartItems[item.id],
        }))
      };
      const response = await fetch("https://shopper-backend-xgyk.onrender.com/checkout", { // replace with your server endpoint
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: getTotalCartAmount(),items:items}) // assuming amount is in dollars
      });
    
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const paymentResponse = await response.json();
      console.log(paymentResponse.data);
      const { id, currency, amount } = paymentResponse.data;

      const options = {
        key: "rzp_test_nFmY3sVjJNaLxD", // Replace with your Razorpay Key ID
        amount: amount,
        currency: currency,
        name: "SHOPPER",
        description: "Test Transaction",
        order_id: id,
        handler: function (response) {
          alert("Payment Successful");

          // Create order details
          const orderDetails = {
            id,
            currency,
            amount,
            items: all_product.filter(item => cartItems[item.id] > 0).map(item => ({
              id: item.id,
              name: item.name,
              price: item.new_price,
              quantity: cartItems[item.id],
            }))
          };

          // Redirect to order details page
          navigate('/order-details', { state: { orderDetails } });
        },
        prefill: {
          name: "Anita Kapal",
          email: "anita.kapal@gmail.com",
          contact: "9730119636",
        },
        notes: {
          address: "003, Shradha Sankul, Panvel-410206",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Checkout failed", error);
      alert("Checkout failed. Please try again.");
    }
  }

    function loadScript(src) {
        console.log("load razor pay");
        return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
        resolve(false);
        };
        document.body.appendChild(script);
        });
    }

  return (
    <div className='cartitems'>
        <div className='cartitems-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {all_product.map((e)=>{
            if(cartItems[e.id] > 0){
                return <div key={e.id}>
                <div  className='cartitems-format cartitems-format-main'>
                    <img src={e.image} alt='' className='carticon-product-icon' />
                    <p>{e.name}</p>
                    <p>Rs. {e.new_price}</p>
                    <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                    <p>Rs. {e.new_price*cartItems[e.id]}</p>
                    <img className='carticon-remove-icon' src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt='' />
                </div>
            </div>
            }else{
                return null
            }
        })}
        <div className='cartitems-down'>
            <div className='cartitems-total'>
                <h1>Cart Totals</h1>
                <div>
                    <div className='cartitems-total-item'>
                        <p>Subtotal</p>
                        <p>Rs. {getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className='cartitems-total-item'>
                        <h3>Total</h3>
                        <h3>Rs. {getTotalCartAmount()}</h3>
                    </div>
                </div>
                <button onClick={() => handleCheckout()} target='_blank'>PROCEED TO CHECKOUT</button>
            </div>
            <div className='cartitems-promocode'>
                <p>If you have a promo code, Enter it here</p>
                <div className='cartitems-promobox'>
                    <input type='text' placeholder='Enter promo code' />
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}
