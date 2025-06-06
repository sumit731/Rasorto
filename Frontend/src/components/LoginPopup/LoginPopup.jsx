import { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import "./LoginPopup.css";
import { StoreContext } from "../../context/StoreContext";
import axios from "axios"

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Login");
    const {url, setToken} = useContext(StoreContext);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;
      setData(data => ({...data, [name]: value}))
    }

    const onLoginHandler = async(e) => {
      e.preventDefault();
      let newUrl = url;
      if(currState === "Login"){
        newUrl += "/api/user/login";
      }
      else{
        newUrl += "/api/user/register"
      }

      try{
      const response = await axios.post(newUrl, data);

      if(response.data.success){
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        setShowLogin(false);
      }
      else{
        alert(response.data.message);
      }
    }
    catch(error){
      console.log("Login/reg error: ",error);
      alert(error.response?.data?.message);
    }
  }


  return (
    <div className="login-popup">
        <form className="login-popup-container" onSubmit={onLoginHandler}>
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt="Close Icon" />
            </div>
            <div className="login-popup-inputs">
                  {currState === "Login" ? <></> : <input name="name" onChange={onChangeHandler} value={data.name} type="text" placeholder="Your name" required />}
                <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder="Your email" required />
                <input name="password" onChange={onChangeHandler} value={data.password} type="password" placeholder="Your password" required />
             </div>
             <button type="submit">{currState==="Sign Up"?"Create Account": "Login"}</button>
             <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>By continuing, i agree to the terms of use & privacy policy.</p>
             </div>
             {currState === "Login" ?
             <p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}>Click here</span></p>:
             <p>Already have an account? <span onClick={()=>setCurrState("Login")}>Login here</span></p>
             }
        </form>
    </div>
  )
}

export default LoginPopup