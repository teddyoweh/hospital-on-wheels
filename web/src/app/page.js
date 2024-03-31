"use client"
import Image from "next/image";
import { MapScreen } from "./components/Map";
import './styles/app.scss'
import { DirectInbox, Magicpen, Notification, Routing, TableDocument } from "iconsax-react";
import { useEffect, useState } from "react";
import { services } from "./data";
import axios from "axios";
import logo from './assets/logo.png'
import { api, endpoints } from "./config/server";
import Sidebar from "./components/Sidebar";
export default function Home() {
  const SidebarOptions = [
    { icon: Routing },
    { icon: DirectInbox },
    { icon: Notification },
    {icon:TableDocument}
  ];
  
  function RenderIcon({ icon: Icon, color }) {
    return <Icon size="21" color={color} />;
  }
  const [active, setActive] = useState(0);



  const [location, setLocation] = useState(null);
  const [activeService, setActiveService] = useState(null);
  const [activeNurse, setActiveNurse] = useState(null);
  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }
 
    const success = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    };

    const fail = () => {
      setError('Unable to retrieve your location');
      // You could fallback to IP-based location here if desired
    };

    navigator.geolocation.getCurrentPosition(success, fail);
  }, );

  const [showModal, setShowModal] = useState(false);
  const [nurses, setNurses] = useState(null);
  async function getNurses(){
    await api.post(endpoints.getNurses,{} ).then((res)=>{
      console.log(res.data)
      setNurses(res.data)
    }
    )
  }

  useEffect(() => {
    getNurses()
  }
  , []);
  return (

 
 <>
 

{location&& <MapScreen  nurses={nurses} center={location}/>}
 <div className="app">
 <Sidebar />
    <div className="infobox">
          <div className="top">
            
            <div className="searchbox">

            <i class='bx bx-search'></i>
            <input type="text" placeholder="Search Services ..." />
            </div>
            <div className="btn"
            onClick={()=>setShowModal(true)}
            >
            <Magicpen size="18" color="#333"/>
            <label htmlFor="">
              Ask AI
            </label>
            </div>
          </div>
          <div className="content">
            {
              services.map((service,index)=>(
                <div className={activeService==index?"service active":"service"} key={index}
                
                onClick={()=>setActiveService(index)}
                >
 
                    <label htmlFor="">
                      {service.field}
                    </label>
           {activeService==index &&   <span>
                {service.info}
              </span>}
   
                 </div>
              ))
            }
            
          </div>
    </div>
    {
activeService &&
 
    <div className="nurses">
      {
        nurses && nurses.map((nurse,index)=>{
          return (
            <div className="nurse">
            <div className="top">
              <div className="left">

    
              <img src={nurse.uimg} alt="" />
                <div className="details">
                  <label htmlFor="">
                 {nurse.name}
                  </label>
                  {/* <span>
                    Critical Care Nurse
                  </span> */}
                </div>
                </div>
                <div className="book-btn">
                  <button
                  onClick={()=>{
                    setActiveNurse(index)
                  
                  }}
                  
                  >
                   {activeNurse==index?"Complete Booking":"Book"}
                   <i class='bx bx-check'></i>
                  </button>
                { activeNurse==index&& <div className="btn"
                  onClick={()=>setActiveNurse(null)}
                  >
           {   activeNurse==index&&      <i class='bx bx-x'></i>}
                  </div>}

                </div>
            </div>
            <div className="bottom">
            <div className="sec">
                <label htmlFor="">
                  Specialty
                </label>
                <span>
                  {nurse.specialty}
                </span>
              </div>
              <div className="sec">
                <label htmlFor="">
                  Location
                </label>
                <span>
                {nurse.location}
                </span>
              </div>
              <div className="sec">
                <label htmlFor="">
                  Last Active
                </label>
                <span>
                  2 weeks ago.
                </span>
              </div>
            </div>
            {
              activeNurse==index &&
     
            <div className="calendar">
                <div className="date">
                  <div className="btn">
                  <i class='bx bx-chevron-left'></i>                  </div>
                  <div className="yearm">
                    <label htmlFor="">
                      March / 20224
                    </label>
                  </div>
                  <div className="btn">
                  <i class='bx bx-chevron-right'></i>                  </div>
                </div>
                <div className="days">
                  {
                    [...Array(31)].map((day,index)=>{
                      return (
                        <div className="day">
                          <label htmlFor="">
                            {index+1}
                          </label>
                        </div>
                      )
                    })
                  }
                </div>
            </div>
                   }
    
          </div>
          )
        }
        )
      
      }
  

    </div>
       }
 </div>
{showModal && <AIModal setModal={setShowModal} />}
 </>
  );
}


