import React from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/img/LogoMain.png';
import {LogoImage, MenuWrapper} from './style.js';
import Button from '../Button';
import './Menu.css';
import CurrentUser from '../CurrentUser'
import Signout from '../Signout'

function Menu() {
    return (
        <CurrentUser>
        { currentUser => (
        <MenuWrapper>
            <Link to="/">
                <LogoImage src={Logo} alt="AluraFlix logo" />
            </Link>

            {!currentUser &&
            <Button as={Link} to="/sign-in">
                Sign in
            </Button>
            }

            {currentUser && (
                <>
                  <Button as={Link} to="/registration/video">
                    Add Video
                  </Button>

                  <Button as={Link} to="/registration/category">
                    Add Category
                  </Button>

                </>
              )
            }

            {currentUser && <Signout />}

        </MenuWrapper>
        )
        }
        </CurrentUser>
    );
}

export default Menu
