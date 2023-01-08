import React,{ useState,useEffect } from 'react'
import './Navbar.css'

function Navbar() {

    const [show,handleShow] = useState(false);

    function detectScroll(){
        if(window.scrollY>130)
        handleShow(true);
        else handleShow(false);
    }
    useEffect(()=>{
        window.addEventListener("scroll", detectScroll);

        return () =>{
            window.removeEventListener("scroll",detectScroll);
        };

    },[]);

  return (
    <div className={`nav ${show && "nav_dark"}`}>
      <img className='nav_logo' src="https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png" alt="Netflix logo" />
      <img className='nav_avatar' src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="Netflix avatar" />
    </div>
  )
}

export default Navbar
