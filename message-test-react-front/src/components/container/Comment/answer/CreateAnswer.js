import {useFormik} from "formik";
import * as yup from "yup";
import http from "../../../../http";
import classNames from "classnames";
import {useState} from "react";
import formatString from "../create/FormatingStringHTML";
import InputFile from "../create/InputFile";
import {useSelector} from "react-redux";

const CreateAnswer = ({freshComment, parent_id, hideAnswer}) => {
    const [sendToServer, setSendToServer] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const initValuesAnswer = {
        text: '',
        user_id: user.id,
        files: [],
        parent_comment_id: parent_id
    };
    const createSchemaAnswer = yup.object({
        text: yup.string().required("Напишіть текст"),
        user_id: yup.number().required("Не знайдено користувача")
    });
    const onSubmitFormikData = (values) => {
        values.text = formatString(values.text);
        ////console.log("Formik send answer", values);
        setSendToServer(true);
        http.post('api/comments', values, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        })
            .then(resp => {
                ////console.log(values, resp);
                freshComment();
                hideAnswer();
                setSendToServer(false);
                formikAnswer.setValues(initValuesAnswer);
            })
            .catch(bad => {
               // //console.log("Bad request", bad);
                setSendToServer(false);
            })
    };


    const formikAnswer = useFormik({
        initialValues: initValuesAnswer,
        validationSchema: createSchemaAnswer,
        onSubmit: onSubmitFormikData
    });

    const {values, errors, touched, handleSubmit, handleChange} = formikAnswer;

    return (
        <form onSubmit={handleSubmit} noValidate>
            <div className="card">
                <div className="card-body p-4">
                    <div className="input-group">
                        <div className="form-floating">
                            <textarea
                                name={'text'}
                                className={classNames("form-control", {"is-invalid": errors.name && touched.name})}
                                placeholder="Leave a comment here" id="floatingTextarea2"
                                style={{height: "50px"}}
                                onChange={handleChange}
                                value={values.text}
                            ></textarea>
                            <label htmlFor="floatingTextarea2">Comments</label>
                            {errors.name && touched.name && <div className="invalid-feedback">
                                {errors.name} </div>}
                            <div className="row">
                                <div className='col'>
                                    <InputFile key={'Answer' + parent_id} parent_id={parent_id} formik={formikAnswer}></InputFile>
                                </div>

                                <button className="btn btn-primary col p-0 mt-2 mb-2 me-3" type="submit">
                                    <p className="bi bi-send m-0"> Надіслати</p>
                                    {sendToServer && (
                                        <div className="spinner-border mt-1" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </form>
    );
}
export default CreateAnswer;
