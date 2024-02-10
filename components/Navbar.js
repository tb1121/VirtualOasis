import React, { useState } from 'react';
import { AppBar, Toolbar, Button, MenuList, MenuListItem, Separator, TextInput } from 'react95';
import Link from 'next/link';
import Image from 'next/image';
import logoIMG from '../public/Winlogo.ico';
import vaporTeal from 'react95/dist/themes/vaporTeal';
import ms_sans_serif from 'react95/dist/fonts/ms_sans_serif.woff2';
import ms_sans_serif_bold from 'react95/dist/fonts/ms_sans_serif_bold.woff2';
import { createGlobalStyle, ThemeProvider } from 'styled-components';


const Navbar = () => {
  const [open, setOpen] = useState(false);

  // const buttonClick = () => {
  //   alert('hello!')
  // }

  return (
    <ThemeProvider theme={vaporTeal}>
    <AppBar >
      <Toolbar style={{ justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', display: 'inline-block'}}>
          <Button 
            onClick={() => setOpen(!open)}
            active={open}
            style={{ fontWeight: 'bold'}}
          >
            <Image
              src={logoIMG}
              alt='react95 logo'
              style={{width:'75%', height:'75%', padding:'0 .5vw 0 0'}}
             />
            Start
          </Button>
          {open && (
            <MenuList
              style={{
                position: 'absolute',
                left: '0',
                top: '100%',
                // padding: '1vw',
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
                <div style={{padding:'0 0 0 0'}}>Signup</div>
              </MenuListItem>
              </Link>
              <Separator />
              <MenuListItem disabled>
                <span role='img' aria-label='🔙'>
                  🔙
                </span>
                Logout
              </MenuListItem>
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