angular.module('nodeTodo', [])

.controller('mainController', function($scope, $http) {

    $scope.formData = {};
    $scope.todoData = {};

    // Get all todos
    $http.get('/api/v1/todos')
        .success(function(data) {
            $scope.todoData = data;
            console.log(data);
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
        $http.post('/api/v1/todos', $scope.regData)
            .success(function(data) {
                $scope.regData = {};
                //$scope.todoData = data;
                $scope.todoRegData = data;
                console.log("create reg?");
                console.log(data);
            })
            .error(function(error) {
                console.log('Error: ' + error);
            });
    };
});
