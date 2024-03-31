"use client"
import Image from "next/image";
import { MapScreen } from "../components/Map";
import '../styles/app.scss'
import { DirectInbox, Magicpen, Notification, Routing, TableDocument } from "iconsax-react";
import { useEffect, useState } from "react";
import { services } from "../data";
import axios from "axios";
import logo from '../assets/logo.png'
import { api, endpoints } from "../config/server";
import Link from "next/link";
import { usePathname } from "next/navigation";
export default function Sidebar() {
    const SidebarOptions = [
        { icon: Routing,link:"/" },
        { icon: DirectInbox,link:"/inbox" },
        { icon: Notification,link:"/notification" },
        {icon:TableDocument,link:"/report"}
      ];
      
      function RenderIcon({ icon: Icon, color }) {
        return <Icon size="21" color={color} />;
      }
      const pathname = usePathname()
    
    
    
    return (
        <div className="sidebar">
        <div className="top">
      <div className="logo">
        <Image src={logo.src} width={40} height={40} alt="logo" />
      </div>
        <div className="options">
          {SidebarOptions.map((option, index) => (
            <Link href={option.link} className={pathname==option.link?"option active":"option"} key={index}>
              <RenderIcon icon={option.icon} color={pathname==option.link?"#fff":"#333"} />
  
            </Link>
          ))}
        </div>
        </div>
        <div className="bottom">
          <div className="option">
            <img src="https://www.teddyoweh.net/_next/static/media/oweh.43ffe13c.jpeg"/>
          </div>
        </div>
  
      </div>
    )
}