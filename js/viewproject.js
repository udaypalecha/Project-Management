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
  if(name.trim().length==0)
    alert("Please define your task! :)");
  else
  {
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
}

function addUser(input_username) {
  let username = document.querySelector(input_username).value;
  if(username.trim().length!=0)
  {
    let userprofile = '#';
    let div = document.createElement('div');

    div.innerHTML = '<div class="accessColUser d-flex align-items-center py-2 border-bottom"><div class="d-flex gap-2"><img src="./assets/img/person.svg" class="rounded-circle" height="24" width="24" alt="Profile picture" loading="lazy"/><a class="username page-link" href=' + userprofile + '>' + username + '</a></div><i class="bi bi-person-dash"  onclick="this.parentNode.remove();"></i></div>';

    document.querySelector('#accessColOwner').after(div);
  }
}

function showCnfrmDlt() {
  dltProjBtn = document.querySelector('#dltProjBtn');
  if(dltProjBtn.getAttribute('type') == 'submit')
    document.querySelector('.dltProj').submit();
  document.querySelector('#cnfrmDlt').classList.remove('d-none');
  document.querySelector('#cnclDltBtn').scrollIntoView();
  dltProjBtn.outerHTML='<button id="dltProjBtn" class="btn btn-danger" type="submit" onclick="showCnfrmDlt()">Delete this project</button>';
}

function cnclDlt() {
  document.querySelector('#cnfrmDlt').classList.add('d-none');
  document.querySelector('#dltProjBtn').outerHTML='<button id="dltProjBtn" class="btn btn-danger" type="button" onclick="showCnfrmDlt()">Delete this project</button>';
}

/* XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

let acUsers = document.querySelectorAll('.accessColUser');
let showMore = document.querySelector('.showMore');

if(acUsers.length < 6) showMore.style.display = 'none';
else {
  let i=5;
  
  for(i=5; i<acUsers.length; i++)
    acUsers[i].style.display = 'none';
  showMore.style.display = 'block';

  showMore.addEventListener('click', () => {
    for(i=5; i<acUsers.length; i++)
      acUsers[i].style.display = 'flex';
    showMore.style.display = 'none';
  });
}

XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX */