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
 
 

    const [booking, setBooking] = useState(null);
      async function getBooking(){
        await api.post(endpoints.getBooking,{
            email:"ifowe1@morgan.edu"
        } ).then((res)=>{
            console.log(res.data)
            // alert(res.data[0].name)
            setBooking(res.data[0])
            // setBooking(JSON.parse(res.data[0]))
        }
        )
      }

    useEffect(() => {
     getBooking()
      },[])
    return booking &&
    <div className="report">
        <Sidebar/>
        <div className="report-content">
        <div className="top_">
            <label htmlFor="">
                Nurses
            </label>
        </div>
        <div className="booking-page">
            {
                booking==null?
                <div className="empty-booking">
                    <label htmlFor="">
                        No Booking Found
                    </label>
                </div>
                :
                <div className="bok">
                    <div className="booking-section">
                    <div className="top">
                        <div className="left">
                            <img src="https://www.teddyoweh.net/_next/static/media/oweh.43ffe13c.jpeg" alt="" />
                            <label htmlFor="">
                               {booking.name}
                            </label>
                        </div>
                        
                    </div>
                    <div className="mid">
                        <div className="sec">
                            <label htmlFor="">
                                Date
                            </label>
                            <span>
                                Monday 23rd May, 2024
                            </span> 
                        </div>
                        <div className="sec">
                            <label htmlFor="">
                                Address
                            </label>
                            <span>
                                College of Engineering, Howard University
                            </span> 
                        </div>
                        <div className="sec">
                            <label htmlFor="">
                                Time
                            </label>
                            <span>
                               2:00PM
                            </span> 
                        </div>
                    </div>
                    <div className="mid">
                        <div className="sec">
                            <label htmlFor="">
                                Reason
                            </label>
                            <span>
                                {booking.issue}
                            </span> 
                        </div>
                     
                    </div>
                    </div>
                    <div className="checklist">
                        <div className="title">
                            <label htmlFor="
                            ">
                                Checklist
                            </label>
                      
                        </div>
                        <div className="body">
                        {booking?.checklist?.map((item,index)=>{
                                return (
                                    <div className="check" key={index}>
                                        <label htmlFor="">
                                            Check {item}
                                        </label>
                                        <input type="checkbox" />
                                    </div>
                                )
                            })}
                        </div>

                    </div>
                </div>
                

            }
        </div>
        </div>
        </div>
}