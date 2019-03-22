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
      displayPerson(foundPerson);
      mainMenu(foundPerson, people);
      break;
    case 'no':
    	var numKnownTraits = promptFor("How many of the following traits do you know about the person: Gender, DOB, Height, Weight, Occupation?", chars);
    	if (numKnownTraits == 1)	{
    		var sharedTrait = searchByTrait(people);
    		// displayPeople(sharedTrait);
    		console.log(sharedTrait);

    		    }
    	else if (knownTraits > 1)	{
    		
		}

      // TODO: search by traits (from the lists on data.js,  traits are considered gender through occupation)
      //need to make 2 separate search prompts, one with 1 trait criteria, one with two to five critera.
      // (Ryan) TODO: prompt for "how many things do you know about the person?
      // then prompt for either the 1 thing they know OR the 2-5 things they know
      // utilize the "single criteria" search function in the "2-5 criteria" search function
       //adding prompt when "no" is chosen above and adding next search criteria. 
      //1 trait search prompt function needed from user story. (still need to do 2-5 criteria search prompt) 
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

  var displayOption = promptFor("Found " + person.firstName + " " + person.lastName + " . Do you want to know their " +
   " 'info', 'family', or 'descendants'? Type the option you want or 'restart' or 'quit'", chars);

  switch(displayOption){
    case "info":
    // TODO: get person's info
    break;
    case "family":
    // TODO: get person's family
    break;
    case "descendants":
    // TODO: get person's descendants
    break;
    case "restart":
    app(people); // restart
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

  var foundPerson = people.filter(function(person){
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
function searchByTrait(people){
  	var traitName = promptFor("Please list a single trait to help in the search: Gender, age, height, weight, " +  
  	"eye color or occupation.", chars);
  	var traitValue = promptFor("Please enter " + traitName + ": ", chars);
	  	var sharedTrait = people.filter(function(person){ //This is not working properly. it returns an empty array.
  		if(person[traitName] === traitValue){
  			return true;
  		}
  		else{
  			return false;
  		}
	})
	displayPeople(sharedTrait);
}
// alerts a list of people
function displayPeople(people){
  alert(people.map(function(person){
    return person.firstName + " " + person.lastName;
  }).join("\n"));
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
function chars(input){
  return true; // default validation only
}
