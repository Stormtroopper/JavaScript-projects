import React, { useState } from 'react'
import {  type Step, type stepFormData } from '../types'
import { Briefcase, CreditCard, User } from 'lucide-react';
import { stepResolver } from '../validators';

export const steps:Step[] = [{ id: "personal", name: "Personal Info", icon: User }, { id: "professional", name: "Professional Info", icon: Briefcase }, { id: "billing", name: "Billing Info", icon: CreditCard }]
const useMSF = () => {
    const [currStep,setCurrStep]=useState(0);
    const [formData,setFormData]=useState<Partial<stepFormData>>({});
    const [isSubmitted,setIsSubmitted]=useState(false);
    const isFirst=currStep===0;
    const isLast=currStep===steps.length-1;
    const getCurrentSchema=()=>stepResolver(currStep);
    const goToNextStep=()=>{
        if(!isLast)setCurrStep((prev)=>prev+1);
    }
    const goToPrevStep=()=>{
        if(!isFirst)setCurrStep(prev=>prev-1);
    }
    const updateFormData=(newdata:Partial<stepFormData>)=>{
        setFormData(prev=>({...prev,...newdata}));
    }
    const submitFormData=(data:stepFormData)=>{
        setIsSubmitted(true);
    }
    const resetForm=()=>{
        setFormData({});
        setCurrStep(0);
        setIsSubmitted(false);
    }
    return{currStep,formData,isFirst,isLast,isSubmitted,steps,goToNextStep,goToPrevStep,submitFormData,resetForm,getCurrentSchema,updateFormData};
}

export default useMSF;