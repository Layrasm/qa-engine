import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardMeta } from "semantic-ui-react";
import { Link } from "react-router-dom";
import Axios from "axios";


const Home = () => {
  const [ questions, setQuestions ] = useState([]);

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
            <CardMeta>{q.body}</CardMeta>
            </Card>
        ))}
    </div>
  )
};

export default Home;
