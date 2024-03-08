import {
  IonItem,
  IonLabel,
  IonNote
  } from '@ionic/react';
import { Message } from '../data/messages';
import './MessageListItem.css';

interface MessageListItemProps {
  message: Message;
}

const MessageListItem: React.FC<MessageListItemProps> = ({ message }) => {
  return (
    <IonItem /*routerLink={`/muzei/${message.id}`}*/ detail={false}>
     <img src={`http://localhost:3000/src/uploads/${message.photos}`} style={{height:'70px'}} />	
      <IonLabel className="ion-text-wrap">
        <h2>
          {message.fromName}
          <span className="date">
            <IonNote>&nbsp;&nbsp;&nbsp;<a href={`/vistavki/?idv=${message.id}`}>ред</a>&nbsp;&nbsp;<a href={`/vistavkilist/?dv=${message.id}`}>удал</a></IonNote>
          </span>
        </h2>
        <h3 >&nbsp;&nbsp;&nbsp; {message.names}</h3>
        <p> 
		  

	&nbsp;&nbsp;&nbsp;{message.descr}
        </p>
      </IonLabel>
    </IonItem>
  );
};

export default MessageListItem;
