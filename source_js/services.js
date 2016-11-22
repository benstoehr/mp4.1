var mp4Services = angular.module('mp4Services', []);

mp4Services.factory('CommonData', ['$http', '$window', function($http, $window){
    var responseData = "";
    var nuData = "";
    
    return{
        
        //////////// USERS 
        
        // RETURN A LIST OF ALL USERS FROM API        
        getUsers : function(callback){
            
            // VARIABLES
            var responseData = "";
            var userListData = "";
            
            // START IT UP
            console.log("getUsers()");
            
            console.log("getUsers():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/users",
            }).
            then(
                function successCB(response){
                    console.log("getUsers():: HTTP GET SUCCESS");
                    responseData = response.data;
                    
                    userListData = responseData.data;
                    
                    console.log("getUsers():: userListData");
                    console.log(userListData);
                    callback(userListData);
                },
                function errorCB(response){
                    console.log("getUsers():: HTTP GET FAILURE");
                });
        
        },
        
        // RETURNS A SINGLE USER GIVEN AN ID
        getSingleUser : function(userID, callback){
            
            var responseData = "";
            var userData = "";
            var userName = "";
            
            console.log("getSingleUser()");
            
            console.log("getSingleUser():: HTTP GET REQUEST");
            
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/users/"+userID,
            }).
            then(
                function successCB(response){
                    
                    console.log("getSingleUser():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    
                    // CHECK IT
                    console.log("getSingleUser():: responseData:");
                    console.log(responseData);
                
                    userData = responseData.data;
                    
                    // CHECK IT
                    console.log("getSingleUser():: userData:");
                    console.log(userData);
                    
                    // SEND BACK THE SINGLE USER'S DATA
                    callback(userData);
                },
                function errorCB(response){
                    console.log("getSingleUser():: HTTP GET FAILURE");
                });
        
        },
        
        // ADDS A USER TO THE API DATABASE
        addUser : function(name, email, callback){
            
            // VARIABLES
            var responseData = "";
            
            // START IT UP
            console.log("addUser()");
            
            console.log("addUser():: HTTP POST REQUEST");
            $http({
                method:'POST',
                url:$window.sessionStorage.baseurl+"/users/",
                data:{"name":name, "email":email},
            }).
            then(
                function succesCB(response){
                    console.log("addUser():: HTTP POST SUCCESS");
                   
                    responseData = response.data;
                    console.log("addUser():: responseData");
                    console.log(responseData);
                    
                    callback(responseData);
            },
                function errorCB(response){
                    console.log("addUser():: HTTP POST FAILURE");
            })
        },
        
        // REMOVES A SINGLE USER, MUST BE USED WITH UNASSIGN FUNCTION
        removeSingleUser : function(id){
            
            console.log("removeSingleUSer()");
            
            console.log("removeSingleUSer():: HTTP DELETE REQUEST");
            $http({
                method:'DELETE',
                url: $window.sessionStorage.baseurl+"/users/"+id,
            }).
            then(
                function successCB(){
                    console.log("removeSingleUSer():: HTTP DELETE SUCCESS");
                    console.log("User Removed!");
                },
                function errorCB(){
                    console.log("removeSingleUSer():: HTTP DELETE FAILURE");
                    console.log("Error while removing user!");
                })
        },
        
        // CALLBACK STORES ALL TASKS RELATED TO THE USER
        getAllTasksForUser : function(userID, callback){
            
            // VARIABLES
            var responseData="";
            var taskList = "";
            
            console.log("getAllTasksForUser():: BEGIN");
            
            console.log("getAllTasksForUser():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks?where={'assignedUser':'"+userID+"'}",
            }).then(
                function successCB(response){
                    
                    console.log("getAllTasksForUser():: HTTP SUCCESS");
                    
                    responseData = response.data;
                    console.log("getAllTasksForUser():: responseData: ");
                    console.log(responseData);
                    
                    taskList = responseData.data;
                    console.log("getAllTasksForUser():: taskList: ");
                    console.log(taskList);
                    
                    callback(taskList);
                },
                function errorCB(response){
                    console.log("getAllTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.");
                })
        },
             
        //  CALLBACK STORES PENDING TASKS IN SUPPLIED FIELD
        getPendingTasksForUser : function(userName, callback){
            
            console.log("getPendingTasksForUser():: BEGIN");
            
            console.log("getPendingTasksForUser():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks?where={'completed':false,'assignedUserName':'"+userName+"'}",
            }).then(
                function successCB(response){
                    
                    console.log("getPendingTasksForUser():: HTTP SUCCESS");
                    
                    responseData = response.data;
                    //console.log("getPendingTasksForUser():: responseData: ");
                    //console.log(responseData);
                    
                    nuData = responseData.data;
                    //console.log("getPendingTasksForUser():: nuData: ");
                    //console.log(nuData);
                    
                    callback(nuData);
                },
                function errorCB(response){
                    console.log("getPendingTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.");
                    nuData = response.data;
                    //console.log(nuData);
                    // NUDATA IS THE ARRAY OF OBJECTS
                    callback(nuData);
                })
        },
      
        //  CALLBACK STORES PENDING TASKS IN SUPPLIED FIELD
        getCompletedTasksForUser : function(userName, callback){
            
            console.log("getCompletedTasksForUser():: BEGIN");
            
            console.log("getCompletedTasksForUser():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks?where={'completed':true,'assignedUserName':'"+userName+"'}",
            }).then(
                function successCB(response){
                    console.log("getCompletedTasksForUser():: HTTP SUCCESS");
                    
                    responseData = response.data;
                    console.log("getCompletedTasksForUser():: responseData: ");
                    console.log(responseData);
                    
                    nuData = responseData.data;
                    console.log("getCompletedTasksForUser():: nuData: ");
                    console.log(nuData);
                    
                    callback(nuData);
                },
                function errorCB(response){
                    console.log("getCompletedTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.");
                })
        },
  
        // ADD A TASK TO A USERNAME, REQUIRES TASK ID AND USERNAME
        addTaskToUser : function(username, taskID){
            
            // VARIABLES
            var responseData = ""
            var userData = "";
            
            // START IT UP
            console.log("addTaskToUser()::BEGIN");
            
            // GET REQUEST SENT
            console.log("addTaskToUser():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/users?where={'name':'"+username+"'}",
            }).
            then(
                function successCB(response){
                    console.log("addTaskToUser():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    //console.log(responseData);
                    
                    userData = responseData.data[0];
                    console.log("addTaskToUser():: userData");
                    console.log(userData);
                    
                    // CHECK BEFORE
                    console.log("addTaskToUser():: pendingTasks");
                    console.log(userData.pendingTasks);
                    
                    // Add new task to user
                    userData.pendingTasks.push(taskID);
                    
                    // CHECK IT AFTER THE PUSH
                    console.log("addTaskToUser():: NEW pendingTasks");
                    console.log(userData.pendingTasks);
                    
                    // HTTP PUT REQUEST
                    console.log("addTaskToUser():: HTTP PUT REQUEST");
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/users/"+userData._id,
                        data: userData,
                    }).then(
                        function successCB(response){
                            console.log("addTaskToUser():: HTTP PUT SUCCESS");
                        },
                        function errorCB(response){
                            console.log("addTaskToUser():: HTTP PUT FAILURE");
                        })
                }, 
                function errorCB(response){
                    console.log("addTaskToUser():: HTTP GET SUCCESS");
                })
        },
        
        addTaskToUserID : function(userID, taskID){
            
            // VARIABLES
            var responseData = ""
            var userData = "";
            
            // START IT UP
            console.log("addTaskToUser()::BEGIN");
            
            // GET REQUEST SENT
            console.log("addTaskToUser():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/users/"+userID,
            }).
            then(
                function successCB(response){
                    console.log("addTaskToUserID():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    //console.log(responseData);
                    
                    userData = responseData.data;
                    //console.log(userData);
                    
                    // Add new task to user
                    userData.pendingTasks.push(taskID);
                    
                    // CHECK IT
                    //console.log(userData.pendingTasks);
                    
                    // HTTP PUT REQUEST
                    console.log("addTaskToUserID():: HTTP PUT REQUEST");
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/users/"+userData._id,
                        data: userData,
                    }).then(
                        function successCB(response){
                            console.log("addTaskToUserID():: HTTP PUT SUCCESS");
                        },
                        function errorCB(response){
                            console.log("addTaskToUserID():: HTTP PUT FAILURE");
                        })
                }, 
                function errorCB(response){
                    console.log("addTaskToUserID():: HTTP GET FAILURE");
                })
        },
 
        addUserToTask : function(userName, userID, taskID){
            
            // VARIABLES
            var responseData = "";
            var taskData = "";
            
            
            // START IT UP
            console.log("addUserNameToTask():: BEGIN");
            
            console.log("addUserNameToTask():: userName:"+userName);
            
            console.log("addUserNameToTask():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
            }).
            then(
                function successCB(response){
                    console.log("addUserNameToTask():: HTTP GET SUCCESS");
                    responseData = response.data;
                    
                    taskData = responseData.data;
                    
                    console.log("addUserNameToTask():: taskData:");
                    console.log(taskData);
                    
                    taskData.assignedUserName = userName;
                    taskData.assignedUser = userID;
                    
                    console.log("addUserNameToTask():: HTTP PUT REQUEST");
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
                        data: taskData,
                    }).
                    then(
                        function sCB(response){
                            console.log("addUserNameToTask():: HTTP PUT SUCCESS");
                        },
                        function eCB(response){
                            console.log("addUserNameToTask():: HTTP PUT FAILURE");
                        })
                },
                function errorCB(response){
                    console.log("addUserNameToTask():: HTTP GET FAILURE");
                })
        },
        
        addUserIDToTask : function(userID, taskID){
            // VARIABLES
            var responseData = "";
            var taskData = "";
            
            // START IT UP
            console.log("addUserIDToTask():: BEGIN");
            
            console.log("addUserIDToTask():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
            }).
            then(
                function successCB(response){
                    console.log("addUserIDToTask():: HTTP GET SUCCESS");
                    responseData = response.data;
                    
                    taskData = responseData.data;
                    
                    console.log("addUserIDToTask():: taskData:");
                    console.log(taskData);
                    
                    taskData.assignedUser = userID;
                    
                    console.log("addUserIDToTask():: HTTP PUT REQUEST");
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
                        data: taskData,
                    }).
                    then(
                        function sCB(response){
                            console.log("addUserIDToTask():: HTTP PUT SUCCESS");
                        },
                        function eCB(response){
                            console.log("addUserIDToTask():: HTTP PUT FAILURE");
                        })
                },
                function errorCB(response){
                    console.log("addUserIDToTask():: HTTP GET FAILURE");
                })
        },
        
        unassignTask : function(taskID){
            
            // VARIABLES
            var responseData = "";
            var taskData = "";
            
            // START IT UP
            console.log("unassignTask():: BEGIN");
            
            // HTTP GET REQUEST SENT
            console.log("unassignTask():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
            }).
            then(
                function successCB(response){
                    console.log("unassignTask():: HTTP GET SUCCESS"); 
                    responseData = response.data;
                    taskData = responseData.data;
                    taskData.assignedUser = "";
                    taskData.assignedUserName = "";
                    
                    console.log("unassignTask():: HTTP PUT REQUEST");
                    // HTTP PUT REQUEST SENT
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
                        data: taskData,
                    }).
                    then(
                        function sCB(response){
                            console.log("unassignTask():: HTTP PUT SUCCESS: Task unassigned");
                        },
                        function eCB(response){
                            console.log("unassignTask():: HTTP PUT FAILURE: task remains unchanged");
                        })
                },
                function errorCB(reponse){
                    console.log("unassignTask():: HTTP GET FAILURE");
                })
        },
        ////////////////////////////////////////////////////////////////////////
        
        
        getTasks : function(apc, sortby, order, offset, callback){
            console.log("getTasks()");
            //console.log("APC:"+apc+", SORTBY:"+sortby+", ORDER:"+order+".");
            
            var dynAPC = apc;
            var dynSORTBY = sortby;
            var dynORDER = order;
            
            if(order ===""){
                dynORDER = 1;
            }else{
                dynORDER = order;
            }
            
            // START BUILDING THE URL STRING
            var urlExtra = "/tasks";
            //var first = true;
            
            // PAGINATION STUFF            
            urlExtra += "?skip="+offset+"&limit=10&select={'name':1,'assignedUserName':1,'dateCreated':1,'deadline':1,}";
            
            // IF ONE OF THE ALL/PENDING/COMPLETED BUTTONS IS SELECTED
            if(apc !== ""){
                switch(apc){
                    case 'a':
                        break;
                    case 'p':
                        urlExtra += "&where={'completed':false}";
                        break;
                    case 'c':
                        urlExtra += "&where={'completed':true}";
                        break;
                    default:
                        break;
                }
            }
            
            // IF SORTBY IS SELECTED
            if(sortby !== ""){ 
                switch(sortby){
                    case 'name':
                        urlExtra += "&sort={'name':'"+dynORDER+"'}";
                        break;
                    case 'user':
                        urlExtra += "&sort={'assignedUserName':'"+dynORDER+"'}";
                        break;
                    case 'date_created':
                        urlExtra += "&sort={'dateCreated':'"+dynORDER+"'}";
                        break;
                    case 'date_due':
                        urlExtra += "&sort={'deadline':'"+dynORDER+"'}";
                        break;
                    default:
                        break;
                } 
            }
 
            console.log("getTasks():: url:");
            console.log($window.sessionStorage.baseurl+urlExtra);
            
            $http({
                method: 'GET',
                url: $window.sessionStorage.baseurl+urlExtra,
            }). 
            then(function successCB(response){ 
                nuData = response.data;
                console.log("Here is the data (from service):");
                console.log(nuData);
                callback(nuData.data);
            }, function errorCB(response){
                console.log("Error retrieving data!");
                data = "error";
                callback(data);
            });
        },
        
        getSingleTask : function(id, callback){
            
            console.log("getSingleTask()");
            
            console.log("getSingleTask()::HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+id,
            }).then(
                function successCB(response){
                    console.log("getSingleTask()::HTTP SUCCESS");
                    
                    responseData = response.data;  
                    console.log("getSingleTask():: responseData");
                    console.log(responseData);
                
                    nuData = responseData.data;
                    console.log("getSingleTask():: nuData");    
                    console.log(nuData);
                    
                    callback(nuData);
                },
                function errorCB(response){
                    console.log("getSingleTask()::HTTP FAILURE");
                })
        },
        
        editTask : function(){
            
        },
        
        /// EXTRAS
          
        userNameFromID :  function(userID, callback){
            
            console.log("userNameFromID()");
            
            var responseData = "";
            var nuData = "";
            var nuUserName = "";
            
            console.log("userNameFromID()::HTTP GET REQUEST");
            $http({
                method: 'GET',
                url: $window.sessionStorage.baseurl+"/users/"+userID,
            }).then(
                function successCB(response){
                    console.log("userNameFromID():: HTTP SUCCESS Retrieved User information for finding UserName");
                    
                    
                    responseData = response.data;
                    console.log("userNameFromID():: responseData");
                    console.log(responseData);
                    
                    nuData = responseData.data;
                    console.log("userNameFromID():: nuData");
                    console.log(nuData);
                    
                    nuUserName = nuData.name;
                    
                    console.log("idFromUserName()::Username for ID:"+userID+" is "+nuUserName);
                   callback(nuUserName);
                },
                function errorCB(response){
                    console.log("idFromUserName()::FAILURE");
                })
        },
        
        idFromUserName : function(userName, callback){
             
            console.log("idFromUserName(), userName:"+userName);
            
            var responseData = "";
            var nuData = "";
            var nuID = "";
            
            $http({
                method: 'GET',
                url: $window.sessionStorage.baseurl+"/users?where={'name':'"+userName+"'}",
            }).
                then(
                function successCB(response){
                    console.log("idFromUserName():: SUCCESS: Retrieved information for finding UserID");
                    
                    responseData = response.data;
                    console.log("idFromUserName():: responseData");
                    console.log(responseData);
                    
                    nuData = responseData.data;
                    console.log("idFromUserName():: nuData");
                    console.log(nuData);
                    
                    nuID = nuData[0]._id;
                    
                    console.log("idFromUserName():: ID for UserName: "+userName+" is "+nuID);
                    callback(nuID);
                },
                function errorCB(response){
                    console.log("idFromUserName():: FAILURE");
                })
        },
        
        pendingToComplete : function(taskID){
            
            var responseData = "";
            var taskData = "";
            var userName = "";
            var userID = "";
            
            console.log("pendingtoComplete():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
            }).
            then(
                function successCB(response){
                    console.log("pendingtoComplete():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    console.log("pendingtoComplete():: responseData");
                    console.log(responseData);
                    
                    taskData = responseData.data;
                    
                    userName = taskData.assignedUserName;
                    userID = taskData.assignedUser;
                    console.log("pendingToComplete():: userName:"+userName+", userID:"+userID);
                    
                    taskData.completed = true;
                    
                    console.log("pendingtoComplete():: HTTP PUT REQUEST");
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
                        data: taskData,
                    }).
                    then(
                        function sCB(Response){
                           console.log("pendingtoComplete():: HTTP PUT SUCCESS"); 
                        },
                        function eCB(response){
                            console.log("pendingtoComplete():: HTTP PUT FAILURE");
                    })
                },
                function errorCB(response){
                    console.log("pendingtoComplete():: HTTP GET FAILURE");
                })
        },
        
        removeFromPendingTasks : function(taskID, userID){
        
            console.log("removeFromPendingTasks()");
            var responseData = "";
            var userData = "";
            var pendingTasks = "";
            var index = "";
            
            console.log("removeFromPendingTasks():: HTTP GET REQUEST");
            $http({
                method: 'GET',
                url: $window.sessionStorage.baseurl+"/users/"+userID,
            }).
            then(
                function successCB(response){
                    console.log("removeFromPendingTasks():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    userData = responseData.data;
                    
                    console.log("removeFromPendingTasks():: userData");
                    console.log(userData);
                    
                    index = userData.pendingTasks.indexOf(taskID);
                    userData.pendingTasks.splice(index,1);
                    
                    console.log("removeFromPendingTasks():: New pendingTasks");
                    console.log(userData.pendingTasks);
                    
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/users/"+userID,
                        data: userData,
                    }).
                    then(
                        function sCB(response){
                            
                        },
                        function eCB(response){
                            
                        })
                },
                function errorCB(response){
                    console.log("removeFromPendingTasks():: HTTP GET FAILURE");
                })
            
        },
        
        removeFromPendingTasksName : function(taskID, userName){
        
            if(userName === ""){return;}
            // VARIABLES
            var responseData = "";
            var userData = "";
            var pendingTasks = "";
            var index = "";
            
            // START IT UP
            console.log("removeFromPendingTasksName()");
            
            console.log("removeFromPendingTasksName():: HTTP GET REQUEST");
            $http({
                method: 'GET',
                url: $window.sessionStorage.baseurl+"/users?where={'name':'"+userName+"'}",
            }).
            then(
                function successCB(response){
                    console.log("removeFromPendingTasksName():: HTTP GET SUCCESS");
                    
                    responseData = response.data;
                    
                    userData = responseData.data[0];
                    console.log("removeFromPendingTasksName():: userData");
                    console.log(userData);
                    
                    index = userData.pendingTasks.indexOf(taskID);
                    userData.pendingTasks.splice(index,1);
                    
                    console.log("removeFromPendingTasksName():: New pendingTasks");
                    console.log(userData.pendingTasks);
                    
                    $http({
                        method:'PUT',
                        url: $window.sessionStorage.baseurl+"/users/"+userData._id,
                        data: userData,
                    }).
                    then(
                        function sCB(response){
                            
                        },
                        function eCB(response){
                            
                        })
                },
                function errorCB(response){
                    console.log("removeFromPendingTasksName():: HTTP GET FAILURE");
                })
            
        },
    
        userIDFromTaskID : function(taskID, callback){
            
            console.log("userIDFromTaskID()");
            
            console.log("userIDFromTaskID():: HTTP GET REQUEST");
            $http({
                method:'GET',
                url: $window.sessionStorage.baseurl+"/tasks/"+taskID,
            }).
            then(
                function successCB(response){
                    console.log("userIDFromTaskID():: HTTP GET SUCCESS");
                    callback(response.data.data.assignedUser);
                },
                function errorCB(response){
                    console.log("userIDFromTaskID():: HTTP GET FAILURE");
            })
        },
    
    }// RETURN

}// MAIN FUNCTION
]);
