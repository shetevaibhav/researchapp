import React from 'react'
import { createContext } from 'react'
import { useState } from 'react'
import './ContactForm.css'
//import StudyForm from '../StudyForm/StudyForm'



const contactContext=createContext()

const ContactForm = () => {
 
  let helper;
  
  const[contactData,setContactData]=useState({
      mobileNumber:"",
      emailId:""
  })

  const onChangeContactHandler=(event)=>{

        setContactData((prev)=>{

          helper={...prev}
          helper[`${event.target.name}`] = event.target.value;
          return helper
        })

  }
  console.log(contactData)

  return (
    <contactContext.Provider value={contactData}>
    <div>
          <div className="contactForm">
                    <div className="mb-3 input">
                      <label for="number" className="label mb-3">
                        ContactNumber<span>&#42;</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        min="1"
                        placeholder="Enter your 10 digit contact number"
                        name="mobileNumber"
                        value={contactData.mobileNumber}
                        onChange={onChangeContactHandler}
                      />
                    </div>
                    <div className="mb-3 input">
                      <label for="number" className="label mb-3">
                        Email<span>&#42;</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your Email"
                        name="emailId"
                        value={contactData.emailId}
                        onChange={onChangeContactHandler}
                      />
                    </div>
            </div>
            {/* <StudyForm/> */}
    </div>
    </contactContext.Provider>
  )
}
export default ContactForm