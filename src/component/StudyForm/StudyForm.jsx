import React, { useState } from "react";
import Mainheader from "../Mainheader/Mainheader";
import "./StudyForm.css";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const StudyForm = () => {
  const [nameError,setNameError] = useState(false);
  const [descError,setDescError] = useState(false);
  const [durationError, setDurationError] = useState(false);
  const [mobileNumberError, setMobileNumberError] = useState(false);
  const [emailidError, setEmailIdError] = useState(false);
  const [name,setName] = useState("");
  const [description,setDescription] = useState("");
  const [duration,setDuration] = useState("");
  const [priority,setPriority] = useState("");
  const [contactArray, setContactArray] = useState([]);
  const [addcount,setAddCount]=useState([])
  const [disable,setDisable]=useState(true)

  const [contactInfo, setContactInfo] = useState({
     contact:"",
     email:"",
     });

  const navigate = useNavigate();

  let {contact,email} = contactInfo;

  //--studyFormHandler---
   const studyFormHandler=(event) =>{
    event.preventDefault();
    if (
      name.length < 3 ||
      description.length > 500 ||description.length<50||
      duration.length <0||
      priority===""
    ) 
    {
      toast.error("Please Fill Valid Details !");
    } 

    else {
         axios
        .post("http://localhost:8080/api/v2/study",{
            name:name,
            description:description,
            priority:priority,
            duration:duration,
            contacts:contactArray
        })
        .then((res)=>{
          console.log("data save succefully-> " ,res)

          toast.success("Wow Study Created !");

          setTimeout(()=>navigate('/dashboard'),1000)

        }).catch((err)=>{console.log("data posting failed ->",err)})

       setName("")
       setDescription("")
       setDuration("")
       setPriority("")
       event.target.reset();

    }
  }

  //--nameHandler--
  const nameHandler=(event)=>{
    let item = event.target.value;

    if (item === "" || item.length < 4 || !isNaN(item) || item.length > 50) {
      setNameError(true);
    } 
    else {
      setNameError(false);
    }
       setName(item);
  }

  //--descriptionHandler
  const descHandler=(event)=>{
    let item = event.target.value;
    if (item === "" || item.length < 50 || !isNaN(item) || item.length > 500) {
      setDescError(true);
    } 
    else {
      setDescError(false);
    }
    setDescription(item);
  }

  //--durationHandler--
  const durationHandler=(event)=>{
    let item = event.target.value;

    if (item === "" || isNaN(item)) {
      setDurationError(true);
    }
     else {
      setDurationError(false);
    }
    setDuration(item);
  }

  //--priorityHandler--
  const handlepriority=(event)=>{
    setPriority(event.target.value);
  }


  const mobileNumberHandler=(event)=>{
      let item=event.target.value;
      if(item==="")
      {
        setMobileNumberError(true)
      }
      else
      {
        setMobileNumberError(false)
      }
  }

  const emailIdHandler=(event)=>{
    let item=event.target.value;
    if(item==="")
    {
      setEmailIdError(true)
    }
    else
    {
      setEmailIdError(false)
    }
}
  // const addNewContactHandler=(e)=>{
   
  //   e.preventDefault()
  //   return setAddCount([...addcount,1])

  // }

  const removeNewContactHandler=(i)=>{
     const delval=[...addcount]
     delval.splice(i,1)
     setAddCount(delval);
  }

  const newContactDataHandler=(e)=>{
       e.preventDefault()
       if (contact.length > 10 || !isValidEmail(email) || contact.length < 10) {
        toast.warn("Please Fill Valid Contact details !!");
      }
      //  if (contact.length===0||email.length===0) {
      //   toast.error("Please Fill Valid Contact details !!");
      // }
      else{
        setContactArray([...contactArray,{contact,email}]);
        return setAddCount([...addcount,1])
      }
  }
  const changeHandler = (e) => {
          
        if(e.target.value==="")
        {
          setDisable(true)
        }
           
        else{
          setDisable(false)
          setContactInfo({...contactInfo, [e.target.name]: e.target.value });
        }
       
     };
     console.log("contactarr", contactArray);
     console.log("contactinfo", contactInfo);

    function isValidEmail(email) {
      return /\S+@\S+\.\S+/.test(email);
    }
  return (
    <div>
      <Mainheader />
      <form onSubmit={studyFormHandler}>
        <div className="container col-md-6">
          <div className="row rdiv">
            <div className="col">
              <div className="mb-3 input">
                <label for="Input1" className="label mb-3">
                  Name<span>&#42;</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="username"
                  onChange={nameHandler}
                  onBlur={nameHandler}
                  placeholder="Enter your name"
                  value={name}
                />
                {nameError ? (
                  <div className="alert alert-danger" role="alert">
                    Please Enter Valid Name!
                </div>
                ) : (
                  ""
                )}
              </div>
              <div lassName="mb-3 input">
                <label for="Textarea" className="label mb-3">
                  Descripation<span>&#42;</span>
                </label>
                <textarea
                  className="form-control"
                  name="description"
                  rows="3"
                  onChange={descHandler}
                  onBlur={descHandler}
                  placeholder="Enter your study description at least 50 character"
                  value={description}
                ></textarea>
                {descError ? (
                   <div className="alert alert-danger" role="alert">
                        Add Description More than 50 Character!
                 </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3 input">
                <label for="Input1" className="label mb-3">
                  Duration<span>&#42;</span>
                </label>
                    <input
                          type="number"
                          min='15'
                          name="duration"
                          className="form-control"
                          onChange={durationHandler}
                          onBlur={durationHandler}
                          placeholder="Enter your duration in days e.g @15days"
                          value={duration}
                     />
                {durationError ? (
                 <div className="alert alert-danger" role="alert">
                    Add Duration more Than 15 days
                </div>
                ) : (
                  ""
                )}
              </div>
              <div className="mb-3 input">
                <label for="drowdown" className="label mb-3">
                  Priority<span>&#42;</span>
                </label>
                <select
                  className="dropdown"
                  name="priority"
                  class="form-control"
                  onChange={handlepriority}
                  value={priority}
                >
                  <option>--Select-Priority--</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
              </div>
              {/* <button
                type="button"
                className="btn btn-info addContactButton"
                // onClick={addNewContactHandler}
                value="add"
                id="addContactButton"
              >
                ADDCONTACT
              </button> */}
              {/* ContactForm */}
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
                        name="contact"
                        value={contactInfo.contactnumber}
                        onChange={changeHandler}
                        onBlur={mobileNumberHandler}
                      />
                      {mobileNumberError ? (
                  <div className="alert alert-danger" role="alert">
                    Please Enter  valid 10 digit mobile number !
                </div>
                ) : (
                  ""
                )}
                    </div>
                    <div className="mb-3 input">
                      <label for="number" className="label mb-3">
                        Email<span>&#42;</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="abc@gmail.com"
                        name="email"
                       // value={contactInfo.email}
                        onChange={changeHandler}
                        onBlur={emailIdHandler}
                      />
                       {emailidError ? (
                          <div className="alert alert-danger" role="alert">
                            Please Enter valid Email id !
                          </div>
                ) : (
                  ""
                )}
                    </div>
                    <button
                          type="button"
                          className="btn btn-info"
                          onClick={newContactDataHandler}
                          disabled={disable}
                    >
                   ADD
                   </button>

                  </div>
             
             {/* contactForm re-rending code */}
              {
              addcount.map(()=>{
                   return (
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
                        name="contact"
                        onChange={changeHandler}
                        onBlur={mobileNumberHandler}
                      />
                       {mobileNumberError ? (
                  <div className="alert alert-danger" role="alert">
                    Please Enter  valid 10 digit mobile number !
                </div>
                ) : (
                  ""
                )}
                    </div>
                    <div className="mb-3 input">
                      <label for="number" className="label mb-3">
                        Email<span>&#42;</span>
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter your Email"
                        name="email"
                        onChange={changeHandler}
                        onBlur={emailIdHandler}
                      />
                  {emailidError ? (
                          <div className="alert alert-danger" role="alert">
                            Please Enter valid Email id !
                          </div>
                ) : (
                  ""
                )}
                    </div>
                    <button
                          type="button"
                          className="btn btn-info"
                          onClick={removeNewContactHandler}
                    >
                   REMOVE
                   </button>
                   <button
                          type="button"
                          className="btn btn-info addContactButton"
                          onClick={newContactDataHandler}
                          disabled={disable}
                    >
                   ADD
                   </button>
                  </div>
                   )
              })
            }
            <button type="submit" className="btn btn-dark createStudyButton">
                CREATE
              </button>
              <ToastContainer />
          </div>
        </div>
        </div>
      </form>
    </div>
  );
};
export default StudyForm;
