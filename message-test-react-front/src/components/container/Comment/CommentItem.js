import FileItemComment from "./FileItemComment";
import CreateAnswer from "./answer/CreateAnswer";
import {useState} from "react";
import DateToString from "./container/DateToString";
import {APP_ENV} from "../../../env";

const CommentItem = ({comment, refreshComments}) => {
    const [showSendAnswer, setShowSendAnswer] = useState(false);
    const hideAnswer = () => {
        setShowSendAnswer(false);
    }
    return (
        <div className="d-flex flex-start" >
            <img className="rounded-circle shadow-1-strong me-3"
                 src={APP_ENV.BASE_URL + '/uploads/' + comment.user.image} alt="avatar" width="65"
                 height="65"/>
            <div className="flex-grow-1 flex-shrink-1">
                <div className="border-bottom pb-2 mb-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <p className="mb-1">
                            {comment.user.name} <span className="small">- {DateToString(comment.created_at)} </span>
                            {comment.user.homepage && (<a className='link-info' href={comment.user.homepage}> - MyHomePage</a>)}

                        </p>
                        <a className="btn" onClick={()=>setShowSendAnswer(!showSendAnswer)}>
                            <i className="fas fa-reply fa-xs"></i>
                            <span className="small"> Відповісти</span>
                        </a>
                    </div>
                    <p className="small mb-0" dangerouslySetInnerHTML={{ __html: comment.text }}>
                    </p>
                    {comment.comment_child.length > 0 && (
                        <a data-bs-toggle="collapse" href={`#collapseChildren${comment.id}`} role="button"
                           aria-expanded="false" aria-controls={`collapseChildren${comment.id}`}>
                            <span className="small"> Показати відповіді</span>
                        </a>
                    )}
                    {comment.files.length > 0 && (
                        <div className="container p-0 mt-2">
                            <div id="preview-images"
                                 className="row gx-4 gx-lg-5 row-cols-2 row-cols-md-3 row-cols-xl-4 ">
                                {comment.files.map(item => (
                                    <FileItemComment key = {'fileCommentId'+item.id} file={item} commentId={comment.id}></FileItemComment>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                {showSendAnswer && ( <CreateAnswer hideAnswer={hideAnswer} freshComment={refreshComments} parent_id={comment.id}></CreateAnswer>)}

                {comment.comment_child.length > 0 && (
                    <div className="collapse" id={`collapseChildren${comment.id}`}>
                        {comment.comment_child.map(comment => (
                            <CommentItem refreshComments={refreshComments} key={comment.id} comment={comment}></CommentItem>
                        ))}
                    </div>
                )}
            </div>
        </div>


    );
}
export default CommentItem;