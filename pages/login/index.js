'use client'
import Bottom from '@/app/components/Bottom';
import Drawer from '@/app/components/Drawer';
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import React, {useState, useContext, useEffect} from 'react';
import 'tailwindcss/tailwind.css'
import { ProductContainer, ProductImage, CardButton } from '@/app/styles/ProductsStyles'
import AppbarCartCal from '@/app/components/AppbarCartCal';
import { ThemeContext } from "@/app/contexts/ThemeContext"


const LoginPage = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState();

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)
  }

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    console.log("VideoCarousel atualizou");
}, [theme])


  const { data: session } = useSession();
  const router = useRouter();


  if (session) {
    return (
      <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
        <h1 className='container mx-auto pt-5 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg text-2xl font-bold'>
          Welcome Back!</h1>
        <div className="container mx-auto py-2 grid grid-cols-1 gap-0 place-items-center max-w-screen-lg">            
            <p className=''>User: {session.user.name}</p>
            <p className=''>e-mail: {session.user.email}</p>
        </div>          
              
        <div className="container mx-auto pt-2 pb-4 grid grid-cols-1 gap-2 place-items-center max-w-screen-lg">
              <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
                onClick={() => router.push("/profile/complete-profile")}>
                Your Profile
              </button>
              
              <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
                onClick={() => {signOut()}}>
                Sign Out
              </button>
        </div>
        <Bottom></Bottom>
      </main>
    );
  }
  return (
    <main className={`container mx-auto max-w-screen-lg min-h-screen ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <AppbarCartCal onMenuToggle={handleMenuToggle}></AppbarCartCal>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <div className="container mx-auto py-10 grid grid-cols-1 gap-4 place-items-center max-w-screen-sm">
      <h1 className='text-xl font-semibold text-rose-400'> You are not currently logged in!</h1>
      <button className="bg-orange-500 text-white border-none py-2 px-4 rounded-lg shadow-md hover:bg-orange-600 hover:shadow-lg"
      onClick={() => signIn()}>
      Sign in with Google
      </button>       
      </div>
      <Bottom></Bottom>
    </main>
  );






}
export default LoginPage;