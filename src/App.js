import { library } from '@fortawesome/fontawesome-svg-core'
import { fas,faCartShopping,faBars } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { faLocationDot,faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import { Navbar } from './components/navbar/Navbar'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Shop } from './pages/Shop'
import { ShopCategory } from './pages/ShopCategory'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { LoginSignup } from './pages/LoginSignup'
import {Footer} from './components/footer/Footer'
import men_banner from './components/assets/banner_mens.png'
import women_banner from './components/assets/banner_women.png'
import kid_banner from './components/assets/banner_kids.png'
import OrderDetails from './components/orders/orderDetails'

library.add(fas, faTwitter, faFontAwesome,faLocationDot,faMagnifyingGlass,faCartShopping,faBars)

// const apiCall = () => {
//   axios.get('http://localhost:8001').then((data)=>{
//     console.log(data);
//   })
// }

function App() {
  return (
    <>
    <BrowserRouter>
    <Navbar />
    <Routes>
      <Route path='/' element={<Shop />} />
      {/* pass props in the route element like category prop */}
      <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
      <Route path='/womens' element={<ShopCategory banner={women_banner} category="women"/>} />
      <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid"/>} />
      <Route path='/product' element={<Product />} >
        <Route path=':productId' element={<Product/>} />
      </Route>
      <Route path='/cart' element={<Cart/>} />
      <Route path='/login' element={<LoginSignup/>} />
      <Route path="/order-details" element={<OrderDetails/>} />
    </Routes>
    <Footer/>
    </BrowserRouter>    
    {/* <Body />
    <Footer /> */}
    </>    
  );
}

export default App;
