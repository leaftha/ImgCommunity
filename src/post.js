import { useParams } from "react-router-dom";
import CommentSection from "./CommentSection";

const Post = () => {
  const { id } = useParams();

  const dummyPost = {
    id,
    title: "샘플 제목",
    imageUrl:
      "https://media.istockphoto.com/id/1154370446/ko/%EC%82%AC%EC%A7%84/%ED%9D%B0%EC%83%89-%EB%B0%B0%EA%B2%BD%EC%97%90-%EA%B3%A0%EB%A6%BD-%EB%90%9C-%EB%B0%94%EC%9C%84-%EC%A0%9C%EC%8A%A4%EC%B2%98%EB%A5%BC-%EB%B3%B4%EC%97%AC%EC%A3%BC%EB%8A%94-%EB%85%B9%EC%83%89-%EC%84%A0%EA%B8%80%EB%9D%BC%EC%8A%A4%EC%97%90-%EC%9E%AC%EB%AF%B8-%EB%84%88%EA%B5%AC%EB%A6%AC.jpg?s=612x612&w=0&k=20&c=atEjJlw_9g7W6SBgISn3sebRa94-zw5GGgyeddCf-AU=",
    caption: "이것은 이미지에 대한 설명입니다.",
  };

  return (
    <div>
      <h1>{dummyPost.title}</h1>
      <img src={dummyPost.imageUrl} alt="게시물" />
      <p>{dummyPost.caption}</p>
      <CommentSection />
    </div>
  );
};

export default Post;
