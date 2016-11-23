var mp4Controllers = angular.module('mp4Controllers', []);

mp4Controllers.controller('UserController', ['$scope', 'CommonData',  '$http', '$window', function($scope, CommonData, $http, $window) {
    
  $scope.data = "";
  $scope.displayText = "";
    $scope.id = "";
    
  $scope.setUsers = function(){
    $scope.displayText = "Data set";
  };
    
  $scope.getUsers = function(){
  };                                  
  
   CommonData.getUsers(function(data){
        $scope.data = data;
        $scope.id = data._id;
   });

    $scope.tasklist = "";
   $scope.removeUser = function(userID){

        CommonData.getPendingTasksForUser(userID,function(data){
            
            $scope.tasklist = data;
            
            console.log("removeUser():: $scope.tasklist:");
            console.log($scope.tasklist);
            
            for(i = 0; i < $scope.tasklist.length; i++){
                CommonData.unassignTask($scope.tasklist[i]._id);
            }
            
            CommonData.removeSingleUser(userID);
        })
        
        
        
       $scope.refresh();
    };
    
    $scope.refresh = function(){
        setTimeout(function(){
            CommonData.getUsers(function(data){
            $scope.data = data;
            $scope.id = data._id;
            });
        },1000);
    }
    
}]);


mp4Controllers.controller('addUserController', ['$scope', '$http', '$window', 'CommonData', function($scope, $http, $window, CommonData){  
    
    //// INPUT FORMS
    $scope.name = "";
    $scope.validname = "";
    $scope.$watch('name', function(){
        var tempData = "";
        
        $http({
            method:'GET',
            url: $window.sessionStorage.baseurl+"/users?where={'name':'"+$scope.name+"'}",
        }).then(
                function successCB(response){
                    //console.log(response.data);
                    tempData = response.data;
                    if(tempData.data.length === 1){
                        //console.log("Name is already Taken");
                        $('#validname').removeClass("green").addClass("red");
                        $scope.validname = "This name is taken, please choose another."
                    }else{
                        //console.log("Name is available!");
                        $('#validname').removeClass("red").addClass("green");
                        $scope.validname = "";
                    }
                },function errorCB(response){
                    console.log("THERE WAS AN ERROR!");                            
                })
    })
    
    $scope.email = ""; 
    $scope.validemail = "";
    $scope.$watch('email', function(){
        var tempData = "";
        
        $http({
            method:'GET',
            url: $window.sessionStorage.baseurl+"/users?where={'email':'"+$scope.email+"'}",
        }).then(
                function successCB(response){
                    //console.log(response.data);
                    tempData = response.data;
                    if(tempData.data.length === 1){
                        //console.log("Email is already Taken");
                        $('#validemail').removeClass("green").addClass("red");
                        $scope.validemail = "This email is taken, please choose another."
                    }else{
                        //console.log("Email is available!");
                        $('#validemail').removeClass("red").addClass("green");
                        $scope.validemail = "";
                    }
                },function errorCB(response){
                    console.log("THERE WAS AN ERROR!");                            
                })
    })
    
    // VARIABLE TO SHOW THE OUTPUT FORM
    $scope.showNewUser = false;
    // OUTPUT FORM
    $scope.newUserData = "";
    $scope.nudName = "";
    $scope.nudEmail = "";
    $scope.nudID = "";
    
    // FUNCTION TO ADD A NEW USER TO THE API
    $scope.newUser = function(){
        console.log("Name:"+$scope.name+", Email:"+$scope.email);
        CommonData.addUser($scope.name, $scope.email, function(data){
            // ASSIGN DATA TO 'newUserData'
            $scope.newUserData = data;
            
            // CHECK IT
            console.log("newUser():: newUserData:");
            console.log($scope.newUserData);
            
            // UPDATE THE VARIABLES TO REFLECT A PROPER USER ENTRY
            $scope.nudName = $scope.newUserData.data.name;
            $scope.nudEmail = $scope.newUserData.data.email;
            $scope.nudID = $scope.newUserData.data._id;
            
            // SET TO TRUE AND SHOW THE DATA FROM HTTP RESPONSE
            $scope.showNewUser = true;
        });
        
        // CLEAR THE INPUT FORMS
        $scope.name="";
        $scope.email="";
    } 
    
    

}]);

