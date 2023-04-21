import React from 'react'
import MainHeader from "../Mainheader/Mainheader"
import {Container,Row,Col, Button} from 'react-bootstrap'
import Form from 'react-bootstrap/Form';
import './UpdateForm.css'
import { useParams } from 'react-router';
import { useState,useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom';

const UpdateForm = () => {
  const {id}=useParams();
  //console.log(id)

  
  const[contactInfo,setContactInfo]=useState([])
  const[contactNewInfo,setContactNewInfo]=useState({
    contact:'',
    email:''
  })

  
  const [Status,setStatus]=useState([])

  const navigate = useNavigate();
  const [data,setdata]=useState({
    name:'',
    description:'',
    duration:'',
    priority:'',
    contacts:contactInfo
  })
   useEffect(()=>{
     axios
     .get("http://localhost:8080/api/v2/study/"+id)
     .then((res)=>{
       console.log("this is update data" ,res.data)
       setdata(res.data)
       setContactInfo(res.data.contacts)
       setStatus(res.data.status)
    }).catch(err=>console.log(err))
   },[])

   const updateSubmitHandler=(event)=>{
    event.preventDefault();
    axios
    .put("http://localhost:8080/api/v2/study/"+id,data)
    .then((res)=>{
      console.log("data save succefully-> " ,res)

      toast.success("Wow Study updated !");

      setTimeout(()=>navigate('/dashboard'),1000)

    }).catch((err)=>{console.log("data posting failed ->",err)})
   }
   const nameHandler=(event)=>{
    let item = event.target.value;

    if (item === "" || item.length < 4 || !isNaN(item) || item.length > 50) {
      toast.error("Fill Study Name Valid !");
    } 
    else {


      
    }
  }
  const descHandler=(event)=>{
    let item = event.target.value;
    if (item === "" || item.length < 50 || !isNaN(item) || item.length > 500) {
        toast.error("Fill description Valid !");
    }  
    else {
     
    }
  }
  const durationHandler=(event)=>{
    let item = event.target.value;
    if (item === "" || isNaN(item)) {
      toast.error("Fill  Valid duration !");
    }
  }
  return (
    <div>
    <MainHeader/>
     <Container className='mt-3'>
        <Row>
          <Col md={{ span: 6, offset: 3 }}  >
             <Form onSubmit={updateSubmitHandler}>
                <Form.Group className="mb-3">
                  <Form.Label>Name<span>&#42;</span></Form.Label>
                  <Form.Control type="text" name="name" value={data.name} onChange={e=> setdata({...data,name:e.target.value})} 
                 onBlur={nameHandler}
                 disabled={Status.id===3||Status.id===2?true:false}
                 placeholder="Enter Study --- e.g @covid" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                  <Form.Label>Description<span>&#42;</span></Form.Label>
                  <Form.Control as="textarea" rows={3} name="description" value={data.description} onChange={e=>setdata({...data,description:e.target.value})} onBlur={descHandler} placeholder="Enter your study description at least 50 character"/>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Duration<span>&#42;</span></Form.Label>
                  <Form.Control type="number" name="duration"onBlur={durationHandler} value={data.duration} onChange={e=>setdata({...data,duration:e.target.value})} placeholder="Enter your duration in days --- e.g @15days" />
                </Form.Group>
              
                <Form.Group className="mb-3">
                  <Form.Label>Priority<span>&#42;</span></Form.Label>
                  <select className="dropdown" name="priority" class="form-control" onChange={e=>setdata({...data,priority:e.target.value})} value={data.priority}>
                  <option value="">SelectPriority</option>
                  <option value="high">High</option>
                  <option value="low">Low</option>
                </select>
                </Form.Group>
                {contactInfo.map((d)=>{
                 return (
                  <div className="contactForm">

               <div className="mb-3 input">
                  <Form.Label> ContactNumber<span>&#42;</span></Form.Label>
                    <Form.Control
                      type="text"
                      className="form-control"
                      min="1"
                      name="contact"
                      onBlur={
                        e=>setContactNewInfo({...contactNewInfo, [e.target.name]: e.target.value })
                       } 
                      
                      value={d.contact}
                      placeholder="Enter your 10 digit contact number"
                    />
                </div>

                <div className="mb-3 input">
                  <Form.Label>Email<span>&#42;</span></Form.Label>
                    <Form.Control
                      type="email"
                      className="form-control"
                      value={d.email}
                      name="email"
                      onChange={
                        e=>setContactNewInfo({...contactNewInfo, [e.target.name]: e.target.value })
                       } 
                      placeholder="Enter your Email" 
                    />
                </div>

               <Button variant='info'className="addContactButton">ADD</Button>
              </div>
                  )}
                )}
                <Button variant="dark" type="submit" className='createStudybtn'>UPDATE</Button>
                <ToastContainer />
              </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default UpdateForm;