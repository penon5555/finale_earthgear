// rfce

import React from 'react'
import { Outlet } from 'react-router-dom'

function LayoutUser() {
    return (
        <div>
            <h1>Nav</h1>
            <Outlet />
        </div>
    )
}

export default LayoutUser