import React from 'react'
import './Dashboard.css'
import {Link} from 'react-router-dom'
import Mainheader from '../Mainheader/Mainheader'
import { useState,useEffect } from 'react'
import axios from 'axios'
import {Nav} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Dashboard = () => {
  
   const [data,setdata]=useState([])
   const navigate = useNavigate();
   const [condition,setContidion]=useState(false)
  // const [disableComplete,setDisableComplete]=useState(false)
   

   const getStudy=()=>{
         axios
     .get("http://localhost:8080/api/v2/study")
     .then((res)=>{
       console.log("this is data" ,res.data)
       setdata(res.data)
    });
   }
   useEffect(()=>{
         getStudy();
   },[])
         
   const deleteStudy=async id=>{
    axios.delete("http://localhost:8080/api/v2/study/"+id)
   .then(() =>{
    toast.info(" Study deleted !");
    getStudy()
    setTimeout(()=>navigate('/dashboard'),1000)
  });
}

const updateStatus=async id=>{
 
  setContidion(true)
  axios.put("http://localhost:8080/api/v2/study/status/"+id)
 .then(() =>{
  // toast.info(" Status updated !");
  getStudy()
  setTimeout(()=>navigate('/dashboard'),1000)
});
}

  return (
    <div>
 <Mainheader/>
<div className="container">
  <div className="row">
      <div className=" col">
          <table style={{width:900}} className="table table-bordered  tab  ">
            <thead>
              <tr>
                <th scope="col"></th>
                <th scope="col">Study</th>
                <th scope="col">Description</th>
                <th scope="col">Duration</th>
                <th scope="col">version</th>
                <th scope="col">Status</th>
                <th scope="col">CreationTime</th>
                <th colspan="2">Action</th>
                {/* <th scope="col"></th> */}
                
              </tr>
            </thead>
            <tbody>
            {data.map((study,i)=>(
               
                   <tr key={i}>
                    <td><li></li></td>
                    <td><Nav.Link href={`/updateform/${study.id}`}>{study.name}</Nav.Link></td>
                    <td>{study.description}</td>
                    <td>{study.duration}</td>
                    <td>{study.version}</td>
                    <td>{study.status.description}</td>
                    <td>
                     {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                .format(Date.parse(study.createdTS))}
                      </td>
                
                    <td>
                  
                  {
                    (condition||study.status.description==="Active"||study.status.description==="Complete") ? (
                      <Link class="btn btn-info"
                      onClick={()=>updateStatus(study.id)} 
                      >complete</Link>
                    ) : (
                      <Link class="btn btn-info"
                      onClick={()=>updateStatus(study.id)} 
                      >Active</Link>
                    )

                   
                  }
                    </td>
                    <td>{
                  (condition||study.status.description==="Active"||study.status.description==="Complete") ? (
                      ""
                    ) : (
                      <Link class="btn btn-danger" 
                      onClick={()=>deleteStudy(study.id)}
                      >Delete</Link>
                    )
                  }
                    </td>
                   </tr>
             ))}
             
              {/* {data.map((study)=>{
                const{name,description,duration,status,createdTS}=study;

                 let currentTimestamp = Date.now(createdTS)
                 let date = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
                .format(currentTimestamp)

                return <tr>
                <td><li></li></td>
                <td>{name}</td>
                <td>{description}</td>
                <td>{duration}days</td>
                <td>{status.description}</td>
                <td>{date}</td>
              </tr>
              })} */}
               
            </tbody>
      </table>
           </div>
                <div className='col'>
                <button type="button" className="btn btn-dark btndash">
                <Link class="nav-link" to="/studyform">CREATE NEW STUDY</Link>
                  </button>
                </div>
             </div>
  </div>
  <ToastContainer />
</div>
  )}
export default Dashboard;
