import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { allFormData, stepFormData } from '../types.ts'
import useMSF from '../hooks/useMSF.tsx'
import { Card, CardContent, CardHeader } from './ui/card.tsx'
import ProgressBar from './ProgressBar.tsx'
import PersonalInfoForm from './PersonalInfoForm.tsx'
import CompanyInfoForm from './CompanyInfoForm.tsx'
import BillingInfoForm from './BillingInfoForm.tsx'
import { Button } from './ui/button.tsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MultiStepForm = () => {
    const {
        currStep,
        formData,
        isFirst,
        isLast,
        steps,
        goToNextStep,
        goToPrevStep,
        getCurrentSchema
    } = useMSF()

    const {
        register,
        handleSubmit,
        formState: { errors },
        trigger,
        reset, setValue
    } = useForm<allFormData>({
        resolver: getCurrentSchema(),
        mode: "onChange",
        defaultValues: formData
    })

    useEffect(() => {
        reset(formData)
    }, [currStep, formData, reset])

    return (
        <div>
            <Card>
                <CardHeader>
                    {/* <ProgressBar currentStep={currStep} steps={steps} /> */}
                </CardHeader>

                <CardContent className="space-y-6">

                    {currStep === 0 && (
                        <PersonalInfoForm
                            register={register}
                            errors={errors}
                        />
                    )}

                    {currStep === 1 && (
                        <CompanyInfoForm register={register}
                            errors={errors} setValue={setValue} />
                    )}

                    {currStep === 2 && (
                        <BillingInfoForm register={register}
                            errors={errors} />
                    )}

                    <div className="flex justify-between">

                        <Button
                            type="button"
                            variant="outline"
                            disabled={isFirst}
                            onClick={goToPrevStep}
                        >
                            <ChevronLeft className="w-4 h-4 mr-1" />
                            Previous
                        </Button>

                        <Button type="button" onClick={isLast ? handleSubmit((data) => { console.log(data) }) : goToNextStep}>
                            {isLast ? "Submit" : "Next"}
                            {!isLast && <ChevronRight className="w-4 h-4 ml-1" />}
                        </Button>

                    </div>

                </CardContent>
            </Card>
        </div>
    )
}

export default MultiStepForm            