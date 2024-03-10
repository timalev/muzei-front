import React, { useState   } from 'react';
import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import MessageListItem from '../components/MessageListItem';
import MessageListItemv from '../components/MessageListItemv';
import MessageListItems from '../components/MessageListItems';

import {
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter
} from '@ionic/react';

class ExploreContainer extends React.Component {


	

  constructor(ContainerProps) {
    super(ContainerProps);

    this.name = ContainerProps.name;

	this.url = new URL(window.location.href);

	this.state = {
		user: {},
		shouldRedirect: false,
		statusUser: true,
	    image: null,
	    inputValue: '',
        inputVis: '',
		selMuz: '',
	    descrValue: '',
		descrVisValue: '',
		updValue: '',
	    dataList: [],
		dataListv: [],
		updList: [],
    muzList: [],
    muzListFil: [],
		saveStr: ''
		};  
  }

 

handleRedirect = () => {
	this.setState({shouldRedirect: true});
}


handleInputChange = (e) => {
	this.setState({ inputValue: e.target.value });
}

handleVisChange = (e) => {
	this.setState({ inputVis: e.target.value });
}
handleMuzChange = (e) => {
	this.setState({ selMuz: e.target.value });
}

handleUpdChange = (e) => {
	this.setState({ inputValue: e.target.value });
}

handleDescrVisChange = (e) => {
	this.setState({ descrVisValue: e.target.value });
}
  
handleSearchMuz = (e) => {
  
const filtered = this.state.muzList.filter(entry => Object.values(entry).some(val => typeof val === "string" && val.includes(e.target.value)));
this.setState({ muzListFil: filtered });  

}

handleDescrChange = (e) => {
	this.setState({ descrValue: e.target.value });
}



handleImageChange = (e) => {
	this.setState({ image: e.target.files[0] });
}


componentDidMount() {
    this.authListener();

	//this.handleInputChange2();

   // const url = new URL(window.location.href);


   if (this.url.searchParams.has('id')) {

	const queryString = window.location.search;
	    const urlParams = new URLSearchParams(queryString);
        const id = urlParams.get('id');


	    axios.get("http://localhost:3000/getdatabyid?id=" + id)
		.then(response => { 


			   this.setState({inputValue: response.data[0].names });
			   this.setState({descrValue: response.data[0].descr });
			   this.setState({updValue: id });


			
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});

   }

   if (this.url.searchParams.has('idv')) {

	const queryString = window.location.search;
	    const urlParams = new URLSearchParams(queryString);
        const idv = urlParams.get('idv');

	

	    axios.get("http://localhost:3000/getdatabyidv?idv=" + idv)
		.then(response => { 


			   this.setState({inputVis: response.data[0].names });
			   this.setState({descrVisValue: response.data[0].descr });
			   this.setState({updValue: idv });
				
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});

   }

   if (this.url.searchParams.has('dm')) {

	
	const urlParams = new URLSearchParams(window.location.search);
    const dm = urlParams.get('dm');

	axios.get("http://localhost:3000/delmuz?dm=" + dm).then(response => { 
		this.setState({saveStr: 'Музей удален!' });
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});

   }

    if (this.url.searchParams.has('dv')) {

	
	const urlParams = new URLSearchParams(window.location.search);
    const dv = urlParams.get('dv');

	axios.get("http://localhost:3000/delvis?dv=" + dv).then(response => { 
		this.setState({saveStr: 'Выставка удалена!' });
	  })
		.catch(error => {console.log ("Error sending POST request", error)});
	 }
  
  /*
  	axios.get("http://localhost:3000/testapi").then(response => { 
		console.log(response);
	  })
		.catch(error => {console.log ("Error sending POST request", error)});
	 */



	 const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
   if (user) {



    fetch("http://localhost:3000/getmuzei?user=" + user.email)
      .then((response) => response.json())
      .then((data) => this.setState({ dataList: data }));
     
     
    fetch("http://localhost:3000/getallmuzei")
      .then((response) => response.json())
      .then((data) => this.setState({ muzList: data , muzListFil: data }));

    

    fetch("http://localhost:3000/getvistavki?user=" + user.email)
      .then((response) => response.json())
      .then((data) => this.setState({ dataListv: data }));


	axios.get("http://localhost:3000/getstatus?user=" + user.email).then(response => { 


		//console.log(user.email);

        this.setState({statusUser: response.data[0].statususer });
	
		
		
		// console.log(response.data[0].statususer);
			
	})
		.catch(error => {console.log ("Error sending POST request", error)});






      } 


  });
	

  }

