export default function CommentCard({ comment }) {
  const { author, body, created_at } = comment;

  return (
    <li className="comment-card">
      <p><strong>{author}</strong> -- {new Date(created_at).toLocaleDateString() }</p>
      <p>{body}</p>
    </li>
  )
}