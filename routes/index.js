var express = require('express');
var router = express.Router();

//Mongoose ODM
var mongoose = require ("mongoose"); 

var userSchema = require('./userschema.js').userSchema
var user = mongoose.model('userSchema', userSchema,'surveyUsers')

var predictionSchema = require('./predictionSchema.js').predictionSchema
var prediction = mongoose.model('predictionSchema', predictionSchema,'surveyUsers')

var bodyParser = require('body-parser')
router.use(bodyParser.json() );       // to support JSON-encoded bodies
router.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

router.use(bodyParser.json());
router.use(bodyParser.urlencoded());   

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function(passport){

	//Global question array which is sent to the view to dispaly questions based on a user's preference.

	var questions = {
						"Arizona": ["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"California":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Colorado":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Idaho":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Montana":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Nevada":["Current $ Personal Income","Gross Gaming Revenue","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"New mexico":["Current $ Personal Income","Manufacturing Employment","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Oregon":["Current $ Personal Income","Manufacturing Employment","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Texas":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Utah":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Washington":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"],
						"Wyoming":["Current $ Personal Income","Retail Sales","Wage & Salary Employment","Population Growth","Single-Family Housing Permits"]
					}




	/*

	This is an init method that populates the DB with all users who are allowed to take the survey.
	This doesn't mean those users's credentials have been created.

	You can go ahead and creat credentials for any of these users in the sign up page y making sure the email ID provided matches with the one displayed below.

	The newly created user can noe access survey questions of the states that have been repreented in the array below as 1's and 0's.
	The state array is of the form ["Arizona","California","Colorado","Idaho","Montana","Nevada","New Mexico","Oregon","Texas","Utah","Washington","Wyoming"]
	A 1 in the 0th index means he would have permission to answer qi=uestion concerning the state of Arizona..and so on.

	*/
	router.get('/addUserPreference', function(req, res){

				var userData = [
		  ["adibi@chapman.edu","Chapman University","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["alan@aemaguire.com","The Maguire Company","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["aruna.murthy@azdoa.gov","Arizona Department of Administration","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["bgoetting@rcg1.com","RCG Economics","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["bill@conerlyconsulting.com","Conerly Consulting","0","0","0","0","0","0","0","1","0","0","1","0"  ],
		  ["brandy.little@swgas.com","Southwest Gas Corporation","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["bretb@dor.wa.gov","Office of the Forecast Council","0","0","0","0","0","0","0","0","0","0","1","0"  ],
		  ["Brian.Cary@srpnet.com","Salt River Project","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["bweinstein@cox.smu.edu","Southern Methodist University","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["chrerick@nmsu.edu","New Mexico State University - CEMAF","0","0","0","0","0","0","1","0","0","0","0","0"  ],
		  ["chris.dittmar@cpa.state.tx.us","TX State Comptroller of Public Accounts","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["cjmayne@utah.gov","Utah Department of Workforce Services","0","0","0","0","0","0","0","0","0","1","0","0"  ],
		  ["Daniel.Bache@azdoa.gov","Arizona Department of Administration","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["david.hemley@enmu.edu","Eastern New Mexico University","0","0","1","0","0","0","1","0","1","0","0","0"  ],
		  ["dennis.foster@nau.edu","NAU - BBER","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["dickconway@cs.com","Conway Pederson Economics","0","0","0","0","0","0","0","0","0","0","1","0"  ],
		  ["droubik@cox.net","VisionEcon/Governing Star Group","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["dwight@econlit.net","EconLit LLC","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["forecast@pacific.edu","University of the Pacific","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["ghammond@email.arizona.edu","UA - Eller College","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["ham.nguyen@pgn.com","Portland General Electric","0","0","0","0","0","0","0","1","0","0","0","0"  ],
		  ["holofsson@azleg.gov","Joint Legislative Budget Committee","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["info@perrymangroup.com","Perryman Group","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["irena.asmundson@dof.ca.gov","California Department of Finance","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["Jack.york@azdoa.gov","Arizona Department of Administration","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["jahays@nvdetr.org","Dept. of Employment, Training & Rehab.","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["jamie.cattanach@swgas.com","Southwest Gas Corporation","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["jeffm@unm.edu","University of New Mexico - BBER","0","0","0","0","0","0","1","0","0","0","0","0"  ],
		  ["JLucking@gmail.com","ECON-LINC","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["joshua.lehner@state.or.us","Oregon Executive Department","0","0","0","0","0","0","0","1","0","0","0","0"  ],
		  ["jrestrepo@rcg1.com","RCG Economics","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["justin.garosi@lao.ca.gov","Legislative Analyst's Office","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["keith.r.phillips@dal.frb.org","Federal Reserve Bank of Dallas","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["lee.mcpheters@asu.edu","ASU - Economic Outlook Center","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["mark.vitner@wellsfargo.com","Wells Fargo","1","1","1","1","1","1","1","1","1","1","1","1"  ],
		  ["mark@forecon.com","Forefront Economics","0","0","0","0","0","0","0","1","0","0","0","0"  ],
		  ["mikecosgrove@econolast.com","Econolast","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["mknold@utah.gov","Utah Department of Workforce Services","0","0","0","0","0","0","0","0","0","1","0","0"  ],
		  ["natalie.mullis@state.co.us","Colorado Legislative Council","0","0","1","0","0","0","0","0","0","0","0","0"  ],
		  ["nate.curtis@navigant.com","Navigant Consulting","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["Nathaniel.clayville@dfm.idaho.gov","Idaho Divison of Financial Management","0","0","0","1","0","0","0","0","0","0","0","0"  ],
		  ["nhelm@dadco.com","Davidson Fixed Income Management","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["patricia.nomura@anderson.ucla.edu","UCLA - Business Forecasting Project","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["Patrick.Barkey@umontana.edu","University of Montana","0","0","0","0","1","0","0","0","0","0","0","0"  ],
		  ["Patrick.lowe@aps.com","Arizona Public Service","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["Peter.Ewen@pinnaclewest.com","Arizona Public Service","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["pollack@edpco.com","Elliot D. Pollack & Co.","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["Richard.Wobbekind@Colorado.EDU","University of Colorado - Leeds","0","0","1","0","0","0","0","0","0","0","0","0"  ],
		  ["rjrow@asu.edu","ASU - Economic Outlook Center","1","1","1","1","0","0","0","0","0","0","0","0"  ],
		  ["robert.kleinhenz@laedc.org","LA County Economic Development Corp.","0","1","0","0","0","0","0","0","0","0","0","0"  ],
		  ["rounds@edpco.com","Elliot D. Pollack & Co.","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["scott.a.anderson@wellsfargo.com","Wells Fargo","1","1","1","1","1","1","1","1","1","1","1","1"  ],
		  ["sheila@perrymangroup.com","Perryman Group","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["Spa.Brown@unlv.edu","Univserity of Nevada at Las Vegas - CBER","0","0","0","0","0","1","0","0","0","0","0","0"  ],
		  ["sprit61@cox.net","Southwest Growth Partners","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["staddie@stellarmgt.com","Stellar Capital Management","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["tbinnings@comcast.net","Summit Economics","0","0","1","0","0","0","0","0","0","0","0","0"  ],
		  ["Tim.Sheesley@XCELENERGY.COM","Xcel Energy","0","0","1","0","0","0","0","0","0","0","0","0"  ],
		  ["tomf@utep.edu","Univserity of Texas at El Paso","0","0","0","0","0","0","0","0","1","0","0","0"  ],
		  ["welch@edpco.com","Elliot D. Pollack & Co.","1","0","0","0","0","0","0","0","0","0","0","0"  ],
		  ["wenlin.liu@wyo.gov","WY Dept. of Administration & Information","0","0","0","0","0","0","0","0","0","0","0","1"  ],
		  ["yasuo.nishiyama@woodbury.edu","Woodbury University","0","1","0","0","0","0","0","0","0","0","0","0"  ]
		]
				
		var userJson = [];
		var userStates = [];
		var allStates = ["Arizona","California","Colorado","Idaho","Montana","Nevada","New Mexico","Oregon","Texas","Utah","Washington","Wyoming"];
		var userSurveyState = [];

		console.log("making user Json for schema");

		for (var i = 0; i < userData.length; i++) {

			for (var j = 2,m = 0; j <= 13; j++,m++) {
				userStates[m] = userData[i][j]
			};

			for (var k = 0; k < 12; k++) {
				if(userStates[k]=="1"){
					userStates[k]=allStates[k];
				}
			};

			for (var l = 0; l < 12; l++) {
				if(userStates[l]!="0")
					userSurveyState.push(userStates[l])
			};

			userJson.push({
				user_email: userData[i][0],
				organization: userData[i][1],
				states: userSurveyState
			});

			userStates = [];
			userSurveyState = [];

		};
		for (var i = 0; i < userJson.length; i++) {
			
			var newUser = new user(userJson[i]);

			console.log(newUser);
			newUser.save(function (err){
				if(err){
					console.log('Error adding new user')
				}else{
					console.log('1 user inserted');
				}
			});
		};

	});


	router.get('/removeSurveyUsers', function(req, res){

		mongoose.connection.db.dropCollection('surveyUsers', function(err, result) {
			if(!err)
				console.log('all users dropped');
		});
		
	});

	

	router.get('/getAllUsers', function(req, res){

		user.find({}).exec(function(err, result) {
		  if (!err) {
		   console.log(result);
		  } else {
		    console.log('Error occured');
		  };
		});

	});


	router.get('/getAllLogins', function(req, res){

		var logins = require('../models/login');

		logins.find({}).exec(function(err, result) {
			  if (!err) {
			   console.log(result);
			  } else {
			    console.log('Error occured');
			  };
		});

	});

	/* GET login page. */
	router.get('/', function(req, res) {
    	
		res.render('index', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('register',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));





	/*
	Actual core Survey logic that you need to be concerned with is below. 
	Ignore all code above. That is just an 'Init code'. Those are already taken care of and need not be run again.
	*/








	/* GET Home Page */
	/*This handler renders a users home page
	If the user has previously answered the survey, then his answers will be retrieved
	and pre populated into the arr array, which is read in home.jade, looped and input fields populated*/
	router.get('/home', isAuthenticated, function(req, res){

		console.log(req.user.email)

		//Mongoose query for user schema to retrieve a user's details
		user.find({user_email: req.user.email}).exec(function(err, result) {
		  if (!err) {


		  	//Then, a mongoose query for prediction schema to retrieve a users predictions by his username
		  	prediction.find({username:req.user.username}).exec(function(err, data){

		  		

		  		if(data[0]!=undefined && data[0].predictions[0]!=undefined){
		  			console.log("******* " + data[0]);
		  			var userPred = []
			  		if(data[0].predictions[0].length>1 && data[0].predictions[0].indexOf(",")>-1){
			  			
			  			var arr = [];
			  			console.log(data[0].predictions.length)
			  			for (var i = 0; i < data[0].predictions.length; i++) {
			  				console.log("^^^^^^^^^^ " + i)
			  				arr.push(data[0].predictions[i].split(","));
			  			};
			  			
			  			console.log("Array length = " + arr.length)
			  			console.log(arr);

			  			var temp = [];

		  		}
		  	
		  		
		  			console.log("data available = "+ data[0] )
		  			res.render('home', { user: req.user, states: result[0].states, surveyQuestions: questions, answers: arr });
		  		}
		  		else{
		  			console.log("data unavailable")
		  			res.render('home', { user: req.user, states: result[0].states, surveyQuestions: questions });
		  		}


		  	});

		  } else {
		    console.log('Error occured');
		  };
		});
	});



	/* POST Submit 
	Once a user completes a Survey, this handler is invoked.
	The surver answers are serialized into one array, with '' for empty answers.
	This array is them persisted into the prediction Schema. (Which is also retrieved when /home is called to fetch user predictions)


	*/

	router.post('/submit', isAuthenticated, function(req, res){

		//Mongoose query for prediction schema to retrieve a users predictions by his email ID
		user.find({user_email: req.user.email}).exec(function(err, result) {
		  if (!err) {
		  var numberOfStates = result[0].states.length;
	  
		   
		   var projectionsForAState = [];
		   var allStateProjections = [];

			   for (var i = 0; i < numberOfStates; i++) {
			   	   	for (var j = 1; j < 11; j++) {
			   	   		projectionsForAState.push(req.body["q"+j+result[0].states[i]]);
				   	};
				   	allStateProjections.push(projectionsForAState);
				   	projectionsForAState = [];

			   };


			   console.log(allStateProjections);

			// Create a new schema object with each answer in a loop and persist them
			var userPrediction = new prediction({
				username: req.user.username,
				email: req.user.email,
				predictions: allStateProjections
			});

			var upsertData = userPrediction.toObject();

			// Delete the _id property, otherwise Mongo will return a "Mod on _id not allowed" error
			delete upsertData._id;


			// The upsert either inserts or updates a users predictions based on existence of his previous answers.
			prediction.update({username: req.user.username}, upsertData, {upsert: true}, function(err){
				if(!err){
					console.log("User predictions added");
					res.render('Survey_end');
					return;
				}else{
					console.log("Prdictions could not be added");
				}

			});


		  
		  } else {
		    console.log('Error occured');
		  };
		});
		

		
	});


	//Admin level call to see data in the DB - localhost:3000/getAllPred
	router.get('/getAllPred', function(req, res) {
		prediction.find({}).exec(function(err, result) {
			console.log(result);
		});
	});



	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	/* GET Dev test page */
	router.get('/test', function(req, res){
		res.render('test', { user: "test" });
	});

	return router;
}