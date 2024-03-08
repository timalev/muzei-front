import { useState, useEffect } from 'react';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import axios from "axios";
import React from "react";



import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonNote,
  IonPage,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { personCircle } from 'ionicons/icons';
import { useParams } from 'react-router';
import './ViewMessage.css';





function ViewMessage() {


  const [user, setUser] = useState(null);
  const [post, setPost] = useState([]);
  const [vist, setVist] = useState([]);
  const [muzTit, setMuzTit] = useState('');
  const [muzDesc, setMuzDesc] = useState('');
  const [muzPho, setMuzPho] = useState('');
  const [str, setStr] = useState('');
  const [qId, setQId] = useState(null);
  const [visTit, setVisTit] = useState('');
  const [visDesc, setVisDesc] = useState('');
  const [visPho, setVisPho] = useState('');
  



     const url = new URL(window.location.href);

	 if (url.searchParams.has('id')) {


	    const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
		
		useEffect(() => {
			setQId(id);
		}, []);

	 }

//console.log(qId);


const zapis = () => {

	if (qId && user) {

		 axios.get("http://localhost:3000/booking?id=" + qId + "&user=" + user).then((response) => {
		 setStr(response.data);

	   });
	}

}


const params = useParams<{ id: string }>();
const auth = getAuth();


   onAuthStateChanged(auth, (user) => {
   if (user) {
	   setUser(user.uid);
      } 
  });


 useEffect(() => {
	 
	 fetch("http://localhost:3000/getvistavkibymuz?user=" + user + "&muz=" + params.id)
      .then((response) => response.json())
      .then((data) => setVist(data));

   
         }, [user])






if (user )
{

	 axios.get("http://localhost:3000/getmuzeirec?user=" + user + "&id=" + params.id).then((response) => {
		 
		 setMuzTit(response.data[0].names);
	     setMuzDesc(response.data[0].descr);
	     setMuzPho(response.data[0].photos);
    });




	 if (qId) {
		 
		 axios.get("http://localhost:3000/getvistrec?id=" + qId).then((response) => {
			 
			 setVisTit(response.data[0].names);
			 setVisDesc(response.data[0].descr);
			 setVisPho(response.data[0].photos);
		 });
	}





  return (
    <IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Назад" defaultHref="/selectmuz"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>




{qId ? (
          <>
            <IonItem>
        
              <IonLabel className="ion-text-wrap">
                
                <h3>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Карта сайта: <a href={`/sites/${params.id}`} >{muzTit}</a> -- {visTit}
                </h3>
              </IonLabel>
            </IonItem>

            <div className="ion-padding">
              <h1>{visTit}</h1>



				<table >
<tbody>
<tr><td style={{ padding: '5px'}}> <p><img src={`http://localhost:3000/src/uploads/${visPho}`} style={{width:'200px'}} /></p></td>
					
				<td style={{ verticalAlign: 'top', padding: '5px', width: '400px'}}><p>
                {visDesc}
              </p></td></tr>

</tbody>
</table>
	{str}
				<br /><button className="button button1" onClick={zapis} >
      Записаться на выставку
    </button>

              
            </div>
          </>
        ) : (
              <IonItem>
              
              <IonLabel className="ion-text-wrap">

				
                <center><h3 >
               {
						 vist.map((item, index, arr )=> 
	 
 ( 
	 
 <React.Fragment key={index}>
 <a href={`/sites/${params.id}?id=${item.id}`}  key={item.id}   >{item.names}</a>  
 {index!==arr.length -1 && <span> | </span>}
</React.Fragment>
	 
 ) )

}
                </h3></center>

	
        <div className="ion-padding">
              <h1>{muzTit}</h1>

				 <img src={`http://localhost:3000/src/uploads/${muzPho}`} style={{width:'100%'}} />
              <p>
	{muzDesc}
              </p>
            </div>
              </IonLabel>
            </IonItem>


    
        )}


      

       
        



       
      
      </IonContent>
    </IonPage>
  );
}else{
	return (
	<IonPage id="view-message-page">
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Назад" defaultHref="/selectmuz"></IonBackButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
       
         

            <div className="ion-padding">
             
              <p>
                Авторизация..
              </p>
            </div>
       
      
      </IonContent>
    </IonPage>
		);
}








}



export default ViewMessage;
