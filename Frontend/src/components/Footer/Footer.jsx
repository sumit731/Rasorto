import { assets } from '../../assets/assets'
import './Footer.css'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} alt="" className='logo-img' />
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde in sed magni odit! In libero nam, pariatur sint molestias nesciunt?</p>
                    <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} alt="" />
                        <img src={assets.twitter_icon} alt="" />
                        <img src={assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-1234567895</li>
                        <li>contact@Rasorto.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright &copy; 2025 Rasorto.com - All Right Reserved</p>
        </div>
    )
}

export default Footer