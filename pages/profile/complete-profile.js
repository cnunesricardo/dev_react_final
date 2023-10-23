import React,{useState, useContext, useEffect} from 'react';
import Appbar from '@/app/components/Appbar';
import Bottom from '@/app/components/Bottom';
import Drawer from '@/app/components/Drawer';
import { useSession } from 'next-auth/react';
import CompleteProfileForm from '@/app/components/CompleteProfileForm'
import 'tailwindcss/tailwind.css'
import { ThemeContext } from "@/app/contexts/ThemeContext"

const CompleteProfile = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState();

    const handleMenuToggle  = () => {
        setIsDrawerOpen(!isDrawerOpen)
    }

    const {data: session} = useSession();

    
    const { theme } = useContext(ThemeContext);

    useEffect(() => {
      console.log("VideoCarousel atualizou");
  }, [theme])

    return(
        <main className={`container mx-auto max-w-screen-lg min-h-screen
        ${theme === 'dark' ? 'bg-stone-600 text-white' : 'bg-white'}`}>
        <Appbar onMenuToggle={handleMenuToggle}></Appbar>
        <Drawer isOpen={isDrawerOpen} onClose={handleMenuToggle}></Drawer>


        {session? (
            <div className={`container mx-auto pt-5 max-w-screen-lg text-sm min-h-screen`}>                
                <CompleteProfileForm user={session.user}/>
            </div>

        ) : (
            <h1>Não logado</h1>

        )}


        <Bottom></Bottom>
        </main>
    );
}
export default CompleteProfile;