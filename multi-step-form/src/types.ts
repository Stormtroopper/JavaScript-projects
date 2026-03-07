interface PersonalInfoData {
    firstName: string,
    lastName: string,
    email: string,
    phone: string
}
interface ProfessionalInfoData {
    company: string,
    position: string,
    experience: "0-2"| "3-5"| "6-10"| "10+"
    industry:string
}
interface BillingInfoData{
    cardNumber:string,
    cardHolder:string,
    expiryDate:string,
    cvv:number
}
const getCurrDate=new Date();

export const validatePersonalInfoData = (data: PersonalInfoData) => {
    const errors: Record<string, string> = {}

    if (!data.firstName || data.firstName.trim().length < 1) {
        errors.firstName = "First Name is required"
    }

    if (!data.lastName || data.lastName.trim().length < 1) {
        errors.lastName = "Last name is required"
    }

    if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
        errors.email = "Invalid email address"
    }

    if (!data.phone || data.phone.length < 10) {
        errors.phone = "Phone number is too short"
    }

    return {
        success: Object.keys(errors).length === 0,
        errors
    }
}
export const validateProfessionalInfoData=(data:ProfessionalInfoData)=>{
 const errors: Record<string, string> = {}

  if (!data.company || data.company.trim().length < 1) {
    errors.company = "Company is required"
  }

  if (!data.position || data.position.trim().length < 1) {
    errors.position = "Position is required"
  }

  const validExperience = ["0-2", "3-5", "6-10", "10+"]
  if (!validExperience.includes(data.experience)) {
    errors.experience = "Invalid experience value"
  }

  if (!data.industry || data.industry.trim().length < 1) {
    errors.industry = "Industry is required"
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  }
}
export const validateBillingInfoData=(data:BillingInfoData)=>{
const errors: Record<string, string> = {}

  if (!data.cardNumber || data.cardNumber.length !== 16) {
    errors.cardNumber = "Card number must be 16 digits"
  }

  if (!data.cardHolder || data.cardHolder.trim().length < 1) {
    errors.cardHolder = "Cardholder name is required"
  }

  if (!data.expiryDate || data.expiryDate.length < 4 || data.expiryDate<getCurrDate.toDateString()) {
    errors.expiryDate = "Invalid expiry date"
  }

  return {
    success: Object.keys(errors).length === 0,
    errors
  }
}
export type validBillingInfo=typeof validatePersonalInfoData;
export type validProfessionalInfoData=typeof validateProfessionalInfoData;
export type validBillingInfoData=typeof validateBillingInfoData;
export type stepFormData=validBillingInfo|validProfessionalInfoData|validProfessionalInfoData;
export type allFormData=PersonalInfoData&ProfessionalInfoData
&BillingInfoData;
export interface Step{
  id:string,
  name:string,
  icon:React.ComponentType<{className?:string}>;
}