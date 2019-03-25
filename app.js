"use strict"
/*
Build all of your functions for displaying and gathering information below (GUI).
*/

// app is the function called to start the entire application
function app(people){
  var searchType = promptFor("Do you know the name of the person you are looking for? Enter 'yes' or 'no'", yesNo).toLowerCase();
  switch(searchType){
    case 'yes':
      var foundPerson = searchByName(people);
      	  // displayPerson(foundPerson);     
      mainMenu(foundPerson, people);
      break;
    case 'no':
    	var numKnownTraits = parseInt(promptFor("How many of the following traits do you know about the person: Gender, DOB, Height, Weight, Occupation?", chars));
    	var sharedTrait = people;
    	for (let i = 0; i < numKnownTraits; i++){
    		sharedTrait = searchByTrait(sharedTrait,numKnownTraits);
    	}	
    		displayPeople(sharedTrait); 
        // (Ryan) add a way to select an individual from the list
        // and add mainMenu(selectedPerson, people); or something like that
         
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
    return app(people); // restart
  }

  var displayOption = promptFor("Found " + data.firstName + " " + data.lastName + " . Do you want to know their " +
   " 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    alert(displayPerson(person));
    break;
    case "family":
    // TODO: get person's family
    alert(getImmediateFamily(person));
    break;
    case "descendants":
    // TODO: get person's descendants
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
  	var traitName = promptFor("Please list a single trait to help in the search: gender, dob, height, weight, " +  
  	"eyeColor or occupation.", chars);
  	var traitValue = promptFor("Please enter " + traitName + ": ", chars);
	  	var sharedTrait = people.filter(function(person){ 
  		if(person[traitName] === traitValue){
  			return true;
  		}
  		else{
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
	else	{
		mainMenu(children[0]);	
	}
}
function getImmediateFamily(person){
// TODO: needs to return relationship to "person" as well as their name	
// TODO: needs to find siblings
	let immediateFamily = [];
	for(let i = 0; i < data.length; i++){
		if (data[i].id == person.currentSpouse){
			immediateFamily.push(data[i]);
		}
		if (data[i].parents.includes(person.id)){
			immediateFamily.push(data[i]);
		}
	}
	if(immediateFamily.length > 1){
		displayPeople(immediateFamily);
	}
	else	{
		mainMenu(immediateFamily[0]);
	}
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
//
function chars(input){
	// function allLetter(inputtxt)
	if(/^[a-zA-Z]+$/.test(input))	{
		return true;
	}
		else	{
		alert('Please input alphabet characters only');
		return false;
	}
}


// {
//   if (input == "banana"){
//     return false;
//   }
//   else {
//     return true; // default validation only
//   }
	
  

