import { useState } from "react";
import axios from "axios";

export default function VoteButtons({article_id, initialVotes}) {
  const [voteDelta, setVoteDelta] = useState(0);
  const [err, setErr] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(true);


}