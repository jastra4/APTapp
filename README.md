REQUIREMENTS
-NPM
-Node

DEPENDANCIES

CLIENT:
react
redux
react-router

COMPILER:
babel
webpack

API:
blizzard

SERVER:
express
axios
body-parser

DATABASE:
mongoose


// Front End MVP

populate a list with whatever recipies the player is able to make
	- have a way to look up items
	- have a way to show items list
do a search to get results back for those recipies
	- have a search button

see summary results for all items
	- summary results: make x amount if item, buy mats at z price, sell at y price, net yield
		- where x is the most efficient amount to make
see detailed results for the first item in the list
	- details for all x amounts
	- brake down of materials
		- required amounts
		- individual costs
		- associated auction owner/id
click any item in list to see detailed results for that item

// Front End Stretch

enter character name and automatically update list with their recipies 

// Server

Update database automatically with cron job
Handle get request


// Database

store each dump in a separate collection
delete oldest dumps when limit is reached
