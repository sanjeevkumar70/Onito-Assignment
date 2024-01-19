import "./form-data.css";
import React, { useState } from 'react';
import AddressDetalil from "./address-form/AddressDetail";
import PersonalDetail from "./personal-form/PersonalDetail";

const FormComponent: React.FC = () => {
    const [currentStep, setCurrentStep] = useState<number>(0);

    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
        console.log("currentStep");
    };
    const steps = [
        <PersonalDetail onNext={handleNext} />,
        <AddressDetalil onNext={handleNext} />,
    ];

    return (
        <>
            <div className='personal_form_box'>
                {steps[currentStep]}
            </div>
        </>

    );
};

export default FormComponent;


