import {useFormik} from "formik";
import * as yup from "yup";
import http from "../../../../http";
import classNames from "classnames";
import {useState} from "react";

const RegisterPage = ({changeToLogin}) => {
    const [sendToServer, setSendToServer] = useState(false);

    const initValues = {
        email: '',
        name: '',
        password: '',
        homepage: '',
        image: null
    };

    const createSchema = yup.object({
        email: yup.string().required("Введіть пошту"),
        name: yup.string().required("Введіть ім'я"),
        password: yup.number().required("Введіть пароль"),
        image: yup.mixed().required("Виберіть фото"),
    });
    const onSubmitFormikData = async (values) => {
        console.log("Formik send register ", values);

        setSendToServer(true);
        await http.post('api/auth/register', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                console.log(values, resp);
                changeToLogin();
                formik.setValues(initValues);
                setSendToServer(false);
            })
            .catch(bad => {
                console.log("Bad request", bad);
                setSendToServer(false);
            })

    }
    const onImageChangeHandler = (e) => {
        if (e.target.files != null) {
            const file = e.target.files[0];
            formik.setFieldValue(e.target.name, file);
        }
    }

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <h4 className="text-center mb-4 pb-2">Реєстрація</h4>



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
                    <div className="form-floating mt-2">
                        <input
                            name={'name'}
                            className={classNames("form-control", {"is-invalid": errors.name && touched.name})}
                            placeholder="email" id="inputName"
                            onChange={handleChange}
                            value={values.name}
                        ></input>
                        <label htmlFor="inputName">Ім'я</label>
                        {errors.name && touched.name && <div className="invalid-feedback">
                            {errors.name} </div>}
                    </div>
                    <div className="form-floating mt-2">
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
                    <div className="form-floating mb-4">
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className={classNames("form-control", {"is-invalid": errors.image && touched.image})}
                            onChange={onImageChangeHandler}
                            accept=".png, .gif, .jpg"
                            required
                        />
                        {errors.image && touched.image && <div className="invalid-feedback">{errors.image}</div>}
                        <label htmlFor="image">Зображення</label>
                    </div>
                    <div className="form-floating mt-2">
                        <input
                            name={'homepage'}
                            className="form-control"
                            placeholder="homepage" id="inputHomepage"
                            onChange={handleChange}
                            value={values.homepage}
                        ></input>
                        <label htmlFor="inputHomepage">Посилання на вашу сторінку (Не обов'язково)</label>
                    </div>
                </div>
            <div className="mt-4 d-grid gap-2 col-6 mx-auto">
                <button className="btn btn-primary" type="submit">
                    <div>Зареєструватись</div>
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
export default RegisterPage;