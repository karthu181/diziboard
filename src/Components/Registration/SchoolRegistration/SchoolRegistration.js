import React from "react";
import "./SchoolRegistration.css"

const SchoolRegistration = () => {

    const inputsArr = [,
    {label:"First Name", inputType:"input"},
    {label:"Last Name", inputType:"input"},
    {label:"Email Id", inputType:"input"},
    {label:"School Name", inputType:"input"},
    {label:"Street Adress", inputType:"textArea"},
    {label:"Website", inputType:"input"},
    {label:"Suburb", inputType:"input"},
    {label:"State", inputType:"input"},
    {label:"Post Code", inputType:"input"},
    {label:"Title", inputType:"input"},
    {label:"Phone Number", inputType:"input"},
     ]

    return (
        <div className="school-reg-bg-container">
            <form className="school-reg-form-container">
                <h1 className="school-reg-heading">School Registration</h1>
                {inputsArr.map((eachInput) => {
                    return (
                        <div className="d-flex flex-row justify-content-between align-items-center">
                            <label className="school-reg-each-label">
                                {eachInput.label}
                                {eachInput.inputType==="input"?
                                <input type="text" />: <textarea/>}
                            </label>
                            <br />
                        </div>

                    )
                })}
                <div className="d-flex flex-row justify-content-end align-items-center">
                    <label>
                        <input className="me-2" type="checkbox" />
                        I Agree to the terms and conditions
                    </label>
                </div>
                <div className="d-flex flex-row justify-content-end align-items-center mb-3">
                    <button type="button">
                        Register
                    </button>
                </div>
            </form>

        </div>
    )
}

export default SchoolRegistration