import { AiOutlineLike, AiOutlineDislike } from "react-icons/ai";

const Comments = () => {
  return (
    <>
      <div className="message-container">
        <p className="date">29th May 2026</p>
        <div className="name">About Musa Jarju:</div>
        <p className="comment-msg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          officia labore, iure corporis aliquid exercitationem facere? Sed unde
          corrupti quos.
        </p>
        <div className="comments">
          <p className="time">12:45</p>
          <AiOutlineLike className="like" size={24} />
          <AiOutlineDislike className="dislike" size={24} />
        </div>
      </div>
      <div className="message-container">
        <p className="date">29th May 2026</p>
        <div className="name">About Musa Jarju:</div>
        <p className="comment-msg">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam
          officia labore, iure corporis aliquid exercitationem facere? Sed unde
          corrupti quos.
        </p>
        <div className="comments">
          <p className="time">12:45</p>
          <AiOutlineLike className="like" size={24} />
          <AiOutlineDislike className="dislike" size={24} />
        </div>
      </div>
    </>
  );
};

export default Comments;
