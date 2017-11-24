# Assignment 4

## Live Chat Application.(In the MVC Format)

### Basic information about the coding done.

- This Live Chat application is based on basic instruction given in the assignment.(i.e using Socket.io)

- It has all the Functionalities that were instructed in the assignment.

	1) One-to-one chat application using socket.io.(This app can also be used by more than two users.)
	2) Events that capture that “some user is typing” and identifying them also.
	3) It have login and logout feature, with proper notification to other user who is in the chat now.
	4) Uses mongodb to store the chat of users into schema variables that can be seen in the blue marginal message box by users.

- Notifications are given very specifically every time their is a change in number of users or if any of them login or logout.
- The information about scopes and which module is for what; these type of informations are explained by comments before and after the blocks.  
- Link of the hosted code on the github (https://github.com/abhi16694/assignment-4.git).


### Information about the application and how to use it:-

- When the site is opened it will ask for a user name as a prompt pop up.
- After that it will show that name in the application screen with the number of user online now.
- Whenever a user try to type something the application will show notification to other users about which user is now typing.
- The chat between users is shown in the blue box on the top left hand side corner of the application.
- When any user closes his/her tab or disconnects it will show notification to other users about the same who are still connected.
- You can see your chat history on that blue box whenever you like, but before your disconnection.

### Information on how to run the application:-

- Open Command Prompt in that go to the directory where the application folder is saved using "cd" command.
- In that folder go the chatApp folder and type "npm install" this will install the node modules which are necessary for this application to run.
- You also have had to pre install mongodb and make the database connected, preferably on another command prompt. 
- After that type "node index.js" to run the application.
- Access it on Localhost:1600.
