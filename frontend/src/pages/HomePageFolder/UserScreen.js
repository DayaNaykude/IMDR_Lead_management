import React from 'react';
import MaterialTable from 'material-table';
import { Button} from "@material-ui/core";
import { useState } from "react";
import { useHistory} from "react-router-dom";
import resolve from 'resolve';

const backStyle={
    padding:"0px",
    margin:"0px",
    backgroundColor:"#4ab5da",

  };
  
export const  UserScreen =()=>{
    const[tableData,setTableData]=useState([
    
            {name:'sahil',
            email:'sahirkavitake@gmail.com',
            phoneno:8888888888,
            admin:'Yes',
            },

            {name:'sanika',
            email:'sanikamore@gmail.com',
            phoneno:7777777777,
            admin:'no',
            },

            {name:'prajakta',
            email:'prajaktamore@gmail.com',
            phoneno:8888633198,
            admin:'Yes',
            },

            {name:'gujju',
            email:'abc@gmail.com',
            phoneno:9858239823,
            admin:'no',
            }
         ])
const columns=[
    {
        title:'User Name',field:'name',defaultSort:"asc"
    },
    {
        title:'Email',field:'email',align:""
    },
    {
        title:'Phone No.',field:'phoneno',align:""
    },
    {
        title:'Admin',field:'admin',align:""
    }
]
let history = useHistory();
return (
        <div>
          <Button
              type="submit"
              color="primary"
              variant="contained"
             style={backStyle}
             onClick={() => {
              history.push("/");}}
          >
             Back
            </Button>
          

             <h1 align="center">Users List</h1>
            <MaterialTable title=""
            data={tableData}
            columns={columns}
            editable={{
                onRowUpdate:(newRow,oldRow)=>new Promise((resolve,reject)=>{
                    const updatedData=[...tableData]
                    updatedData[oldRow.tableData.id]=newRow
                    setTableData(updatedData)
                    console.log(newRow,oldRow)
                    setTimeout(() => resolve(),500)
                }),
                onRowDelete:(selectedRow)=>new Promise((resolve,reject)=>{
                    const updatedData=[...tableData]
                    updatedData.splice(selectedRow.tableData.id,1)
                    setTableData(updatedData)
                   
                    console.log(updatedData)
                    setTimeout(() => resolve(),5000)
                })

            }}
            options={{
                paging:false,
                exportButton:true,
                sorting:true,
                searchFieldVariant:"outlined",
                actionsColumnIndex:-1,
                rowStyle:(data,index)=>index%2==0?{background:"#f5f5f5"}:null,
                headerStyle:{background:"#9c66e2",fontStyle:'bold'}
            }}
            

        
            />
            
           
            
        </div>
    )
};

export default UserScreen;
