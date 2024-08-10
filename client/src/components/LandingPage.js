import Header from './header';
import Footer from './footer';

const LandingPage = ({onLoginSuccess}) => {

  return (
    <>
      <Header onLoginSuccess={onLoginSuccess}/>
      <Footer />
    </>


  );
};

export default LandingPage;
