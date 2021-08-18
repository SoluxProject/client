import React, { useState } from 'react';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../Navbar.css';

export default function MyPageNavbar(props){
    const thisPage = props.page;

    return(
        <div className="nav-bar">
                <div className="menu-toggle">
                {(thisPage === "mypage") &&
                    (
                        <Link to="/">
                        <BsChevronDoubleLeft style={{color: 'white', width: '1.5rem', height: '1.5rem'}} />
                        </Link>
                    )

                }
                {(thisPage !== "mypage") &&
                    (
                        <Link to="/mypage">
                        <BsChevronDoubleLeft style={{color: 'white', width: '1.5rem', height: '1.5rem'}} />
                        </Link>
                    )

                }
                </div>
               
            </div>
    )
}