import React, { useEffect, useState, useContext } from "react";
import { Card, CardHeader, CardMeta } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { AuthContext } from "../providers/AuthProvider";
import Upvote from "./Upvote";

const AllQuestions = () => {
  const { user } = useContext(AuthContext);
  const [ questions, setQuestions ] = useState([]);
  // const [question, setQuestion] = useState([]);

  useEffect(() => {

    console.log("useEffect triggered");
    Axios
      .get(`/api/all_questions`)
      .then((response) => {
        setQuestions(response.data);
      })
      .catch((error) => {
        alert("error in retrieving questions");
      });
    }, []);
  

  return (
    <div>
    <br />
    <br />
    <h1>All Questions</h1>
    <br />
        {questions.map((q) => (
            <Card key={q.id}>
              <h3><CardHeader><Link to={{
              pathname: `/questionView/${q.id}`,
              idProps: { question: {...q}}
              }}>{q.title}</Link></CardHeader></h3>
               {/* <Upvote qId={question.id} upvote={question.upvote} question={question}></Upvote> */}
            <CardMeta>{q.body}</CardMeta>
            </Card>
        ))}
    </div>
  )
};

export default AllQuestions;
