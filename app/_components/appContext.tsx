"use client"

import { createContext, useState, useEffect } from "react"
import getData from '../../components/getData'
import {url} from '../constants'

export const AppContext = createContext(null);

export default function Credentials({children}){
  const [user,setUser] = useState(null)
  const [token,setToken] = useState(null)
  const [loggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem("user")){
      setUser(JSON.parse(localStorage.getItem("user")))
      setToken(localStorage.getItem("token"))
      setLoggedIn(true)
      verify();
    }
    async function verify(){
      const user = JSON.parse(localStorage.getItem("user"))
      const token = localStorage.getItem("token")
      const res = await getData(`${url}api/isuserloggedin`,"POST",{user_id: user.id,token: token})
      console.log(res)
      if(res.error){
        setUser(null)
        setLoggedIn(false)
	setToken(null)
	localStorage.removeItem("user")
	localStorage.removeItem("token")
      }
    }
  },[])
  return (
    <AppContext.Provider value={{user,setUser,loggedIn,setLoggedIn,token,setToken}}>
      {children}
    </AppContext.Provider>
  )
}
