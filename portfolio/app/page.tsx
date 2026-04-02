'use client'

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faUser, faMedal, faPaintBrush, faPhone, faCaretDown } from '@fortawesome/free-solid-svg-icons';

class Window {
  name: string;
  isOpen: boolean;
  position: {
    left: number;
    top: number;
  };
  offset: {
    xPos: number;
    yPos: number;
  };
  zIndex: number;
  size: {
    width: number;
    height: number;
  };

  constructor(name: string, startPosition: {left: number; top: number;}, size: {width: number; height: number;}, isOpen?: boolean) {
    this.name = name;
    this.isOpen = isOpen !== undefined ? isOpen : false;
    this.position = startPosition;
    this.offset = {
      xPos: 0,
      yPos: 0
    };
    this.zIndex = 0;
    this.size = size;
  };
}

export default function Home(this: any) {
  const [homeWindow, setHomeWindow] = useState(new Window("Home", {left: 50, top: 120}, {width: 60, height: 60}, true));
  const [aboutWindow, setAboutWindow] = useState(new Window("About", {left: 50, top: 120}, {width: 45, height: 60}));
  const [projectsWindow, setProjectsWindow] = useState(new Window("Projects", {left: 50, top: 120}, {width: 50, height: 55}));
  const [awardsWindow, setAwardsWindow] = useState(new Window("Awards", {left: 50, top: 120}, {width: 45, height: 60}));
  const [contactWindow, setContactWindow] = useState(new Window("Contact", {left: 50, top: 120}, {width: 45, height: 55}));
  const [currentWindow, setCurrentWindow] = useState("");
  const [windowZIndex, setWindowZIndex] = useState(0);

  useEffect(() => {
    setHomeWindow({
      ...homeWindow,
      position: {
        left: globalThis.window.innerWidth < 768 ? 0 : globalThis.window.innerWidth / 2 - globalThis.window.innerWidth * 0.6 / 2, 
        top: globalThis.window.innerWidth < 768 ? 0 : globalThis.window.innerHeight / 2 - globalThis.window.innerHeight * 0.6 / 2
      }
    });
  }, []);

  const getWindow = (name: string) => {
    switch(name) {
      case "Home": return homeWindow;
      case "About": return aboutWindow;
      case "Projects": return projectsWindow;
      case "Awards": return awardsWindow;
      case "Contact": return contactWindow;
      default: return null;
    }
  };

  const getSetWindow = (name: string) => {
    switch(name) {
      case "Home": return setHomeWindow;
      case "About": return setAboutWindow;
      case "Projects": return setProjectsWindow;
      case "Awards": return setAwardsWindow;
      case "Contact": return setContactWindow;
      default: return null;
    }
  };

  const onIconClick = (windowName: string) => {
    useEffect(() => {
    const window = getWindow(windowName);
    const setWindow = getSetWindow(windowName);
    if(window == null || setWindow == null) { return; }
    if(globalThis.window.innerWidth < 768) {
      setWindow({
        ...window,
        isOpen: true,
        position: {
          left: 0,
          top: 0
        }
      });
      return;
    }
    setWindow({
      ...window,
      isOpen: true
    });
    }, []);
  };

  const onMove = (event: any) => {
    useEffect(() => {
    const window = getWindow(currentWindow);
    const setWindow = getSetWindow(currentWindow);
    if(window == null || setWindow == null) { return; }
    setWindow({
      ...window,
      position: {
        left: Math.max(Math.min(event.clientX - window.offset.xPos, globalThis.window.innerWidth - globalThis.window.innerWidth * (window.size.width / 100)), 0),
        top: Math.max(Math.min(event.clientY - window.offset.yPos, globalThis.window.innerHeight - globalThis.window.innerHeight * (window.size.height / 100)), 0)
      }
    });
    }, []);
  };

  const onUp = (event: any) => {
    setCurrentWindow("");
  };

  return (
    <div className="windowContainer" onMouseMove={onMove} onMouseUp={onUp}>
      <div id="iconGrid">
        <div className="icon red" onClick={onIconClick.bind(this, "Home")}>
          <FontAwesomeIcon icon={faHouse} />
        </div>
        <div className="icon blue" onClick={onIconClick.bind(this, "About")}>
          <FontAwesomeIcon icon={faUser} />
        </div>
        <div className="icon green" onClick={onIconClick.bind(this, "Projects")}>
          <FontAwesomeIcon icon={faPaintBrush} />
        </div>
        <div className="icon purple" onClick={onIconClick.bind(this, "Awards")}>
          <FontAwesomeIcon icon={faMedal} />
        </div>
        <div className="icon blue" onClick={onIconClick.bind(this, "Contact")}>
          <FontAwesomeIcon icon={faPhone} />
        </div>
      </div>
      <HomeWindow window={homeWindow} setWindow={setHomeWindow} setCurrentWindow={setCurrentWindow} globalWindowZIndex={windowZIndex} setGlobalWindowZIndex={setWindowZIndex}/>
      <AboutWindow window={aboutWindow} setWindow={setAboutWindow} setCurrentWindow={setCurrentWindow} globalWindowZIndex={windowZIndex} setGlobalWindowZIndex={setWindowZIndex}/>
      <ProjectsWindow window={projectsWindow} setWindow={setProjectsWindow} setCurrentWindow={setCurrentWindow} globalWindowZIndex={windowZIndex} setGlobalWindowZIndex={setWindowZIndex}/>
      <AwardsWindow window={awardsWindow} setWindow={setAwardsWindow} setCurrentWindow={setCurrentWindow} globalWindowZIndex={windowZIndex} setGlobalWindowZIndex={setWindowZIndex}/>
      <ContactWindow window={contactWindow} setWindow={setContactWindow} setCurrentWindow={setCurrentWindow} globalWindowZIndex={windowZIndex} setGlobalWindowZIndex={setWindowZIndex}/>
    </div>
  );
}

