import React from "react";
import MaterialTable from "material-table";
import Box from '@material-ui/core/Box';

const boxStyle={
    marginTop:"60px",
    marginLeft:"20px",
    marginRight:"20px",
  };
const textStyle={
    marginTop:"50px",
    marginLeft:"42%",
    color:"red",

} 
const TasksScreenUser=()=>{
const data=[
    {
        name:'Sanika more',
        email:'sanikamore@gmail.com',
        contact:'8888888888',
        created_ON:'12/09/2022',
        source:'Instagram',
        stream:'Science',
        entrance:'CAT',
        percentile:'99.99',
        lead:'lead 2',
        
    },
    {
        name:'Sahil Kavitake',
        email:'sahie.kavitake202@gmail.com',
        contact:'1234567890',
        created_ON:'12/09/2022',
        source:'fb',
        stream:'Science',
        entrance:'CAT',
        percentile:'99.99',
        lead:'lead 2',
        
    },
    {
        name:'Arushi more',
        email:'arushimore@gmail.com',
        contact:'8888988967',
        created_ON:'22/09/2022',
        source:'Instagram',
        stream:'Science',
        entrance:'CAT',
        percentile:'99',
        lead:'lead 2',
        
    },
    {
        name:'Prajakta maruti more',
        email:'prajumore@gmail.com',
        contact:'8767610063',
        created_ON:'13/09/2022',
        source:'Instagram',
        stream:'Science',
        entrance:'CAT',
        percentile:'98',
        lead:'lead 2',
        
    }

]
const column=[
    {title:'Name', field:'name',filtering:false},
    {title:'Email ID', field:'email', align:'center',filtering:false},
    {title:'Contact Number',field:'contact', align:'center',filtering:false},
    {title:'Created ON', field:'created_ON'},
    {title:'Source', field:'source',align:'left'},
    {title:'Entrance', field:'entrance'},
    {title:'Percentile', field:'percentile'},
    {title:'Lead Status', field:'lead'},

]
return(
    <div>
        <h1 style={textStyle}>Lead Management</h1>
        <Box style={boxStyle}>
        <MaterialTable title=""
        data={data}
        columns={column}
        options={{
            filtering:true,
            exportButton:true,
            search:true,
            toolbar:true,
            searchFieldVariant:"outlined",
            pageSizeOptions:[5,15,20,25,30,50,100],
            paginationType:"stepped",
        }}
        editable={{
            
            
        }}
        />
        </Box>

    </div>
)
};
export default TasksScreenUser;