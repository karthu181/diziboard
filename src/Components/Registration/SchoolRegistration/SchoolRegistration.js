import React from "react";
import "./SchoolRegistration.css"

const SchoolRegistration=()=>{
    return (
        <div className="school-reg-bg-container">
            <form className="school-reg-form-container">
                <h1 className="school-reg-heading">School Registration</h1>
                <label className="school-reg-each-label">
                    First Name
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Last Name
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Email Id
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    School Name
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Street Adress
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Website
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Suburb
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    State
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Postcode
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Title
                    <input type="text"/>
                    </label>
                    <br/>
                    <label className="school-reg-each-label">
                    Phone Number
                    <input type="text"/>
                    </label>
                    <br/>
                    <div>
                        <label>
                        <input type="checkbox"/>
                        I Agree to the terms and conditions
                        </label>
                    </div>
                    <div>
                        <button type="button">
                            Register
                        </button>
                    </div>
            </form>

        </div>
    )
}

export default SchoolRegistration