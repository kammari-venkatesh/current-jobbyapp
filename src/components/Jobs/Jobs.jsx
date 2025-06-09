import Header from "../Header/Header"
import './index.css'
import { IoIosSearch } from "react-icons/io";
import {useState, useEffect } from "react";
import Cookies from "js-cookie";
import Filtersgrid from "../Filtersgrid/Filtersgrid";
import JobsCard from "../../JobsCard/JobsCard";
import { BsThreeDots } from "react-icons/bs";

const Employeetype = [

 {
    emplyeeid : 'FULLTIME',
    displaytext : 'Full Time'
 }, 
 {
    emplyeeid :'PARTTIME',
    displaytext : 'Part Time'
 }, 

  {
    emplyeeid : 'FREELANCE',
    displaytext :'Freelance'
 }, 

  {
    emplyeeid : 'INTERNSHIP',
    displaytext : 'Internship'
 }, 

]
const SalaryRanges = [
{
    salaryid : '1000000',
    displaytext : '10LPA and about'


},
{
    salaryid : '2000000',
    displaytext : '20LPA and about'


},
{
    salaryid : '3000000',
    displaytext : '30LPA and about'


},
{
    salaryid : '4000000',
    displaytext : '40LPA and about'


},




]




const Jobs = () =>{
    const [profileView , setProfileView]= useState(false)
    const [profileobject , setProfileobject] = useState({})
    const [isfetch , setisfetch] = useState(true)
    const [selectedType,setSelectedtype] = useState([])
    const [seletedsalary , setsalary] = useState([])
    const [search ,setSearch]=useState('')
    const [jobsList,setJobsList]=useState([])
    const [isjobsfetch ,setisjobfetch]=useState(false)
    const [jobsfetchok , setjobfetchok] =useState(false)
    const [isloadprofile ,setisloadprofile]=useState(false)
    const [loaderforjobs ,setloaderforjobs] =useState(false)
    const onFetchsuccess = (fetchedData) =>{
        setProfileobject(fetchedData.profile_details)
        setProfileView(true)
  }
  const selettypeString = selectedType.join(',')
  const selectedsalarystring =seletedsalary.join(',')
  console.log(selettypeString)
  console.log(selectedsalarystring)
  
    const onFetchfailure = () =>{
        setProfileView(false)
    }
    const onClickfetch = () =>{
        setisfetch(prev => !prev)
    } 
    const updateType = ({value ,checked}) =>{
        if(checked){
            setSelectedtype(prev => [...prev , value])
        }
        else{
            setSelectedtype(prev => prev.filter((type)=> type !== value))
        }
    
    }
    const updateSalary = ({value ,checked}) =>{
 if(checked){
            setsalary(prev => [...prev , value])
        }
        else{
            setsalary(prev => prev.filter((type)=> type !== value))
        }
    }
   

   const renderProfileview = () => {
  return (
    <div>
      <div>
        {isloadprofile ? (
           <div className="loader-container"> 
          <BsThreeDots className="loader" /></div>
        ) : profileView ? (
          <div className="profile-container">
            <img src={profileobject.profile_image_url} className="avatar" />
            <h1 className="profile-name">{profileobject.name}</h1>
            <p className="profile-note">{profileobject.short_bio}</p>
          </div>
        ) : (
          <div className="profile-retry-container">
            <button className="retry-btn" onClick={onClickfetch}>
              Retry
            </button>
          </div>
        )}
      </div>
      <hr className="horizontal-line" />
      <Filtersgrid
        Employeetype={Employeetype}
        updateType={updateType}
        SalaryRanges={SalaryRanges}
        updateSalary={updateSalary}
      />
    </div>
  );
};







useEffect(() =>{

    const getProfiledetails = async () =>{
        setisloadprofile(true)
        const url = 'https://apis.ccbp.in/profile'
        const jswToken = Cookies.get('jwt_token')
        const options = {
            headers : {
            Authorization : `Bearer ${jswToken}`},
            method : 'GET',
        }
        const response = await fetch(url,options)
        const fetchedData = await response.json()
        setisloadprofile(false)
        if (response.ok === true){
            onFetchsuccess(fetchedData)
            
        }
        else{
            onFetchfailure()
        }
    }
    getProfiledetails()



} ,[isfetch])

useEffect(()=>{
const getJobsresult = async () =>{
    setloaderforjobs(true)
    const jswToken = Cookies.get('jwt_token')
const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${selectedType}&minimum_package=${seletedsalary}&search=${search}`
const options = {
    headers : {
        Authorization : `Bearer ${jswToken}`
    },
    method : 'GET',
}
const response = await fetch(apiUrl , options)
setloaderforjobs(false)
if (response.ok === false){
 setisjobfetch(true)
}
else{
setisjobfetch(false)

const fetchedData =await response.json()
const formattedData = fetchedData.jobs.map((each)=>{
        return{
            companyLogo : each.company_logo_url,
            employementType : each.employment_type,
            id : each.id,
            jobDescription : each.job_description,
            location : each.location,
            packagePerAnnum : each.package_per_annum,
            title : each.title,
            rating : each.rating,


        }
}



)
setJobsList(formattedData)
}

 
console.log(`response ${response.ok}`)

}
getJobsresult()
console.log(jobsList)


},[search,selectedType,seletedsalary ,jobsfetchok])
const onchangesearchjobs = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
    
}
const onClickretry = () =>{
    setjobfetchok(prev => !prev)
}
const renderSearchview = () =>{
    return(
        <div className="searchbar-container">
        <input type="search" placeholder="Search" value={search} className="searchbar" onChange={onchangesearchjobs}/>
         <IoIosSearch className="search-icon"/>
         </div>   
    )
}
const renderjobsview = () => {
  if (loaderforjobs) {
    return (
      <div className="loader-jobs">
        <BsThreeDots className="loader" size={30} />
      </div>
    );
  }

  if (isjobsfetch) {
    return (
      <div className="nofetch">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          className="nofetch-img"
        />
        <p className="oopspara">OOPS! Something Went Wrong</p>
        <p className="oopsdis">
          We cannot find the page <br className="break" />
          you are looking for.
        </p>
        <button className="retry-btn" onClick={onClickretry}>
          Retry
        </button>
      </div>
    );
  }

  if (jobsList.length !== 0) {
    return (
      <ul className="Jobslist-container">
        {jobsList.map((item) => (
          <JobsCard jobs={item} key={item.id} />
        ))}
      </ul>
    );
  } else {
    return (
      <div className="nojobsfound-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="nojobs-image"
        />
        <p className="oopspara">No Jobs Found</p>
        <p className="oopsdis">
          We could not find any jobs, try <br /> other filters.
        </p>
      </div>
    );
  }
};





return(
<div className="jobs-container">
<Header/>
<div className="mobile-jobs-view">
{renderSearchview()}
{renderProfileview()}
{renderjobsview()}
</div>
<div className="largescreen-jobs-view">
   <div className="profile">
    {renderProfileview()}</div> 
  <div className="search-jobs">
    {renderSearchview()}
    {renderjobsview()}
    </div>  


</div>





</div>




)







}
export default Jobs