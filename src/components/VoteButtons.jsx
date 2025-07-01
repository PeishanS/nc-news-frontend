import { useState, useEffect } from "react";
import { patchArticleVotes } from "../utils/api";

export default function VoteButtons({ article_id, initialVotes }) {
  const voteKey = `vote_${article_id}`;
  const [voteDelta, setVoteDelta] = useState(0);
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasVoted, setHasVoted] = useState(false);

  useEffect(() => {
    const savedVote = localStorage.getItem(voteKey);
    if (savedVote) {
      setHasVoted(true);
      setVoteDelta(parseInt(savedVote));
    }
  }, [voteKey])

  const handleVote = (voteChange) => {
    const newDelta = voteDelta + voteChange;

    setVoteDelta(newDelta);
    setHasVoted(true);
    setIsSubmitting(true);
    setErr(null);

    patchArticleVotes(article_id, voteChange)
      .then(() => {
        localStorage.setItem(voteKey, voteChange)
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
