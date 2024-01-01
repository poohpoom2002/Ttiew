import React, { useState, useEffect, useRef } from 'react';
import shan from '../asset/shan.jpg';
import { Link, useLocation } from "react-router-dom";
import PopUpEdit from './profile/PopUpEdit';
function Sidebar({ yourCode, isPopUpEdit, toggleEdit}) {
  const location = useLocation();
  const [isPopUpVisible, setIsPopUpVisible] = useState(false);
  const popUpRef = useRef(null);
  
  const handlePopUpClick = () => {
    setIsPopUpVisible(!isPopUpVisible);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isPopUpVisible && popUpRef.current && !popUpRef.current.contains(event.target)) {
        setIsPopUpVisible(false);
      }
    };

    if (isPopUpVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } 
    else{
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isPopUpVisible]);
  return (
    <div className="relative w-full h-full flex font-Anuphan">
        <div className='w-[17.5%] h-screen'>

          {/* web logo */}
          <Link to="/page">
            <img src="https://cdn.pic.in.th/file/picinth/T_Logo-5-2bdaa454b8d6e8773.png" alt=''/>
          </Link>
          {/* side bar div for menu*/}
          <div className='relative h-[85.3%] border-r border-[#CCCCCC] text-center text-2xl font-bold'>

            {/* location display page */}
            <Link to="/page">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/page" ? 'bg-[#00C2C1] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 14c2.206 0 4-1.794 4-4s-1.794-4-4-4s-4 1.794-4 4s1.794 4 4 4zm0-6c1.103 0 2 .897 2 2s-.897 2-2 2s-2-.897-2-2s.897-2 2-2z"/><path fill="currentColor" d="M11.42 21.814a.998.998 0 0 0 1.16 0C12.884 21.599 20.029 16.44 20 10c0-4.411-3.589-8-8-8S4 5.589 4 9.995c-.029 6.445 7.116 11.604 7.42 11.819zM12 4c3.309 0 6 2.691 6 6.005c.021 4.438-4.388 8.423-6 9.73c-1.611-1.308-6.021-5.294-6-9.735c0-3.309 2.691-6 6-6z"/></svg>
                <div className='w-fit ms-8'>แมตช์ที่ใช่</div>
              </div>
            </Link>

            {/* webboard page */}
            <Link to="/webboard">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/webboard" || location.pathname === "/reply" ? 'bg-[#F39032] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M20 4H4c-1.103 0-2 .897-2 2v12c0 1.103.897 2 2 2h16c1.103 0 2-.897 2-2V6c0-1.103-.897-2-2-2zM4 18V6h16l.001 12H4z"/><path fill="currentColor" d="M6.5 11h3a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v2a.5.5 0 0 0 .5.5zM6 14h6v2.001H6zm7 0h5v2.001h-5z"/></svg>
                  
                  <div className='w-fit ms-8'>เว็บบอร์ด</div>
              </div>
            </Link>

            {/* suggested location page */}
            <Link to="/recommended">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/recommended" ? 'bg-[#FE547B] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10s10-4.486 10-10S17.514 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8s8 3.589 8 8s-3.589 8-8 8z"/><path fill="currentColor" d="M9.999 13.587L7.7 11.292l-1.412 1.416l3.713 3.705l6.706-6.706l-1.414-1.414z"/></svg>
                  
                <div className='w-fit ms-8'>สถานที่แนะนำ</div>
              </div>
            </Link>

            {/* notification page */}
            <Link to="/notification">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/notification" ? 'bg-[#81C500] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M19 13.586V10c0-3.217-2.185-5.927-5.145-6.742C13.562 2.52 12.846 2 12 2s-1.562.52-1.855 1.258C7.185 4.074 5 6.783 5 10v3.586l-1.707 1.707A.996.996 0 0 0 3 16v2a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-2a.996.996 0 0 0-.293-.707L19 13.586zM19 17H5v-.586l1.707-1.707A.996.996 0 0 0 7 14v-4c0-2.757 2.243-5 5-5s5 2.243 5 5v4c0 .266.105.52.293.707L19 16.414V17zm-7 5a2.98 2.98 0 0 0 2.818-2H9.182A2.98 2.98 0 0 0 12 22z"/></svg>
                  
                <div className='w-fit ms-8'>การแจ้งเตือน</div>
              </div>
            </Link>

            {/* profile page */}
            <Link to="/profile">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/profile" || location.pathname === "/editprofile" ? 'bg-[#F39032] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2a5 5 0 1 0 5 5a5 5 0 0 0-5-5zm0 8a3 3 0 1 1 3-3a3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7h-4a7 7 0 0 0-7 7v1h2v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1z"/></svg>
                  
                  <div className='w-fit ms-8'>โปรไฟล์</div>
              </div>
            </Link>

            {/* liked location page */}
            <Link to="/like">
              <div className={`flex h-[9.5%] items-center p-10 mb-2 ${location.pathname === "/like" ? 'bg-[#FE547B] text-white':'text-black'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4.595a5.904 5.904 0 0 0-3.996-1.558a5.942 5.942 0 0 0-4.213 1.758c-2.353 2.363-2.352 6.059.002 8.412l7.332 7.332c.17.299.498.492.875.492a.99.99 0 0 0 .792-.409l7.415-7.415c2.354-2.354 2.354-6.049-.002-8.416a5.938 5.938 0 0 0-4.209-1.754A5.906 5.906 0 0 0 12 4.595zm6.791 1.61c1.563 1.571 1.564 4.025.002 5.588L12 18.586l-6.793-6.793c-1.562-1.563-1.561-4.017-.002-5.584c.76-.756 1.754-1.172 2.799-1.172s2.035.416 2.789 1.17l.5.5a.999.999 0 0 0 1.414 0l.5-.5c1.512-1.509 4.074-1.505 5.584-.002z"/></svg>
                  <div className='w-fit ms-8'>ที่เที่ยวที่ถูกใจ</div>
              </div>
            </Link>
            {/* left button user simple info */}
            <div className='fixed bottom-0 flex w-[17.5%] h-[14%] items-center justify-center'>
              <div className='flex w-full justify-evenly'>
                <div className="w-16 h-16 rounded-full overflow-hidden">
                  <img 
                    src={shan}
                    className=""
                    alt=''
                  />
                </div>
                <div className='w-32 h-16 text-start text-xl'>
                  <div className='mt-2'>
                    Name
                  </div>
                  <div>
                    Username
                  </div>
                </div>
                <div className='me-4 cursor-pointer' onClick={handlePopUpClick}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24"><path fill="currentColor" d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zm6 0c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2zM6 10c-1.1 0-2 .9-2 2s.9 2 2 2s2-.9 2-2s-.9-2-2-2z"/></svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* space for each page to show */}
        
        <div className='flex-auto bg-white w-[82.5%] h-screen overflow-hidden'>
          {yourCode}
        </div>

        {isPopUpVisible && (
          <div className={`absolute bottom-36 left-12 bg-white font-bold text-2xl rounded-3xl shadow-md transition-opacity transition-transform duration-1000 ${isPopUpVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform -translate-y-2'}`} 
          style={{"box-shadow": '0 0 15px -5px rgb(0 0 0 / 1)'}}
          ref={popUpRef}
          >
            <Link to="/profile?mode=edit">
              <p className='p-8 px-10 border-b border-gray-400'>แก้ไขหน้าโปรไฟล์ของคุณ</p>
            </Link>
            <Link to="/login">
              <p className='p-8 px-10'>ออกจากระบบ</p>
            </Link>
          </div>
        )}
        {isPopUpEdit && (
          <PopUpEdit isToggleEdit={toggleEdit}/>
        )}
    </div>
  );
}

export default Sidebar;
