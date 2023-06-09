
import { Container } from 'react-bootstrap';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Roll from 'react-reveal/Roll';

const ClientsFeedback = () => {
    const feedbackData = [
        {
            id: 1,
            name: 'Michael Johnson',
            title: 'BLACK BELT CHAMPION',
            feedback: 'I have been training in martial arts for many years, and I can confidently say that this program has exceeded my expectations. The instructors are highly skilled and knowledgeable, and the training sessions are intense and rewarding. I have seen tremendous improvements in my technique, strength, and overall fitness level. Highly recommended!',
            image: 'https://i.ibb.co/0tQp51F/team-6.jpg'
        },
        {
            id: 2,
            name: 'Emily Chen',
            title: 'MARTIAL ARTS ENTHUSIAST',
            feedback: 'Joining this martial arts academy has been one of the best decisions I have made. The instructors are passionate and dedicated, and they create a supportive and welcoming environment for all students. The classes are well-structured, challenging, and full of valuable lessons. I have gained confidence, discipline, and self-defense skills through my training here.',
            image: 'https://i.ibb.co/jhnZX4y/team-5.jpg'
        },
        {
            id: 3,
            name: 'David Rodriguez',
            title: 'BEGINNER STUDENT',
            feedback: 'As a beginner in martial arts, I was initially hesitant to start training. However, the instructors here have been incredibly patient and supportive throughout my journey. They break down the techniques in a way that is easy to understand and provide individualized attention to help me improve. I feel more confident and empowered with each class. This martial arts academy is exceptional!',
            image: 'https://i.ibb.co/N1gnJQ8/young-bearded-man-with-striped-shirt.jpg'
        },
        
    ];
    

    return (
        <div  style={{backgroundColor: '#191825', marginBottom: '-20px', paddingBottom: '20px'}}>

            <Container>
            <h1 className='text-center text-white pb-5' style={{paddingTop: '150px'}}>WHAT CLIENTS SAY</h1>
            <Carousel className='text-white'showThumbs={false} autoPlay interval={3000} infiniteLoop>
            {feedbackData.map((feedback) => (
                <div key={feedback.id} className="slide">
                    
                    
                    <div className="icon">
                        <img
                            style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                            }}
                            src={feedback.image}
                            alt=""
                        />
                    </div>
                    <Roll left duration ={3000}>
                                <h3 className="pt-5">{feedback.name}</h3>
                                <p className="pb-3 text-danger fw-semibold">{feedback.title}</p>
                                <p className="p-5 opacity-75">{feedback.feedback}</p>
                            </Roll>
                </div>
            ))}
        </Carousel>
            </Container>
        </div>
    );
};

export default ClientsFeedback;
