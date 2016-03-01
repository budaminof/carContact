var mainApp = angular.module('nodeTodo', []).controller('mainController', function($scope, $http) {

    $scope.formData = {}; //is the data shown/entered on the form
    $scope.todoData = {}; //is the data shown on the page?

    // Get all the current entries in the database
    $http.get('/api/v1/todos')
        .success(function(data) {
            $scope.todoData = data;
            console.log("page setup " + data);
        })
        .error(function(error) {
            console.log('Error: ' + error);
        });

    // Delete a todo
    $scope.deleteTodo = function(todoID) {
      $http.delete('/api/v1/todos/' + todoID)
      .success(function(data) {
        $scope.todoData = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    };

    // Create a new todo
    $scope.createTodo = function(todoID) {
        $http.post('/api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {};
                $scope.todoData = data;
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };

    //add new registration to the registered table
    $scope.createReg = function(regID) {
        console.log($scope.formData);
        $http.post('/api/v1/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; //clears the form on the page
                $scope.todoData = data; //puts data into a global?
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
});