mp4Controllers.controller('userDetailController', ['$scope', '$http', 'CommonData', '$routeParams', function($scope, $http, CommonData, $routeParams){
    
    $scope.data = "";
    $scope.name = "";
    $scope.email = "";
    $scope.pendingTasklist = "";
    $scope.completedTasklist = "";
    $scope.userName = "";
    $scope.userID = ""
    
    // PULL CORRECT 'assignedUserName' FROM ID
    CommonData.getSingleUser($routeParams.id, function(data){
        $scope.data = data;
        $scope.userName = $scope.data.name;
        $scope.userID = $scope.data._id;
        $scope.getTasks();
    });
    
    $scope.getTasks = function(){
        
        console.log("$scope.getTasks()");
        
    // GET TASKS BY QUERYING THE 'assignedUserName'
        CommonData.getPendingTasksForUser($scope.userID,function(data){
            $scope.pendingTasklist = data;
            //console.log("$scope.getTasks()::$scope.pendingTasklist");
            //console.log($scope.pendingTasklist);
        })
        
        CommonData.getCompletedTasksForUser($scope.userName,function(data){
            $scope.completedTasklist = data;
            //console.log("$scope.getTasks()::$scope.pendingTasklist");
            //console.log($scope.completedTasklist);
        })
    }
    
    $scope.showCompletedTasksVar = false;
    
    $scope.showCompletedTasks =  function(){
        $scope.showCompletedTasksVar = !($scope.showCompletedTasksVar);
    }
    
    
    $scope.taskCompleted = function(id){
        CommonData.pendingToComplete(id);
        CommonData.removeFromPendingTasks(id, $routeParams.id);
        
        setTimeout(function(){
            $scope.refresh();
        },1000)
        
    }
    
    $scope.refresh = function(){
        $scope.getTasks();
    }
    
}]);

///////////////////////////////////////////////////////////////////////////////////

mp4Controllers.controller('TaskController', ['$scope', '$window', 'CommonData' , '$http', function($scope, $window, CommonData, $http) {
    
    /////////////////////////////   VARIABLES ///////////////////////////////////////
    $scope.apc="";
    $scope.setAPC = function(param){
        $scope.apc = param;
        $scope.offset = 0;
        refresh();
    }
    
    $scope.order="-1";
    $scope.setORDER = function(param){
        $scope.order = param;
        $scope.offset = 0;
        refresh();
    }
        
    $scope.sortby="date_created";
    $scope.setSORTBY = function(param){
        $scope.sortby = param;
        $scope.offset = 0;
        refresh();
    }
    ///////////////////////////////////////////////////////////////////////////////////
    
    $scope.data = "";
    
    CommonData.getTasks($scope.apc, $scope.sortby, $scope.order, $scope.offset, function(data){
        $scope.data = data;
    })

    function refresh(){
        
        CommonData.getTasks($scope.apc, $scope.sortby, $scope.order, $scope.offset, function(data){
            $scope.data = data;
        })
        
        if($scope.offset === 0){
            $scope.showPrevious = false;
        }else{{
            $scope.showPrevious = true;
        }}
    }
    
    /////////////////////////////////////////////////////////////
    
    $scope.deleteTask = function(id){
        
        var userID = "";
        
        CommonData.userIDFromTaskID(id, function(data){
            userID = data;
            CommonData.removeFromPendingTasks(id, userID);
            $scope.delete(id);
            
            // REFRESH THE PAGE
            setTimeout(refresh(),1000);
        })
        setTimeout(refresh(),1000);
        
    }
    
    $scope.delete = function(id){
        
        $http({
            method:'DELETE',
            url: $window.sessionStorage.baseurl+"/tasks/"+id,
        }).then(
            function successCB(response){
                console.log("Task Deleted!");
                
            },
            function errorCB(response){
                console.log("Error while deleting task!");
            })
        
        setTimeout(refresh(),1000);
        
    }
    
    /////////////////////////////////////////////////////////////////
    
    $scope.showPrevious = false;
    $scope.showNext = true;
    
    $scope.offset = 0;
    
    $scope.previous = function(){
        $scope.offset -= 10;
        refresh();
        
    }
    $scope.next = function(){
        $scope.offset +=10;
        refresh();
    }
    
}]);

