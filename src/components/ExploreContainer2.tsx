import './ExploreContainer.css';

import { getAuth,createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

import React, { useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';

interface ContainerProps {
  name: string;
}


let sd = 1;

function test(){


	

const auth = getAuth();

//setIsAuthenticated(true);

//useEffect(() => {});


const [isAuthenticated, setIsAuthenticated] = useState(false); 

onAuthStateChanged(auth, (user) => {




  if (user) {
// useEffect(() => {});
	   setIsAuthenticated(true);
 
       const uid = user.uid;

	   console.log(uid);

   
 
  } 
});

if (isAuthenticated)
{
	 console.log('Reged!!');

	 sd =  1;
}
else
	sd =  0;
	

}



console.log(sd);

const ExploreContainer: React.FC<ContainerProps> = ({ name }) => {










if (name=="muzei")
{






	  return (
   <form  onSubmit={ MyComponent} >
  <label>
    Имя:
    <input type="text" name="name" />
  </label>
  <input type="submit" value="Отправить" />
</form>
  )
}
else if (name=="auth")
{
	




	
  return (
	  <form  onSubmit={SignIn} >
	  <br /><br /><br /><br />
  <label>
    &nbsp;&nbsp;Логин:&nbsp;&nbsp;&nbsp;
    <input type="text" name="login" />
  </label><br /><br />
	   <label>
    &nbsp;&nbsp;Пароль:
    <input type="text" name="password" />
  </label><br /><br />


		
	   <label>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  <a href="/reg" >Регистрация</a>
  </label><br /><br />&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp; <input type="submit" value="Отправить" />
 </form>
	  )
}	
	   
	   else if (name=="reg")
{
	
  return (
	  <form  onSubmit={printForm} >
	  <br /><br /><br /><br />
  <label>
    &nbsp;&nbsp;Логин:&nbsp;&nbsp;&nbsp;
    <input type="text" name="login" />
  </label><br /><br />
	   <label>
    &nbsp;&nbsp;Пароль:
    <input type="text" name="password" />
  </label><br /><br />

	   <label>
 
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;  <select   >
		 <option value="">Права</option>
            <option value="admin">Администратор</option>
            <option value="user">Пользователь</option>
    
          </select>
  </label><br /><br />

		 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;<input type="submit" value="Отправить" />
 </form>
	  )
}	  
	

	  
	  else {

		    return (
    <div id="container">
      <strong>Выставки</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>

				<button onClick={() => SignOut()}>
      Click me!
    </button>
    </div>
  )
	  }


}



function SignOut(){

	 
const auth = getAuth();

   auth.signOut().then(function() {
    console.log('Signed Out');
   // window.location.reload();

    },
    function(error) {
    console.error('Sign Out Error', error);
  });
}


 function SignIn(event){

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








function printForm(event){

 event.preventDefault();

const auth = getAuth();



    createUserWithEmailAndPassword(auth, event.target.login.value, event.target.password.value)
  .then((userCredential) => {
    // Signed in
    const user = userCredential.user;

    const uid = user.uid;

    console.log(user);

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









function MyComponent(event)  {
   event.preventDefault();
  console.log("tima");
}



export default ExploreContainer;
