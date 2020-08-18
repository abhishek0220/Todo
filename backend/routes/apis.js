const express = require('express');
const apis = express.Router();

module.exports = function(ref){
    apis.route('/add').post((req, res) => {
        var title = req.body.title;
        var description = req.body.description || "";
        var iscompleted = req.body.iscompleted || false;
        var isfavourite = req.body.isfavourite || false;
        if(title){
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
            res.send("Pls send title");
        }
    });
    apis.route('/todo').get((req, res) => {
        var id = req.query.id;
        ref.once("value", function(snapshot) {
            if(id) res.send(snapshot.child(id).val());
            else res.send(snapshot.val());
        }, function (errorObject) {
            res.send("The read failed: " + errorObject.code);
        }); 
    });
    return apis
}
