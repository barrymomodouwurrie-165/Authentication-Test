import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";
import { useAuth } from "../context/AuthContext";

const Comments = () => {
  const { comments } = useAuth();
  return (
    comments &&
    comments.map((item) => {
      return (
        <div className="message-container" key={item._id}>
          <p className="date">{item.date}</p>
          <div className="name">About {item.name}:</div>
          <p className="comment-msg">{item.comment}</p>
          <div className="comments">
            <p className="time">{item.time}</p>
            <AiOutlineLike className="like" size={24} />
            <AiOutlineDislike className="dislike" size={24} />
          </div>
        </div>
      );
    })
  );
};

export default Comments;
