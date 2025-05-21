import { useState } from "react";
import { patchArticleVotes } from "../utils/api";

export default function VoteButtons({ article_id, initialVotes }) {
  const [voteDelta, setVoteDelta] = useState(0);
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  const handleVote = (voteChange) => {
    setVoteDelta((curr) => curr + voteChange);
    setHasVoted(true);
    setIsSubmitting(true);
    setErr(null);

    patchArticleVotes(article_id, voteChange)
      .then(() => {
        setIsSubmitting(false);
      })
      .catch(() => {
        setVoteDelta((curr) => curr - voteChange);
        setHasVoted(false);
        setIsSubmitting(false);
        setErr("Ooops! Something went wrong. Please try again.");
      });
  };

  return (
    <section className="vote-buttons">
      <p>
        <strong>Votes: </strong>
        {initialVotes + voteDelta}
      </p>
      <button onClick={() => handleVote(1)} disabled={hasVoted || isSubmitting}>
        👍Upvote
      </button>
      <button
        onClick={() => handleVote(-1)}
        disabled={hasVoted || isSubmitting}
      >
        👎Downvote
      </button>
      {err && <p className="err">{err}</p>}
    </section>
  );
}
