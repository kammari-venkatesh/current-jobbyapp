import './index.css'
import { MdHome } from "react-icons/md";
import { MdWork } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { Link } from 'react-router';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router';
const Header = () =>{
     const navigate= useNavigate()
    const onClicklogout = () =>{
       Cookies.remove('jwt_token')
        navigate('/login', {replace : true})

    }



    return (
        <div className="header-container">

        <div className='home-logo-container'>
            <Link to='/'>
            <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' className='home-logo'/></Link>
        </div>
        <div className='mobile-view-container'>

           <Link to='/'><MdHome className='home-icon'/></Link> 
           <Link to='/jobs'> <MdWork  className='home-icon'/></Link>
            <Link to='/login'><button className='mini-logout' onClick={onClicklogout}><MdLogout className='home-icon'/></button></Link>
        </div>
        <div className='medium-view-container'>
            <ul className='description'>
                <li className='main-links'>
                    <Link to='/' className='link'>Home
                    </Link></li>
                <li className='main-links'><Link to='/jobs' className='link'>Jobs
                    </Link></li>

            </ul>
            <div className='logout-container'>
            <button className='logout-btn' onClick={onClicklogout}>Logout</button></div>
        </div>
        </div>
    )
}

export default Header