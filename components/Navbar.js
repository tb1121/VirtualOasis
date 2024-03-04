import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  AppBar,
  Toolbar,
  Button,
  MenuList,
  MenuListItem,
  Separator,
  Tooltip
} from 'react95';
import Image from 'next/image';
import logoIMG from '../public/Winlogo.ico';
import { useAuth } from './AuthContext';
import Link from 'next/link';
import { original, matrix, vaporTeal, olive, travel, rainyDay, aiee, candy, coldGray, darkTeal, fxDev, marine, ninjaTurtles, peggysPastels, polarized, seawater, solarizedDark, solarizedLight, eggplant, spruce, stormClouds, windows1, wmii, water } from 'react95/dist/themes'; 

const Navbar = ({ handleThemeChange }) => {
  const [open, setOpen] = useState(false);
  const [themeOpen, setThemeOpen] = useState(false);
  const router = useRouter();
  const { Logout, isLoggedIn, username } = useAuth();

  const handleLogout = () => {
    Logout();
    router.push('/');
  };

  const themeOptions = [
    { name: 'Original', theme: original},
    { name: 'Matrix', theme: matrix },
    { name: 'VaporTeal', theme: vaporTeal },
    { name: 'Olive', theme: olive },
    { name: 'Travel', theme: travel },
    { name: 'RainyDay', theme: rainyDay },
    { name: 'Aiee', theme: aiee },
    { name: 'Candy', theme: candy },
    { name: 'ColdGray', theme: coldGray },
    { name: 'DarkTeal', theme: darkTeal },
    { name: 'FxDev', theme: fxDev },
    { name: 'Marine', theme: marine },
    { name: 'NinjaTurtles', theme: ninjaTurtles },
    { name: 'PeggysPastels', theme: peggysPastels },
    { name: 'Polarized', theme: polarized },
    { name: 'Seawater', theme: seawater },
    { name: 'SolarizedDark', theme: solarizedDark },
    { name: 'SolarizedLight', theme: solarizedLight },
    { name: 'EggPlant', theme: eggplant },
    { name: 'Spruce', theme: spruce },
    { name: 'StormClouds', theme: stormClouds },
    { name: 'Windows1', theme: windows1 },
    { name: 'Wmii', theme: wmii },
    { name: 'Water', theme: water }
  ];

  const firstColumn = themeOptions.slice(0, Math.ceil(themeOptions.length / 2));
  const secondColumn = themeOptions.slice(Math.ceil(themeOptions.length / 2));

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
            style={{ fontWeight: 'bold', zIndex: 10 }}
          >
            Theme
          </Button>
          {/* Display theme options menu if themeOpen is true */}
          {themeOpen && (
            <div style={{ display: 'flex', position: 'absolute', right: '0', top: '100%', zIndex: 10 }}>
              <MenuList>
                {firstColumn.map((option, index) => (
                  <MenuListItem
                    key={index}
                    onClick={() => {
                      handleThemeChange(option.theme);
                      setThemeOpen(false); // Close theme options menu
                    }}
                  >
                    {option.name}
                  </MenuListItem>
                ))}
              </MenuList>
              <MenuList style={{ marginLeft: '1rem' }}>
                {secondColumn.map((option, index) => (
                  <MenuListItem
                    key={index}
                    onClick={() => {
                      handleThemeChange(option.theme);
                      setThemeOpen(false); // Close theme options menu
                    }}
                  >
                    {option.name}
                  </MenuListItem>
                ))}
              </MenuList>
            </div>
          )}
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
