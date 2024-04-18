const tableBody = document.querySelector('tbody');
const playerName = document.getElementById('player-name');
const playerInitiative = document.getElementById('player-initiative')
const playerForm = document.getElementById('player-form');
const monsterForm = document.getElementById('monster-form');
const monsterName = document.getElementById('monster-name');
const monsterHp = document.getElementById('monster-hp');

$('th').on('click', function () {
  var rows = Array.from(tableBody.querySelectorAll('tr'));
  var column = $(this).data('column');
  const columnMap = {"initiative": 1, "name": 0, "hp": 2, "undefined":3 }
  var order = $(this).data('order');
  // console.log('column clicked', column, order);
  // console.log([columnMap[column]]);
  console.log(rows)

  if (order == 'desc') {
    $(this).data('order', 'asc');
    rows.map(a => console.log(a.children));
    rows = rows.sort((a,b) => +a.children[columnMap[column]].innerHTML > +b.children[columnMap[column]].innerHTML ? 1 : -1);
  } else {
    $(this).data('order', 'desc');
    rows = rows.sort((a,b) => +a.children[columnMap[column]].innerHTML < +b.children[columnMap[column]].innerHTML ? 1 : -1);
  }

  tableBody.innerHTML = '';
  rows.forEach(row => tableBody.appendChild(row));
});


function AddTableRowPlayer(name, initiative) {
    const row = document.createElement("tr");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary", "btn-sm");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");

    const buttonCell = document.createElement("td");
    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);
    
    deleteButton.addEventListener('click', function() {
      const rowToRemove = this.closest('tr');
      rowToRemove.remove();
    });

    row.innerHTML = `
      <td>${name}</td>
      <td>${initiative}</td>
      <td></td>
    `;

    row.appendChild(buttonCell);
    tableBody.appendChild(row);
  }  

function AddTableRowMonster(name, hp)
{
    const initiativeMonster = Math.floor(Math.random() * 21);
    const row = document.createElement("tr");

    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.classList.add("btn", "btn-primary", "btn-sm");

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("btn", "btn-danger", "btn-sm");

    const buttonCell = document.createElement("td");
    buttonCell.appendChild(editButton);
    buttonCell.appendChild(deleteButton);

    deleteButton.addEventListener('click', function() {
      const rowToRemove = this.closest('tr');
      rowToRemove.remove();
    });

    row.innerHTML = `
    <td>${name}</td>
    <td>${initiativeMonster}</td>
    <td>${hp}</td>
    `;

    row.appendChild(buttonCell);
    tableBody.appendChild(row);
}

playerForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const namePlay = playerName.value.trim();
    const initiativePlay = parseInt(playerInitiative.value);
    AddTableRowPlayer(namePlay,initiativePlay);
    playerForm.reset();
});  

monsterForm.addEventListener("submit", (event) =>{
    event.preventDefault();
    const nameMonst = monsterName.value.trim();
    const hpMonst = parseInt(monsterHp.value);
    AddTableRowMonster(nameMonst,hpMonst);
    monsterForm.reset();
});