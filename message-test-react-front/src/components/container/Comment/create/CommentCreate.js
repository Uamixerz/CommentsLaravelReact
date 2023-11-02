import {useFormik} from "formik";
import * as yup from "yup";
import http from "../../../../http";
import classNames from "classnames";
import {useState} from "react";
import InputFile from "./InputFile";
import formatString from "./FormatingStringHTML";
import {useSelector} from "react-redux";

const CommentCreate = ({onSubmit}) => {
    const [sendToServer, setSendToServer] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const initValues = {
        text: '',
        user_id: user.id,
        files: []
    };

    const createSchema = yup.object({
        text: yup.string().required("Напишіть текст"),
        user_id: yup.number().required("Не знайдено користувача")
    });
    const onSubmitFormikData = (values) => {
        values.text = formatString(values.text);
        console.log("Formik send ", values);
        setSendToServer(true);
        http.post('api/comments', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                console.log(values, resp);
                onSubmit();
                setSendToServer(false);
                formik.setValues(initValues);
            })
            .catch(bad => {
                console.log("Bad request", bad);
                setSendToServer(false);
            })
    }



    const formik = useFormik({
        initialValues: initValues,
        validationSchema: createSchema,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formik;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="card">
                <div className="card-body p-4">
                    <h4 className="text-center mb-4 pb-2">Написати коментар</h4>
                    <div className="input-group">
                        <div className="form-floating">
                            <textarea
                                name={'text'}
                                className={classNames("form-control", {"is-invalid": errors.text && touched.text})}
                                placeholder="Leave a comment here" id="floatingTextarea2"
                                style={{height: "100px"}}
                                onChange={handleChange}
                                value={values.text}
                            ></textarea>
                            <label htmlFor="floatingTextarea2">Comments</label>
                            {errors.text && touched.text && <div className="invalid-feedback">
                                {errors.text} </div>}
                            <InputFile parent_id={-1} formik={formik}></InputFile>
                        </div>
                    </div>
                    <div className="mt-4 d-grid gap-2 col-6 mx-auto">
                        <button className="btn btn-primary" type="submit">
                            <div>Надіслати</div>
                            {sendToServer && (
                                <div className="spinner-border mt-1" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </button>

                    </div>

                </div>

            </div>
        </form>
    );
}
export default CommentCreate;