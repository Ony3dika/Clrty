"use client";
import React from "react";
import { motion } from "framer-motion";
import { Label } from "../../../components/ui/label";
import { Input } from "../../../components/ui/input";
import { Separator } from "../../../components/ui/separator";
import Uploader from "../../../components/avatar-upload";
import { Button } from "../../../components/ui/button";
const SettingsPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ duration: 1.5 }}
    >
      <main className='h-full'>
        <h1 className='font-bold text-2xl'>Settings</h1>
        <p className='text-sm text-muted-foreground'>
          Manage your account settings
        </p>

        {/* Profile */}
        <form className='mt-5 grid xl:grid-cols-4 grid-cols-2 xl:gap-8 gap-2 gap-y-8'>
          <div className='xl:col-span-1 col-span-2'>
            <h3 className='font-semibold'>Profile</h3>

            <p className='text-sm text-muted-foreground'>
              Set your account details
            </p>
          </div>
          {/* Avatar */}
          <div className='xl:col-span-1 col-span-2'>
            <Uploader />
          </div>
          {/* First Name */}
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='fname'>FirstName</Label>
            <Input type='text' id='fname' placeholder='FirstName' />
          </div>

          {/* Last Name */}
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='lname'>LastName</Label>
            <Input type='text' id='lname' placeholder='LastName' />
          </div>

          <Separator className={"col-span-2 xl:col-span-4 my-10"} />
          {/* Work */}
          <div className='xl:col-span-2 col-span-2'>
            <h3 className='font-semibold'>Your Work</h3>

            <p className='text-sm text-muted-foreground'>
              Add info about your position
            </p>
          </div>

          {/* Function */}
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='function'>Function</Label>
            <Input type='text' id='function' placeholder='Function' />
          </div>

          {/* Position */}
          <div className='grid w-full max-w-sm items-center gap-3'>
            <Label htmlFor='position'>Position</Label>
            <Input type='text' id='position' placeholder='Position' />
          </div>

          <div className='xl:col-start-4 col-start-2 xl:col-end-4 col-end-2 flex justify-end'>
            <Button type='submit'>Save</Button>
          </div>
        </form>
      </main>
    </motion.div>
  );
};

export default SettingsPage;
