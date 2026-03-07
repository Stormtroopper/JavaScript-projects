import type { allFormData, stepFormData } from '@types'
import React, { useState } from 'react'
import type { useForm, UseFormRegister } from 'react-hook-form'
import { CardTitle } from './ui/card'
import FormField from './ui/form-field'
import { Label } from './ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select'
type Step2Props = {
  register: UseFormRegister<allFormData>
  errors: Record<string, { message?: string }>
  setValue?: ReturnType<typeof useForm<allFormData>>['setValue']
}
const CompanyInfoForm = ({ register, errors, setValue }: Step2Props) => {
  const [exp, setExp] = useState('');
  return (
    <div className='space-y-4'>
      <CardTitle className='text-xl'>
        Personal Information
      </CardTitle>
      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="company"
          label="Company"
          register={register}
          errors={errors}
          maxLength={50}
        />

        <FormField
          id="position"
          label="Position"
          register={register}
          errors={errors}
          maxLength={50}
        />
        <div className='space-y-2'>
          <Label htmlFor='experience'>
            Years of Experience
          </Label>
          <Select onValueChange={(val) => {
            setValue?.("experience", val as Extract<stepFormData, { experience: string }>['experience'], { shouldValidate: true }); setExp(val);
          }} value={exp}>
            <SelectTrigger>
              <SelectValue placeholder="Enter your experience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0-2">0-2</SelectItem>
              <SelectItem value="3-5">3-5</SelectItem>
              <SelectItem value="6-10">6-10</SelectItem>
              <SelectItem value="10+">10+</SelectItem>

            </SelectContent>
          </Select>
          {errors.experience && (<p className='text-sm text-destructive'>{errors.experience.message}</p>)}
          <FormField id='industry' label="Industry Baby" register={register} errors={errors} />
        </div>
      </div>

    </div>
  )
}

export default CompanyInfoForm