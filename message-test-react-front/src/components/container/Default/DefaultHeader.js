import {useDispatch, useSelector} from "react-redux";
import http from "../../../http";

const DefaultHeader = () => {
    const {isAuth} = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const LogOut = () => {
        delete http.defaults.headers.common["Authorization"];
        localStorage.removeItem("token");
        dispatch({type: 'LOGOUT_USER'});
    }

    return (
        <div className="container">
            <header
                className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
                <div className="col-md-3 mb-2 mb-md-0">
                    <a href="/" className="fs-2 d-inline-flex link-body-emphasis text-decoration-none">
                        <i className="bi bi-bug-fill"></i>
                    </a>
                </div>

                <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                    <li><a href="/" className="nav-link px-2 link-secondary">Home</a></li>
                </ul>

                <div className="col-md-3 text-end">
                    {isAuth ?
                        (<button type="button" onClick={LogOut} className="btn btn-outline-primary me-2">Вийти з
                            акаунту</button>) :
                        (<a href="/" className="fs-2 d-inline-flex link-body-emphasis text-decoration-none"><i
                                className="bi bi-bug-fill"></i></a>
                        )}

                </div>
            </header>
        </div>
    );
};

export default DefaultHeader;
