import { promises as fs, stat } from 'fs';

var statesList = [];
var citiesList = [];

init();

async function init() {
  await createUFs();
  await getUFMoreCities();
  await getUFLessCities();
  await getBiggestCitiesNames();
  await getSmallestCitiesNames();
  await getBiggestCityName();
  await getSmallestCityName();
}

async function countCities(uf) {
  // prettier-ignore
  const cities = JSON.parse(await fs.readFile(`./Estados/${uf}.json`), 'utf-8');
  return cities.length;
}

async function createUFs() {
  try {
    statesList = JSON.parse(await fs.readFile('./Estados.json', 'utf-8'));
    citiesList = JSON.parse(await fs.readFile('./Cidades.json', 'utf-8'));

    for (let i = 0; i < statesList.length; i++) {
      let currentCity = citiesList.filter((city) => {
        return city.Estado === statesList[i].ID;
      });

      // prettier-ignore
      await fs.writeFile(`./Estados/${statesList[i].Sigla}.json`, JSON.stringify(currentCity));

      // prettier-ignore
      statesList[i].numberOfCities = `${await countCities(statesList[i].Sigla)}`;
    }
  } catch (err) {
    console.log(err);
  }
}

function getUFMoreCities() {
  try {
    statesList.sort((a, b) => {
      return b.numberOfCities - a.numberOfCities;
    });

    let moreCities = [];

    for (let i = 0; i < 5; i++) {
      moreCities[i] = statesList[i];
    }

    let mappedMoreCities = moreCities.map((state) => {
      return `${state.Sigla} - ${state.numberOfCities}`;
    });

    console.log(mappedMoreCities);
  } catch (err) {
    console.log(err);
  }
}

function getUFLessCities() {
  try {
    statesList.sort((a, b) => {
      return a.numberOfCities - b.numberOfCities;
    });

    let lessCities = [];

    for (let i = 0; i < 5; i++) {
      lessCities[i] = statesList[i];
    }

    let mappedLessCities = lessCities
      .sort((a, b) => {
        return b.numberOfCities - a.numberOfCities;
      })
      .map((state) => {
        return `${state.Sigla} - ${state.numberOfCities}`;
      });

    console.log(mappedLessCities);
  } catch (err) {
    console.log(err);
  }
}

async function countNames(uf) {
  // prettier-ignore
  let cities = JSON.parse(await fs.readFile(`./Estados/${uf}.json`), 'utf-8');

  cities.forEach((city) => {
    city.nameSize = city.Nome.length;
  });

  // let citiesSortted = cities.sort((a, b) => {
  //   return b.nameSize - a.nameSize;
  // });

  // // console.log(citiesSortted);
  // return citiesSortted;

  return cities;
}

async function getBiggestCitiesNames() {
  let mappedBiggestNameByUF = [];

  // statesList.sort((a, b) => {
  //   return a.ID - b.ID;
  // });

  for (let i = 0; i < statesList.length; i++) {
    let biggestNameByUF = await countNames(statesList[i].Sigla);

    biggestNameByUF
      .sort((a, b) => {
        return a.Nome - b.Nome;
      })
      .sort((a, b) => {
        return b.nameSize - a.nameSize;
      });

    // prettier-ignore
    mappedBiggestNameByUF[i] = `${biggestNameByUF[0].Nome} - ${statesList[i].Sigla}`;
  }
  console.log(mappedBiggestNameByUF);
  return mappedBiggestNameByUF;
}

async function getSmallestCitiesNames() {
  let mappedSmallestNameByUF = [];

  // statesList.sort((a, b) => {
  //   return a.ID - b.ID;
  // });

  for (let i = 0; i < statesList.length; i++) {
    let smallestNameByUF = await countNames(statesList[i].Sigla);

    smallestNameByUF
      .sort((a, b) => {
        return a.Nome - b.Nome;
      })
      .sort((a, b) => {
        return a.nameSize - b.nameSize;
      });

    // prettier-ignore
    mappedSmallestNameByUF[i] = `${smallestNameByUF[0].Nome} - ${statesList[i].Sigla}`;
  }
  console.log(mappedSmallestNameByUF);
  return mappedSmallestNameByUF;
}

async function getBiggestCityName() {
  let biggestCityName = await getBiggestCitiesNames();

  biggestCityName.sort((a, b) => {
    return b.length - a.length;
  });

  console.log(biggestCityName[0]);
}

async function getSmallestCityName() {
  let smallestCityName = await getSmallestCitiesNames();

  smallestCityName.sort((a, b) => {
    return a.length - b.length;
  });

  console.log(smallestCityName[0]);
}
