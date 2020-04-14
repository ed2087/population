//***********************************
       // GLOBAL
//***********************************
const _iD = (id) => {return document.getElementById(id)};
const _cS = (classes) => {return document.querySelectorAll(classes)};
const _c = (clas) => {return document.querySelector(clas)};


//***********************************
       // FUNCTIONS
//***********************************

let country = {
    name : null,
    population : null,
    nativeName : null,
    capital : null,
    region : null,
    subregion : null,
    area : null,
    flag : null,
    fulldata : null,
    borders : [],
    currencies : [],
    languages : [],
    ctrsNames : []
}

const getCountryCurrent = (data) =>{

  let html = `<ul class="country-ul" id="country-ul-inner"><h3 class="h3">Currency</h3>`;
  data.forEach(c => {
    html += `<li class="country-li">( ${c.name}  ( ${c.symbol} ) )</li>`;
  })
  html += `</ul>`;
  return html;
}

const getCountryLanguages = (data) =>{

  let html = `<ul class="country-ul" id="country-ul-inner"><h3 class="h3">Languages</h3>`;
  data.forEach(c => {
    html += `<li class="country-li">( ${c.name} )</li>`;
  })
  html += `</ul>`;
  return html;

}

const getCountryBorders = (data) =>{
  if (data.length <= 0)return "";
  let html = `<ul class="country-ul" id="country-ul-inner"><h3 class="h3">Borders</h3>`;
  data.forEach((c, i) => {
    html += `<li class="country-li">( ${c} )</li>`;
  })
  html += `</ul>`;
  return html;

}

const coronaHtml = (data) =>{  
  if (data == undefined)return "";
  let html = `<ul class="country-ul" id="country-ul-inner"><h3 class="h3">COVID19 - Cases</h3>`;
  for (const key in data) {
    if (key != "Slug" && key != "CountryCode" && key != "Country" ) {
       html += `<li class="country-li">${key} ( ${data[key]} )</li>`;
    }
  }
  html += `</ul>`;
  htmlMold(html);
}

const htmlMold = (corona) => {
  const response =  `
    <div class="box-wrap">
        <div class="img-wraper">
            <img src="${country.flag}" alt="${country.name}">
        </div>
        <div class="inner-wrap">
          <h2 class="country">${country.name}</h2>
           <ul class="country-ul">
               <li class="country-li">NativeName -- ( ${country.nativeName} )</li>
               <li class="country-li">Capital -- ( ${country.capital} )</li>
               <li class="country-li">Region -- ( ${country.region} )</li>
               <li class="country-li">Subregion -- ( ${country.subregion} )</li>
               <li class="country-li">Area -- ( ${country.area.toLocaleString('en')} )</li>
               <li class="country-li">population -- ( ${country.population.toLocaleString('en')} )</li>
               <li class="country-li">${corona}</li>
               <li class="country-li">${getCountryCurrent(country.currencies)}</li>
               <li class="country-li">${getCountryLanguages(country.languages)}</li>
               <li class="country-li">${getCountryBorders(country.borders)}</li>
           </ul>
        </div>
    </div>
 `;
 _iD("word-con").innerHTML = response;
}

const addOptions = (data) => {
  let html;
  data.forEach(c => {
    html += `<option value="${c.numericCode}">${c.name}</option>`;
  })
  select.innerHTML = html;
}


const getContrInfo = (numericCode, data) =>{
    for (var i = 0; i < data.length; i++) {
        if (data[i].numericCode == numericCode) {
             country.name = data[i].name;
             country.fulldata = data[i];
             country.population = data[i].population;
             country.nativeName = data[i].nativeName;
             country.capital = data[i].capital;
             country.region = data[i].region;
             country.subregion = data[i].subregion;
             country.area = data[i].area;
             country.flag = data[i].flag;
             country.borders = data[i].borders;
             country.currencies = data[i].currencies;
             country.languages = data[i].languages;
             country.ctrsNames = data[i].ctrsNames;
        }
    }
}

const startFunctions = (data, numericCode) =>{
  addOptions(data)  ;
  getContrInfo(numericCode, data);
  CoronaVirusData(country.name);  
}

//***********************************
       // FETCH DATA
//***********************************

async function getJSON(url) {
  _iD("LoadingStatus").innerHTML = `Loading...`;
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (e) {
     throw e;
  }finally {
     _iD("LoadingStatus").innerHTML = `Live!`;
	}
}


const callFetch = (numericCode) => {

  getJSON(`https://restcountries.eu/rest/v2/all`)
        .then(data => {startFunctions(data, numericCode)})
        .catch(err =>{
           _iD("LoadingStatus").innerHTML = `Woops error`;
           console.log(`Something whent wrong!`, err)
        })

}

const CoronaVirusData = (ctrName) => {
  getJSON(`https://api.covid19api.com/summary`)
    .then(data => {
        const info = data.Countries.find(c =>{
          return c.Country === ctrName
        })
        coronaHtml(info)
    })
    .catch(err => console.log)
}


//***********************************
       // event listeners
//***********************************

_iD("select").addEventListener("change", () =>{
    callFetch(event.target.value);
})

callFetch(004)










































const x = `
   **************************************************
       check out www.mydeathclock.com if you like
                   creepy stuff 
`

console.log(x )




