import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Button } from 'react-bootstrap';
import '../Home/Home/Banner.css';

const Banner = () => {
    return (

        <Carousel showThumbs ={false} autoPlay interval={3000} infiniteLoop>
            <div className="slider-item">
                <img src="https://i.ibb.co/YWvNDGR/pexels-pixabay-163403.jpg" alt="Image 1" />
                <div className="slider-overlay">
                    <h3 className=' display-3'>EVERY GREAT <br />
                        JOURNEY STARTS WITH <br />
                        ONE STEP! </h3>
                        <Button variant="outline-danger my-3 text-white border-0 border-bottom ">GET A FREE LESSON</Button>
                </div>
            </div>
            <div className="slider-item">
                <img src="https://i.ibb.co/GCBh3vb/two-professional-boxer-boxing-black-smoky.jpg" alt="Image 2" />
                <div className="slider-overlay">
                    <h3 className=' display-3'>BUILDING STRONGER <br />
                        MINDS & BODIES <br />
                        SINCE 1986.</h3>
                    
                    <Button variant="outline-danger my-3 text-white border-0 border-bottom ">GET A FREE LESSON</Button>
                </div>
            </div>
            <div className="slider-item">
                <img src="https://i.ibb.co/LzjjLb4/pexels-cottonbro-studio-7780086.jpg" alt="Image 3" />
                <div className="slider-overlay">
                    <h3 className=' display-3'>WELCOME TO <br />
                        KARATE AND MARTIAL <br />
                        ARTS SCHOOL</h3>
                        <Button variant="outline-danger my-3 text-white border-0 border-bottom ">GET A FREE LESSON</Button>
                </div>
            </div>
            {/* Add more slider items as needed */}
        </Carousel>

    );
};

export default Banner;
