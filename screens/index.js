import React from 'react'
import Auth_route from './auth_route'
import {AuthProvider} from './Authentication'

function Providers() {
    return (
       <AuthProvider>
           <Auth_route/>
       </AuthProvider>
    )
}

export default Providers
