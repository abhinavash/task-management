import React, { useEffect } from 'react'
import authStore from '../store/authStore'

export const LogoutPage = () => {

    const store = authStore();
    useEffect(()=>{
        store.logout();
    },[])
  return (
    <h1>You are now logout!  </h1>
  )
}
