import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator, TextInput } from 'react95';
import Link from 'next/link';
import Image from 'next/image';
import logoIMG from '../public/Winlogo.ico';
import vaporTeal from 'react95/dist/themes/vaporTeal';
import { useAuth } from './AuthContext'; // Import useAuth hook
import { ThemeProvider } from 'styled-components'; // Import ThemeProvider

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { Logout } = useAuth(); // Access Logout function from useAuth hook
  const { isLoggedIn } = useAuth();

  // Function to handle logout
  const handleLogout = () => {
    Logout(); // Call the Logout function from useAuth
    // Redirect to the login page or any other desired page after logout
    router.push('/');
  };

  return (
    <ThemeProvider theme={vaporTeal}>
      <AppBar>
        <Toolbar style={{ justifyContent: 'space-between' }}>
          <div style={{ position: 'relative', display: 'inline-block' }}>
            <Button
              onClick={() => setOpen(!open)}
              active={open}
              style={{ fontWeight: 'bold' }}
            >
              <Image
                src={logoIMG}
                alt='react95 logo'
                style={{ width: '75%', height: '75%', padding: '0 .5vw 0 0' }}
              />
              Start
            </Button>
            {open && (
              <MenuList
                style={{
                  position: 'absolute',
                  left: '0',
                  top: '100%',
                  zIndex: 4,
                }}
                onClick={() => setOpen(false)}
              >
                <Link href="/login">
                  <MenuListItem>
                    <span role='img' className='Computer4_32x32_4'>
                    </span>
                  Login
                  </MenuListItem>
                </Link>
                <Link href="/signup">
                  <MenuListItem>
                    <span role='img' className='FolderFile_32x32_4'>
                    </span>
                    <div style={{ padding: '0 0 0 0' }}>Signup</div>
                  </MenuListItem>
                </Link>
                <Separator />
                {isLoggedIn ?
                <MenuListItem onClick={handleLogout}>
                  <span role='img' aria-label='🔙'>
                    🔙
                  </span>
                  Logout
                </MenuListItem>
                :
                <MenuListItem onClick={handleLogout} disabled>
                <span role='img' aria-label='🔙'>
                  🔙
                </span>
                Logout
                </MenuListItem>
                }
              </MenuList>
            )}
          </div>

          <TextInput placeholder='Search...' width={150} />
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default Navbar;
