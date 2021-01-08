import React from 'react';
import { Card } from 'antd';



type Props = {
    question: string;
    answers: string[];
    callBack: (e: React.MouseEvent<HTMLButtonElement>)=> void;
    userAnswer:any;
    questionNr:number;
    totalQuestions:number
}
const QuestionCard: React.FC<Props> = ({
    question,
    answers,
    callBack,
    userAnswer,
    questionNr,
    totalQuestions
})=>{


    // console.log(userAnswer);
    
    return(
      <>
      <div style={{margin: 'auto'}}>
        <Card title={`Question: ${questionNr}/ ${totalQuestions}`} style={{ width: 300 }}>
        
        
        <p dangerouslySetInnerHTML = {{__html: question}}/>
        
        <div>
            {answers.map((answer, i) =>(
                <div key={i}>
                    <button disabled = {userAnswer} value={answer} onClick={callBack}>
                    <span dangerouslySetInnerHTML = {{__html : answer}}/>
                    </button>    
                </div>
            ))}
       </div>
       </Card>
       </div>
       </>
    );
}

export default QuestionCard;