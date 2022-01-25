import CommentGroup from "./components/commentGroup/CommentGroup";
import Reply from "./components/reply/Reply";
import { useGlobalContext } from "./context";

function App() {
    const { comments } = useGlobalContext();
    return (
        <div className="app">
            {comments.map(comment => (
                <CommentGroup comment={comment} key={comment.id} />
            ))}
            <Reply />
        </div>
    );
}

export default App;
