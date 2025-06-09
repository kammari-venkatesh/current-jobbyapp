
import { Link } from "react-router"
import Header from "../Header/Header"
import './index.css'
const Home = () =>{







    return (
        <div className="home-container">
        <Header/>
        <div className="home-discription-container">
            <h1 className="home-heading">
                Find The Job That Fits Your Life
            </h1>
            <p className="home-note">Millions of people are searching for jobs, salary information, company reviews. Find the job that fits your abilities and potential.</p>
           <Link to='/jobs' className="linkbtn"> <button className="home-btn">Find Jobs</button></Link>
        </div>
        </div>
    )
}
export default Home