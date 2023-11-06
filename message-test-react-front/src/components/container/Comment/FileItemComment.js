import {APP_ENV} from "../../../env";
import ModalTxtView from "./container/ModalTxtView";

const FileItemComment = ({file,commentId}) => {
    return (
        <div className="col mb-3" id={`FileId${file.id}`}>
            <div className="card h-100">
                {file.url.endsWith('txt') ? (
                    <ModalTxtView fileName={file.url} fileId={file.id}></ModalTxtView>
                ) : (
                    <>
                        <a href={APP_ENV.BASE_URL + '/uploads/' + file.url} data-lightbox={`comment${commentId}File`}>
                            <img style={{maxWidth:'320px'}} src={APP_ENV.BASE_URL + '/uploads/' + file.url} alt="Попередній перегляд файлу"/>
                        </a>
                    </>
                )}
            </div>
        </div>
    );
}
export default FileItemComment;
