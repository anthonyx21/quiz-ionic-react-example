import {
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonContent,
    IonFooter,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonSpinner,
    IonTitle,
    IonToolbar,
    IonCardContent
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { getQuiz } from '../services/api';
import { renderHTML, shuffle } from '../utils';
import './Tab2.css';

const Tab2: React.FC = () => {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await getQuiz(
                parseInt(localStorage.getItem('amount') || '5', 10)
            );
            if (response && response.results) {
                setQuestions(response.results);
            }
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchQuestions();
    }, []);
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>
                        Welcome to the <b>Quiz</b> Game
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                {loading && (
                    <div className="ion-text-center ion-padding">
                        <IonSpinner name="crescent" />
                    </div>
                )}
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 1</IonTitle>
                    </IonToolbar>
                </IonHeader>
                {questions && (
                    <>
                        {questions.map((q: any, qIndex: number) => (
                            <IonCard key={`${q} ${Math.random()}`}>
                                <IonCardHeader>
                                    <IonCardSubtitle>
                                        {`Question #${qIndex + 1} - ${
                                            q.category
                                        }`}
                                    </IonCardSubtitle>
                                    <IonCardTitle>
                                        {renderHTML(q.question)}
                                    </IonCardTitle>
                                    <IonRadioGroup
                                        onChange={() => {
                                            console.log('x');
                                        }}
                                    >
                                        {(() => {
                                            const answers = shuffle([
                                                ...q.incorrect_answers,
                                                q.correct_answer
                                            ]);

                                            return answers.map((a, aIndex) => (
                                                <IonItem key={a}>
                                                    <IonLabel>
                                                        {renderHTML(a)}
                                                    </IonLabel>
                                                    <IonRadio value={aIndex} />
                                                </IonItem>
                                            ));
                                        })()}
                                    </IonRadioGroup>
                                </IonCardHeader>
                                <IonCardContent
                                    style={{ color: 'rgba(0,0,0,0)' }}
                                >
                                    {q.correct_answer}
                                </IonCardContent>
                            </IonCard>
                        ))}
                    </>
                )}
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton
                        expand="block"
                        onClick={() => {
                            fetchQuestions();
                        }}
                    >
                        Reset
                    </IonButton>
                    <IonButton expand="block">Submit Answers</IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Tab2;
