//import './index_css.css'
import image from './assets/GateImage&Signture.png'
function About() {
    return (
        <div className="about-content">
            <img src={image} className="img-fluid" alt="gate" />
            <div>
                <h2>About Our Store</h2>
                <p>Welcome to Walk Away!
                    We are committed to providing you with the best shopping experience.
                    Our store offers a wide range of products, from the latest fashion trends to everyday essentials.
                    Our goal is to make sure you find what you need quickly and easily, with excellent customer service every step of the way.</p>
                <p>Explore our collection and enjoy shopping with us!</p>
            </div>
        </div>
    );
}

export default About;
