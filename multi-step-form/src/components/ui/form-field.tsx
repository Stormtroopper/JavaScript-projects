import type { allFormData } from "@types"
import type { FieldErrors, Path, UseFormRegister } from "react-hook-form"
import { Input } from "./input";
import { Label } from "./label";

type FormFieldProps = {
    id: Path<allFormData>
    register: UseFormRegister<allFormData>
    errors: FieldErrors<allFormData>
    type?: string
    label: string
    maxLength?: number
}
const FormField = ({  id, register, label, errors, type, maxLength }: FormFieldProps) => {
    
    return <>
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <Input id={id} maxLength={maxLength} type={type} {...register(id)} />
            {errors[id] && (<p className="text-sm-destructive text-red-500">{errors[id]?.message}</p>)}
        </div>
    </>
}
export default FormField;