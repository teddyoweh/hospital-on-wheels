"use client"
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "../styles/reports.scss"
import { DocumentUpload } from "iconsax-react";
import { api, endpoints } from "../config/server";
function CreateReport(){
    return (
        <div className="createreport">

        </div>
    )
}
export default function Page() {
    const [modal, setModal] = useState(false);
    const [reports, setReports] = useState(null);
    async function getReports(){
        await api.post(endpoints.getReports,{
            email:"ifowe1@morgan.edu"
        } ).then((res)=>{
            console.log(res.data)

            setReports(res.data)
        }
        )
      }

      useEffect(() => {
        getReports()
      }, [])
    return <div className="report">
        <Sidebar/>
        <div className="report-content">
        <div className="top_">
            <label htmlFor="">
                Medical History / Reports
            </label>
            <div className="right">
                <div className="searchbox">
                    <i class='bx bx-search'></i>
                    <input type="text" placeholder="Search Reports ..." />
                </div>
                <div className="upload-btn">
                    <button
                    onClick={()=>setModal(true)}
                    >
                    <label htmlFor="">
                        Upload Report
                    </label>
                    </button>
                </div>
            </div>
        </div>
        <div className="render-reports">
        {
            reports && reports.map((report,index)=>(
                <div className="report-box" key={index}>
                  
                    <div className="right">
                        
                        <label htmlFor="">
                            {report.title}
                        </label>
                        <span>
                            Download
                        </span>
                    </div>
                </div>
            ))
        }
        </div>
        </div>
{modal==true &&<AIModal setModal={setModal}/>}
    </div>
}
function AIModal({setModal}){
    const [endText, setEndText] = useState(false);
    let recognition = null;
    const [transcript, setTranscript] = useState('');
    const [mic, setMic] = useState(false);
    const [chatHistory, setChatHistory] = useState([
   
    ]);
    const [loading, setLoading] = useState(false);
 
  
  
   return (
    <div className="aimodal">
      <div className="modal slide-up">
      <div className="top-report">
        <div className="input">
            <input type="text" placeholder="Report Name" />
            <div className="btn"
            onClick={()=>setModal(false)}
            >
                <i className="bx bx-x"></i>
            </div>
        </div>
        <div className="upload-box">
        <DocumentUpload size="72" color="#333"/>
        <input type="file" />
        <label htmlFor="">
            Upload Report
        </label>
        </div>
    </div>
    </div>
    </div>
   ) 
  }