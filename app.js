// je dois me localiser : 
// si vous n'avez pas acces a votre geoloc
let latitude = 45.4275
let longitude = 4.4165

//navigator.geoloacalisation.getCurrentPosition((coord)=>{
    //console.log(coord)
   // let latitude = coord.coords.latitude
   // let longitude = coord.coords.longitude

    let url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min&hourly=temperature_2m,weather_code&current=temperature_2m,weather_code`

fetch(url)
.then (rep=>{
  return rep.json()
})
.then (data=>{
    console.log(data)
    //Afficher le temps du jour 
    afficheTempsDuJour(data.current.weather_code, data.current. temperature_2m)

//changer l'arriere plan 
arrierePlanBody(data.current.weather_code)

// on affiche le temps des jours suivants: 
afficheLtesAutreJours(data.daily)


})


//})

//Role : affiche le temps et la température du jour
// dans la div qui a la classe CSS current : 
// parametres : code , temperature 
// retour : rien 


function afficheTempsDuJour(code,temperature){
    document.querySelector(".current").innerHTML =`<div class="picto-weather picto-${transformerCodeEnMot(code)}"></div>
                <p class="tmax">${temperature}</p>`
}

//role : transformer le code reçu de l'api en un mot
// parametre : le code 
//return : le mot ! 


function transformerCodeEnMot(code){
    	if(code == 0){
		// clear sky
		return "sun"
	}else if(code >=1 && code < 45 ){
		// partialy cloudy
		return "suncloud"
	}else if(code >=45 && code < 61){
		// foggy & cloudy
		return "cloud"
	}else if((code >=61 && code < 71) ||(code >=80 && code < 85) ){
		// Rainy
		return "rain"
	}else if((code >=71 && code < 77) || (code>= 85 && code<95 )){
		// snow
		return "snow"
	}else if(code>95){
		// thunder
		return "thunder"
	}else{
		return "coucou"
	}

}

/*role : donner au body la bonne classe css pour afficher l'arriere plan*/
//parametre: code
//retour: rien 


function arrierePlanBody(code){

    let nomDeClasse = "bg-weather-"+ transformerCodeEnMot(code)
    document.querySelector("body").classList.add(nomDeClasse)
}

/*role de construire les petites cartes pour le temps des jours et les afficher dans le document danss la div qui a la classe carousel-daily-container */

// parametre: meteoDuJour, un objet
//retour: non

function afficheLtesAutreJours(meteoDesJour){

    let template =""
    for(let i=1; i<7;i++){
        // j'utilise i pour me ballader dans les tableaux
        template+= `<div class="dayly-weather">
                    <h4>${meteoDesJour.time[i]}</h4>
                    <div class="minipicto minipicto-${transformerCodeEnMot(meteoDesJour.weather_code[i])}"></div>
                    <h3 class="tmax">${meteoDesJour.temperature_2m_max[i]}°C</h3>
                    <h3 class="tmin">${meteoDesJour.temperature_2m_min[i]}°C</h3>  
                </div>`

    }

document.querySelector(".carousel-daily-container").innerHTML = template

}