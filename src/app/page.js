'use client'
import Appbar from './components/Appbar';
import Bottom from './components/Bottom';
import Drawer from './components/Drawer';
import React, {useContext, useState, useEffect} from 'react';
import { useRouter } from "next/navigation";
import VideoCarousel from './components/VideoCarousel';
import { ThemeContext } from '@/app/contexts/ThemeContext';




export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState();
  const router = useRouter()

  const handleMenuToggle  = () => {
    setIsDrawerOpen(!isDrawerOpen)}
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
        console.log("Page atualizou");
    }, [theme])
  

  return (
    <main className={`container mx-auto max-w-screen-lg ${theme === 'dark' ? 'bg-stone-600' : 'bg-white'}`}>
      <Appbar onMenuToggle={handleMenuToggle}></Appbar>
      <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>
      <VideoCarousel></VideoCarousel>
      <Bottom></Bottom>
    </main>
  )}