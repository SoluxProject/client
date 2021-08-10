import React, { useState } from 'react';
import { BsChevronDoubleRight } from 'react-icons/bs';
import { BsChevronDoubleLeft } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import '../Navbar.css';

function Navbar(props) {
    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);
    const thisPage = props.page;

    return (
            <div className="nav-bar">
                <div className="menu-toggle">
                    {sidebar ? 
                        <BsChevronDoubleLeft style={{color: 'white', width: '1.5rem', height: '1.5rem'}} onClick={showSidebar}/>
                            :
                        <BsChevronDoubleRight style={{color: 'white', width: '1.5rem', height: '1.5rem'}} onClick={showSidebar}/>
                    }
                </div>
                <ul className={sidebar ? "menu-list-active" : "menu-list"}>
                    <Link to="/">
                        <li>
                            HOME
                        </li>
                    </Link>
                    {(thisPage !== "Todo") &&
                    (<Link to="/todo">
                        <li>
                            TO DO LIST
                        </li>
                    </Link>)
                    }
                    { (thisPage !== "Dday") &&
                    (<Link to="/dday">
                        <li>
                            D-DAY
                        </li>
                    </Link>)
                    }
                    {(thisPage !== "DailyNote") &&
                    (<Link to="/dailynote">
                        <li>
                            DAILY-NOTE
                        </li>
                    </Link>)
                    }
                    {(thisPage !== "Timer") &&
                    (<Link to="/">
                        <li>
                            TIMER
                        </li>
                    </Link>)
                    }
                </ul>
            </div>
    );
};

export default Navbar;