function AIModal({setModal}){
  const [endText, setEndText] = useState(false);
  let recognition = null;
  const [transcript, setTranscript] = useState('');
  const [mic, setMic] = useState(false);
  const [chatHistory, setChatHistory] = useState([
 
  ]);
  const [loading, setLoading] = useState(false);
async function sendText(){  
  setChatHistory((prev)=>[...prev,{message:transcript,who:'user'}])
  setLoading(true)
  await api.post(endpoints.chatBase,{
    message:transcript
  }).then((res)=>{
    console.log(res.data)
    setChatHistory((prev)=>[...prev,{...res.data,message:res.data.summary}])
    setTranscript('')
    setLoading(false)
  }
  )
}

  async function chaageMic(){
    if(mic){
      stopRecognition()
      setMic(false)
 
    
    }
    else{
      startRecognition()
      setMic(true)
 
    }
  }
  if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
 
    recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

 
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      const last = event.results.length - 1;
      const text = event.results[last][0].transcript;
      console.log('Confidence: ' + event.results[0][0].confidence);
      console.log(text)
      setTranscript((prev)=>prev+" "+text)
      
  
    };

    recognition.onend = () => {
      if (endText==false) {
        recognition.start();
      }

    };
  } else {
     console.error('SpeechRecognition is not supported in this browser');
  }

  const startRecognition = () => {

    recognition.start();
  };

  const stopRecognition =  () => {
    setEndText(true)
    recognition.stop();
    // setLoading(true)
    // await axios.post(endpoints.audio_record, {text:transcript}).then((res)=>{
    //  setAudiourl(`${ip+'/'+res.data.filename}`)
    //  setData((prev)=>[...prev,{title:res.data.title,answer:res.data.answer}])
    //   setAitalking(true)
    //   setTranscript('')
    //   setLoading(false)
    // }
    // )

  
  };
 return (
  <div className="aimodal">
    <div className="modal slide-up">
    <div className="top">
<div className="head">
<div className="left">
<Image src={logo.src} width={40} height={40} alt="logo" />

<label htmlFor="">
  Talk to AI.
  </label>

</div>
<div className="right">
  <div className="btn"
  onClick={()=>setModal(false)}
  
  >
  <i class='bx bx-x'></i>
  </div>

</div>
</div>
<div className="content">
  {
    chatHistory.map((chat,index)=>{
      return (
        <div className={chat.who=='user'?"chat user":"chat bot"} key={index}>
          <label htmlFor="">
            {chat.message}
          </label>
          {
            chat.who=="bot" &&
            <audio src={chat.audioUrl} controls autoPlay></audio>
          }
        </div>

      )
    }
    )
  }
  {
    loading&&
    <div className="chat bot">
      <label htmlFor="">
       Generating response ...
      </label>
   
    </div>
  
  }

</div>

    </div>
    <div className="bottom">
      <div className="message-box">
        <div className="left">
          <div className="btn"
                  onClick={()=>chaageMic()}
          >
            
{mic?<div className="stop"></div>:          <i class='bx bx-microphone'/>}

 
          </div>
      
        <input type="text"
        value={transcript}
        onChange={(e)=>setTranscript(e.target.value)}
        placeholder="Type your message here ..."
        />
        </div>
    
        <div className="right">
          <div className="btn"
          onClick={()=>sendText()}
          >
          <i class='bx bx-paper-plane'></i>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
 ) 
}