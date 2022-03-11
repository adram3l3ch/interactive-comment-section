import CommentGroup from "./components/commentGroup/CommentGroup";
import Reply from "./components/reply/Reply";
import { useGlobalContext } from "./context";

function App() {
    const { comments } = useGlobalContext();
    return (
        <main className="app">
            <h1 style={{ position: "absolute", left: "-99999999px" }}>
                Interactive Comment Section
            </h1>
            {comments.map((comment) => (
                <CommentGroup comment={comment} key={comment.id} />
            ))}
            <Reply />
        </main>
    );
}

export default App;
