import http from "../../../../http";
import {APP_ENV} from "../../../../env";
import {useState} from "react";

const ModalTxtView = ({fileName,fileId}) => {
    const [text, setText] = useState('');
    const [sendToServer, setSendToServer] = useState(false);
    const uploadText = (id) => {
        setSendToServer(true);
        http.get(`/api/file/text/${id}`)
            .then(response => {
                setText(response.data.text);
            })
            .catch(error => {
            });
        setSendToServer(false);
    };

    return (
        <>
            <div className="modal fade" id={"modalTxtView"+fileName} aria-hidden="true" aria-labelledby={"modalTxtViewLabel"+fileName} tabIndex="-1">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={"modalTxtViewLabel"+fileName}>{fileName}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {text}
                            {sendToServer && (
                                <div className="spinner-border mt-1" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <a onClick={() => uploadText(fileId)} className="btn " data-bs-toggle="modal" href={"#modalTxtView"+fileName} role="button">
                <img style={{maxWidth:'200px'}} src={APP_ENV.BASE_URL + '/uploads/txtFile.png'} alt="Попередній перегляд файлу"/>
            </a>
        </>
    );
}
export default ModalTxtView;
