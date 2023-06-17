
import { Link, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
    const { error} = useRouteError()
    return (
        <div>
            <section className='container text-center'>
                <div className=''>
                  
                    <div className=''>
                       
                           <img className=' img-fluid w-50 h-50' src="https://i.ibb.co/234x00D/841df65e1fae80904356e1c16bb886b6.jpg" alt="" />
                          
                        
                        <h2 className='fw-bold text-danger'>
                            {error?.message}
                        </h2>
                        <div className='success mt-3'> <Link to='/' className=' text-decoration-none'>
                            Back to homepage
                        </Link></div>
                        
                       
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;