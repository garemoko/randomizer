/*
RandomizeTest accepts and returns a Test object. The questions in the returned object are in a random order.
The order of the choices within each question is also randomized.
*/

function RandomizeTest(tstObject){
	
	//Create a new Question Randomizer object
	QuestionRandomizerObject = new QuestionRandomizer();

	//randomize the questions of the test with related choices and answers. 
	//to randomize the arrays of additional test level properties, simply add to the array of properties passed. 
	tstObject = QuestionRandomizerObject.RandomizeQuestions(tstObject,["questions","choices","answers"]);
	
	//randomize the choices of each question with related correct answers
	//to randomize the arrays of additional question level properties (arrays within arrays), simply add to the array of properties passed. 
	tstObject = QuestionRandomizerObject.RandomizeTestAnswers(tstObject,["choices","answers"]);
	
	return tstObject;
	
}

/*
Definition of the QuestionRandomizer object. 
This contains functions for randomizing questions and their options. 
*/
function QuestionRandomizer (){
	
	this.RandomizeQuestions = RandomizeQuestions;
	this.RandomizeTestAnswers = RandomizeTestAnswers;
	
	/*
	RandomizeQuestions accepts a Test object and an array of properties to randomise and returns a Test object. 
	The questions in the returned object are in a random order.
	The length of the first property in the list of properties to randomize is used to determine the number of items in the test to be randomized
	If any propeties contain longer arrays than this first property, elements at the end of these arrays will be ignored and removed. 
	Any properties not listed in the array of properties to randomise are returned unchanged
	This is a function of QuestionRandomizer.
	*/
	
	function RandomizeQuestions(tstObject,propertiesToRandomize){
		
		//create temporary object to hold the shuffled values
		var newTstObject = {}
		//Add properties matching those to be shuffled and have these properties contain empty arrays
		for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
			newTstObject[propertiesToRandomize[propertyIndex]]= [];
		}
	
		//while there are questions in the input test
		while (tstObject.questions.length) {
			
			//take the first property in our list of properties to randomize
			//for that property, get the index of a random element
			var randomIndex = Math.floor(Math.random() * tstObject[propertiesToRandomize[0]].length);
			
			//for each property we are randomizing
			for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
				//splice the property relating to the chosen index
				var element = tstObject[propertiesToRandomize[propertyIndex]].splice(randomIndex, 1);
				//and push it onto the temporary object
				newTstObject[propertiesToRandomize[propertyIndex]].push(element[0]);
			}

		}
		
		//update the Test object with relevant properties
		//modifying the Test object in this way ensures that properties that are not shuffled are unaffected
		for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
			tstObject[propertiesToRandomize[propertyIndex]] = newTstObject[propertiesToRandomize[propertyIndex]];
		}	
		
		return tstObject;
	}
	
	/*
	RandomizeTestAnswers accepts a test object and an array of properties to randomize and returns a Test object. 
	The order of the choices, answers or other passed properties within each question in the returned object are in a random order.
	The length of the first property in the list of properties to randomize is used to determine the number of items to be randomized in each question.
	If any propeties contain longer arrays than this first property, elements at the end of these arrays will be ignored and removed. 
	Any properties not listed in the array of properties to randomise are returned unchanged
	This is a function of QuestionRandomizer.
	*/
	
	function RandomizeTestAnswers(tstObject,propertiesToRandomize){
		
		//for each question in the Test object
		for (questionIndex = 0; questionIndex < tstObject.questions.length; questionIndex += 1){
			
			//Create a new temporary object with properties matching those to be shuffled and containing arrays
			//this will contain the sorted data for the current question
			var newQstObject = {};
			for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
				newQstObject[propertiesToRandomize[propertyIndex]]= [];
			}
			
			//while there are choices in the question
			while (tstObject.choices[questionIndex].length) {
				
				//take the first property in our list of properties to randomize
				//for that property and the current question, get the index of a random element. 
				var randomIndex = Math.floor(Math.random() * tstObject[propertiesToRandomize[0]][questionIndex].length);
				
				//For each property to randomize
				for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
					//splice the current property from the current question and the choosen index
					var element = tstObject[propertiesToRandomize[propertyIndex]][questionIndex].splice(randomIndex, 1)
					//and push it onto the question object within the current property
					newQstObject[propertiesToRandomize[propertyIndex]].push(element[0]);			
				}
			}
			
			//update the Test object with relevant properties for the current question
			//modifying the Test object in this way ensures that properties that are not shuffled are unaffected
			for (propertyIndex = 0; propertyIndex < propertiesToRandomize.length; propertyIndex += 1){
				tstObject[propertiesToRandomize[propertyIndex]][questionIndex] = newQstObject[propertiesToRandomize[propertyIndex]];
			}
					
		}
		
		return tstObject;
		
	}
}