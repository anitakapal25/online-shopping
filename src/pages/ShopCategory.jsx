import React, { useContext } from 'react'
import './css/ShopCategory.css'
import { ShopContext } from '../context/ShopContext'
import { Item } from '../components/item/Item'
import { useState,useEffect } from 'react'
// import dropdown_icon from '../components/assets/dropdown_icon.png'

export const ShopCategory = (props) => {
    const {all_product} = useContext(ShopContext);
    const [filteredProducts,setFilteredProducts] = useState(all_product)
    useEffect(()=>{
        const filtered = all_product.filter((item) => item.category === props.category);
        console.log(filtered);
        setFilteredProducts(filtered);
    },[props.category]);
  return (
    <div className='shop-category'>
        <img className='shopcategory-banner' src={props.banner} alt='' />
        <div className='shopcategory-indexSort'>
            <p>
                <span>Showing 1-{filteredProducts.length} </span>out of {filteredProducts.length} products
            </p>
            {/* <div className='shopcategory-sort'>
                Sort by <img src={dropdown_icon} alt='' />
            </div> */}
        </div>
        <div className='shopcategory-products'>
            {all_product.map((item,i)=>{
                if(props.category === item.category){
                    return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
                }else{
                    return null
                }
            })}
        </div>
        <div className='shopcategory-loadmore'>
            Explore More
        </div>
    </div>
  )
}
