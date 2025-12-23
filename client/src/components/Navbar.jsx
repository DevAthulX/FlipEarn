
import { useState } from "react"
import { assets } from "../assets/assets"
import { Link, useNavigate } from "react-router-dom"
import { BoxIcon, GripIcon, ListIcon, MenuIcon, MessagesSquareIcon, X } from "lucide-react" 
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'

const Navbar = () => {
    const { user } = useUser()
    const { openSignIn } = useClerk()
    const [menuOpen, setMenuOpen] = useState(false)
    const navigate = useNavigate()

    const handleNav = (path) => {
        navigate(path);
        window.scrollTo(0, 0);
        setMenuOpen(false);
    }

    return (
        <nav className='h-20'>
            {/* Desktop / Main Header */}
            <div className='fixed left-0 top-0 right-0 z-[100] flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-white transition-all'>

                <img onClick={() => handleNav('/')} src={assets.logo} alt="logo" className="h-10 cursor-pointer" />

                {/* Desktop Menu */}
                <div className='hidden sm:flex items-center gap-4 md:gap-8 max-md:text-sm text-gray-800 font-medium'>
                    <Link to='/' onClick={() => window.scrollTo(0, 0)}> Home </Link>
                    <Link to='/marketplace' onClick={() => window.scrollTo(0, 0)}> Marketplace </Link>
                    <Link to={user ? '/messages' : "#"} onClick={() => user ? window.scrollTo(0, 0) : openSignIn()}> Messages </Link>
                    <Link to={user ? '/my-listings' : "#"} onClick={() => user ? window.scrollTo(0, 0) : openSignIn()}> My Listings </Link>
                </div>

          {/* Right Side Actions */}
<div className="flex items-center gap-4">
    {!user ? (
        <>
            <button onClick={openSignIn} className='max-sm:hidden cursor-pointer px-8 py-2 bg-indigo-500 hover:bg-indigo-600 transition text-white rounded-full'>Login</button>
            <MenuIcon onClick={() => setMenuOpen(true)} className="sm:hidden cursor-pointer" />
        </>
    ) : (
        <div className="flex items-center gap-4">
            {/* Added max-sm:hidden here to hide the logo on mobile */}
            <div >
                <UserButton>
                    <UserButton.MenuItems>
                        <UserButton.Action label="Marketplace" labelIcon={<GripIcon size={16} />} onClick={() => navigate('/marketplace')} />
                         <UserButton.Action label="My Orders" labelIcon={<BoxIcon size={16} />} onClick={() => navigate('/my-orders')} />
                          <UserButton.Action label="My Listing" labelIcon={<ListIcon size={16} />} onClick={() => navigate('/my-listings')} />
                          <UserButton.Action label="Messages" labelIcon={<MessagesSquareIcon size={16} />} onClick={() => navigate('/messages')} />
                    </UserButton.MenuItems>
                </UserButton>
            </div>
            
            {/* The Hamburger Menu Icon remains visible for mobile */}
            <MenuIcon onClick={() => setMenuOpen(true)} className="sm:hidden cursor-pointer" />
        </div>
    )}
</div>
            </div>

            {/* Mobile Menu Overlay */}
            <div className={`sm:hidden fixed inset-0 ${menuOpen ? 'translate-x-0' : 'translate-x-full'} bg-white z-[200] text-sm transition-transform duration-300 ease-in-out`}>
                <div className='flex flex-col items-center justify-center h-full text-xl font-semibold gap-8 p-4 relative'>

                    <X onClick={() => setMenuOpen(false)} className='absolute size-8 right-6 top-6 text-gray-500 hover:text-gray-700 cursor-pointer' />

                    <Link to='/' onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to='/marketplace' onClick={() => setMenuOpen(false)}>Marketplace</Link>
                    <Link to={user ? '/messages' : '#'} onClick={() => { user ? handleNav('/messages') : openSignIn() }}>Messages</Link>
                    <Link to={user ? '/my-listings' : '#'} onClick={() => { user ? handleNav('/my-listings') : openSignIn() }}>My Listings</Link>
                    
                    {!user && (
                        <button onClick={openSignIn} className='px-8 py-3 bg-indigo-500 text-white rounded-full'>Login</button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default Navbar