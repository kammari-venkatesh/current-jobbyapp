import './index.css'

import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { FaStar } from "react-icons/fa";


const SimilarCard = (props) =>{
  const { details } = props
  const {
    company_logo_url,
    employment_type,
    id,
    job_description,
    location,
    rating,
    title
  } = details






    return(
    <div className='similar-card'>
      <div className='forimageandrating'>
        <div className='image-container'>
        <img src={company_logo_url} className='company-logo'/></div>
        <div className='forratings'>
          
                    <h1 className='title'>{title}</h1>
                    <div className='rating'>
                        <FaStar className='star' /> <p >{rating}</p>
                    </div>
                    
        </div>
      </div>
      <div className='description-container'>
         <h1 className='descrip'>Description :</h1>
            <p className='detail'>{job_description}</p>
      </div>
      <div className='mini-details'>
        <div className='location-role'>
                  <FaLocationDot className='icon-location' />
                  <p className='location'>{location}</p>
                  <MdWork className='icon-work'/>
                  <p className='location'>{employment_type}</p>
                  </div>
               
                  </div>
    </div>

    )
} 





export default SimilarCard