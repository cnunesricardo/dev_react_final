'use client'
import 'tailwindcss/tailwind.css'
import AppbarCartCal from '@/app/components/AppbarCartCal';
import Bottom from '@/app/components/Bottom';
import Drawer from '@/app/components/Drawer';
import React, {useContext, useEffect, useState} from 'react';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { fetchProducts } from '@/app/utils/api'
import { CartContext } from '@/app/contexts/CartContext';
import { ProductContainer, ProductImageProd, CardButton } from '@/app/styles/ProductsStyles'
import { ThemeContext } from "@/app/contexts/ThemeContext"

const ProductsPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const {addToCart} = useContext(CartContext);

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("VideoCarousel atualizou");
}, [theme])


    const { data: session } = useSession();
    const router = useRouter();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
        const productsData = await fetchProducts();
        setProducts(productsData);
    }
    getProducts();
  }, []);

  
  return (
    <main className={`${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'} container mx-auto max-w-screen-lg`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <ul>
        {products.map((product) =>(
            <li key={product.id}>                
              <ProductContainer className={`${theme === 'dark' ? 'bg-stone-600' : 'bg-white'} container mx-auto max-w-screen-md`}>
                <div className="grid grid-cols-1 gap-4 place-items-center w-1/4">
                  <ProductImageProd src={product.image}/>
                  <CardButton onClick={() => addToCart(product)} >
                    Add Cart
                  </CardButton>
                </div>
                <div className="pl-12 pt-2 w-3/4">
                    <h1 className='text-2xl font-bold'>{product.title}</h1>
                    <p className='break-words'>{product.description}</p>
                    <h2><b>Category: </b>{product.category}</h2>
                    <br></br>
                    <p><b>Price: </b>${product.price}</p>
                  </div>
              </ProductContainer>               
            </li>
        ))}
      </ul>
      <Bottom></Bottom>
    </main>
  );

}
export default ProductsPage;