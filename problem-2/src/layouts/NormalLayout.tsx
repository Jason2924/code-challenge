import Header from '@/components/public/Header';
// import { useState } from 'react'
import backgroundImage from '@/assets/background-coins.png';
import { Outlet } from 'react-router-dom';

const NormalLayout = () => {
  return (
    <div className="min-h-screen bg-no-repeat flex flex-col" style={{
      backgroundColor: "#2B2B36",
      backgroundImage: `url(${backgroundImage})`,
      backgroundPosition: "31% 35%",
    }}>
      <Header />
      <main className="flex grow shrink basis-auto flex-col">
        <Outlet />
      </main>
    </div>
  )
}

export default NormalLayout
