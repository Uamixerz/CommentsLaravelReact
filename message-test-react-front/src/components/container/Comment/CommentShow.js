import CommentItem from "./CommentItem";
import {useEffect, useState} from "react";
import http from "../../../http";

const CommentShow = ({shouldUpdate, refreshComments}) => {
    const [commentData, setCommentData] = useState(null);
    const [pagination, setPagination] = useState(null);
    const [urlCommentGet, setUrlCommentGet] = useState('api/comments');
    useEffect(() => {
        http.get(`${urlCommentGet}`).then(resp => {
            //console.log(resp.data);
            setPagination(resp.data.meta);
            setCommentData(resp.data.data);
        }).catch(bad => {
            //console.log('bad request', bad);
        });
    }, [shouldUpdate,urlCommentGet]);


    const [sortOrder, setSortOrder] = useState('asc'); // або 'desc' для сортування за спаданням

    const handleSort = (field) => {
        console.log(commentData);
        const sortedData = commentData.slice().sort((a, b) => {
            const fieldA = getField(a, field);
            const fieldB = getField(b, field);

            if (fieldA < fieldB) {
                return sortOrder === 'asc' ? -1 : 1;
            }
            if (fieldA > fieldB) {
                return sortOrder === 'asc' ? 1 : -1;
            }
            return 0;
        });

        setCommentData(sortedData);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const getField = (object, field) => {
        if (field === 'user.name' || field === 'user.email') {
            const nestedField = field.split('.');
            return object[nestedField[0]][nestedField[1]];
        }
        return object[field];
    };


    return (
        <div className="py-4">
            <div className="card">
                <div className="card-body p-4">
                    <h4 className="text-center mb-4 pb-2">Коментарі</h4>
                    <button className="btn btn-outline-primary me-2 mb-4" onClick={() => handleSort('user.name')}>Sort by Name</button>
                    <button className="btn btn-outline-warning me-2 mb-4" onClick={() => handleSort('text')}>Sort by Text</button>
                    <button className="btn btn-outline-success me-2 mb-4" onClick={() => handleSort('user.email')}>Sort by Email</button>
                    <button className="btn btn-outline-danger me-2 mb-4" onClick={() => handleSort('created_at')}>Sort by Date</button>
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
                                <button className="page-link" onClick={()=> setUrlCommentGet(link.url)} dangerouslySetInnerHTML={{ __html: link.label }}></button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>

    );
}
export default CommentShow;
