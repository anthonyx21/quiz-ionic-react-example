import React, { useState } from 'react';
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonInput,
    IonLabel,
    IonItem,
    IonButton,
    IonFooter
} from '@ionic/react';
import './Tab3.css';

const Tab3: React.FC = () => {
    const [amount, setAmount] = useState(localStorage.getItem('amount'));

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 3</IonTitle>
                    </IonToolbar>
                </IonHeader>

                <IonItem>
                    <IonLabel position="floating">Number of Questions</IonLabel>
                    <IonInput
                        value={amount}
                        placeholder="Enter Input"
                        onIonChange={(e) =>
                            e.detail.value && setAmount(e.detail.value)
                        }
                    />
                </IonItem>
            </IonContent>
            <IonFooter>
                <IonToolbar>
                    <IonButton
                        onClick={() =>
                            amount && localStorage.setItem('amount', amount)
                        }
                        expand="block"
                    >
                        Save
                    </IonButton>
                </IonToolbar>
            </IonFooter>
        </IonPage>
    );
};

export default Tab3;
