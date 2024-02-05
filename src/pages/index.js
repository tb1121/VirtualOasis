import Navbar from '../../components/Navbar';
import Spring from '../../components/Spring';

const HomePage = () => {
  return (
    <div style={{ position: 'relative' }}>
      <Navbar />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '0vh' }}>
        <div style={{ margin: 20, padding: 20, overflow: 'hidden' }}>
          <img
            src='/MOSHED-2024-2-5-14-39-16.gif'
            style={{ width: '95vw', height: '95vw', objectFit: 'cover' }}
            alt='Full Screen Gif'
          />
        </div>
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            color: 'white',
            fontSize: '24px',
            textAlign: 'center',
            zIndex: 1,
          }}
        >
          <Spring />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
