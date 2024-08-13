import Header from './header';
import Footer from './footer';
import Main from './Main';

const LandingPage = ({onLoginSuccess}) => {

  return (
    <>
      <Header onLoginSuccess={onLoginSuccess}/>
	<Main />
      <Footer />
    </>


  );
};

export default LandingPage;
