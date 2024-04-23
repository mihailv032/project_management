'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faTrash, faCartShopping } from '@fortawesome/free-solid-svg-icons'

import { company_name } from "@/app/constants"
import Link from "next/link"

import { usePathname } from 'next/navigation'

import DD from './dropdown'

export default function NavBar(){
  const pathname = usePathname()
  const hideNavbarPaths = ["/shop/checkout","/dashboard"]
  if(hideNavbarPaths.includes(pathname)) return;
  return (
    <nav className="fixed top-0 z-[10000] bg-white box-border w-screen">
      <div className="flex items-center m-auto max-w-screen-xl justify-between p-4 bg-transparent flex-wrap">
        <Link href="/" className="font-semibold uppercase mx-5 cursor-pointer md:block text-black">
          <h1 className="">{company_name}</h1>
        </Link>
	
        <div className="bg-none border-none outline-none cursor-pointer mx-5 select-none appearance-none z-1 flex flex-col ">
	  {/* hamburger */}
          <input type="checkbox" id="hamburgercheckbox" className="peer hidden" />
	  <label htmlFor="hamburgercheckbox" className='cursor-pointer'>
            <span className="md:hidden  block w-8 mb-1 bg-black h-1 origin-top-right transition-transform"></span>
            <span className="md:hidden block w-8 mb-1 bg-black h-1 origin-top-right transition-transform"></span>
            <span className="md:hidden block w-8 mb-1 bg-black h-1 origin-top-right transition-transform"></span>
	  </label>
          <ul className="items-baseline flex max-[767px]:peer-checked:translate-x-0 max-[767px]:translate-x-[-100%] transition-transform duration-300 max-[767px]:absolute max-[767px]:flex-col max-[767px]:h-screen max-[767px]:bg-main-gray max-[767px]:w-1/2 max-[767px]:left-0 max-[767px]:top-[100%] z-20">
            <li className="relative mx-8 p-4 text-xl hover:text-main-accent transition-color duration-300 font-normal text-black before:content-[''] before:absolute before:h-[2px] before:w-full before:bottom-0 before:left-0 before:right-0 before:bg-main-primary before:scale-x-0 before:transition-all before:ease-linear before:duration-300 hover:before:scale-x-100">
	      <Link href={"/"}>Home</Link>
	    </li>

	    <li className="mx-8 p-4 font-normal text-main-primary hover:text-main-accent transition-color duration-300">
	      {
		false ? 
		<User /> :
		<Link href="/login" className="color-black py-3 text-center px-4 bg-main-primary text-white rounded-md font-semibold transition-color duration-300 w-20 hover:bg-main-accent">
		  Login
	        </Link>
	      }
	    </li>
          </ul>
	</div>
      </div>
    </nav>
  )
}


function User(){
  return (
    <DD title={<FontAwesomeIcon icon={faUser} size={"1x"}/>}>
      <div>
	<ul className='bg-main-gray text-white rounded-md flex flex-col py-2 px-4 overflow-x-hidden overflow-y-auto font-medium items-stretch'>
	  <li className="text-center bg-main-primary my-2 px-2 py-1 rounded-full hover:bg-main-accent transition-color duration-300">
	    <Link href="/dashboard">Dashboard</Link>
	  </li>
	  <li className="text-center bg-main-primary my-2 px-2 py-1 rounded-full hover:bg-main-accent transition-color duration-300">
	    Settings
	  </li>
	  <li className="text-center bg-main-primary my-2 px-2 py-1 rounded-full hover:bg-main-accent transition-color duration-300">Logout</li>
	</ul>
      </div>
    </DD>
  )
}
