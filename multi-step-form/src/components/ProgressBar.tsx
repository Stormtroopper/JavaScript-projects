import type { Step } from '@types'
import React from 'react'
type ProgressBarProps = {
    currentStep: number,
    steps: Step[]
}
const ProgressBar = ({ currentStep, steps }:
    ProgressBarProps) => {
    return (
        <div>ProgressBar</div>
    )
}

export default ProgressBar