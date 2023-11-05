import {useFormik} from "formik";
import * as yup from "yup";
import http from "../../../../http";
import classNames from "classnames";
import {useState} from "react";
import {jwtDecode} from "jwt-decode";
import {useDispatch} from "react-redux";

const LoginPage = () => {
    const [sendToServer, setSendToServer] = useState(false);
    const dispatch = useDispatch();

    const initValues = {
        email: '',
        password: '',
    };

    const createSchema = yup.object({
        email: yup.string().required("Не вірний email"),
        password: yup.number().required("Не вірний пароль")
    });

    const onSubmitFormikData = (values) => {
        //console.log("Formik send ", values);
        setSendToServer(true);
        http.post('api/auth/login', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                const access_token = resp.data.access_token;
                const user = jwtDecode(access_token);

                localStorage.setItem('token', access_token);
                http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                dispatch({
                    type: 'LOGIN_USER',
                    payload: {
                        email: user.email,
                        name: user.name,
                        image: user.image,
                        id: user.id
                    }
                });
            })
            .catch(bad => {
                //console.log("Bad request", bad);
            })
        setSendToServer(false);
    }


    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <form onSubmit={handleSubmit} noValidate>
                    <h4 className="text-center mb-4 pb-2">Вхід</h4>
                    <div className="mt-4 d-grid gap-2 col-6 mx-auto">
                        <div className="form-floating">
                            <input
                                name={'email'}
                                className={classNames("form-control", {"is-invalid": errors.email && touched.email})}
                                placeholder="email" id="inputEmail"
                                onChange={handleChange}
                                value={values.email}
                            ></input>
                            <label htmlFor="inputEmail">Електронна пошта</label>
                            {errors.email && touched.email && <div className="invalid-feedback">
                                {errors.email} </div>}
                        </div>
                        <div className="form-floating mt-3">
                            <input
                                name={'password'}
                                className={classNames("form-control", {"is-invalid": errors.password && touched.password})}
                                placeholder="password" id="inputPassword"
                                onChange={handleChange}
                                value={values.password}
                                type={"password"}
                            ></input>
                            <label htmlFor="inputPassword">Пароль</label>
                            {errors.password && touched.password && <div className="invalid-feedback">
                                {errors.password} </div>}
                        </div>
                    </div>

                    <div className="mt-4 d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-primary" type="submit">
                            <div>Ввійти</div>
                            {sendToServer && (
                                <div className="spinner-border mt-1" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </button>

                    </div>
        </form>
    );
}
export default LoginPage;
