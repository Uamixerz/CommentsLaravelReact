import CommentItem from "./CommentItem";
import {useEffect, useState} from "react";
import http from "../../../http";
import {useFormik} from "formik";
import {ICommentItem} from "./types";

const CommentShow = ({shouldUpdate, refreshComments}) => {
    const [commentData, setCommentData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [urlCommentGet, setUrlCommentGet] = useState('api/comments');
    useEffect(() => {
        const result = http.get(`${urlCommentGet}`).then(resp => {
            console.log(resp.data);
            setPagination(resp.data.meta);
            setCommentData(resp.data.data);
        }).catch(bad => {
            console.log('bad request', bad);
        });
    }, [shouldUpdate,urlCommentGet]);


    const [sortOrder, setSortOrder] = useState('asc'); // або 'desc' для сортування за спаданням

    const handleSort = (field) => {
        const sortedData = commentData.slice().sort((a, b) => {
            if (a[field] < b[field]) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (a[field] > b[field]) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setCommentData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };


    return (
        <div className="py-4">
            <div className="card">
                <div className="card-body p-4">
                    <h4 className="text-center mb-4 pb-2">Коментарі</h4>
                    <a className="btn btn-outline-primary me-2 mb-4" onClick={() => handleSort('user_name')}>Sort by Name</a>
                    <a className="btn btn-outline-warning me-2 mb-4" onClick={() => handleSort('text')}>Sort by Text</a>
                    <a className="btn btn-outline-success me-2 mb-4" onClick={() => handleSort('email')}>Sort by Email</a>
                    <a className="btn btn-outline-danger me-2 mb-4" onClick={() => handleSort('created_at')}>Sort by Date</a>
                    {commentData && (
                                commentData.map(comment => (
                                    <CommentItem refreshComments={refreshComments} key={'commentItemId'+comment.id} comment={comment}></CommentItem>
                                ))
                    )}
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {pagination && pagination.links.map(link => (
                            <li key={link.label} className={"page-item "+ (!link.active ? '' : 'disabled') + (link.url ? '' : 'disabled')}>
                                <a className="page-link" onClick={()=> setUrlCommentGet(link.url)} dangerouslySetInnerHTML={{ __html: link.label }}></a>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>

    );
}
export default CommentShow;