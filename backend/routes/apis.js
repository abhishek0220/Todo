const express = require('express');
const apis = express.Router();

module.exports = function(ref){
    apis.route('/add').post((req, res) => {
        var title = req.body.title;
        var description = req.body.description || "";
        var iscompleted = req.body.iscompleted || false;
        var isfavourite = req.body.isfavourite || false;
        if(title && (typeof(iscompleted) === "boolean") && (typeof(isfavourite) === "boolean")){
            ref.push({
                title : title,
                description: description,
                iscompleted : iscompleted,
                isfavourite : isfavourite 
            }, function(error) {
                if (error) {
                    res.send("Data could not be saved." + error);
                } else {
                    res.send("Data saved successfully.");
                }
            });
        }
        else{
            res.send("Pls send title and other details in correct form");
        }
    });
    apis.route('/todo').get((req, res) => {
        ref.once("value", function(snapshot) {
            res.send(snapshot.val());
        }, function (errorObject) {
            res.send("The read failed: " + errorObject.code);
        }); 
    });
    apis.route('/todo/:id').get((req, res) => {
        var id = req.params.id;
        ref.once("value", function(snapshot) {
            res.send(snapshot.child(id).val());
        }, function (errorObject) {
            res.send("The read failed: " + errorObject.code);
        }); 
    });
    apis.route('/todo/:id/edit').post((req, res) => {
        var new_todo = {};
        var req_body = req.body;
        var arr = ['title', 'description', 'iscompleted', 'isfavourite'];
        for(var key in req_body){
            if(arr.indexOf(key) != -1){
                new_todo[key] = req_body[key]
            }
        }
        if((new_todo.iscompleted == null || (typeof(new_todo.iscompleted) === "boolean")) && (new_todo.isfavourite == null || (typeof(new_todo.isfavourite) === "boolean") ) ){
            var id = req.params.id
            ref.child(id).update(new_todo, function(error) {
                if (error) {
                    res.send("Data could not be saved." + error);
                } else {
                    res.send("Data saved successfully.");
                }
            });
        }
        else res.send("Not valid body")       
    });
    apis.route('/todo/:id/edit').delete((req, res) => {
        var id = req.params.id;
        ref.child(id).remove().then( () => {
            res.send({ status: 'ok' });
        }).catch(function(error) {
            console.log('Error deleting data:', error);
            res.send({ status: 'error', error: error });
        });
    });
    return apis
}
