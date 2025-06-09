
import './index.css'
import { FaStar } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdWork } from "react-icons/md";
import { Link } from 'react-router';



const JobsCard = (props) =>{

const {jobs} = props
const { companyLogo, employementType, id, jobDescription, location, packagePerAnnum, title, rating } = jobs



    return(<li>
        <Link to={`/jobs/${id}`} className='links'>
        <div className="jobscard-container">
            <div className='image-and-rating'>
                <div className='image-container'>
                <img src={companyLogo} className='campany-logo'/></div>
                <div>
                    <h1 className='title'>{title}</h1>
                    <div className='rating'>
                        <FaStar className='star' /> <p >{rating}</p>
                    </div>
                    
                </div>
            </div>
            <div className='mini-details'>
            <div className='location-role'>
            <FaLocationDot className='icon-location' />
            <p className='location'>{location}</p>
            <MdWork className='icon-work'/>
            <p className='location'>{employementType}</p>
            </div>
            <p className='location'>{packagePerAnnum}</p>
            </div>
            <hr className='horizontal-line'/>
            <h1 className='description'>Description :</h1>
            <p className='details'>{jobDescription}</p>

            
        </div>
        </Link>
</li>



    )
}
export default JobsCard