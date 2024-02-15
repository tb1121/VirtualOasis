import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Tooltip,
} from 'react95';
import Image from 'next/image';
import logoIMG from '../public/Winlogo.ico';
import { useAuth } from './AuthContext';
import Link from 'next/link';
import { matrix, vaporTeal, olive, travel, rainyDay, aiee, candy, coldGray, darkTeal, fxDev, marine, ninjaTurtles, peggysPastels, polarized, seawater, solarizedDark, solarizedLight, slate, spruce, stormClouds, violetDark, water, wmii, original } from 'react95/dist/themes'; // Importing only the matrix theme


const Navbar = ({ handleThemeChange }) => {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false); // State for theme options menu
  const router = useRouter();
  const { Logout, isLoggedIn, username } = useAuth();

  const handleLogout = () => {
    Logout();
    router.push('/');
  };

  return (
    <AppBar style={{ zIndex: 1000 }}>
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
              {!isLoggedIn ? (
                <Link href='/login'>
                  <MenuListItem>
                    <span role='img' className='Computer4_32x32_4' />
                    Login
                  </MenuListItem>
                </Link>
              ) : (
                <MenuListItem disabled>
                  <span role='img' className='Computer4_32x32_4'></span>
                  Login
                </MenuListItem>
              )}
              <Link href='/signup'>
                <MenuListItem>
                  <span role='img' className='FolderFile_32x32_4'></span>
                  <div style={{ padding: '0 0 0 0' }}>Signup</div>
                </MenuListItem>
              </Link>
              <Separator />
              <MenuListItem onClick={handleLogout} disabled={!isLoggedIn}>
                <span role='img' aria-label='🔙'>
                  🔙
                </span>
                Logout
              </MenuListItem>
            </MenuList>
          )}
        </div>
        {isLoggedIn && username && (
          <p>Welcome <span style={{ fontWeight: 'bold'}}>{username}</span>!</p>

        )}
        {/* Theme button and options */}
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <Button
            onClick={() => setThemeOpen(!themeOpen)}
            active={themeOpen}
            style={{ fontWeight: 'bold', zIndex: 10}}

          >
            Theme
          </Button>
          {/* Display theme options menu if themeOpen is true */}
          {themeOpen && (
            <MenuList
              style={{
                position: 'absolute',
                right: '0',
                top: '100%',
                zIndex: 10,
              }}
            >
              {/* Change theme to matrix when clicked */}
              <MenuListItem
                onClick={() => {
                  handleThemeChange(matrix);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Matrix
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(vaporTeal);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                VaporTeal
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(olive);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Olive
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(travel);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Travel
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(rainyDay);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                RainyDay
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(aiee);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Aiee
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(candy);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Candy
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(coldGray);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                ColdGray
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(darkTeal);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                DarkTeal
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(fxDev);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                FxDev
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(marine);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                Marine
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(ninjaTurtles);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                NinjaTurtles
              </MenuListItem>
              <MenuListItem
                onClick={() => {
                  handleThemeChange(peggysPastels);
                  setThemeOpen(false); // Close theme options menu
                }}
              >
                PeggysPastels 
              </MenuListItem>
            </MenuList>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
