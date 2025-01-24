import { useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Settings from "@/components/Settings";

export default function DefaultLayout() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const navigateTo = (to) => {
        return navigate(to)
    }
    
    return (
        <div className="h-100 w-100">
            <nav className={`navbar border-0 shadow-none`}>
                <div className="container">
                    <a 
                        className="navbar-brand" 
                        onClick={() => navigateTo('/')}
                        href="#"
                    >
                    </a>
                    <button
                        className="navbar-toggler border-0 shadow-none"
                        type="button"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#offcanvasNavbar"
                        aria-controls="offcanvasNavbar"
                        aria-label="Toggle navigation"
                    >
                        <i className="bi bi-gear-fill h3 mb-0"></i>
                    </button>
                    <div
                        className="offcanvas offcanvas-end"
                        tabIndex="-1"
                        id="offcanvasNavbar"
                        aria-labelledby="offcanvasNavbarLabel"
                    >
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                                Menu
                            </h5>
                            <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="offcanvas"
                                aria-label="Close"
                            ></button>
                        </div>
                        <div className="offcanvas-body d-flex flex-column h-100">

                            <ul className="p-3 mt-0 mb-3 card rounded-4 border-0 shadow-sm navbar-nav justify-content-end">
                                <li className="nav-item">
                                    <a
                                        className={`nav-link ${location.pathname === '/' ? 'active fw-bold' : ''}`}
                                        aria-current="page"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasNavbar"
                                        onClick={() => navigateTo('/')}
                                        href="#"
                                    >
                                        Home
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasNavbar"
                                        className={`nav-link ${location.pathname === '/settings' ? 'active fw-bold' : ''}`}
                                        onClick={() => navigateTo('/settings')}
                                        href="#"
                                    >
                                        Settings
                                    </a>
                                </li>
                                <li className="nav-item">
                                    <a
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#offcanvasNavbar"
                                        className={`nav-link ${location.pathname === '/history' ? 'active fw-bold' : ''}`}
                                        onClick={() => navigateTo('/history')}
                                        href="#"
                                    >
                                        History
                                    </a>
                                </li>
                            </ul>

                            <div className="mt-3">
                                <Settings 
                                    showTitle={false}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className={`h-100 w-100 py-4`}>
                <Outlet />
            </div>
        </div>
    );
}