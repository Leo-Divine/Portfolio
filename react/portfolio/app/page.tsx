'use client'

import Image from "next/image";
import { ReactNode, useState } from "react";

class Window {
  name: string;
  constructor(name: string) {
    this.name = name;
  }
}

export default function Home() {
  return (
    <>
      <IconGrid/>
      <HomePage/>
    </>
  );
}

function IconGrid() {
  return (
    <div id="iconGrid">
      <div className="icon red">
        <i className="fa-solid fa-house"></i>
      </div>
      <div className="icon blue">
        <i className="fa-solid fa-user"></i>
      </div>
      <div className="icon green">
        <i className="fa-solid fa-paintbrush"></i>
      </div>
      <div className="icon purple">
        <i className="fa-solid fa-medal"></i>
      </div>
      <div className="icon blue">
        <i className="fa-solid fa-phone"></i>
      </div>
    </div>
  );
}

function HomePage() {
  const [position, setPosition] = useState({
    top: 0,
    left: 0
  });
  const [offset, setOffset] = useState({
    x: 0,
    y: 0
  });
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = (event: any) => {
    if(!isDragging) { return; }
    setPosition({
      top: event.clientY,
      left: event.clientX
    });
  };

  const handleMouseDown = (event: any) => {
    console.log(typeof(event));
    setOffset({
      x: event.offsetX,
      y: event.offsetY
    });
    setIsDragging(true);
  }

  return (
    <div id="Home" className="window w-60 h-60" style={position}>
      <div className="topBar" onMouseMove={handleDrag} onMouseDown={handleMouseDown}>
        <h3>Home</h3>
        <div className="topBarX">(X)</div>
      </div>
      <div className="windowPage">
        <h1 className="centeredText">Hey there, I'm Austin!</h1>
        <br/>
        <p>I make cool projects.</p>
        <p>Click on the apps to check them out!</p>
        <p>Have fun exploring my desktop!</p>
      </div>
    </div>
  );
}