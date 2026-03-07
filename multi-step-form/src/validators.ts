import type { Resolver } from "react-hook-form"
import {
  validatePersonalInfoData,
  validateProfessionalInfoData,
  validateBillingInfoData
} from "./types"

export const stepResolver =
  (currStep: number): Resolver<any> =>
  async (values) => {

    let result

    if (currStep === 0) {
      result = validatePersonalInfoData(values)
    }

    if (currStep === 1) {
      result = validateProfessionalInfoData(values)
    }

    if (currStep === 2) {
      result = validateBillingInfoData(values)
    }

    if (result?.success) {
      return {
        values,
        errors: {}
      }
    }

    const formattedErrors: any = {}

    Object.entries(result?.errors || {}).forEach(([key, message]) => {
      formattedErrors[key] = {
        type: "manual",
        message
      }
    })

    return {
      values: {},
      errors: formattedErrors
    }
  }