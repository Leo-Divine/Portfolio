const windows = {
  Home: {
    pos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: window.innerWidth / 2 - window.innerWidth * 0.6 / 2,
      y: window.innerHeight / 2 - window.innerHeight * 0.6 / 2
    },
    width: window.innerWidth * 0.6,
    height: window.innerHeight * 0.6,
    isOpen: true,
    isDragging: false,
    icon: "house",
    iconColor: "red"
  },
  About: {
    pos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: 50,
      y: 120
    },
    width: window.innerWidth * 0.45,
    height: window.innerHeight * 0.6,
    isOpen: false,
    isDragging: false,
    icon: "user",
    iconColor: "blue"
  },
  Projects: {
    pos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: 50,
      y: 120
    },
    width: window.innerWidth * 0.5,
    height: window.innerHeight * 0.55,
    isOpen: false,
    isDragging: false,
    icon: "paintbrush",
    iconColor: "green"
  },
  Awards: {
    pos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: 50,
      y: 120
    },
    width: window.innerWidth * 0.35,
    height: window.innerHeight * 0.55,
    isOpen: false,
    isDragging: false,
    icon: "medal",
    iconColor: "purple"
  },
  Contact: {
    pos: {
      x: 0,
      y: 0
    },
    startPos: {
      x: 50,
      y: 120
    },
    width: window.innerWidth * 0.45,
    height: window.innerHeight * 0.45,
    isOpen: false,
    isDragging: false,
    icon: "phone",
    iconColor: "blue"
  }
};

//Window Movement
let currentWindow = null;
const currentOffset = {
  x: 0,
  y: 0,
};
let indexCount = 1;

document.addEventListener('mousemove', function(event) {
  if(!currentWindow) { return; }
  windows[currentWindow].pos.x = Math.max(Math.min(event.clientX - currentOffset.x, window.innerWidth - windows[currentWindow].width), 0);
  windows[currentWindow].pos.y = Math.max(Math.min(event.clientY - currentOffset.y, window.innerHeight - windows[currentWindow].height), 0);

  const windowElement = document.getElementById(currentWindow);
  windowElement.style.left = `${windows[currentWindow].pos.x}px`; 
  windowElement.style.top = `${windows[currentWindow].pos.y}px`;
});

function startDrag(e, id) {
  if(currentWindow != null || e.target.className == "topBarX") { return; }
  windows[id].isDragging = true;
  currentWindow = id;
  currentOffset.x = e.offsetX;
  currentOffset.y = e.offsetY;
  document.getElementById(id).style.zIndex = indexCount++;
}

document.addEventListener('mouseup', function(event) {
  if(currentWindow == null) { return; }
  windows[currentWindow].isDragging = false;
  currentWindow = null;
});

function openWindow(id) {
  windows[id].isOpen = true;
  document.getElementById(id).style.visibility = "visible";
  document.getElementById(id).style.zIndex = indexCount++
}

function closeWindow(id) {
  windows[id].isOpen = false;
  windows[id].pos = windows[id].startPos;
  const windowElement = document.getElementById(id);
  windowElement.style.visibility = "hidden";
  windowElement.style.left = screen.width > 768 ? `${windows[id].pos.x}px` : "0px"; 
  windowElement.style.top = screen.width > 768 ? `${windows[id].pos.y}px` : "0px";
}

//Window Creation
for (const [windowId, windowData] of Object.entries(windows)) {
  const windowElement = document.getElementById(windowId);
  windowElement.style.visibility = windowData.isOpen ? "visible" : "hidden";
  windowElement.style.left = screen.width > 768 ? windowData.startPos.x + "px" : "0px";
  windowElement.style.top = screen.width > 768 ? windowData.startPos.y + "px" : "0px";
  windowElement.style.width = screen.width > 768 ? windowData.width + "px" : window.innerWidth + "px";
  windowElement.style.height = screen.width > 768 ? windowData.height + "px" : window.innerHeight + "px";

  const iconHTML = 
  `
    <div class="icon ${windowData.iconColor}" onclick="openWindow('${windowId}')">
      <i class="fa-solid fa-${windowData.icon}"></i>
    </div>
  `;
  document.getElementById("iconGrid").innerHTML += iconHTML;
}

//Fun Trinkets
let imageRotation = 3;
function swapAboutImage() {
  if(imageRotation >= 3) { 
    imageRotation = 0;
    document.getElementById("aboutImageRotation").src = `assets/aboutImageRotate_0.png`;
  } else {
    document.getElementById("aboutImageRotation").src = `assets/aboutImageRotate_${++imageRotation}.png`;
  }
}

const animation = document.getElementById('contactImage').animate(
  [
    { transform: 'scale(1) translateY(0)', offset: 0 },
    { transform: 'scale(1.1, 0.9) translateY(0)', offset: 0.1 },
    { transform: 'scale(0.95, 1.05) translateY(-1.15em)', offset: 0.3 },
    { transform: 'scale(1.1, 0.9) translateY(0.125em)', offset: 0.44 },
    { transform: 'scale(0.975, 1.025) translateY(-0.65em)', offset: 0.64 },
    { transform: 'scale(1) translateY(0)', offset: 0.85 },
    { transform: 'scale(1) translateY(0)', offset: 1 }
  ],
  {
      duration: 1000,
      iterations: 1
  }
);
animation.cancel();

function playBounceAnimation() {
  animation.cancel();
  animation.play();
}