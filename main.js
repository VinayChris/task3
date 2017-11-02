function fetchIssues()
{

	var issues = JSON.parse(localStorage.getItem('issues'));
	var issuesList = document.getElementById("issuesList");
	var lists = '';
	issuesList.innerHTML ='';
	console.log('length of issues',issues.length);
	for (var i = 0; i <issues.length; i++) 
	{//debugger;
		var id=issues[i].id;
		var desc = issues[i].description;
		var severity = issues[i].severity;
		var assignedTo = issues[i].assignedTo;
		var status = issues[i].status;
		
			lists +='<div class="well">'
									+'<h6>Issue ID: '
									+id
									+'</h6>'
									+'<p><span class+"label label-info">'
									+ status + '</span>'
									+'<h3>'+ desc + '</h3>'
									+'<p><span class="glyphicon glyphicon-user"></span>'
									+ assignedTo + '</p>'
									+'<a href="#" class="btn btn-warning" onclick="setStatusClosed(\''+id+'\')">Close</a>'
									+'<a href="#" class="btn btn-danger" onclick="deleteIssue(\''+id+'\')">Delete</a>'
									 +'</div>';
	}


	console.log('lists',lists);
	issuesList.innerHTML=lists;
}




function saveIssue(e)
{
	
	var issueId= chance.guid();
	//debugger;
	console.log(issueId);

	var issueDesc= document.getElementById('issueDescInput').value;
	var issueSeverity = document.getElementById('issueSeverityInput').value;
	var issueAssignedTo = document.getElementById('issueAssignedToInput').value;
	var issueStatus = 'open';

	var issue = {
		id: issueId,
		description:issueDesc,
		severity:issueSeverity,
		assignedTo:issueAssignedTo,
		status:issueStatus
	};
	//debugger;
	if(localStorage.getItem('issues') === null)
	{
		var issues=[];
		issues.push(issue);
		localStorage.setItem('issues',JSON.stringify(issues));
	}
	else
	{
		var issues =JSON.parse(localStorage.getItem('issues'));
		issues.push(issue);
		localStorage.setItem('issues',JSON.stringify(issues));

	}
	document.getElementById('issueInputForm').reset();
	
fetchIssues();
	
	e.preventDefault();

}

function setStatusClosed(id)
{
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if(issues[i].id == id)
		{
			issues[i].status = "closed";

		}
	}

	localStorage.setItem('issues',JSON.stringify(issues));

	fetchIssues();
	

}

function deleteIssue(id)
{
	var issues = JSON.parse(localStorage.getItem('issues'));

	for (var i = 0; i < issues.length; i++) {
		if(issues[i].id == id)
		{
			issues.splice(i,1);
		}
	};

	localStorage.setItem('issues',JSON.stringify(issues));

	fetchIssues();
}
document.getElementById('issueInputForm').addEventListener('submit', saveIssue);