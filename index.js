const express = require('express');
const moment = require('moment');
const app = express();
const port = 8000;

const db = require('./config/mongoose');
const task = require('./models/todo_list');

app.set('view engine','ejs');
app.set('./views', 'home');

app.use(express.urlencoded());
app.use(express.static('assets'));

// var task = [
//     {
//         description: "Lets make TODO App",
//         category: "work",
//         due_date: "04-04-2021"
//     },
//     {
//         description: "Annual report submission deadline",
//         category: "school",
//         due_date: "13-05-2021"
//     }
// ];
// console.log(task.length);

app.get('/',function(req,res){

    task.find({}, function(err,tasks){
        if(err){
            console.log('Error in fetching contacts from db');
            return;
        }
        return res.render('home',{
            title: 'TODO APP',
            todo_list: tasks
    });
});

    // return res.render('home',{
    //     title: 'TODO APP',
    //     todo_list: task
    // });

});

app.post('/create-form',function(req,res){
    // task.push({
    //     description: req.body.description,
    //     category: req.body.category,
    //     due_date: req.body.due_date
    // });
    let date = moment(req.body.due_date).format('DD/MM/YYYY')
    task.create({
        description: req.body.description,
        category: req.body.category,
        due_date: date
    },function(err,newTask){
        if(err){
            console.log('Error on creating a contact');
            return;
        }
        console.log('******',newTask);
        res.redirect('back');
    });
    // res.redirect('back');
});

app.get('/delete-task', function(req,res){
    let id = req.query.id;


    task.findByIdAndDelete(id, function(err){
        if(err){
            console.log('Error in deleting an object from db');
            return;
        }
        return res.redirect('back');
    });
});

// app.get('/delete-task', function(req,res){
//     let category = req.query.category;

//     console.log('category',category);
//     let taskIndex = task.findIndex(work => work.category == category);
//     // let taskIndex = task.findIndex(function(work){
//     //     return work.category == category;
//     // });
//     console.log('taskIndex',taskIndex);
//     if(taskIndex != -1){
//         task.splice(taskIndex,1);
//     }
//     return res.redirect('back');

// });




app.listen(port,function(err){
    if(err){
        console.log(`Error on running the server: ${err}`);
    }
    console.log(`Server is running on port: ${port}`);
});