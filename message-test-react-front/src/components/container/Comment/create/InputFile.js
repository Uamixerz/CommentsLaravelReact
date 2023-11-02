import FileItem from "./FileItem";
import http from "../../../../http";

const InputFile = ({formik,parent_id}) => {
    const uploadToServer = (file) => {

            console.log('file', file);
            http.post('api/file', file, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
                .then(resp => {
                    console.log('file', resp);
                    let updatedFiles = [...formik.values.files];
                    updatedFiles.push(resp.data);
                    formik.setFieldValue('files', updatedFiles);
                    console.log('values', formik.values);
                })
                .catch(bad => {
                    console.log("Bad request", bad);
                })
    };
    const uploadFile = (event) => {
        console.log('files', event.target.files[0]);
        var file = event.target.files[0];
        if (file.type === "text/plain") {
            if (file.size > 102400) {
                return 'exception';
            }
        }
        const formData = new FormData();
        formData.append("file", file);
        uploadToServer(formData);
    }

    return (
        <>
            <div className="mt-2">
                <label className="bi bi-upload bg-primary btn text-white" htmlFor={"inputGroupFile"+parent_id}>
                    &nbsp;&nbsp;Завантажити файл (.png .gif .jpg .txt)
                </label>
                <input type="file" onChange={uploadFile} className="form-control"
                       id={"inputGroupFile"+parent_id}
                       style={{display: 'none'}}
                       accept=".png, .gif, .jpg, .txt"
                />
            </div>
            <div className="container p-0 mt-2">
                <div id={"prewiew_images"+parent_id}
                     className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 ">
                    {formik.values.files && formik.values.files.map(file => (
                        <FileItem key={file.id} file={file}></FileItem>
                    ))}
                </div>
            </div>
        </>
    );
};

export default InputFile;