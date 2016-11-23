var mp4Services=angular.module("mp4Services",[]);mp4Services.factory("CommonData",["$http","$window",function($http,$window){var responseData="",nuData="";return{getUsers:function(callback){var responseData="",userListData="";console.log("getUsers()"),console.log("getUsers():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users"}).then(function(response){console.log("getUsers():: HTTP GET SUCCESS"),responseData=response.data,userListData=responseData.data,console.log("getUsers():: userListData"),console.log(userListData),callback(userListData)},function(response){console.log("getUsers():: HTTP GET FAILURE")})},getSingleUser:function(userID,callback){var responseData="",userData="";console.log("getSingleUser()"),console.log("getSingleUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users/"+userID}).then(function(response){console.log("getSingleUser():: HTTP GET SUCCESS"),responseData=response.data,console.log("getSingleUser():: responseData:"),console.log(responseData),userData=responseData.data,console.log("getSingleUser():: userData:"),console.log(userData),callback(userData)},function(response){console.log("getSingleUser():: HTTP GET FAILURE")})},addUser:function(name,email,callback){var responseData="";console.log("addUser()"),console.log("addUser():: HTTP POST REQUEST"),$http({method:"POST",url:$window.sessionStorage.baseurl+"/users/",data:{name:name,email:email}}).then(function(response){console.log("addUser():: HTTP POST SUCCESS"),responseData=response.data,console.log("addUser():: responseData"),console.log(responseData),callback(responseData)},function(response){console.log("addUser():: HTTP POST FAILURE")})},removeSingleUser:function(id){console.log("removeSingleUSer()"),console.log("removeSingleUSer():: HTTP DELETE REQUEST"),$http({method:"DELETE",url:$window.sessionStorage.baseurl+"/users/"+id}).then(function(){console.log("removeSingleUSer():: HTTP DELETE SUCCESS"),console.log("User Removed!")},function(){console.log("removeSingleUSer():: HTTP DELETE FAILURE"),console.log("Error while removing user!")})},getAllTasksForUser:function(userID,callback){var responseData="",taskList="";console.log("getAllTasksForUser():: BEGIN"),console.log("getAllTasksForUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks?where={'assignedUser':'"+userID+"'}"}).then(function(response){console.log("getAllTasksForUser():: HTTP SUCCESS"),responseData=response.data,console.log("getAllTasksForUser():: responseData: "),console.log(responseData),taskList=responseData.data,console.log("getAllTasksForUser():: taskList: "),console.log(taskList),callback(taskList)},function(response){console.log("getAllTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.")})},getPendingTasksForUser:function(userID,callback){console.log("getPendingTasksForUser():: BEGIN"),console.log("getPendingTasksForUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks?where={'completed':false,'assignedUser':'"+userID+"'}"}).then(function(response){console.log("getPendingTasksForUser():: HTTP SUCCESS"),responseData=response.data,console.log("getPendingTasksForUser():: responseData: "),console.log(responseData),nuData=responseData.data,console.log("getPendingTasksForUser():: nuData: "),console.log(nuData),callback(nuData)},function(response){console.log("getPendingTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.")})},getCompletedTasksForUser:function(userName,callback){console.log("getCompletedTasksForUser():: BEGIN"),console.log("getCompletedTasksForUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks?where={'completed':true,'assignedUserName':'"+userName+"'}"}).then(function(response){console.log("getCompletedTasksForUser():: HTTP SUCCESS"),responseData=response.data,console.log("getCompletedTasksForUser():: responseData: "),console.log(responseData),nuData=responseData.data,console.log("getCompletedTasksForUser():: nuData: "),console.log(nuData),callback(nuData)},function(response){console.log("getCompletedTasksForUser():: HTTP FAILURE: Failed to retrieve tasklist.")})},addTaskToUser:function(username,taskID){var responseData="",userData="";console.log("addTaskToUser()::BEGIN"),console.log("addTaskToUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users?where={'name':'"+username+"'}"}).then(function(response){console.log("addTaskToUser():: HTTP GET SUCCESS"),responseData=response.data,userData=responseData.data[0],console.log("addTaskToUser():: userData"),console.log(userData),console.log("addTaskToUser():: pendingTasks"),console.log(userData.pendingTasks),userData.pendingTasks.push(taskID),console.log("addTaskToUser():: NEW pendingTasks"),console.log(userData.pendingTasks),console.log("addTaskToUser():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/users/"+userData._id,data:userData}).then(function(response){console.log("addTaskToUser():: HTTP PUT SUCCESS")},function(response){console.log("addTaskToUser():: HTTP PUT FAILURE")})},function(response){console.log("addTaskToUser():: HTTP GET SUCCESS")})},addTaskToUserID:function(userID,taskID){var responseData="",userData="";console.log("addTaskToUser()::BEGIN"),console.log("addTaskToUser():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users/"+userID}).then(function(response){console.log("addTaskToUserID():: HTTP GET SUCCESS"),responseData=response.data,userData=responseData.data,userData.pendingTasks.push(taskID),console.log("addTaskToUserID():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/users/"+userData._id,data:userData}).then(function(response){console.log("addTaskToUserID():: HTTP PUT SUCCESS")},function(response){console.log("addTaskToUserID():: HTTP PUT FAILURE")})},function(response){console.log("addTaskToUserID():: HTTP GET FAILURE")})},addUserToTask:function(userName,userID,taskID){var responseData="",taskData="";console.log("addUserNameToTask():: BEGIN"),console.log("addUserNameToTask():: userName:"+userName),console.log("addUserNameToTask():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+taskID}).then(function(response){console.log("addUserNameToTask():: HTTP GET SUCCESS"),responseData=response.data,taskData=responseData.data,console.log("addUserNameToTask():: taskData:"),console.log(taskData),taskData.assignedUserName=userName,taskData.assignedUser=userID,console.log("addUserNameToTask():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/tasks/"+taskID,data:taskData}).then(function(response){console.log("addUserNameToTask():: HTTP PUT SUCCESS")},function(response){console.log("addUserNameToTask():: HTTP PUT FAILURE")})},function(response){console.log("addUserNameToTask():: HTTP GET FAILURE")})},addUserIDToTask:function(userID,taskID){var responseData="",taskData="";console.log("addUserIDToTask():: BEGIN"),console.log("addUserIDToTask():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+taskID}).then(function(response){console.log("addUserIDToTask():: HTTP GET SUCCESS"),responseData=response.data,taskData=responseData.data,console.log("addUserIDToTask():: taskData:"),console.log(taskData),taskData.assignedUser=userID,console.log("addUserIDToTask():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/tasks/"+taskID,data:taskData}).then(function(response){console.log("addUserIDToTask():: HTTP PUT SUCCESS")},function(response){console.log("addUserIDToTask():: HTTP PUT FAILURE")})},function(response){console.log("addUserIDToTask():: HTTP GET FAILURE")})},unassignTask:function(taskID){var responseData="",taskData="";console.log("unassignTask():: BEGIN"),console.log("unassignTask():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+taskID}).then(function(response){console.log("unassignTask():: HTTP GET SUCCESS"),responseData=response.data,taskData=responseData.data,taskData.assignedUser="",taskData.assignedUserName="",console.log("unassignTask():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/tasks/"+taskID,data:taskData}).then(function(response){console.log("unassignTask():: HTTP PUT SUCCESS: Task unassigned")},function(response){console.log("unassignTask():: HTTP PUT FAILURE: task remains unchanged")})},function(reponse){console.log("unassignTask():: HTTP GET FAILURE")})},getTasks:function(apc,sortby,order,offset,callback){console.log("getTasks()");var dynORDER=order;dynORDER=""===order?1:order;var urlExtra="/tasks";if(urlExtra+="?skip="+offset+"&limit=10&select={'name':1,'assignedUserName':1,'dateCreated':1,'deadline':1,}",""!==apc)switch(apc){case"a":break;case"p":urlExtra+="&where={'completed':false}";break;case"c":urlExtra+="&where={'completed':true}"}if(""!==sortby)switch(sortby){case"name":urlExtra+="&sort={'name':'"+dynORDER+"'}";break;case"user":urlExtra+="&sort={'assignedUserName':'"+dynORDER+"'}";break;case"date_created":urlExtra+="&sort={'dateCreated':'"+dynORDER+"'}";break;case"date_due":urlExtra+="&sort={'deadline':'"+dynORDER+"'}"}console.log("getTasks():: url:"),console.log($window.sessionStorage.baseurl+urlExtra),$http({method:"GET",url:$window.sessionStorage.baseurl+urlExtra}).then(function(response){nuData=response.data,console.log("Here is the data (from service):"),console.log(nuData),callback(nuData.data)},function(response){console.log("Error retrieving data!"),data="error",callback(data)})},getSingleTask:function(id,callback){console.log("getSingleTask()"),console.log("getSingleTask()::HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+id}).then(function(response){console.log("getSingleTask()::HTTP SUCCESS"),responseData=response.data,console.log("getSingleTask():: responseData"),console.log(responseData),nuData=responseData.data,console.log("getSingleTask():: nuData"),console.log(nuData),callback(nuData)},function(response){console.log("getSingleTask()::HTTP FAILURE")})},editTask:function(){},userNameFromID:function(userID,callback){console.log("userNameFromID()");var responseData="",nuData="",nuUserName="";console.log("userNameFromID()::HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users/"+userID}).then(function(response){console.log("userNameFromID():: HTTP SUCCESS Retrieved User information for finding UserName"),responseData=response.data,console.log("userNameFromID():: responseData"),console.log(responseData),nuData=responseData.data,console.log("userNameFromID():: nuData"),console.log(nuData),nuUserName=nuData.name,console.log("idFromUserName()::Username for ID:"+userID+" is "+nuUserName),callback(nuUserName)},function(response){console.log("idFromUserName()::FAILURE")})},idFromUserName:function(userName,callback){console.log("idFromUserName(), userName:"+userName);var responseData="",nuData="",nuID="";$http({method:"GET",url:$window.sessionStorage.baseurl+"/users?where={'name':'"+userName+"'}"}).then(function(response){console.log("idFromUserName():: SUCCESS: Retrieved information for finding UserID"),responseData=response.data,console.log("idFromUserName():: responseData"),console.log(responseData),nuData=responseData.data,console.log("idFromUserName():: nuData"),console.log(nuData),nuID=nuData[0]._id,console.log("idFromUserName():: ID for UserName: "+userName+" is "+nuID),callback(nuID)},function(response){console.log("idFromUserName():: FAILURE")})},pendingToComplete:function(taskID){var responseData="",taskData="",userName="",userID="";console.log("pendingtoComplete():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+taskID}).then(function(response){console.log("pendingtoComplete():: HTTP GET SUCCESS"),responseData=response.data,console.log("pendingtoComplete():: responseData"),console.log(responseData),taskData=responseData.data,userName=taskData.assignedUserName,userID=taskData.assignedUser,console.log("pendingToComplete():: userName:"+userName+", userID:"+userID),taskData.completed=!0,console.log("pendingtoComplete():: HTTP PUT REQUEST"),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/tasks/"+taskID,data:taskData}).then(function(Response){console.log("pendingtoComplete():: HTTP PUT SUCCESS")},function(response){console.log("pendingtoComplete():: HTTP PUT FAILURE")})},function(response){console.log("pendingtoComplete():: HTTP GET FAILURE")})},removeFromPendingTasks:function(taskID,userID){console.log("removeFromPendingTasks()");var responseData="",userData="",index="";console.log("removeFromPendingTasks():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users/"+userID}).then(function(response){console.log("removeFromPendingTasks():: HTTP GET SUCCESS"),responseData=response.data,userData=responseData.data,console.log("removeFromPendingTasks():: userData"),console.log(userData),index=userData.pendingTasks.indexOf(taskID),userData.pendingTasks.splice(index,1),console.log("removeFromPendingTasks():: New pendingTasks"),console.log(userData.pendingTasks),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/users/"+userID,data:userData}).then(function(response){},function(response){})},function(response){console.log("removeFromPendingTasks():: HTTP GET FAILURE")})},removeFromPendingTasksName:function(taskID,userName){if(""!==userName){var responseData="",userData="",index="";console.log("removeFromPendingTasksName()"),console.log("removeFromPendingTasksName():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/users?where={'name':'"+userName+"'}"}).then(function(response){console.log("removeFromPendingTasksName():: HTTP GET SUCCESS"),responseData=response.data,userData=responseData.data[0],console.log("removeFromPendingTasksName():: userData"),console.log(userData),index=userData.pendingTasks.indexOf(taskID),userData.pendingTasks.splice(index,1),console.log("removeFromPendingTasksName():: New pendingTasks"),console.log(userData.pendingTasks),$http({method:"PUT",url:$window.sessionStorage.baseurl+"/users/"+userData._id,data:userData}).then(function(response){},function(response){})},function(response){console.log("removeFromPendingTasksName():: HTTP GET FAILURE")})}},userIDFromTaskID:function(taskID,callback){console.log("userIDFromTaskID()"),console.log("userIDFromTaskID():: HTTP GET REQUEST"),$http({method:"GET",url:$window.sessionStorage.baseurl+"/tasks/"+taskID}).then(function(response){console.log("userIDFromTaskID():: HTTP GET SUCCESS"),callback(response.data.data.assignedUser)},function(response){console.log("userIDFromTaskID():: HTTP GET FAILURE")})}}}]);