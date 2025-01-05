import React, { useState } from "react";
import { Button } from "reactstrap";

const Comments = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      user: "귈임 이",
      profilePic: "/images/avtar.jpg",
      time: "11 months ago",
      comment: "Attention to detail is evident in every aspect of the project",
      replies: [
        {
          id: 11,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Thanks a lot! I’m thrilled you like it. Wishing you endless creativity!",
        },
      ],
    },
    {
      id: 2,
      user: "Greg Rutkowski",
      profilePic: "/images/avtar2.jpg",
      time: "11 months ago",
      comment: "Grandes",
      replies: [
        {
          id: 12,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Much appreciated! I hope it inspires your own creative journey.",
        },
      ],
    },
    {
      id: 3,
      user: "듀게미",
      profilePic: "/images/avtar3.png",
      time: "11 months ago",
      comment: "Such a great project",
      replies: [
        {
          id: 13,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Thank you! I’m glad it resonates with you. Keep being awesome!",
        },
      ],
    },
    {
      id: 4,
      user: "Koke Nunez",
      profilePic: "/images/avtar4.png",
      time: "11 months ago",
      comment: "Congrats",
      replies: [
        {
          id: 14,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Your support means the world to me. May your creativity soar!",
        },
      ],
    },
    {
      id: 5,
      user: "Sandro Silva",
      profilePic: "/images/avtar5.png",
      time: "1 year ago",
      comment: "Project effectively balances aesthetics with practicality",
      replies: [
        {
          id: 15,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "I’m so grateful for your kind words. Wishing you all the best in your projects!",
        },
      ],
    },
    {
      id: 6,
      user: "Josie Alliano",
      profilePic: "/images/avtar6.png",
      time: "1 year ago",
      comment: "AWS work!",
      replies: [
        {
          id: 16,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Thank you for the love! I’m happy it’s helpful. Here’s to your success!",
        },
      ],
    },
    {
      id: 7,
      user: "Andrii Vasyliev",
      profilePic: "/images/avtar7.png",
      time: "1 year ago",
      comment: "Amazing project. So much work.",
      replies: [
        {
          id: 17,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Your feedback is invaluable. Thanks and may you achieve great things!",
        },
      ],
    },
    {
      id: 8,
      user: "Maria Lee",
      profilePic: "/images/avtar8.png",
      time: "1 year ago",
      comment: "Impressive",
      replies: [
        {
          id: 18,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Thanks for sharing the vibe! I’m glad it’s making a difference. Cheers to creativity!",
        },
      ],
    },
    {
      id: 9,
      user: "George Vorodi",
      profilePic: "/images/avtar9.png",
      time: "1 year ago",
      comment: "Профессиональное исполнение проекта",
      replies: [
        {
          id: 19,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "I appreciate your support! Excited to see where your creativity takes you.",
        },
      ],
    },
    {
      id: 10,
      user: "Antonella Fant",
      profilePic: "/images/avtar10.png",
      time: "1 year ago",
      comment:
        "Projekt wykazuje dobre wyczucie kompozycji i hierarchii wizualnej",
      replies: [
        {
          id: 20,
          user: "Designluch",
          profilePic: "/images/hicon.jpg",
          time: "10 months ago",
          comment:
            "Thank you! It’s an honor to contribute to your creative process. Keep shining!",
        },
      ],
    },
  ]);

  const [newComment, setNewComment] = useState("");

  const handlePostComment = () => {
    if (newComment.trim() !== "") {
      const newCommentObj = {
        id: comments.length + 1,
        user: "You",
        profilePic: "/images/user.jpg", // Replace with actual profile pic path
        time: "Just now",
        comment: newComment,
        replies: [],
      };
      setComments([newCommentObj, ...comments]);
      setNewComment("");
    }
  };

  return (
    <div>
      {/* Add Comment Box */}
      <div
        style={{
          border: "1px solid #007bff",
          borderRadius: "5px",
          padding: "10px",
          marginBottom: "20px",
          position: "relative", // To position the button relative to this box
        }}
      >
        <div className="d-flex align-items-start">
          <img
            src="/images/avtar1.jpg" // Replace with actual profile pic path
            alt="Your profile"
            style={{ width: "40px", height: "40px", borderRadius: "50%" }}
          />
          <textarea
            placeholder="Add a comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            style={{
              marginLeft: "10px",
              flex: 1,
              border: "none",
              resize: "none",
              outline: "none",
              width: "100%",
              height: "60px", // Adjust height for multiline
            }}
            rows={3}
          />
        </div>
        <Button
          color="light"
          style={{
            position: "absolute",
            bottom: "10px",
            right: "10px",
            color: "#fff",
            background: "#007bff",
          }}
          onClick={handlePostComment}
          disabled={!newComment.trim()}
        >
          Post
        </Button>
      </div>

      {/* Comments Count */}
      <div>
        <h6 style={{ fontWeight: "bold" }}>{comments.length} comments</h6>
      </div>

      {/* Comments Section */}
      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="mb-4">
            {/* Main Comment */}
            <div className="d-flex align-items-start">
              <img
                src={comment.profilePic}
                alt={comment.user}
                style={{
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  marginRight: "10px",
                }}
              />
              <div>
                <div className="d-flex justify-content-between align-items-center">
                  <strong>{comment.user}</strong>
                  <small style={{ marginLeft: "10px", color: "gray" }}>
                    {comment.time}
                  </small>
                </div>
                <p style={{ margin: "5px 0" }}>{comment.comment}</p>
              </div>
            </div>

            {/* Replies */}
            {comment.replies.map((reply) => (
              <div
                key={reply.id}
                className="d-flex align-items-start"
                style={{ marginLeft: "50px", marginTop: "10px" }}
              >
                <img
                  src={reply.profilePic}
                  alt={reply.user}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    marginRight: "10px",
                  }}
                />
                <div>
                  <div className="d-flex justify-content-between align-items-center">
                    <strong>{reply.user}</strong>{" "}
                    <small style={{ marginLeft: "10px", color: "gray" }}>
                      {reply.time}
                    </small>
                  </div>
                  <p style={{ margin: "5px 0" }}>{reply.comment}</p>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