authListener() {

	 const auth = getAuth();
  
  onAuthStateChanged(auth, (user) => {
   if (user) {


    this.setState({ user: user.email });
    
   } else {
    this.setState({ user: null });
    
    
   }
  });
 }







  render() {





if (this.state.shouldRedirect)
{
	return <Redirect to="/auth" />
}



if (this.name=="muzei")
{
    if (this.state.user) {




//console.log(this.state.statusUser);

	 if (this.state.statusUser=="false")
	 {
		 
		 return (<div><br />&nbsp;&nbsp;нет прав для просмотра данной страницы</div>);
	 }


	  return (
		 
		  <form onSubmit={this.handleFormSubmit} >
		  <label> {this.state.saveStr}<br /><br />
	
	  <input type="hidden"  value={this.state.updValue} onChange={this.handleUpdChange} size="5" />
	  Название музея:<br />
	  	  
	  <input type="text"  value={this.state.inputValue} onChange={this.handleInputChange} size="50" /></label>


		   <label> <br /><br />
		  Описание музея:<br />
		  <textarea  cols="55" rows="7" value={this.state.descrValue} onChange={this.handleDescrChange} />
	      </label>
 <label> <br /><br />
		  Добавить фото:<br />
		  

<input type="file" name="image" onChange={this.handleImageChange} />

	      </label>

		  <br /><br /><label>
          <button type="submit" className="button button1">Сохранить</button></label>


			    <br /><br />
		   <a href="/muzeilist">Управление музеями</a>
		  

          </form>
          )
       }else {
		  return (
         <label><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Вы не авторизованы</label>
          )
	  }
}
if (this.name=="vistavki")
{
    



 if (this.state.user) {

	  if (this.state.statusUser=="false")
	 {
		 
		 return (<div><br />&nbsp;&nbsp;нет прав для просмотра данной страницы</div>);
	 }



	  return (
		 
		  <form onSubmit={this.handleFormVisSubmit} >
		  <label> {this.state.saveStr}<br /><br />
	
	  <input type="hidden"  value={this.state.updValue} onChange={this.handleUpdChange} size="5" />

		   <label>
  Выбрать музей<br /> 

		

 <select value={this.state.selMuz} onChange={this.handleMuzChange}>  <option   >Выбор</option>
	  { 
	 
	 this.state.dataList.map(item => 
	 
 (<option  key={item.id} value={item.id}  >{item.names}</option>) )
 }</select>


  </label><br /><br />




	  Название выставки:<br />
	  	  
	  <input type="text"  value={this.state.inputVis} onChange={this.handleVisChange} size="50" />

		  

	      </label>


		   <label> <br /><br />
		  Описание выставки:<br />
		  <textarea  cols="55" rows="7" value={this.state.descrVisValue} onChange={this.handleDescrVisChange} />
	      </label>
 <label> <br /><br />
		  Добавить фото:<br />
		  

<input type="file" name="image" onChange={this.handleImageChange} />

	      </label>

		  <br /><br /><label>
          <button type="submit" className="button button1">Сохранить</button>
		  
		  
		
		  </label>
        
		  <br /><br />
		   <a href="/vistavkilist">Управление выставками</a>
		  
		  
		  </form>


          )


       }else {
		  return (
         <label><br /><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Вы не авторизованы</label>
          )
	  }
}

else if (this.name=="auth")
{
	


if (!this.state.user) {

	console.log(this.state.user);
   return (
	     <form  onSubmit={this.SignIn} >
	       <br /><br />
           <label>
                 &nbsp;&nbsp;Логин:&nbsp;&nbsp;
                <input type="text" name="login" />
               </label><br /><br />
	              <label>
             &nbsp;&nbsp;Пароль:
                <input type="text" name="password" />
              </label><br /><br />
	               <label>
                 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  <a href="/reg" >Регистрация</a>
               </label><br /><br />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <input type="submit" value="Войти" />
                </form>
	        )
     }
     return (
	       <label>
	              <br /><br /><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Вы авторизованы!</div><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button className="button button1" onClick={() => this.SignOut()}>
                Выход
              </button>
	           </label>
          )
	
}	
	   
else if (this.name=="reg")
{
	
  return (
	  <form  onSubmit={this.printForm} >
	  <br /><br /> 
  <label>
    &nbsp;Логин:&nbsp;&nbsp;&nbsp;
    <input type="text" name="login" />
  </label><br /><br />
	   <label>
    &nbsp;&nbsp;Пароль:
    <input type="text" name="password" />
  </label><br /><br />

	   <label>
  &nbsp;&nbsp;Права:
     &nbsp;<select name="type"   >
		
            <option value="администратор">Администратор</option>
            <option value="пользователь">Пользователь</option>
    
          </select>
  </label><br /><br />

		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<input className="button button1" type="submit" value="Войти" />
 </form>
	  )
}	  
	

else if (this.name=="muzeilist")
{
  
 if (this.state.dataList.length==0) return (<div><br />&nbsp;&nbsp;Музеи еще не созданы</div>)
  return (


 <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <br/>
	{this.state.saveStr}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {this.state.dataList.map(m => <MessageListItem key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
 
	  
	  )
}
else if (this.name=="selectmuz")
{
 // console.log(this.state.muzList);
  
  

  
  
  return (


    
 <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       <br/>
&nbsp;&nbsp;Поиск: <input type="text" onChange={this.handleSearchMuz}/> 

        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {
              
              this.state.muzListFil.map(m => <MessageListItems key={m.id} message={m} />)

}
        </IonList>
      </IonContent>
    </IonPage>
 
	  
	  )
}	 

else if (this.name=="vistavkilist")
{

if (this.state.dataListv.length==0) return (<div><br />&nbsp;&nbsp;Выставки еще не созданы</div>)

  return (
  

 <IonPage id="home-page">
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inbox</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       
{this.state.saveStr}
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">
              Inbox
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {this.state.dataListv.map(m => <MessageListItemv key={m.id} message={m} />)}
        </IonList>
      </IonContent>
    </IonPage>
 
	  
	  )
}




	  
	  else {


		 



		    return (
    <div id="container">
      <strong>Выставки</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>

				<button onClick={() => this.SignOut()}>
      Click me!
    </button>
	<br />
					 <button onClick={this.handleRedirect}>Go to Home</button>

	<br /><br />


	

			<input type = "file" onChange = {(e) => this.handleUploader(e.target.files[0])} />
					

					<br />
		
    </div>
  )
	  }


}










SignIn(event){

 event.preventDefault();

// console.log(event.target.login.value)

   const auth = getAuth();


signInWithEmailAndPassword(auth, event.target.login.value, event.target.password.value)
  .then((userCredential) => {

    // Signed in
    const user = userCredential.user;

	 if (user) {
   
      console.log(user);
  }

   
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;


    //alert(errorMessage);
    console.log(errorMessage);
  });

}





SignOut(){

	 
const auth = getAuth();

   auth.signOut().then(function() {
    console.log('Signed Out');
   // window.location.reload();

    },
    function(error) {
    console.error('Sign Out Error', error);
  });
}




handleFormSubmit = (e) => {
	e.preventDefault();
	
	const formData= new FormData();

	formData.append('image', this.state.image);
	formData.append('muzey', this.state.inputValue);
	formData.append('descr', this.state.descrValue);
	formData.append('upd', this.state.updValue);
	formData.append('usr', this.state.user);

	 axios.post("http://localhost:3000/uploadImage", formData)
		.then(response => { 
				console.log ("POST request successful", response.data); 
                 this.setState({saveStr: 'Данные успешно сохранены!' });

				//this.setState({shouldRedirect: true});
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});

}

handleFormVisSubmit = (e) => {
	e.preventDefault();
	
	const formData= new FormData();




	formData.append('image', this.state.image);
	formData.append('muz', this.state.selMuz);
	formData.append('vist', this.state.inputVis);
	formData.append('descr', this.state.descrVisValue);
	formData.append('upd', this.state.updValue);
	formData.append('usr', this.state.user);

	

	 axios.post("http://localhost:3000/uploadVist", formData)
		.then(response => { 
				console.log ("POST request successful", response.data); 
                 this.setState({saveStr: 'Данные успешно сохранены!' });

				//this.setState({shouldRedirect: true});
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});


}






printForm = (event) => {

 event.preventDefault();


 //console.log(event.target.login.value + " / " + event.target.password.value + " / " + event.target.type.value);

const auth = getAuth();



    createUserWithEmailAndPassword(auth, event.target.login.value, event.target.password.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    const uid = user.email;

    console.log(user);


	axios.post("http://localhost:3000/adduser", {
            "email": event.target.login.value,
			"user": uid,
            "type": event.target.type.value
        })
		.then(response => { 
				console.log ("POST request successful", response.data); 

				this.setState({shouldRedirect: true});
				
				
				})
		.catch(error => {console.log ("Error sending POST request", error)});



	
/*
     const db = getDatabase();
       set(ref(db, 'users/' + uid), {
         login: this.loginForm.login,
         password: this.loginForm.password

       })


       .catch((error) => {
 console.log(error);
});
*/


  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log(errorCode + ": " + errorMessage);

   alert(errorMessage);
  });



}











}









export default ExploreContainer;