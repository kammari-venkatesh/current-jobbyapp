import './index.css'
import Header from '../components/Header/Header'
import { useParams } from 'react-router'
import { useEffect ,useState } from 'react'
import Cookies from 'js-cookie'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaExternalLinkAlt } from "react-icons/fa";
import SimilarCard from '../components/SimilarCard/SimilarCard'
import { BsThreeDots } from 'react-icons/bs'

const JobitemDetails = () =>{
const {id} =useParams()
const [jobdetails , setjobdetails] = useState({})
const [lifeatcompany ,setlifeatcompany] =useState({})
const [skills,setskills] =useState([])
const [similarjobs,setsimilarjobs] =useState([])
const [isLoading ,setisLoading] =useState(false)
const [fetchingjobdetails ,setfetch] =useState(true)
useEffect(()=>{
const getItemDetails = async () => {
  setisLoading(true)                                          
  const JwtToken = Cookies.get('jwt_token')
  const apiurl = `https://apis.ccbp.in/jobs/${id}`
  const options = {
    headers: {
      Authorization: `Bearer ${JwtToken}`,
    },
    method: 'GET',
  }

  const response = await fetch(apiurl, options)
  const fetchedData = await response.json()
  setisLoading(false)
  console.log(fetchedData)
  if (response.ok === true) {
    setfetch(false)
    const item = fetchedData.job_details

    const jobdetailsformattedData = {
      companyLogoImage: item.company_logo_url,
      companyVisitUrl: item.company_website_url,
      employeeType: item.employment_type,
      id: item.id,
      jobDescription: item.job_description,
      location: item.location,
      packagePerAnnum: item.package_per_annum,
      rating: item.rating,
      title: item.title,
    }

    const lifeatcompanyformattedData = {
      description: item.life_at_company.description,
      imageUrl: item.life_at_company.image_url,
    }
    const skillsData = item.skills.map((item)=>({
        name : item.name,
        imageUrl : item.image_url
    }))
    const similarData = fetchedData.similar_jobs
    

    
    console.log('jobdetails',jobdetailsformattedData)
    console.log('lifeatcompany',lifeatcompanyformattedData)
    console.log('array',skillsData)
    console.log('similar jobs',similarData)
    setjobdetails(jobdetailsformattedData)
    setlifeatcompany(lifeatcompanyformattedData)
    setskills(skillsData)
     setsimilarjobs(similarData)
    
  }
  else{
    setfetch(true)
  }
}

getItemDetails()





},[])

const renderFilureView = ()=>{
  return(
    <div className='failureview-container'>
      <img src='https://assets.ccbp.in/frontend/react-js/failure-img.png' className='failureview-image'/>
      <h1 className='heading'>OOPS! Something Went Wrong</h1>
      <p className='failure-para'>We Cannot seem to find the Page <br className='break'/> you are lookin for.</p>
    </div>

  )
}



  return (
  <div className="jobitemdetails-container">
    <Header />

    {isLoading ? (
      <div className="loader-container">
        <BsThreeDots className="loader" />
      </div>
    ) : fetchingjobdetails ? (
      renderFilureView()
    ) : (
      <div className="jobitemdetails">
        <div className="jobdetails-container">
          <div className="image-and-rating">
            <div className="image-container">
              <img src={jobdetails.companyLogoImage} className="campany-logo" />
            </div>
            <div>
              <h1 className="title">{jobdetails.title}</h1>
              <div className="rating">
                <FaStar className="star" />
                <p>{jobdetails.rating}</p>
              </div>
            </div>
          </div>

          <div className="mini-details">
            <div className="location-role">
              <FaLocationDot className="icon-location" />
              <p className="location">{jobdetails.location}</p>
              <MdWork className="icon-work" />
              <p className="location">{jobdetails.employeeType}</p>
            </div>
            <p className="location">{jobdetails.packagePerAnnum}</p>
          </div>

          <hr className="horizontal-line" />

          <div className="descripton-container">
            <h1 className="description">Description :</h1>
            <a className="visitlink" href={jobdetails.companyVisitUrl}>
              Visit <FaExternalLinkAlt className="linkicon" />
            </a>
          </div>
          <p className="details">{jobdetails.jobDescription}</p>

          <h1 className="skills-heading">Skills</h1>
          <div className="skills-container">
            {skills.map(each => (
              <div className="skilldiv" key={each.name}>
                <img src={each.imageUrl} alt={each.name} className="skill-image" />
                <p className="skill-name">{each.name}</p>
              </div>
            ))}
          </div>

          <h1 className="skills-heading">Life at Company</h1>
          <div className="lifeatcompany-container">
            <p className="company-description">{lifeatcompany.description}</p>
            <img src={lifeatcompany.imageUrl} className="company-image" />
          </div>
        </div>

        <div className="similar-jobs-container">
          <h1 className="similarjobs-heading">Similar Jobs</h1>
          <div className="similarjob-cards">
            {similarjobs.map(item => (
              <SimilarCard details={item} key={item.id} />
            ))}
          </div>
        </div>
      </div>
    )}
  </div>
);

} 

export default JobitemDetails



