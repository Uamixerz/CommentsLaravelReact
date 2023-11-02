import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import {useState} from "react";


const ShowAuth = () => {
    const [loginPage, setLoginPage] = useState(false);
    const changePage = () =>{
        setLoginPage(!loginPage);
    }
    return (

        <div className="card">
            <button className="btn btn-primary" onClick={changePage}>
                {loginPage ? 'Ще не маєте аккаунту? (Зареєструватись)' : 'Вже маєте аккаунт? (Ввійти)'}
            </button>
            <div className="card-body p-4">
                {loginPage ? (<LoginPage></LoginPage>) : (<RegisterPage changeToLogin={changePage}></RegisterPage>)}
            </div>
        </div>
    );
}
export default ShowAuth;