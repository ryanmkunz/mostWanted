"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  for (let i = 0; i < people.length; i++){
  	data[i].age = parseInt(calculateAge(data[i].dob));
  }
  console.log(data[0].age);
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);    
      mainMenu(foundPerson, people);
      break;
    case 'no':
    	var numKnownTraits = promptFor("How many of the following traits do you know about the person: Gender, Age, Height, Weight, eyeColor, Occupation?", ints);
    	var sharedTrait = people;
    	for (let i = 0; i < numKnownTraits; i++){
    		sharedTrait = searchByTrait(sharedTrait,numKnownTraits);
    	}	
    		displayPeople(sharedTrait);          
      break;
      default:
    app(people); // restart app
      break;
  }
}
// Menu function to call once you find who you are looking for
function mainMenu(person, people){

  /* Here we pass in the entire person object that we found in our search, as well as the entire original 
  dataset of people. We need people in order to find descendants 
  and other information that the user may want. */
  if(!person){
    alert("Could not find that individual.");
    return app(data); // restart
  }

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their " +
   " 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    alert(displayPerson(person));
    break;
    case "family":
    alert(getImmediateFamily(person));
    break;
    case "descendants":
    alert(getDescendants(person));
    break;
    case "restart":
    app(data); // restart
    break;
    case "quit":
    return; // stop execution
    default:
    return mainMenu(person, people); // ask again
  }
}
function searchByName(people){
  var firstName = promptFor("What is the person's first name?", chars);
  var lastName = promptFor("What is the person's last name?", chars);
 // return firstName.toLowerCase();  //chris add 3_24. doesnt display name, need to fix. coming back as undefined. 
  var foundPerson = people.filter(function(person)
   {
    if(person.firstName === firstName && person.lastName === lastName){
      return true;
    }
    else{
      return false;
    }
  })
  // TODO: find the person using the name they entered
  return foundPerson[0];  // if this is true, and we have found the right person, is it as simple as returning all
  //data we have about the person in a prompt?
}
function searchByTrait(people,numKnownTraits){
  	var traitName = promptFor("Please list a single trait to help in the search: gender, age, height, weight, " +  
  	"eyeColor or occupation.", traitsOnly);
  	let traitValue;
  	if (traitName == "age" || traitName == "height" || traitName == "weight"){
  		traitValue = promptFor("Please enter " + traitName + ": ", ints);
  	}
  	else if (traitName == "gender" || traitName == "eyeColor" || traitName == "occupation"){
  		traitValue = promptFor("Please enter " + traitName + ": ", chars);
  	}  	
	  	var sharedTrait = people.filter(function(person){ 
  		if(person[traitName] == traitValue){
  			return true;
  		}
  		else	{
  			return false;
  		}
	})
	return sharedTrait;
}
function getDescendants(person, children = [],counter = 0){
// TODO: write a function that returns children, and grandchildren 
// using recursion
	for (let i = 0; i < data.length; i++){
		if (data[i].parents.includes(person.id)){
			children.push(data[i]);
		}
	}
	if (children.length > counter){
		getDescendants(children[counter],children,counter+1);
	}
	else if (children.length > 1){
		displayPeople(children);
	}
	else if (children.length == 1){
		mainMenu(children[0]);	
	}
	else	{
		alert(person.firstName + " " + person.lastName + " " + "doesn't have children.");
		mainMenu(person,data);
	}
}
function getImmediateFamily(person){
// TODO: needs to return relationship to "person" as well as their name	
// TODO: needs to find siblings
	let immediateFamily = "";
	for(let i = 0; i < data.length; i++){
		for (let j = 0; j < 2; j++){
			if (data[i].id == person.parents[j]){
				if (data[i].gender == "male"){
					immediateFamily += ("Father: " + data[i].firstName +" "+ data[i].lastName+'\n');
				}
				else	{
				immediateFamily += ("Mother: " + data[i].firstName +" "+ data[i].lastName+'\n');
				}
			}
		}	
		if (data[i].id == person.currentSpouse){
			if(data[i].gender == "male"){
				immediateFamily += ("Husband: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
			else {
				immediateFamily += ("Wife: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
		}
		if (data[i].parents.includes(person.id)){
			if (data[i].gender == "male"){
				immediateFamily += ("Son: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
			else {
				immediateFamily += ("Daughter: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
		}
		if (data[i].parents.includes(person.parents[0])){			
			if (data[i].gender == "male"){
				immediateFamily += ("Brother: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
			else	{
				immediateFamily += ("Sister: " + data[i].firstName +" "+ data[i].lastName+'\n');
			}
		}
	}
	alert(immediateFamily);
	mainMenu(person,data);
}
// alerts a list of people
function displayPeople(people){
  let enumeration = 0;
  let selection = prompt("Enter an individual's number for more options"+"\n"
  	+people.map(function(person){
  	enumeration++;
    return enumeration + ". " + person.firstName + " " + person.lastName;
  	}).join("\n"));
  mainMenu(people[selection-1],data);
}
function calculateAge(dob){
	let dobNew = new Date(dob);
	let timeDiff = Date.now() - dobNew;
	return Math.floor(timeDiff*0.00000000003171);
}
function displayPerson(person){
  // print all of the information about a person:
  // height, weight, age, name, occupation, eye color.
  var personInfo = "First Name: " + person.firstName + "\n";
  personInfo += "Last Name: " + person.lastName + "\n";
  personInfo += "Eye Color: " + person.eyeColor + "\n";
  personInfo += "Gender: " + person.gender + "\n";
  personInfo += "Occupation: " + person.occupation + "\n"; 
  //personInfo += "Age: " + person.age + "\n";    we could take this out, or figure out JS to compute age from birth date. 
  personInfo += "Age: " + calculateAge(person.dob) + "\n";
  // TODO: finish getting the rest of the information to display
  alert(personInfo);
  mainMenu(person,data);
}
// function that prompts and validates user input
function promptFor(question, valid){
  do{
    var response = prompt(question).trim();
  } while(!response || !valid(response));
  return response;
}
// helper function to pass into promptFor to validate yes/no answers
function yesNo(input){
  return input.toLowerCase() == "yes" || input.toLowerCase() == "no";
}
// helper function to pass in as default promptFor validation
function chars(input){
	// function allLetter(inputtxt)
	if(/^[a-zA-Z]+$/.test(input))	{
		return true;
	}
		else	{
		alert('Please input characters only');
		return false;
	}
}
function traitsOnly(input){
	if (chars(input)){
		if (input == "gender" || input == "age" || input == "height" 
			|| input == "weight" || input == "eyeColor" || input == "occupation"){
			return true;	
		}
		return false;
	}
}
function ints(input){
	let intInput = Math.floor(parseInt(input));
	if (isFinite(intInput)){
		return true;
	}
	else	{
		return false;
	}
	//todo: make sure input is a number
	//todo: make sure number is between 1 and 6
}



