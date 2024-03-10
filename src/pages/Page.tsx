import { IonButtons, IonContent, IonHeader, IonMenuButton, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { useParams } from 'react-router';
import ExploreContainer from '../components/ExploreContainer';
import './Page.css';




const Page: React.FC = () => {

  const { name } = useParams<{ name: string; }>();

let title = name;

if (name=="muzei")
{
	  title = "Создание нового музея";
}
else if (name=="auth")
{
	title = "Авторизация";
}
else if (name=="reg")
{
	title = "Регистрация";
}
	else if (name=="muzeilist")
{
	title = "Управление контентом музеев";
}
		else if (name=="vistavkilist")
{
	title = "Управление контентом выставок";
}
	else if (name=="vistavki")
{
	title = "Создание новой выставки";
}
		else if (name=="selectmuz")
{
	title = "Выбор музея";
}
	

	

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <ExploreContainer name={name} />
      </IonContent>
    </IonPage>
  );





};

export default Page;
