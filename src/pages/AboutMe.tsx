import { CiLocationOn,CiMobile1,CiMail,CiLinkedin,CiYoutube } from "react-icons/ci";
import { BsPerson } from "react-icons/bs";
import { FaGithub } from "react-icons/fa"
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <div className="container max-w-xl mx-auto flex flex-col gap-6 mb-8 shadow-sm drop-shadow-sm">
        <div className="flex flex-col w-full bg-color-secondary rounded-md overflow-hidden md:flex-row">
        <div className="flex-1" >
        <img className=' w-full h-full object-cover' src={'/images/profile.jpg'} alt="Arman Abasian" />
      </div>
      <div className="p-2 flex-1">
        <h1 className="text-lg font-bold mb-3">About me</h1>
        <p>Junior MERN stack Developer with two years of experience in developing and implementing userfriendly websites and applications. Proficient in HTML, CSS, JavaScript, Reactjs, Nextjs, Nodejs,
Mongodb, Expressjs and various front-end and back-end libraries, packages and frameworks. Strong
understanding of user experience (UX) and user interface (UI) design principles. Excellent problemsolving skills and ability to work collaboratively in a team environment.</p>
      </div>
        </div>
        <div className="flex flex-col gap-2 mb-2 bg-color-secondary rounded-md p-2">
            <p className="flex  flex-wrap items-center gap-1"> <BsPerson className="mobileIcon" />Arman Abasian</p>
            <p className="flex flex-wrap  items-center gap-1"> <CiLocationOn className="mobileIcon" /> Thren - Iran</p>
            <p className="flex flex-wrap  items-center gap-1"> <CiMobile1 className="mobileIcon" /> +989904407613</p>
            <p className="flex flex-wrap  items-center gap-1"> <CiMail className="mobileIcon" />abasian.arman@gmail.com</p>
            <p className="flex flex-wrap  items-center gap-1"> <CiLinkedin className="mobileIcon" /><Link to="https://www.linkedin.com/in/armanabasian">my Linkedin</Link></p>
            <p className="flex flex-wrap  items-center gap-1"> <FaGithub className="mobileIcon" /> <Link to="https://github.com/Arman-Abbasian">my Github</Link></p>
            <p className="flex flex-wrap  items-center gap-1"> <CiYoutube className="mobileIcon" /> <Link to="https://www.youtube.com/channel/UCxIWc1N4joNrUk1rZjCkIA">my Youtube channel</Link></p>
        </div>
    </div>
  )
}

export default AboutMe