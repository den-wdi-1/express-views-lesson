var Candy = require('../models/Candy');

// Index
function getAll(request, response){
  Candy.find({}, function(error, dbCandies){
    if(error) response.json({message: 'Could not find candy b/c:' + error});

    response.render('index', {candies: dbCandies});
  });
}

// Create
function createCandy(request, response){
  var newCandy = new Candy({name: request.body.name, color: request.body.color});
  newCandy.save(function(error) {
    if(error) response.json({messsage: 'Could not create candy b/c:' + error});

    response.json(newCandy);
  });
}

// Show 
function getCandy(request, response) {
  var id = request.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) response.json({message: 'Could not find candy b/c:' + error});

    response.json({candy: candy});
  });
}

function updateCandy(request, response) {
  var id = request.params.id;

  Candy.findById({_id: id}, function(error, candy) {
    if(error) response.json({message: 'Could not find candy b/c:' + error});

    if(request.body.name) candy.name = request.body.name;
    if(request.body.color) candy.color = request.body.color;

    candy.save(function(error) {
      if(error) response.json({messsage: 'Could not update candy b/c:' + error});

      response.json({message: 'Candy successfully updated'});
    });
  });
}

function removeCandy(request, response) {
  var id = request.params.id;

  Candy.remove({_id: id}, function(error) {
    if(error) response.json({message: 'Could not delete candy b/c:' + error});

    response.json({message: 'Candy successfully deleted'});
  });
}

module.exports = {
  getAll: getAll,
  createCandy: createCandy,
  getCandy: getCandy,
  updateCandy: updateCandy,
  removeCandy: removeCandy
}
