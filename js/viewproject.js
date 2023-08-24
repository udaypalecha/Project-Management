function showBlock(selector) {
  let ele = document.querySelector(selector);
  ele.style.display = 'block';
  ele.scrollIntoView();
}
function hide(selector) {
  document.querySelector(selector).style.display = 'none';
}

function addTask(taskName, taskStatus, taskAssignee) {
  let tr = document.createElement('tr');
  let name = document.querySelector(taskName).value;
  let status = document.querySelector(taskStatus).value;
  let assignee = document.querySelector(taskAssignee).value;

  if(status=='scheduled'){status='Scheduled';}
  else if(status=='completed'){status='Completed';}
  else if(status=='new'){status='New';}
  else {status='In-Progress';}

  tr.innerHTML = '<td class="taskName" contenteditable="true" spellcheck="false">' + name + '</td><td class="status ' + status.toLowerCase() + '"><i class="bi bi-circle-fill"></i> ' + status + '</td><td class="assignee">' + assignee + '</td><td><a class="bi-trash" onclick="this.parentNode.parentNode.remove();"></a></td>';
  
  document.querySelector('.taskTableBody').appendChild(tr);
  tr.scrollIntoView();
  hide('.taskForm');
}

function addUser(input_username) {
  let username = document.querySelector(input_username).value;
  let userprofile = '#';
  let div = document.createElement('div');

  div.innerHTML = '<div class="d-flex align-items-center py-2 border-bottom"><div class="d-flex gap-2"><img src="./assets/img/person.svg" class="rounded-circle" height="24" width="24" alt="Profile picture" loading="lazy"/><a class="username page-link" href=' + userprofile + '>' + username + '</a></div><i class="bi bi-person-dash"  onclick="this.parentNode.remove();"></i></div>';

  document.querySelector('#accessCol').appendChild(div);
}