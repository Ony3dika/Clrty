import React from 'react'
import { Button } from "../components/ui/button";
import Link from "next/link";

const BlurredPage = () => {
  return (
    <main className='h-screen w-screen bg-transparent backdrop-blur-xs fixed top-0 left-0 flex flex-col gap-4 items-center justify-center'>
      <p className='font-semibold'>You've been Logged Out</p>

      <Button asChild>
        <Link href={"/"}>Sign In</Link>
      </Button>
    </main>
  );
}

export default BlurredPage