const app = function () {
  const url = 'https://restcountries.eu/rest/v2/all';
  const button = document.querySelector('button');

  button.addEventListener('click', function(){
    makeRequest(url, requestComplete)
  });
  // makeRequest(url, requestComplete);

  const select = document.querySelector('select');
  select.addEventListener('change', displayCountryDetail);

  // const persietDataJson = localStorage.getItem('countrySelected');
  // const persietData = JSON.parse(persietDataJson);

}


const displayCountryDetail = function() {
  const ulMain = document.querySelector('#country-list');
  ulMain.innerText ='';

  const selectedCountry = this.value;
  console.log("let me see", selectedCountry)
  // console.log("displayCountryDetail", this.value)
  // console.log("selectedCountry", typeof(selectedCountry));
  const countryListJSON = localStorage.getItem('country');
  const countryList = JSON.parse(countryListJSON);
  // const result = findCountry(countryList, country.name, this.value);
  console.log("countryList", countryList);


  const nameLi = document.createElement('li')
  nameLi.innerText= "Country name: " + countryList[this.value].name;
  const populationLi = document.createElement('li')
  populationLi.innerText = "Population: " + countryList[this.value].population;
  const capitalCityLi = document.createElement('li');
  capitalCityLi.innerText = "Capital City: " + countryList[this.value].capital;

  const ul = document.querySelector('ul')
  ul.appendChild(nameLi);
  ul.appendChild(populationLi);
  ul.appendChild(capitalCityLi);

  const jsonString = JSON.stringify(countryList[this.value]);
  localStorage.setItem("countrySelected", jsonString);

  const borderli = document.createElement('li');
  borderli.innerText = "Bordering Countries:"
  ul.appendChild(borderli);

  const boardTopTierUl = document.createElement('ul');
  boardTopTierUl.classList.add('toptierul')
  borderli.appendChild(boardTopTierUl);

  const borderResult = countryList[this.value].borders
  console.log("borderResult", borderResult);

  const matchingCountries = countryList.filter(function(country){
    return borderResult.includes(country.alpha3Code)
  })

  matchingCountries.forEach(function(country){
    const li = document.createElement('li');
    li.innerText = `name: ${country.name}, population: ${country.population}, capital: ${country.capital}`;
    // console.log('border country: name ', country)
    // li.value = country.index;
    const boardTopTierUl = document.querySelector('.toptierul');
    boardTopTierUl.appendChild(li);
  })

  const container = document.querySelector('#map')
  const coords = {lat: countryList[this.value].latlng[0], lng: countryList[this.value].latlng[1]}
  console.log("I hate js", this)
  const countryMap = new mapShow(container, coords, 3);

}

  const mapShow = function(container, coords, zoom) {
    this.googleMap = new google.maps.Map(container, {
      center: coords,
      zoom: zoom
    });
  }
// const findCountry = function(countryList, countryInfo, givenInfo) {
//   countryList.filter(function(){
//     countryInfo === givenInfo;
//   })
// }


const makeRequest = function(url, callBack){
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();

  request.addEventListener('load', callBack);
}

const requestComplete = function () {
  console.log(this)
  //"this" should be the request which is the XMLHttpRequest
  if (this.status !== 200) return;

  const jsonString = this.responseText;
  localStorage.setItem('country', jsonString);
  const countries = JSON.parse(jsonString);

  console.log(countries);
  populateList(countries);
}

const populateList = function(countries) {
  const select = document.querySelector('select');

  countries.forEach(function(country, index){
    const option = document.createElement('option');
    option.innerText = country.name;
    option.value=index;
    select.appendChild(option);
  })




}

document.addEventListener('DOMContentLoaded', app);
