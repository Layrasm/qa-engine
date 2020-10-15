import React, { useState, useEffect, useContext } from "react";
import Axios from "axios";
import AnswerForm from "./AnswerForm";
import { Card, CardHeader } from "semantic-ui-react";
import { AuthContext } from "../providers/AuthProvider";



const Question = (props) => {
  const [question, setQuestion] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [comments, setComments] = useState([]);
  const { user } = useContext(AuthContext);


  console.log("Here's the passed down prop", props.match.params.id);

  useEffect(() => {

    console.log("useEffect triggered");
    Axios
      .get(`/api/questions/${props.match.params.id}`)
      .then((response) => {
        setQuestion(response.data);
      })
      .catch((error) => {
        alert("error in retrieving questions");
      });

    // const getAnswers = async () => {
    //   try {
    //     let response = await Axios.get(`/api/questions/${props.match.params.id}/answers`);
    //     console.log("successfully retrieved answers");
    //     setAnswers(response.data);
    //   } catch(err) {
    //     console.log("There was a problem getting answers related to this question");
    //     alert("You done effed up A-Aron.");
    //   }
    // };



      Axios
        .get(`/api/questions/${props.match.params.id}/answers`)
        .then((response) => {
          setAnswers(response.data);
          console.log("successfully retrieved answers");
        })
        .catch((error) => {
          alert("error in retrieving answers for this question");
      });





  }, []);

    const addAnswer = (answer) => {
       Axios
        .post(`/api/questions/${question.id}/answers`, answer) 
        .then((res) => {
          setAnswers([...answers, res.data]);
          // history.push(res.data)
        })
        .catch((err) =>{
          alert("Something went wrong");
      });
    
    }


    return (
      <div>
        <h1>Question:</h1>
        <h2>{question.title}</h2>
        <br />
        <p>{question.body}</p>
        <br />
        <br />
        {answers.map((a) => (
        <p>{a.body}</p>
          // <Card key={a.id}>
          //   <CardHeader>{a.body}</CardHeader>
          // </Card>
        ))}
        <h2></h2>
        <AnswerForm addAnswer={addAnswer} questionID={question.id} user={user}/>
      </div>
    )

}

export default Question;