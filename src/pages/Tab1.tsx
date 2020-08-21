import {
    IonButton,
    IonContent,
    IonFooter,
    IonHeader,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRadio,
    IonRadioGroup,
    IonSpinner,
    IonText,
    IonTitle,
    IonToolbar
} from '@ionic/react';
import React, { Fragment, useEffect, useState } from 'react';
import { Question } from '../interfaces/question';
import { getQuiz } from '../services/api';
import { renderHTML, shuffle } from '../utils';
import './Tab1.css';

const Tab1: React.FC = () => {
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
                    <IonTitle>Quiz</IonTitle>
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
                    <IonList>
                        <IonListHeader>Questions</IonListHeader>
                        {(() => {
                            return questions.map((q: Question) => (
                                <Fragment key={`${q.question}`}>
                                    <IonItem>
                                        <IonText>
                                            {renderHTML(q.question)}
                                        </IonText>
                                    </IonItem>
                                    <IonRadioGroup>
                                        {(() => {
                                            const answers = shuffle([
                                                ...q.incorrect_answers,
                                                q.correct_answer
                                            ]);

                                            return answers.map((a: string) => (
                                                <IonItem key={`${a}`}>
                                                    <IonLabel>
                                                        {renderHTML(a)}
                                                    </IonLabel>
                                                    <IonRadio value={`${a}`} />
                                                </IonItem>
                                            ));
                                        })()}
                                    </IonRadioGroup>
                                </Fragment>
                            ));
                        })()}
                    </IonList>
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

export default Tab1;
