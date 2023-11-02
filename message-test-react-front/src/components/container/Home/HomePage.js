import CommentCreate from "../Comment/create/CommentCreate";
import CommentShow from "../Comment/CommentShow";
import {useState} from "react";
import ShowAuth from "../Comment/auth/ShowAuth";
import {useSelector} from "react-redux";

const HomePage = () => {
    const [shouldUpdate, setShouldUpdate] = useState(false);
    const { isAuth } = useSelector((store) => store.auth);
    const handleCommentSubmit = () => {
        setShouldUpdate(!shouldUpdate);
    };
    return(
        <>
            {isAuth ? (<CommentCreate onSubmit={handleCommentSubmit}></CommentCreate>) : (<ShowAuth></ShowAuth>)}
            <CommentShow refreshComments = {handleCommentSubmit} shouldUpdate={shouldUpdate}></CommentShow>
        </>
    );
};

export default HomePage;