function HomeWindow(this: any, {window, setWindow, setCurrentWindow, globalWindowZIndex, setGlobalWindowZIndex}: {window: Window, setWindow: Dispatch<SetStateAction<Window>>, setCurrentWindow: Dispatch<SetStateAction<string>>, globalWindowZIndex: number, setGlobalWindowZIndex: Dispatch<SetStateAction<number>>}) {
  const onDown = (event: any) => {
    setWindow({
      ...window,
      offset: {
        xPos: event.nativeEvent.offsetX,
        yPos: event.nativeEvent.offsetY
      },
      zIndex: globalWindowZIndex + 1
    });
    setCurrentWindow("Home");
    setGlobalWindowZIndex(globalWindowZIndex + 1);
  }
  
  return (
    <div id="Home" className={`window w-${window.size.width} h-${window.size.height}`} style={{visibility: window.isOpen? "visible" : "hidden", zIndex: window.zIndex, ...window.position}}>
      <div className="topBar" onMouseDown={onDown}>
        <h3>Home</h3>
        <div className="topBarX" onClick={onXClick.bind(this, window, setWindow)}>(X)</div>
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

function AboutWindow(this: any, {window, setWindow, setCurrentWindow, globalWindowZIndex, setGlobalWindowZIndex}: {window: Window, setWindow: Dispatch<SetStateAction<Window>>, setCurrentWindow: Dispatch<SetStateAction<string>>, globalWindowZIndex: number, setGlobalWindowZIndex: Dispatch<SetStateAction<number>>}) {
  const [imageRotation, setImageRotation] = useState("/aboutImageRotate_2.png");
  
  const onDown = (event: any) => {
    setWindow({
      ...window,
      offset: {
        xPos: event.nativeEvent.offsetX,
        yPos: event.nativeEvent.offsetY
      },
      zIndex: globalWindowZIndex + 1
    });
    setCurrentWindow("About");
    setGlobalWindowZIndex(globalWindowZIndex + 1);
  }

  const swapImage = () => {
    switch(imageRotation) {
      case "/aboutImageRotate_0.png": setImageRotation("/aboutImageRotate_1.png"); break;
      case "/aboutImageRotate_1.png": setImageRotation("/aboutImageRotate_2.png"); break;
      case "/aboutImageRotate_2.png": setImageRotation("/aboutImageRotate_0.png"); break;
      default: setImageRotation("/aboutImageRotate_2.png"); break;
    }
  }

  return (
    <div id="About" className={`window w-${window.size.width} h-${window.size.height}`} style={{visibility: window.isOpen? "visible" : "hidden", zIndex: window.zIndex, ...window.position}}>
      <div className="topBar" onMouseDown={onDown}>
        <h3>About</h3>
        <div className="topBarX" onClick={onXClick.bind(this, window, setWindow)}>(X)</div>
      </div>
      <div className="windowPage">
        <h2 className="centeredText">It's your boy, Austin Isidoro-Rossini!</h2>
        <img id="aboutImageRotation" className="centeredImage" src={imageRotation} title="Click Me!"
          alt="If you see this you're missing out on the cool images." onClick={swapImage}/>
        <br/>
        <p>I'm just a silly little buckaroo with a strong passion for learning and creating. I've been invested in
          creating games and trinkets since 5th grade, and I'm always toying with new ideas. Over the years I've learned
          to code in a variety of languages including JavaScript, C#, Java, and I've dabbled in plenty of others. To top it
          all off, I enjoy creating videos, whether it be for school, work, or just for fun!</p>
        <br/>
        <h3>What I do:</h3>
        <div>
          <div className="splitSection centeredText">
            <div>
              <img className="projectImage" src="/hobbies/coding.jpg"/>
              <h3>Make games and applications</h3>
            </div>
            <div>
              <img className="projectImage" src="/hobbies/videos.jpg"/>
              <h3>Create decently good videos</h3>
            </div>
          </div>
          <div className="splitSection centeredText">
            <div>
              <img className="projectImage" src="/hobbies/music.jpg"/>
              <h3>Listen to music, country music go brrr</h3>
            </div>
            <div>
              <img className="projectImage" src="/hobbies/tennis.JPEG"/>
              <h3>Play sports, mostly tennis</h3>
            </div>
          </div>
          <div className="splitSection centeredText">
            <div>
              <img className="projectImage" src="/hobbies/events.jpg"/>
              <h3>Do fun events and competitions</h3>
            </div>
            <div>
              <img className="projectImage" src="/hobbies/fools.jpg"/>
              <h3>Hang out with the fools</h3>
            </div>
          </div>
          <div className="splitSection centeredText">
            <div>
              <img className="projectImage" src="/hobbies/boating.jpg"/>
              <h3>Have fun on the water</h3>
            </div>
            <div>
              <img className="projectImage" src="/hobbies/bagelbites.jpg"/>
              <h3>Eat enough bagel bites to make the sun explode</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProjectsWindow(this: any, {window, setWindow, setCurrentWindow, globalWindowZIndex, setGlobalWindowZIndex}: {window: Window, setWindow: Dispatch<SetStateAction<Window>>, setCurrentWindow: Dispatch<SetStateAction<string>>, globalWindowZIndex: number, setGlobalWindowZIndex: Dispatch<SetStateAction<number>>}) {
  const onDown = (event: any) => {
    setWindow({
      ...window,
      offset: {
        xPos: event.nativeEvent.offsetX,
        yPos: event.nativeEvent.offsetY
      },
      zIndex: globalWindowZIndex + 1
    });
    setCurrentWindow("Projects");
    setGlobalWindowZIndex(globalWindowZIndex + 1);
  }
  
  return (
    <div id="Projects" className={`window w-${window.size.width} h-${window.size.height}`} style={{visibility: window.isOpen? "visible" : "hidden", zIndex: window.zIndex, ...window.position}}>
    <div className="topBar" onMouseDown={onDown}>
      <h3>Projects</h3>
      <div className="topBarX" onClick={onXClick.bind(this, window, setWindow)}>(X)</div>
    </div>
    <div className="windowPage">
      <h2 className="centeredText">Here are some of the cool things I've created!</h2>
      <br/>
      <h2>Programming</h2>
      <div>
        <div className="splitSection codingProject">
          <div>
            <img className="projectImage" src="/projects/blooketLeaderboard.png" alt="Image of Blooket Leaderboards"/>
          </div>
          <div>
            <h2>Blooket Leaderboards</h2>
            <p>A website I created to let players of an educational game I used to play compare their in game statistics and to compete in various categories.</p>
            <br/>
            <a href="https://blooket-leaderboards.pages.dev/" target="_blank">Visit Blooket Leaderboards!</a>
          </div>
        </div>
      </div>
      <div>
        <div className="splitSection codingProject">
          <div>
            <img className="projectImage" src="/projects/crystalClicker.png" alt="Image of Crystal Clicker"/>
          </div>
          <div>
            <h2>Crystal Clicker</h2>
            <p>A simple clicker game made in HTML5. I tried making a game that was easy to modify and add content for the purpose of letting kids expirement with coding.</p>
            <br/>
            <a href="https://leo-divine.github.io/Clicker-Project/" target="_blank">Visit Crystal Clicker!</a>
          </div>
        </div>
      </div>
      <div>
        <div className="splitSection codingProject">
          <div>
            <img className="projectImage" src="/projects/musicApp.png" alt="Image of Crystal Clicker"/>
          </div>
          <div>
            <h2>The Bester Music App</h2>
            <p>An application that I made to really learn C#. It's a simple music player that looks through your music folder and allows you to play music.</p>
            <br/>
            <a href="https://github.com/leo-divine/TheBesterMusicApp/archive/refs/tags/v1.2.0.3.zip" target="_blank">Download The Application!</a>
          </div>
        </div>
      </div>
      <br/>
      <h2>Videos</h2>
      <div>
        <div className="splitSection">
          <div>
            <iframe className="projectImage centeredImage" src="https://www.youtube.com/embed/pvroEZlMHDI?si=OqECELiyZ3AJEUy0&amp;controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className="centeredText">
              <h3>History of CAD</h3>
              <p>A projcet sharing how CAD has developed over the years</p>
            </div>
          </div>
          <div>
            <iframe className="projectImage centeredImage" src="https://www.youtube.com/embed/h8F0vJ6_HSM?si=VB5yDsUylIbXlhop&amp;controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className="centeredText">
              <h3>Tennis Montage</h3>
              <p>A montage created for the Summer Aces camp in Holliston</p>
            </div>
          </div>
        </div>
        <div className="splitSection">
          <div>
            <iframe className="projectImage centeredImage" src="https://www.youtube.com/embed/ENi66GDh8gA?si=9ZJ7DaaueNDWNiZu&amp;controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className="centeredText">
              <h3>Donquavious' Condom Palace</h3>
              <p>A project to teach the importance of proper protection</p>
            </div>
          </div>
          <div>
            <iframe className="projectImage centeredImage" src="https://www.youtube.com/embed/y1XaR7jITQE?si=8rZ-STgccQYTkfPH&amp;controls=0" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <div className="centeredText">
              <h3>The Things They Carried Analysis</h3>
              <p>A video analyzing different chapters of the famous book The Things They Carried</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

function AwardsWindow(this: any, {window, setWindow, setCurrentWindow, globalWindowZIndex, setGlobalWindowZIndex}: {window: Window, setWindow: Dispatch<SetStateAction<Window>>, setCurrentWindow: Dispatch<SetStateAction<string>>, globalWindowZIndex: number, setGlobalWindowZIndex: Dispatch<SetStateAction<number>>}) {
  const [elements, setElements] = useState({ Certificates: [<></>], Awards: { BPA: [<></>], Skills: [<></>], Keefe: [<></>] } });
  const [currentElement, setCurrentElement] = useState([<p>Loading...</p>]); 
  
  const onDown = (event: any) => {
    setWindow({
      ...window,
      offset: {
        xPos: event.nativeEvent.offsetX,
        yPos: event.nativeEvent.offsetY
      },
      zIndex: globalWindowZIndex + 1
    });
    setCurrentWindow("Awards");
    setGlobalWindowZIndex(globalWindowZIndex + 1);
  }

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/awards.json');
      console.log(response);
      const awardsList = await response.json();
      const tempElements = { Certificates: [<></>], Awards: { BPA: [<></>], Skills: [<></>], Keefe: [<></>] } };

      for(const award of awardsList) {
        const element = (
          <div className="dropdown">
            <div className="dropdownTitle">
              <h2>{award.title}</h2>
              <h2>
                <FontAwesomeIcon icon={faCaretDown} />
              </h2>
            </div>
            <input type="checkbox"/>
            <div className="dropdownContent">
              <img className="centeredImage" src={award.image} alt="Image of Certificate"/>
              <h4>{award.desc}</h4>
              <p>{award.date}</p>
            </div>
          </div>
        );

        if(award.category == "Certificate") {
          tempElements.Certificates.push(element);
        } else if(award.subcategory == "Business Professionals of America") {
          tempElements.Awards.BPA.push(element);
        } else if(award.subcategory == "Keefe Tech") {
          tempElements.Awards.Keefe.push(element);
        } else if(award.subcategory == "SKillsUSA") {
          tempElements.Awards.Skills.push(element);
        }

        setElements(tempElements);
        setCurrentElement([
        <h1 className="centeredText">Certificates</h1>,
        <div>{tempElements.Certificates}</div>
      ]);
      }
    };
    fetchData();
  }, []);

  const setAwards = (category: string) => {
    if(category == "Certificate") {
      setCurrentElement([
        <h1 className="centeredText">Certificates</h1>,
        <div>{elements.Certificates}</div>
      ]);
    } else {
      setCurrentElement([
        <h1 className="centeredText">Awards</h1>,
        <h2>BPA</h2>,
        <div>{elements.Awards.BPA}</div>,
        <h2>SkillsUSA</h2>,
        <div>{elements.Awards.Skills}</div>,
        <h2>Keefe Tech</h2>,
        <div>{elements.Awards.Keefe}</div>,
      ]);
    }
  };
  
  return (
    <div id="Awards" className={`window w-${window.size.width} h-${window.size.height}`} style={{visibility: window.isOpen? "visible" : "hidden", zIndex: window.zIndex, ...window.position}}>
      <div className="topBar" onMouseDown={onDown}>
        <h3>Awards</h3>
        <div className="topBarX" onClick={onXClick.bind(this, window, setWindow)}>(X)</div>
      </div>
      <div className="windowPage">
        <div className="awardNav">
          <h3 onClick={setAwards.bind(this, "Certificate")}>Certificates</h3>
          <h3 onClick={setAwards.bind(this, "Award")}>Awards</h3>
        </div>
        <div>{currentElement}</div>
      </div>
    </div>
  );
}

function ContactWindow(this: any, {window, setWindow, setCurrentWindow, globalWindowZIndex, setGlobalWindowZIndex}: {window: Window, setWindow: Dispatch<SetStateAction<Window>>, setCurrentWindow: Dispatch<SetStateAction<string>>, globalWindowZIndex: number, setGlobalWindowZIndex: Dispatch<SetStateAction<number>>}) {
  const [image, setImage] = useState("/contactImage.png");
  const [imageClickCount, setImageClickCount] = useState(0);
  const [playAnimation, setPlayAnimation] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);
  
  const onDown = (event: any) => {
    setWindow({
      ...window,
      offset: {
        xPos: event.nativeEvent.offsetX,
        yPos: event.nativeEvent.offsetY
      },
      zIndex: globalWindowZIndex + 1
    });
    setCurrentWindow("Contact");
    setGlobalWindowZIndex(globalWindowZIndex + 1);
  }

  const onImageClick = () => {
    if(!playAnimation) { return; }
    setIsAnimating(false);
    setTimeout(() => setIsAnimating(true), 10);

    setImageClickCount(imageClickCount + 1);
    if(imageClickCount + 1 >= 50)
    {
      setImage("/explosion.webp");
      setPlayAnimation(false);
    }
  };

  const onBounceEnd = () => {
    setIsAnimating(false);
  }

  return (
    <div id="Contact" className={`window w-${window.size.width} h-${window.size.height}`} style={{visibility: window.isOpen? "visible" : "hidden", zIndex: window.zIndex, ...window.position}}>
      <div className="topBar" onMouseDown={onDown}>
        <h3>Contact</h3>
        <div className="topBarX" onClick={onXClick.bind(this, window, setWindow)}>(X)</div>
      </div>
      <div className="windowPage">
        <br/>
        <div className="splitSection">
          <div>
            <img id="contactImage" className={`centeredImage ${isAnimating ? 'contactImageAnimate' : ''}`} src={image} alt="An image compelling you to contact me~" onClick={onImageClick} onAnimationEnd={onBounceEnd}/>
            <p className="centeredText">please, I'm lonely...</p>
          </div>
          <div>
            <h2 className="centeredText">Feel free to reach out!</h2>
            <p className="centeredText">There are a few ways to contact me for whatever you may need:</p>
            <br/>
            <p>Work Phone: <a href="tel:7742311759">774-231-1759</a></p>
            <p>Main Email: <a href="mailto:isidororossinia@gmail.com">isidororossinia@gmail.com</a></p>
            <p>School Email: <a href="mailto:aisidororossini2027@jpkeefehs.org">aisidororossini2027@jpkeefehs.org</a></p>
          </div>
        </div>
      </div>
    </div>
  );
}

function onXClick(window: Window, setWindow: Dispatch<SetStateAction<Window>>): undefined {
  useEffect(() => {
  if(globalThis.window.innerWidth < 768) {
    setWindow({
      ...window,
      isOpen: false,
      position: {
        left: 0,
        top: 0
      }
    });
    return;
  }
  setWindow({
    ...window,
    isOpen: false
  });
  }, []);
}