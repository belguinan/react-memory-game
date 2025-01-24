import {Link, Outlet, useLocation, useNavigate} from "react-router-dom";
import Settings from "@/components/Settings";
import {Suspense} from "react";

export default function DefaultLayout() {
    
    const location = useLocation();
    const navigate = useNavigate();

    const navigateTo = (to) => {
        return navigate(to)
    }

    console.log('location.pathname', location.pathname)
    
    return (
        <>
            <div className="h-100 w-100">
                <nav className="navbar navbar-expand border-0 shadow-none">
                    <div className="container">
                        <a
                            className="navbar-brand"
                            onClick={() => navigateTo('/')}
                            href="#"
                        >
                        </a>

                        <div className="collapse my-2 navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mx-auto">
                                <li className={`nav-item border transition-all px-2 px-md-3 py-1 bg-light-subtle rounded-4 mx-2 ${location.pathname === '/' ? 'shadow' : 'shadow-sm'}`}>
                                    <Link className={"nav-link"} to="/">
                                        <span className="fw-semibold">
                                            <i className="bi d-none d-sm-inline bi-controller me-1"></i> Home
                                        </span>
                                    </Link>
                                </li>
                                <li className={`nav-item border transition-all px-2 px-md-3 py-1 bg-light-subtle rounded-4 mx-2 ${location.pathname === '/history' ? 'shadow' : 'shadow-sm'}`}>
                                    <Link className={"nav-link"} to="/history">
                                        <span className="fw-semibold">
                                            <i className="bi d-none d-sm-inline bi-clock-history me-1"></i> History
                                        </span>
                                    </Link>
                                </li>
                                <li className={`nav-item border transition-all px-2 px-md-3 py-1 bg-light-subtle rounded-4 mx-2 ${location.pathname === '/settings' ? 'shadow' : 'shadow-sm'}`}>
                                    <Link className={"nav-link"} to="/settings">
                                        <span className="fw-semibold">
                                            <i className="bi d-none d-sm-inline bi-gear-fill me-1"></i> Settings
                                        </span>
                                    </Link>
                                </li>
                            </ul>
                        </div>


                        <button
                            className="bg-transparent border-0 shadow-none ms-2"
                            type="button"
                            data-bs-toggle="offcanvas"
                            data-bs-target="#offcanvasNavbar"
                            aria-controls="offcanvasNavbar"
                            aria-label="Toggle navigation"
                        >
                            <i className="bi bi-three-dots h4 m-0"></i>
                        </button>
                    </div>
                </nav>
                <div className={`h-100 w-100 py-4`}>
                    <Suspense>
                        <Outlet />
                    </Suspense>
                </div>
            </div>

            <div
                className="offcanvas offcanvas-end"
                tabIndex="-1"
                id="offcanvasNavbar"
                aria-labelledby="offcanvasNavbarLabel"
            >
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                </div>
                <div className="offcanvas-body d-flex flex-column h-100 pt-1">
                    <Settings
                        showTitle={false}
                    />
                </div>
            </div>

        </>

    );
}