import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProfileInfo } from "../Store/Slices/profile";
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa6";

const EditProfile = () => {
  
  const [bio, setBio] = useState("");
  const [status, setStatus] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [location, setLocation] = useState("");
  const [skills, setSkills] = useState("");
  const [githubusername, setGithubusername] = useState("");
  const [twitter, setTwitter] = useState("");
  const [facebook, setFacebook] = useState("");
  const [youtube, setYoutube] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [instagram, setInstagram] = useState("");
  const [isToogled, setSetToogle] = useState(false);
  // console.log(instagram)
  const handleToogle = () => {
    setSetToogle(!isToogled);
  };

  const dispatch = useDispatch();
  
  

  const profile = useSelector((store) => store.profile.info);
  // console.log(profile);

  useEffect(() => {
    if (profile) {
      setBio(profile.bio);
      setStatus(profile.status);
      setCompany(profile.company)
      setWebsite(profile.website)
      setLocation(profile.location)
      setSkills(profile.skills)
      setGithubusername(profile.githubusername)

      setTwitter(twitter)
      // if(profile.social.twitter) {
      // };
      if(profile.social.facebook) {
        setFacebook(facebook)
      };
      if(profile.social.youtube) {
        setYoutube(youtube)
      };
      if(profile.social.linkedin) {
        setLinkedin(linkedin)
      };
      if(profile.social.instagram) {
        setInstagram(instagram)
      };
    }
  }, [profile]);

  async function handleEdit(e) {
    e.preventDefault();

    const values = { bio, status, company,website,location, skills, githubusername, twitter,facebook,youtube,linkedin,instagram  };

    try {
      const { data: newProfileInfo } = await axios.post("/profile", values);
      dispatch(updateProfileInfo(newProfileInfo));
    } catch (error) {
      console.log(error);
      toast(`${error.message}`, {
        type: "error",
      });
    }
    console.log(twitter);

  }
  return (
    
    <div className="container">
        <h1 className="text-primary">Edit Your Profile</h1>
        <h2>Add some changes to your profile</h2>
        <p>* = required field</p>

        <form onSubmit={handleEdit} className=" d-flex flex-column gap-2" >
          <label className="w-100 d-flex flex-column gap-2">
            <select className="w-100 py-2"  >
              <option value={status}>{status}</option>
              <option value="developer">Developer</option>
              <option value="junior">Junior Developer</option>
              <option value="senior">Senior Developer</option>
            </select>
            <p>Give us an idea of where you are at in your career</p>
          </label>
          <label >
            <input className="w-100 py-1" type="text" value={company} onChange={(e) => setCompany(e.target.value)}/>
            <p>Could be your own company or one you work for</p>
          </label>
          <label >
            <input className="w-100 py-1" type="text" value={website} onChange={(e) => setWebsite(e.target.value)} />
            <p>Could be your own or a company website</p>
          </label>
          <label >
            <input className="w-100 py-1" type="text" value={location} onChange={(e) => setLocation(e.target.value)} />
            <p>City & state suggested (eg. Boston, MA)</p>
          </label>
          <label >
            <input className="w-100 py-1" type="text" value={skills} onChange={(e) => setSkills(e.target.value)} />
            <p>Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)</p>
          </label>
          <label >
            <input className="w-100 py-1" type="text" value={githubusername} onChange={(e) => setGithubusername(e.target.value)} />
            <p>If you want your latest repos and a Github link, include your username</p>
          </label>
          <label >
            <textarea className="w-100 h-25" value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
            <p>Tell us a little about yourself</p>
          </label>
          <div className="d-flex flex-column" >
            <div className="d-flex   gap-3 align-items-center">
              <button type="button" className="btn btn-secondary px-5" onClick={handleToogle} >Add Social links</button>
              <button disabled className="btn btn-secondary px-5 ">Optional</button>
            </div>
              { isToogled &&   <div  className="d-flex flex-column gap-3 my-3">
              <label className="d-flex gap-3 align-items-center" >
                <FaTwitter color="blue" fontSize={25}/>
                <input  className="w-100 h-25 p-2" type="text" placeholder="TWITTER URL" value={twitter} onChange={(e) => setTwitter(e.target.value)} />
              </label>
              <label className="d-flex gap-3 align-items-center">
                <FaFacebook color="blue" fontSize={25}/>
                <input  className="w-100 h-25 p-2" type="text" placeholder="FACEBOOK URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} />
              </label>
              <label className="d-flex gap-3 align-items-center" >
                <FaYoutube color="red" fontSize={25}/>
                <input  className="w-100 h-25 p-2" type="text" placeholder="YOUTUBE URL" value={youtube} onChange={(e) => setYoutube(e.target.value)} />
              </label>
              <label className="d-flex gap-3 align-items-center" >
                <FaLinkedin color="blue" fontSize={25}/>
                <input  className="w-100 h-25 p-2" type="text" placeholder="LINKEDIN URL" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} />
              </label>
              <label className="d-flex gap-3 align-items-center" >
                <FaInstagram color="red" fontSize={25}/>
                <input  className="w-100 h-25 p-2" type="text" placeholder="INSTAGRAM URL" value={instagram} onChange={(e) => setInstagram(e.target.value)} />
              </label>
            </div>  }
            
          </div>
          <div className="d-flex gap-3">
            <button type="submit" className="btn btn-primary px-5">Submit</button>
            <Button as={Link} to="/dashboard" variant="info">
                Go Back
            </Button>
          </div>
        </form>
    </div>
  );
};

export default EditProfile;
