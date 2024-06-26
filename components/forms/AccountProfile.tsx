'use client'

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { useForm } from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod'
import { UserValidation } from '@/lib/validations/user';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { z } from 'zod';
import Image from 'next/image';
import { ChangeEvent } from 'react';
import { Textarea } from '../ui/textarea';
interface Props {
  
    user : {
        id: string,
        objectId : string,
        username : string,
        name : string,
        bio : string,
        image : string
    };
    btnTitle : String
}

const AccountProfile = ({user, btnTitle}:Props) => {
  const form = useForm({
    resolver   : zodResolver(UserValidation),
    defaultValues: {
      profile_photo : user?.image ||'',
      name : user?.name || '',
      username : user?.username||'',
      bio : user?.bio ||''
    }
  });


  function onSubmit(values: z.infer<typeof UserValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

 const handleImage = (e : ChangeEvent, fieldChange : (value : string)=> void)=>{
    e.preventDefault();
 }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} 
       className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="profile_photo"
          render={({ field }) => (
            <FormItem className=' flex items-center gap-4'>
              <FormLabel className='account-form_image-label'>
                {
                  field.value ?(
                  <Image
                   src={field.value}
                   alt='profile photo'
                   width={96} 
                   height={96}
                   priority
                   className='rounded-full object-contain'/>
                ) : (
                  <Image 
                   src='/assets/profile.svg'
                   alt='profile photo'
                   width={96}
                   height={96}
                   className='rounded-full object-contain'/>
                )}
  
              </FormLabel>
              <FormControl className=' flex-1 text-base-semibold text-gray-200'>
                {/* <Input className='account-form_image-input' type ='file' accept='image/*' placeholder='Profile photo' onChange={(e)=> handleImage(e, field.onChange)} {...field} /> */}
                <Input {...field} className='account-form_image-input' type='text' accept='image/*' placeholder='Profile photo' onChange={(e) => handleImage(e, field.onChange)} />      
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className='flex gap-3 w-full flex-col'>
              <FormLabel className=' text-base-semibold text-light-2'>
                Name
              </FormLabel>
              <FormControl className=' '>
                <Input className='account-form_input no-focus text-light-1' type ='text'  placeholder='your name '  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem className=' flex gap-3 w-full flex-col'>
              <FormLabel className=' text-base-semibold text-light-2'>
                Username
              </FormLabel>
              <FormControl className=' '>
                <Input className='account-form_input no-focus' type ='text'  placeholder='Username  '  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

      <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem className=' flex gap-3 w-full flex-col'>
              <FormLabel className=' text-base-semibold text-light-2'>
                Bio
              </FormLabel>
              <FormControl className='  '>
                <Textarea className='account-form_input no-focus' 
                rows={10}
                placeholder='bio  '  {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className=' bg-primary-500 ' type="submit">Submit</Button>
      </form>
    </Form>
  )
}

export default AccountProfile