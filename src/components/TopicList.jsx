import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../utils/api";

export default function TopicList() {
  const [topics, setTopics] = useState([]);

  useEffect(() => {
    getTopics()
      .then((topics) => {
        setTopics(topics)
      })
  }, []);

  return (
    <nav className="topic-list">
      {topics.map((topic) => (
        <Link key={topic.slug} to={`/topics/${topic.slug}`}>
          #{topic.slug}
        </Link>
      ))}
    </nav>
  )
}