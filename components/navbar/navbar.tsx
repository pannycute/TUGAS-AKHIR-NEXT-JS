import {Input, Link, Navbar, Text} from '@nextui-org/react';
import React from 'react';
import {SearchIcon} from '../icons/searchicon';
import {Box} from '../styles/box';
import {BurguerButton} from './burguer-button';

interface Props {
   children: React.ReactNode;
}

export const NavbarWrapper = ({children}: Props) => {
   const collapseItems = [
      'Profile',
      'Dashboard',
      'Activity',
      'Analytics',
      'System',
      'Deployments',
      'My Settings',
      'Team Settings',
      'Help & Feedback',
      'Log Out',
   ];
   return (
      <Box
         css={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            flex: '1 1 auto',
            overflowY: 'auto',
            overflowX: 'hidden',
         }}
      >
         <Navbar
            isBordered
            css={{
               'borderBottom': '1px solid $border',
               'justifyContent': 'center',
               'width': '100%',
               '@md': {
                  justifyContent: 'center',
               },

               '& .nextui-navbar-container': {
                  'border': 'none',
                  'maxWidth': '100%',
                  'gap': '$6',
                  '@md': {
                     justifyContent: 'center',
                  },
               },
            }}
         >
            <Navbar.Content
               css={{
                  width: '100%',
                  justifyContent: 'center',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  zIndex: 10,
                  pointerEvents: 'none',
               }}
            >
               <Text
                 b
                 size={20}
                 css={{
                   color: '#800000',
                   letterSpacing: '1px',
                   fontFamily: 'Poppins, Montserrat, Inter, Arial, sans-serif',
                   textAlign: 'center',
                   width: '100%',
                   userSelect: 'none',
                   pointerEvents: 'auto',
                 }}
               >
                 Sistem Order CV. Lantana Jaya Digital
               </Text>
            </Navbar.Content>
            <Navbar.Content showIn="md" css={{ alignItems: 'center', gap: '$8' }}>
               <BurguerButton />
            </Navbar.Content>
            <Navbar.Content
               hideIn={'md'}
               css={{
                  width: '100%',
               }}
            >
               <Input
                  clearable
                  contentLeft={
                     <SearchIcon
                        fill="var(--nextui-colors-accents6)"
                        size={16}
                     />
                  }
                  contentLeftStyling={false}
                  css={{
                     'w': '100%',
                     'transition': 'all 0.2s ease',
                     '@xsMax': {
                        w: '100%',
                        // mw: '300px',
                     },
                     '& .nextui-input-content--left': {
                        h: '100%',
                        ml: '$4',
                        dflex: 'center',
                     },
                  }}
                  placeholder="Search..."
               />
            </Navbar.Content>

            <Navbar.Collapse>
               {collapseItems.map((item, index) => (
                  <Navbar.CollapseItem
                     key={item}
                     activeColor="secondary"
                     css={{
                        color:
                           index === collapseItems.length - 1 ? '$error' : '',
                     }}
                     isActive={index === 2}
                  >
                     <Link
                        color="inherit"
                        css={{
                           minWidth: '100%',
                        }}
                        href="#"
                     >
                        {item}
                     </Link>
                  </Navbar.CollapseItem>
               ))}
            </Navbar.Collapse>
         </Navbar>
         {children}
      </Box>
   );
};