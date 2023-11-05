import {APP_ENV} from "../../../../env";

const FileItem = ({file}) => {
    async function removeElement(element) {
        let el = document.getElementById(element);
        el.remove();
    }

    return (
        <div className="col mb-3" id={`FileId${file.id}`}>
            <div className="card h-100">
                <div className="d-flex justify-content-end">
                    <div>
                        <i className='bi bi-x-lg btn'
                           onClick={() => removeElement(`FileId${file.id}`)}>
                        </i>
                    </div>
                </div>
                {file.url.endsWith('txt') ? (
                    <img src={APP_ENV.BASE_URL + '/uploads/txtFile.png'} alt="Попередній перегляд файлу"/>
                ) : (
                    <img style={{maxWidth: '320px'}} src={APP_ENV.BASE_URL + '/uploads/' + file.url} alt="Попередній перегляд файлу"/>
                )}
                <p className='m-0'>{file.url}</p>
            </div>
        </div>
    );
}
export default FileItem;
