import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import icon from '../Images/profile-icon-20.jpeg'
import LogoutButton from "./auth/LogoutButton";
import "../styles/profileButton.css"

function ProfileButton() {

  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector(state => state.session.user)


  // useEffect(() => {
  //   if (!showMenu) return;

  //   const closeMenu = () => {
  //     setShowMenu(false);
  //   };

  //   document.addEventListener('click', closeMenu);

  //   return () => document.removeEventListener("click", closeMenu);
  // }, [showMenu]);

  const defaultImg = 'https://ps.w.org/metronet-profile-picture/assets/icon-256x256.png'

  const imgError = (e) => {
    e.target.src = defaultImg
  }

  // const menuToggle = () => {
  //   const toggleMenu = document.querySelector(".pro-drop-menu")
  //   toggleMenu.classList.toggle('active')
  // }


  document.addEventListener('click', function handleClickOutsideBox(event) {
    const box = document.querySelector('.pro-section');
    const toggleMenu = document.querySelector(".pro-drop-menu")
    if (box.contains(event.target)) {
      toggleMenu.classList.add('active')

    }
    if (!box.contains(event.target)) {
      toggleMenu.classList.remove('active')
    }
  });


  return (
    <div className="pro-section">
      <div className='profile' >
        <img src={user.profile_image ? user.profile_image : defaultImg} alt='' onError={imgError} />
      </div>
      <div className='pro-drop-menu'>
        <h4 style={{ cursor: 'default' }}>{user.username}</h4>
        <ul>
          <li><img style={{ height: '20px', width: '21px' }} src={user.profile_image} /><NavLink to={`/users/${user.id}/posts`}><p style={{ color: 'black' }}>My Profile</p></NavLink></li>
          {/* <li><img src='https://www.nicepng.com/png/detail/368-3689520_email-icons-grey-email-icon-pink-png.png' /><NavLink to={`/users/${user.id}/posts`}><p>{user.email}</p></NavLink></li> */}
          <li ><img src='https://png.pngtree.com/png-vector/20190425/ourmid/pngtree-vector-logout-icon-png-image_991952.jpg' /><LogoutButton /></li>

        </ul>
      </div>

      {/* <span style={{ color: '#cccccc', padding: '0 6px' }}> */}
      {/* <img className="profile-dropdown-image" style={{ height: '25px', width: '25px', borderRadius: '50%' }} src={sessionUser.profile_image} alt='icon' /> */}
      {/* </span> */}
      {/* <div className="dropdown-content">
        <button className="logOutButton" style={{ cursor: 'pointer' }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <NavLink to={`/users/${sessionUser.id}/posts`} exact={true} style={{ display: 'flex', flexDirection: 'row', textDecoration: 'none' }}>
              <img style={{ height: '20px', width: '20px', marginRight: '5px', borderRadius: '50%' }} src={sessionUser.profile_image} alt='icon' />
              <div style={{ fontWeight: '600', color: 'black', textDecoration: 'none', marginLeft: '5px',marginTop:'2px' }}>Profile</div>
            </NavLink>
          </div> */}

      {/* </button> */}


    </div>
  )
}

export default ProfileButton;
