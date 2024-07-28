import React from 'react'
import { useNavigate } from 'react-router-dom';
import AdminImg from "../assets/admin.jpg"
import { Button } from '@/components/ui/button';

const Admin = () => {
  const navigate = useNavigate();
  const handelRestro = () => {
    navigate("/add");
  };

  const handelReport = () =>{
    navigate("/report")
  }
  const handelExistingRestro = () =>{
    navigate("/update")
  }

  return (
    <div className='relative min-h-screen '>
      <img className='w-full h-screen object-cover p-4 rounded-3xl' src={AdminImg} alt="" />
      <div className='flex absolute w-1/2 flex-col gap-5 justify-center items-center  top-0 bottom-0 z-50  '>
      <Button className= 'rounded-xl bg-orange-500 hover:bg-white' onClick={handelRestro}>Add new Restaurants</Button>
      <Button className= 'rounded-xl bg-orange-500 hover:bg-white' onClick={handelExistingRestro}>Update Existing Restaurants</Button>
      <Button className ='rounded-xl bg-orange-500 hover:bg-white' onClick={handelReport}>View Report</Button>
      </div>
    </div>
  )
}

export default Admin