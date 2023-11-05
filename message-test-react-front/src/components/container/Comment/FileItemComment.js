import {APP_ENV} from "../../../env";

const FileItemComment = ({file,commentId}) => {

    return (
        <div className="col mb-3" id={`FileId${file.id}`}>
            <div className="card h-100">
                {file.url.endsWith('txt') ? (
                    <img src={APP_ENV.BASE_URL + '/uploads/txtFile.png'} alt="Попередній перегляд файлу"/>
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
