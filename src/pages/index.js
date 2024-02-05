import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import Link from 'next/link';

const HomePage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <div style={{ position: 'relative', height: '400px' }}>
        <img
          src='https://images.unsplash.com/photo-1669747876795-4457db215a52?q=80&w=4331&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
          alt="Spiral galaxy with stars"
        />
        <div
          style={{
            position: 'fixed',
            top: '50%', // adjust vertical position
            left: '50%', // adjust horizontal position
            transform: 'translate(-50%, -50%)', // center the text
            color: 'white', // text color
            fontSize: '24px', // text size
            textAlign: 'center', // text alignment
            zIndex: 1, // ensure text stays above the image
          }}
        >
          <p className='color-red-600'>Welcome to MindFullNess</p>
        </div>
      </div>
      <p>Hi there!</p>
      <Link href='/about'>About</Link>
      <Footer />
    </div>
  );
};

export default HomePage;
