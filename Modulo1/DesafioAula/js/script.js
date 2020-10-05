let inputSearch = null;
let buttonSearch = null;

let tabUsers = null;
let tabStatistics = null;

let summaryUsers = null;
let summaryStatistics = null;

let allUsers = [];

window.addEventListener('load', () => {
  inputSearch = document.querySelector('#inputSearch');
  buttonSearch = document.querySelector('#buttonSearch');
  tabUsers = document.querySelector('#tabUsers');
  tabStatistics = document.querySelector('#tabStatistics');
  summaryUsers = document.querySelector('#summaryUsers');
  summaryStatistics = document.querySelector('#summaryStatistics');

  fetchUsers();
  activeInput();

  setTimeout(() => {
    document.querySelector('#loading').classList.add('hide');
    inputSearch.value = '';
    inputSearch.focus();
  }, 500);
});

async function fetchUsers() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const json = await res.json();

  allUsers = json.results.map((user) => {
    const {
      name: { first, last },
      picture: { large },
      dob: { age },
      gender,
    } = user;
    return {
      name: first + ' ' + last,
      picture: large,
      age,
      gender,
    };
  });
}

function activeInput() {
  function handleSearchButton() {
    filterUsers(inputSearch.value);
  }

  function handleTyping(event) {
    let hasText = !!event.target.value && event.target.value.trim() !== '';

    if (hasText) {
      buttonSearch.classList.remove('disabled');
      if (event.key === 'Enter') {
        filterUsers(event.target.value);
      }
      return;
    }
    buttonSearch.classList.add('disabled');
  }

  inputSearch.addEventListener('keyup', handleTyping);
  buttonSearch.addEventListener('click', handleSearchButton);
  inputSearch.focus();
}

function filterUsers(searchName) {
  let usersHTML = '<div>';
  let allUsersFilter = [];

  function resultStatistics() {
    let statisticHTML = '';

    // prettier-ignore
    const totalMale = allUsersFilter.filter((user) => user.gender === 'male').length;
    // prettier-ignore
    const totalFemale = allUsersFilter.filter((user) => user.gender === 'female').length;
    const totalAges = allUsersFilter.reduce((accumulator, current) => {
      return accumulator + current.age;
    }, 0);

    // prettier-ignore
    statisticHTML += `
    <ul>
      <li>Sexo masculino: ${totalMale}</li>
      <li>Sexo feminino: ${totalFemale}</li>
      <li>Soma das idades: ${totalAges}</li>
      <li>Média das idades: ${(totalAges / (totalMale + totalFemale)).toFixed(2)}</li>
    </ul>
    `;
    tabStatistics.innerHTML = statisticHTML;
  }

  allUsersFilter = allUsers.filter((user) =>
    user.name.toUpperCase().includes(searchName.toUpperCase())
  );

  allUsersFilter
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((user) => {
      const { name, picture, age } = user;
      const userHMTL = `
    <div class="user">
      <div>
        <img src="${picture}" alt="${name}"/>
      </div>
      <div>
        ${name} , ${age} anos
      </div>
    </div>  
    `;
      usersHTML += userHMTL;
    }, 0);

  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;

  resultStatistics();
  updateTitles(allUsersFilter.length);
}

function updateTitles(searchUsers) {
  if (searchUsers === 0) {
    summaryUsers.textContent = 'No matching users';
    summaryStatistics.textContent = 'Nothing to show...';
    tabUsers.innerHTML = '';
    tabStatistics.innerHTML = '';
    return;
  }
  summaryUsers.textContent = `${searchUsers} user(s) found(ed)`;
  summaryStatistics.textContent = 'Stats';
}
