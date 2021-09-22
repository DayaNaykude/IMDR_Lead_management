import React from 'react';
import faker from 'faker';

let users=[],STATUSES=['Active','Pending','Blocked'],ID=['1411s98','23eqw3','asd34','asd234','sd323'],
ADMIN=['Admin','User'];

for(let i=0;i<6;i++){
  users[i]={
    //id:ID[Math.floor(Math.random()*ID.length)],
    name:faker.name.findName(),
    email:faker.internet.email(),
    //admin:ADMIN[Math.floor(Math.random()*ADMIN.length)],
    status:STATUSES[Math.floor(Math.random()*STATUSES.length)]
  }
}
const UserScreen=()=> {
    const paperstyle = {
        padding: 20,
        height: "70vh",
        width: 340,
        margin: "auto 0",
        backgroundColor: "",
      };
    return (
        <div>
           
        
            
            
        </div>
    )
};

export default UserScreen
