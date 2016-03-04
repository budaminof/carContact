var mainApp = angular.module('nodeTodo', []).controller('mainController', function($scope, $http) {

    $scope.formData = {}; //is the data shown/entered on the form
    $scope.todoData = {}; //is the data shown on the page?

    //add new registration to the registered table
    $scope.createReg = function(regID) {
      if( Object.keys($scope.formData).length == 7 ){
        $http.post('/api/v1/todos', $scope.formData)
          .success(function(data) {
            console.log("registration successful");
            $scope.formData = {}; //clears the form on the page
            $scope.todoData = data; //puts data into a global?
            localStorage.clear();
            $('.registrationForm').hide();
            $('.mainBodyFadeOut').fadeIn(500);
            $('.registrationError').hide();
          })
          .error(function(error) {
            console.log('Error: ' + error);
          });
      } else {
        //show a message to the user
        console.log("Client side error message");
        $('.registrationError').show();
      }
    };

    $('#messagesButton').on('click', function(){
      if($scope.formData.plateSearch !== undefined && $scope.formData.plateState !== undefined ){
        $('.messages').show();
        $('.plateAndStateForm').hide();
        $('.plateMessageError').hide();
      } else {
        $('.plateMessageError').show();
      }
    });

    //look through the licenseplates, and send a message back if find it?
    $scope.sendByPlate = function(msg) {
      if($scope.formData.plateSearch !== undefined && $scope.formData.plateState !== undefined){
        //$scope.formData.plateState
        $http.get('/api/v1/todos2/'+$scope.formData.plateSearch + '/' + msg)
          .success(function(data){
            console.log($scope);
            $('.messages').hide();
            $('.plateMessageGroup').hide();
            $('.mainBodyFadeOut').fadeIn(500);
            $scope.formData = {}; //clears the form of the page
            console.log( data[0].phonenumber );
          })
          .error(function(error){
            console.log('Error: ' + error);
          })
      } else {
        //show an error message to the user
        $('.plateMessageError').show();
      }
    }
});
