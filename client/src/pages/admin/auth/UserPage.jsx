import React from 'react'
import AdminNav from '../AdminNav'
import UserList from '../../../components/admin/UserList'

function UserPage() {
  return (
   <>
   <div className="bg-[#1b1c31] min-h-screen">
   <AdminNav/>
   <UserList/>
   </div>
   </>
  )
}

export default UserPage