mp4Controllers.controller('addTaskController', ['$scope', '$http', '$window','$routeParams', 'CommonData', function($scope, $http, $window, $routeParams, CommonData){
    
    $scope.taskname = "";
    $scope.nameEmpty = "";
    $scope.$watch('taskname',function(){
        if($scope.taskname === ""){
            $scope.nameEmpty = true;
        }else{
            $scope.nameEmpty = false;
        }
    })
        

    
    $scope.deadline = "";
    $scope.deadlineEmpty = "";
    $scope.$watch('deadline',function(){
        if($scope.deadline === ""){
            $scope.deadlineEmpty = true;
        }else{
            $scope.deadlineEmpty = false;
        }
    })
    
    $scope.description = "";
    $scope.username = "";
    
    $scope.showNewTaskDetails = false;
        $scope.nuTaskname = "";
        $scope.nuDescription = "";
        $scope.nuDeadline = "";
        $scope.nuUsername = "";
        $scope.nuUserID = "";
        $scope.nuID = "";
    
    $scope.newTaskData = "";
    $scope.tempID = ""; 
    
    $scope.addNewTask = function(){
        
        var tempID = "";
        
        console.log("addNewTask()");
        if($scope.username !== ""){
            CommonData.idFromUserName($scope.username, function(data){
                $scope.nuUserID = data;
                console.log("addNewTask()::nuUserID: "+$scope.nuUserID);
                $scope.post();
            })
        }else{
            $scope.post();
        }
    }
        
        
    $scope.post = function(){ 
        
        console.log("addNewTask()::HTTP POST REQUEST");
        
        $http({
                method:'POST',
                url: $window.sessionStorage.baseurl+"/tasks",
                data: {
                    "name":$scope.taskname,
                    "description":$scope.description, 
                    "assignedUserName":$scope.username, 
                    "assignedUser":$scope.nuUserID,
                    "deadline":$scope.deadline
                },
        }).
        then(
            function successCB(response){
                
                console.log("addNewTask():: HTTP SUCCESS");
                
                $scope.newTaskData = response.data;
                console.log("addNewTask():: newTaskData");
                console.log($scope.newTaskData);
                
                // UPDATE THE DETAILS
                    $scope.nuTaskname = $scope.newTaskData.data.name;
                    $scope.nuDescription = $scope.newTaskData.data.description;
                    $scope.nuDeadline = $scope.newTaskData.data.deadline;
                    $scope.nuUsername = $scope.newTaskData.data.assignedUserName;
                    $scope.nuID = $scope.newTaskData.data._id;
                
                // SHOW THE NEW DETAILS
                $scope.showNewTaskDetails = true;
                
                // ADD THE TASK TO THE CORRECT USER
                if($scope.nuUsername !== ""){
                    console.log("addNewTask()::Adding newly created task to user:"+$scope.nuUsername);
                    CommonData.addTaskToUser($scope.nuUsername, $scope.nuID);
                }
            },
            function errorCB(response){
                    console.log("addNewTask()::HTTP FAILURE: Error adding task!");
            }
           )
        
        $scope.taskname = "";
        $scope.description = "";
        $scope.deadline = "";
        $scope.username = "";
    }
    

        $scope.userList = "";
        $scope.showDroptions = false;
        
        $scope.showDropdown = function(){
            $scope.showDroptions = !($scope.showDroptions);
        }
        
        CommonData.getUsers(function(data){
            $scope.userList = data;
        })
        
        $scope.changeUser = function(userName){
            $scope.username = userName;
            $scope.showDroptions = false;
        }
    

        
        
    
    
}]);


