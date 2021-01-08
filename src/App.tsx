import React, {useState} from 'react';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import './style.css';
import QuestionCard from './components/QuestionCard';
import {FetchQuestions} from './API';
import {QuestionState,Difficulty} from './API';
import {Layout, Button, Spin, Space } from 'antd';

const {Header} = Layout


const TOTAL_QUESTIONS = 10

type AnswerObject = {
  questions: string;
  answer: string;
  correct: boolean;
  correct_answer: string
}

const App = ()=> {
  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([])
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true)

   console.log(questions);


  const startTrivia = async ()=>{
    setGameOver(false)
    setLoading(true)
    const newQuestions = await FetchQuestions(TOTAL_QUESTIONS, Difficulty.MEDIUM)
    setQuestions(newQuestions)
    setLoading(false)
    setScore(0)
    setNumber(0)
    setUserAnswers([])
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>)=>{
    if(!gameOver){
      const answer = e.currentTarget.value

      const correct = questions[number].correct_answer === answer

      if(correct) setScore(prevState => prevState + 1)

      const answerObject = {
        questions : questions[number].question,
        answer,
        correct,
        correct_answer: questions[number].correct_answer
      };

      setUserAnswers((prevState) => [...prevState, answerObject])
    }
    
  }

  const nextQuestion = ()=>{
    const nextQuestion = number + 1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true)
    }else{
      setNumber(prevState=> nextQuestion)
    }
    
  }

  


  return (
    <div className="App">
    <Layout className="layout">
    <Header className="header">
      <div style={{display: 'flex', flexDirection: 'row', justifyContent:'space-between'}}>
      <h3 style={{color: '#fff'}}>Start Quiz</h3>
      <Button type="primary" onClick={startTrivia} className="start">Start</Button>
      </div>
    </Header>
    
    
    <div style={{margin: 'auto'}}>
    {!gameOver ? <p className="score">{`Score: ${score}`}</p> :  null}
    {loading &&  <Space size="middle"> 
    <Spin size="large" />
    </Space>}
    </div>

    {!loading && !gameOver && (<QuestionCard 
    questionNr={number + 1}
    totalQuestions = {TOTAL_QUESTIONS}
    question  = {questions[number].question}
    answers = {questions[number].answers}
    userAnswer = {userAnswers ? userAnswers[number] : undefined}
    callBack = {checkAnswer}
    />)}
    <div style={{margin: 'auto'}}>
    {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
      <Button className="start" onClick={nextQuestion} type="primary">Next question</Button>
    ) : null}
    </div>
    
    </Layout>
    </div>);
}

export default App;
