import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from '@ionic/react';

import React, { useState,useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import axios from "axios";
import { Plugins, Capacitor } from '@capacitor/core'


const firebaseConfig = {
  apiKey: "AIzaSyCKhhnOXdBkD2udkP1hZiGrdjlCuSll5OA",
  authDomain: "nearmeeting-afc99.firebaseapp.com",
  databaseURL: "https://nearmeeting-afc99-default-rtdb.firebaseio.com",
  projectId: "nearmeeting-afc99",
  storageBucket: "nearmeeting-afc99.appspot.com",
  messagingSenderId: "819922553345",
  appId: "1:819922553345:web:42cb6c77c8281ede78ce00"
};

initializeApp(firebaseConfig);

import { useLocation } from 'react-router-dom';
import { reorderFourOutline, duplicateOutline, addCircleOutline, personOutline, archiveOutline, archiveSharp, bookmarkOutline, heartOutline, heartSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, trashOutline, trashSharp, warningOutline, warningSharp } from 'ionicons/icons';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import './Menu.css';











//console.log(reged);






interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  isreged: boolean;
}









const Menu: React.FC = () => {


	const [user, setUser] = useState(null);
	const [status, setStatus] = useState("определяется..");

	const [menuUsr, setMenuUsr] = useState(true);
	const [menuAdm, setMenuAdm] = useState(true);
	

    const auth = getAuth();

	useEffect(() => {
		
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user.email);
				} 
		});

    
    

	}, []);


	
	
axios.get("http://localhost:3000/getstatus?user=" + user).then((response) => {

		//console.log(response.data[0].types);

		if (response.data[0])
		{
			// console.log(response.data[0].statususer);


			setMenuUsr(response.data[0].statususer);
			setMenuAdm(response.data[0].statusadmin);
		    setStatus(response.data[0].status);
		}

		 
	   });

// console.log(status);


	
const appPages: AppPage[] = [
 {
    title: 'Авторизация',
    url: '/auth',
    iosIcon: personOutline,
    mdIcon: personOutline,
	isreged: false
  },

  {
    title: 'Создать музей',
    url: '/muzei',
    iosIcon: addCircleOutline,
    mdIcon: addCircleOutline,
	isreged: menuAdm
  },
  {
    title: 'Создать выставку',
    url: '/vistavki',
    iosIcon: duplicateOutline,
    mdIcon: duplicateOutline,
	isreged: menuAdm
  }
	,
  {
    title: 'Выбор музея',
    url: '/selectmuz',
    iosIcon: reorderFourOutline,
    mdIcon: reorderFourOutline,
	isreged: menuUsr
  }
];


	const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>Конструктор сайтов</IonListHeader>
          <IonNote>Статус: {status}</IonNote>
          {appPages.map((appPage, index) => {

	  

            return (
              <IonMenuToggle key={index} autoHide={appPage.isreged}>
                <IonItem className={location.pathname === appPage.url ? 'selected' : ''} routerLink={appPage.url} routerDirection="none" lines="none" detail={false}>
                  <IonIcon aria-hidden="true" slot="start" ios={appPage.iosIcon} md={appPage.mdIcon} />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>


      </IonContent>
    </IonMenu>
  );

};




export default Menu;
