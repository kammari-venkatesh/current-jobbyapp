
import './index.css'
import { useState ,useEffect } from 'react'
import { useNavigate } from 'react-router'
import Cookies from 'js-cookie'

const Login = () =>{

     const navigate = useNavigate()
    const [userName,setUserName] = useState('')
    const [passWord, setpassWord]=useState('')
    const [errmsg,seterrmsg]=useState('')
const onClickUsername = (event) =>{
    setUserName(event.target.value)
}
const onClickpassword = (event) =>{
    setpassWord(event.target.value)
}
const onSubmitsuccess = (fetchedData) =>{
  const jswToken = fetchedData.jwt_token 
  seterrmsg('')
  Cookies.set('jwt_token',jswToken,{expires : 30})
    navigate('/', { replace: true })

}
 const onSubmitFailure = (msg) =>{
    seterrmsg(msg)
 }

const onSubmitform = async(event) =>{
    event.preventDefault()
    const userdetails = {
  username: userName,
  password: passWord
}
    const appUrl = 'https://apis.ccbp.in/login'
    const option = {
        method : 'POST',
        body : JSON.stringify(userdetails),
    }
    const response = await fetch(appUrl, option)
    const fetchedData = await response.json()
    console.log(fetchedData)
    if (response.ok === true){
        onSubmitsuccess(fetchedData)
    }
    else{
        onSubmitFailure(fetchedData.error_msg)
    }

} 

   
  useEffect(() => {
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      navigate('/', { replace: true })
    }
  }, [navigate])
return(
<div className="Login-container">

<form className='login-form' onSubmit={onSubmitform}>
    <img src='https://assets.ccbp.in/frontend/react-js/logo-img.png' className='logo-img'/>
<label htmlFor='username' className='Username-lable'>USERNAME</label>
<input type='text' id='username' placeholder = 'USERNAME' value={userName} onChange={onClickUsername} className='username-input'/>

<label htmlFor='Password' className='Username-lable'>
    PASSWORD
</label>
<input type='password' id='Password' placeholder='PASSWORD' value={passWord} onChange={onClickpassword} className='username-input'/>
<button className='login-btn' type='submit'>Login</button>
{errmsg && <p className='errormsg'>{errmsg}</p>}

</form>



</div>



)





}
export default Login