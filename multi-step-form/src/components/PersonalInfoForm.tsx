import React from 'react'
import { CardTitle } from './ui/card'
import FormField from './ui/form-field'
import type {  UseFormRegister } from 'react-hook-form'
import type { allFormData,  } from '@types'
type StepProps = {
  register: UseFormRegister<allFormData>
  errors: Record<string, { message?: string }>
}
const PersonalInfoForm = ({ register, errors }: StepProps) => {
  
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>
        Personal Information
      </CardTitle>
      <div className="grid grid-cols-2 gap-4">
   <FormField
          id="firstName"
          label="First Name"
          register={register}
          errors={errors}
          maxLength={50}
        />

        <FormField
          id="lastName"
          label="Last Name"
          register={register}
          errors={errors}
          maxLength={50}
        />

        <FormField
          id="email"
          label="Email"
          type="email"
          register={register}
          errors={errors}
          maxLength={100}
        />

        <FormField
          id="phone"
          label="Phone Number"
          type="tel"
          register={register}
          errors={errors}
          maxLength={10}
        />

      </div>
    </div>
  )
}

export default PersonalInfoForm