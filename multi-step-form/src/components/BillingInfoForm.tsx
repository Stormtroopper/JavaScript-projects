import type { allFormData } from '../types'
import React from 'react'
import type { UseFormRegister } from 'react-hook-form'
import { CardTitle } from './ui/card'
import FormField from './ui/form-field'
type step3Props = {
  register: UseFormRegister<allFormData>
  errors: Record<string, { message?: string }>
}
const BillingInfoForm = ({ register, errors }: step3Props) => {
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>
        Billing Information
      </CardTitle>
      <div className="grid grid-cols-2 gap-4">
        <FormField id="cardNumber" label="Enter your card number" register={register} errors={errors} maxLength={16} />
        <FormField id="expiryDate" label="Expiry Date" register={register} type="date"errors={errors} maxLength={5} />
         <FormField id="cvv" label="CVV" register={register} errors={errors} maxLength={4} />
      </div>
    </div>
  )
}

export default BillingInfoForm