mp4Controllers.controller('taskDetailController', ['$scope', '$http', '$window' ,'$routeParams', 'CommonData', function($scope, $http, $window, $routeParams, CommonData) {
        
        // GENERAL DATA FOR CONTROLLER
        $scope.data = ""
            $scope.name = "";
            $scope.description = "";
            $scope.assignedUserName = "";
            $scope.assignedUser = "";
            $scope.deadline = "";
            $scope.completed = "";
            $scope.dateCreated = "";
    
        // DO YOU WANT TO EDIT THIS TASK?
        $scope.showEditName = false;
        $scope.editName = function(){
            $scope.showEditName = !($scope.showEditName);
            if($scope.showEditName === false){
                $scope.emptyName = false;
            }
        }
        
        $scope.showEditDescription = false;
        $scope.editDescription = function(){
            $scope.showEditDescription = !($scope.showEditDescription);
        }
        
        $scope.showEditUser = false;
        $scope.editUser = function(){
            $scope.showEditUser = !($scope.showEditUser);
        }
        
        $scope.showEditDeadline = false;
        $scope.editDeadline = function(){
            $scope.showEditDeadline = !($scope.showEditDeadline);
            if($scope.showEditDeadline === false){
                $scope.emptyDeadline = false;
            }
        }
        
        $scope.emptyName = false;
        
        $scope.emptyDeadline = false;
        
        $scope.nuData = "";
            $scope.nuName = "";
            $scope.nuDescription = "";
            $scope.nuAssignedUserName = "";
            $scope.nuAssignedUser = "";
            $scope.nuDeadline = "";
            $scope.nuCompleted = "";
    
    
        CommonData.getSingleTask($routeParams.id, function(data){
            $scope.data = data;
                $scope.name = $scope.data.name;
                $scope.description = $scope.data.description;
                $scope.assignedUserName = $scope.data.assignedUserName;
                $scope.assignedUser = $scope.data.assignedUser;
                $scope.deadline = $scope.data.deadline;
                $scope.completed = $scope.data.completed;
                $scope.dateCreated = $scope.data.dateCreated;
        })

        // BITCH ONE
        $scope.changeUser = function(userName){
            
            $scope.showEditUser = false;
            var currentUser = $scope.assignedUserName;
            var newUser = userName;
            var newUserID = "";
            
            //CommonData.unassignTask($routeParams.id);
            
            CommonData.idFromUserName(newUser, function(data){
                newUserID = data;
            })
            
            CommonData.removeFromPendingTasksName($routeParams.id,currentUser);
            CommonData.addTaskToUser(newUser,$routeParams.id);
            
            setTimeout(function(){
                
                CommonData.addUserToTask(newUser, newUserID, $routeParams.id);
                
                //CommonData.addUserIDToTask(newUserID, $routeParams.id);
                
                $scope.refresh();
                
            },1000);
        }
        
        // EASY ONES
        $scope.changeName = function(){
            if($scope.nuName === ""){
                $scope.emptyName = true;
                return;
            }
            
            $scope.data.name = $scope.nuName;
            $http({
                method:'PUT',
                url: $window.sessionStorage.baseurl+"/tasks/"+$routeParams.id,
                data: $scope.data,
            }).
            then(
                function successCB(response){
                    $scope.refresh();
                    $scope.showEditName = false;
                },
                function errorCB(response){      
                })
        }
        $scope.changeDescription = function(){
            $scope.data.description = $scope.nuDescription;
            $http({
                method:'PUT',
                url: $window.sessionStorage.baseurl+"/tasks/"+$routeParams.id,
                data: $scope.data,
            }).
            then(
                function successCB(response){
                    $scope.refresh();
                    $scope.showEditDescription = false;
                },
                function errorCB(response){      
                })
        }
        $scope.changeDeadline = function(){
            if($scope.nuDeadline === ""){
                $scope.emptyDeadline = true;
            }
            $scope.data.deadline = $scope.nuDeadline;
            $http({
                method:'PUT',
                url: $window.sessionStorage.baseurl+"/tasks/"+$routeParams.id,
                data: $scope.data,
            }).
            then(
                function successCB(response){
                    $scope.refresh();
                    $scope.showEditDeadline = false;
                },
                function errorCB(response){      
                })
        }
        $scope.changeCompletion = function(){
            $scope.data.completed = !($scope.data.completed);
            $http({
                method:'PUT',
                url: $window.sessionStorage.baseurl+"/tasks/"+$routeParams.id,
                data: $scope.data,
            }).
            then(
                function successCB(response){
                    $scope.refresh();
                },
                function errorCB(response){      
                })
        }
        
        $scope.refresh = function(){
            setTimeout(function(){
                    CommonData.getSingleTask($routeParams.id, function(data){
                    $scope.data = data;
                    $scope.name = $scope.data.name;
                    $scope.description = $scope.data.description;
                    $scope.assignedUserName = $scope.data.assignedUserName;
                    $scope.assignedUser = $scope.data.assignedUser;
                    $scope.deadline = $scope.data.deadline;
                    $scope.completed = $scope.data.completed;
                    $scope.dateCreated = $scope.data.dateCreated;
                        
                    $scope.emptyDeadline = false;
                    $scope.emptyName = false;
                });
            },1000)
        }
        
        
        $scope.userList = "";
        $scope.showDroptions = false;
        
        $scope.showDropdown = function(){
            $scope.showDroptions = !($scope.showDroptions);
        }
        
        CommonData.getUsers(function(data){
            $scope.userList = data;
        })
        
        
        
        
}]);

mp4Controllers.controller('SettingsController', ['$scope' , '$window' , function($scope, $window) {
  $scope.url = $window.sessionStorage.baseurl;

  $scope.setUrl = function(){
    $window.sessionStorage.baseurl = $scope.url;
    $scope.displayText = "URL set";

  };

}]);

