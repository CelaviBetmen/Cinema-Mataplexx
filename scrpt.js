let prijava = document.getElementById("login")
let korisnicki = document.getElementById("par1")
let username = document.getElementById("input1")
let nijedbrusr = document.getElementById("nijeusr")
let nijedbrpass = document.getElementById("nijepass")
let password = document.getElementById("input2")
let slika = document.getElementById("slika2")
let pardiv = document.getElementById("paragrafi")
let footer = document.getElementById("footer")
let divzab
let psswd2
let regex = new RegExp("^[A-Z]{1}.+[0-9]{1,}$")
let regexDatum = new RegExp("^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/[0-9]{4}$");
let btn2 = document.getElementById("btnlog")
let strana = document.getElementById("strana")
let inputpromo = document.createElement("input")
let racunmain = document.getElementById("racun")
inputpromo.type = "text"
inputpromo.id = "inputpromo"
let spankarte
let i = 0
let niz = []
let niz2 = []
let sala1niz = {}
let sala2niz = {}
let sala3niz = {}
let sala4niz = {}
let nizracuna = {}
let brojacsala = 0
let nizkupljenih = []
let slideslika = document.getElementById("slicica")
let rasporeddiv = document.getElementById("sale")
let x
let brk = 0
let galerija = document.getElementById("galerija")
let nijedbrpass1
let prijava1 = 1
let paragrafcena = document.createElement("p")
let hiden = document.getElementById("hid")

let btnz
hiden.style.opacity = "0%"
hiden.style.color = "red"

let main = document.getElementById("main")
let rodj
let korisnici
let brojkorisnika

fetchXML();
fetchmain();
async function fetchXML() {
    const obj = await fetch("xml/filmovi.xml");
    const txt = await obj.text()
    parseXml(txt);
}

function parseXml(txtXml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txtXml, "text/xml");

    x = xmlDoc.getElementsByTagName("Movie");

    for (let movie of x) { //prolazim kroz sve filmove
        let obj = {} //pravim obj za film svaki
        for (let kid of movie.children) { //prolazim kroz sve atr filma
            let key = kid.nodeName //pokupim ime atr
            if (kid.nodeName == "Sale") //ako je Sale
            {
                obj[key] = [] //u filmi pravim listu sala
                for (const kid2 of kid.children) { //prolazim kroz svaku salu
                    let obj2 = {} //pravim obj za salu
                    for (const kid3 of kid2.children) { //prolazim kroz atr sale
                        let key2 = kid3.nodeName
                        if (key2 == "Vremena") // ako je vreme
                        {
                            obj2[key2] = [] //listu vremena
                            for (const kid4 of kid3.children) { //prolazim kroz vreme
                                let obj3 = {}
                                for (const kid5 of kid4.children) {
                                    obj3[kid5.nodeName] = kid5.textContent
                                }
                                obj2[key2].push(obj3)
                            }
                        }
                        else {
                            let key3 = kid3.nodeName
                            let val = kid3.textContent //kupi broj 
                            obj2[key3] = val
                        }
                    }
                    obj[key].push(obj2)
                }
            }
            else {
                let value = kid.textContent
                obj[key] = value
            }
        }
        niz.push(obj)
    }
}

async function fetchmain() {
    const obj = await fetch("xml/filmovizaslajd.xml")
    const txt = await obj.text()
    pasrseFilmovi(txt)
}

function pasrseFilmovi(txtXml) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(txtXml, "text/xml");

    x = xmlDoc.getElementsByTagName("Movie");

    for (let movie of x) { //prolazim kroz sve filmove
        let obj = {} //pravim obj za film svaki
        for (let kid of movie.children) { //prolazim kroz sve atr filma
            let key = kid.nodeName //pokupim ime atr
            if (kid.nodeName == "Sale") //ako je Sale
            {
                obj[key] = [] //u filmi pravim listu sala
                for (const kid2 of kid.children) { //prolazim kroz svaku salu
                    let obj2 = {} //pravim obj za salu
                    for (const kid3 of kid2.children) { //prolazim kroz atr sale
                        let key2 = kid3.nodeName
                        if (key2 == "Vremena") // ako je vreme
                        {
                            obj2[key2] = [] //listu vremena
                            for (const kid4 of kid3.children) { //prolazim kroz vreme
                                let obj3 = {}
                                for (const kid5 of kid4.children) {
                                    obj3[kid5.nodeName] = kid5.textContent
                                }
                                obj2[key2].push(obj3)
                            }
                        }
                        else {
                            let key3 = kid3.nodeName
                            let val = kid3.textContent //kupi broj 
                            obj2[key3] = val
                        }
                    }
                    obj[key].push(obj2)
                }
            }
            else {
                let value = kid.textContent
                obj[key] = value
            }
        }
        niz2.push(obj)
    }
}




function popunislike() {
    let pom = 0
    let pom1 = 5
    document.getElementById("div5").innerHTML = ""
    document.getElementById("div6").innerHTML = ""
    document.getElementById("div7").innerHTML = ""
    document.getElementById("div8").innerHTML = ""
    document.getElementById("div9").innerHTML = ""
    for (let el of niz) {
        if (!filtriraj(el)) continue
        let pom2 = document.createElement("img")
        let pom3 = document.getElementById(`div${pom1}`)
        let pom4 = document.createElement("figcaption")
        pom4.textContent = `${el.Series_Title}`
        let pom5 = document.createElement("div")
        pom5.style.display = "flex"
        pom5.style.flexDirection = "column"
        if (el.Series_Title == "Flipped") {
            pom2.src = "slikexml/flipdole.jpg"
        }
        else if (el.Series_Title == "Skyfall") {
            pom2.src = "slikexml/skyfalldole.jpg"
        }
        else {
            pom2.src = `${el.Link}`
        }
        pom2.style.width = "300px"
        pom2.style.height = "400px"
        pom2.onclick = kliknuto.bind(null, el)
        pom5.appendChild(pom2)
        pom5.appendChild(pom4)
        pom3.appendChild(pom5)

        pom++
        if (pom % 4 == 0) {
            pom1++
        }
    }
}

function kliknuto(el) {
    let pomvrojac = 0
    strana.style.display = "none"
    document.getElementById("naklik").innerHTML = ""
    document.getElementById("naklik").style.display = "flex"
    let pom = document.createElement("iframe")
    let pom1 = document.createElement("div")
    let pom2 = document.createElement("div")
    let pom3 = document.createElement("div")
    let pom4 = document.createElement("div")
    let pom5 = document.createElement("div")
    let pom6 = document.createElement("div")
    let divscene = document.createElement("div")
    let slikascena1 = document.createElement("img")
    let slikascena2 = document.createElement("img")
    for (const scena of el.Scene.split("\n")) {
        if (scena != "") {
            if (pomvrojac == 0) {
                slikascena1.src = scena
            }
            else {
                slikascena2.src = scena
            }
            pomvrojac++
        }
    }
    slikascena1.style.objectFit = "cover"
    slikascena2.style.objectFit = "cover"
    slikascena1.style.width = "130px"
    slikascena1.style.height = "70px"
    slikascena2.style.width = "130px"
    slikascena2.style.height = "70px"

    slikascena1.onclick = function () {
        let divzascenu = document.createElement("div")
        divzascenu.style.width = "950px"
        divzascenu.style.height = "550px"
        divzascenu.style.position = "absolute"
        divzascenu.style.zIndex = "1000"
        divzascenu.style.left = "50%";
        divzascenu.style.top = "50%";
        divzascenu.style.transform = "translate(-50%, -50%)";
        divzascenu.style.backgroundImage = `url(${slikascena1.src})`
        divzascenu.style.backgroundSize = "cover"

        let blurovandiv = document.createElement("div");
        blurovandiv.style.position = "fixed";
        blurovandiv.style.top = "0";
        blurovandiv.style.left = "0";
        blurovandiv.style.width = "100%";
        blurovandiv.style.height = "100%";
        blurovandiv.style.background = "rgba(0, 0, 0, 0.5)";
        blurovandiv.style.backdropFilter = "blur(8px)";
        blurovandiv.style.zIndex = "999";

        document.getElementById("naklik").appendChild(blurovandiv);
        document.getElementById("naklik").appendChild(divzascenu);

        blurovandiv.onclick = function () {
            document.getElementById("naklik").removeChild(blurovandiv);
            document.getElementById("naklik").removeChild(divzascenu);
        }

    }

    slikascena2.onclick = function () {
        let divzascenu = document.createElement("div")
        divzascenu.style.width = "950px"
        divzascenu.style.height = "550px"
        divzascenu.style.position = "absolute"
        divzascenu.style.zIndex = "1000"
        divzascenu.style.left = "50%";
        divzascenu.style.top = "50%";
        divzascenu.style.transform = "translate(-50%, -50%)";
        divzascenu.style.backgroundImage = `url(${slikascena2.src})`
        divzascenu.style.backgroundSize = "cover"

        let blurovandiv = document.createElement("div");
        blurovandiv.style.position = "fixed";
        blurovandiv.style.top = "0";
        blurovandiv.style.left = "0";
        blurovandiv.style.width = "100%";
        blurovandiv.style.height = "100%";
        blurovandiv.style.background = "rgba(0, 0, 0, 0.5)";
        blurovandiv.style.backdropFilter = "blur(8px)";
        blurovandiv.style.zIndex = "999";

        document.getElementById("naklik").appendChild(blurovandiv);
        document.getElementById("naklik").appendChild(divzascenu);

        blurovandiv.onclick = function () {
            document.getElementById("naklik").removeChild(blurovandiv);
            document.getElementById("naklik").removeChild(divzascenu);
        }
    }
    slikascena1.style.cursor = "pointer"
    slikascena2.style.cursor = "pointer"
    divscene.style.display = "flex"
    divscene.style.marginTop = "10px"
    divscene.style.gap = "10px"
    divscene.appendChild(slikascena1)
    divscene.appendChild(slikascena2)
    pom6.style.display = "flex"
    pom6.style.alignItems = "center"
    pom4.style.display = "flex"
    pom4.style.flexDirection = "column"
    pom4.style.width = "300px"
    pom4.appendChild(pom)
    pom3.style.display = "flex"
    pom2.style.display = "flex"
    pom.allowFullscreen = "true"
    pom2.style.flexDirection = "column"
    let h2 = document.createElement("h2")
    let paragraf1 = document.createElement("p")
    let paragraf2 = document.createElement("p")
    paragraf2.textContent += "Trajanje : " + `${parseInt((Number(el.Runtime) / 60))}` + "h" + " "
    paragraf2.textContent += Number(el.Runtime) % 60 != 0 ? `${Number(el.Runtime) % 60}` + "min" : ""
    paragraf2.style.margin = "4px"
    paragraf1.style.margin = "4px"
    h2.style.margin = "4px"
    h2.textContent = `${el.Series_Title}`
    for (const zanr of el.Genres.split("\n")) {
        if (zanr != "") {
            paragraf1.textContent += `${zanr}`
            paragraf1.textContent += " "
        }
    }
    pom2.appendChild(h2)
    pom2.appendChild(paragraf1)
    pom2.appendChild(paragraf2)
    pom1.style.display = "flex"
    pom1.style.gap = "10px"
    pom1.style.marginTop = "40px"
    pom.src = `${el.Video}`
    let slikafilm = document.createElement("img")
    slikafilm.src = `${el.Link}`
    slikafilm.style.width = "100px"
    slikafilm.style.height = "150px"
    slikafilm.style.objectFit = "cover"
    pom2.style.marginLeft = "5px"
    pom.style.border = "none"
    pom5.style.display = "flex"
    pom5.style.flexDirection = "column"
    let plot = document.createElement("p")
    plot.textContent = `${el.Plot}`
    plot.style.textAlign = "justify"
    let divtekst = document.createElement("div")
    divtekst.style.display = "flex"
    divtekst.style.flexDirection = "column"
    divtekst.style.backgroundColor = "rgb(36, 36, 36)"
    divtekst.style.color = "white"
    divtekst.style.paddingLeft = "10px"
    divtekst.style.paddingRight = "10px"
    divtekst.appendChild(plot)
    let naslov = document.createElement("p")
    naslov.textContent = `${el.Series_Title}`
    let strongnaslov = document.createElement("strong")
    strongnaslov.textContent = "Naslov"
    naslov.style.marginTop = "4px"
    strongnaslov.style.marginTop = "20px"
    strongnaslov.id = "strongid"
    let stronggodina = document.createElement("strong")
    stronggodina.textContent = "Godina izlaska"
    stronggodina.id = "strongid"
    let godinaizl = document.createElement("p")
    godinaizl.textContent = `${el.Released_Year}`
    godinaizl.style.marginTop = "4px"
    divtekst.appendChild(strongnaslov)
    divtekst.appendChild(naslov)
    divtekst.appendChild(stronggodina)
    divtekst.appendChild(godinaizl)
    let strongvremetrajanja = document.createElement("strong")
    strongvremetrajanja.textContent = "Vreme trajanja"
    strongvremetrajanja.id = "strongid"
    let vremetr = document.createElement("p")
    vremetr.textContent = `${parseInt((Number(el.Runtime) / 60))}` + "h" + " "
    vremetr.textContent += Number(el.Runtime) % 60 != 0 ? `${Number(el.Runtime) % 60}` + "min" : ""
    vremetr.style.marginTop = "4px"
    divtekst.appendChild(strongvremetrajanja)
    divtekst.appendChild(vremetr)
    let strongdirektor = document.createElement("strong")
    strongdirektor.textContent = "Direktor"
    strongdirektor.id = "strongid"
    let direktor = document.createElement("p")
    direktor.textContent = `${el.Director}`
    direktor.style.marginTop = "4px"
    divtekst.appendChild(strongdirektor)
    divtekst.appendChild(direktor)
    let strongglumci = document.createElement("strong")
    strongglumci.textContent = "Glumci"
    strongglumci.id = "strongid"
    let glumci = document.createElement("p")
    glumci.textContent = `${el.Star1}` + "," + " " + `${el.Star2}` + "," + " " + `${el.Star3}` + "," + " " + `${el.Star4}`
    glumci.style.marginTop = "4px"
    divtekst.appendChild(strongglumci)
    divtekst.appendChild(glumci)
    let strongzanr = document.createElement("strong")
    strongzanr.textContent = "Zanrovi"
    strongzanr.id = "strongid"
    let zanrovi = document.createElement("p")
    let genre = []
    for (const zanr of el.Genres.split("\n")) {
        if (zanr != "") {
            genre.push(zanr)
        }
    }
    zanrovi.textContent = genre.join(", ")
    zanrovi.style.marginTop = "4px"
    divtekst.appendChild(strongzanr)
    divtekst.appendChild(zanrovi)
    let strongocena = document.createElement("strong")
    strongocena.textContent = "Ocena"
    strongocena.id = "strongid"
    let ocena = document.createElement("p")
    ocena.textContent = `${el.IMDB_Rating}` + "/" + "10"
    ocena.style.marginTop = "4px"
    divtekst.appendChild(strongocena)
    divtekst.appendChild(ocena)
    divtekst.style.marginBottom = "65px"
    pom4.appendChild(divtekst)
    pom6.appendChild(slikafilm)
    pom6.appendChild(pom2)
    pom5.appendChild(pom6)
    pom5.appendChild(divscene) // u pom5 dodajem fieldset !!!

    let divraspored = document.createElement("div")
    divraspored.style.display = "flex"
    divraspored.style.flexDirection = "column"
    let raspored = document.createElement("h2")
    raspored.textContent = "Raspored"
    raspored.style.color = "white"
    divraspored.style.marginTop = "100px"
    divraspored.style.paddingLeft = "20px"
    divraspored.style.width = "500px"
    divraspored.appendChild(raspored)

    for (const sala of el.Sale) {
        let div1 = document.createElement("div")
        div1.style.display = "flex"
        div1.style.gap = "30px"
        let brojsale = sala.Broj
        for (const vreme of sala.Vremena) {
            let div2 = document.createElement("div")
            div2.style.display = "flex"
            div2.style.flexDirection = "column"
            div2.style.border = "1px solid white"
            div2.style.borderRadius = "10px"
            let paragraf3 = document.createElement("h2")
            paragraf3.textContent = `${vreme.Time}`
            paragraf3.style.color = "white"
            paragraf3.style.margin = "4px"
            div2.appendChild(paragraf3)
            let paragraf4 = document.createElement("p")
            paragraf4.textContent = "Sala " + `${brojsale}`
            paragraf4.style.color = "white"
            paragraf4.style.margin = "4px"
            div2.appendChild(paragraf4)
            div2.style.cursor = "pointer"
            div2.onclick = function () {
                brk = 0
                brojacsala = 0
                paragrafcena.textContent = ""
                let stranarezervacije = document.getElementById("rezervisi")
                document.getElementById("naklik").style.display = "none"
                stranarezervacije.innerHTML = ""
                stranarezervacije.style.display = "flex"
                stranarezervacije.style.gap = "100px"
                stranarezervacije.style.height = "100vh"
                stranarezervacije.style.justifyContent = "center"
                let divlevi = document.createElement("div")
                divlevi.id = "gengdiv"
                divlevi.style.display = "flex"
                divlevi.style.flexDirection = "column"

                let divsala = document.createElement("div")

                divsala.style.display = "flex"
                divsala.style.flexDirection = "column"
                if (paragraf4.textContent.split(" ").join("") == "Sala1") {
                    divsala.innerHTML = ""
                    let divplatno = document.createElement("div")
                    divplatno.style.width = "400px"
                    divplatno.style.minHeight = "5px"
                    divplatno.style.backgroundColor = "black"
                    divsala.style.paddingTop = "20px"
                    divsala.style.alignItems = "center"
                    divsala.style.justifyContent = "center"
                    let labelaplatno = document.createElement("h2")
                    labelaplatno.textContent = "Platno"
                    labelaplatno.marginTop = "10px"
                    divplatno.style.marginBottom = "10px"
                    divsala.appendChild(labelaplatno)
                    divsala.appendChild(divplatno)

                    if (JSON.parse(window.localStorage.getItem("sala1")) === null) {

                        for (let i = 1; i < 11; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala1" + "red" + `${i}`
                            sala1niz["red" + i] = []
                            for (let j = 1; j <= 10; j++) {
                                let objslika = {}
                                let img = document.createElement("img")
                                img.src = "slike/nerezervisano.png"
                                img.id = divred.id + "sediste" + `${j}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                img.onclick = function () {
    

                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: j - 1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)
                                            console.log(i - 1, j - 1)
                                        }
                                    }
                                    else {

                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == j - 1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                objslika["zauzeto"] = 0
                                objslika["id"] = img.id
                                objslika["broj"] = j - 1
                                sala1niz["red" + i].push(JSON.stringify(objslika))

                                localStorage.setItem("sala1", JSON.stringify(sala1niz))
                            }
                            divsala.appendChild(divred)
                        }
                    }

                    else {
                        sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                        for (let i = 1; i < 11; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala1" + "red" + `${i}`
                            for (let stolica of sala1niz["red" + i]) {
                                let brojac = 0
                                stolica = JSON.parse(stolica)
                                let img = document.createElement("img")
                                if (stolica.zauzeto == 0) {

                                    img.src = "slike/nerezervisano.png"

                                }
                                else {

                                    img.src = "slike/rezervisano.png"
                                }
                                img.id = divred.id + "sediste" + `${brk}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                let k1 = stolica.broj
                                img.onclick = function () {

                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: k1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)

                                        }
                                    }
                                    else {
                                        let gangbr = -1

                                        for (let item of nizkupljenih) {
                                            gangbr++

                                            if (item.red == i - 1 && item.stolica == k1) {

                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)

                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                brojac++
                            }
                            divsala.appendChild(divred)
                        }
                    }
                }
                else if (paragraf4.textContent.split(" ").join("") == "Sala2") {
                    divsala.innerHTML = ""
                    let divplatno = document.createElement("div")
                    divplatno.style.width = "250px"
                    divplatno.style.height = "5px"
                    divplatno.style.backgroundColor = "white"
                    divsala.style.paddingTop = "20px"
                    divsala.style.alignItems = "center"
                    divsala.style.justifyContent = "center"
                    let labelaplatno = document.createElement("h2")
                    labelaplatno.textContent = "Platno"
                    divplatno.style.marginBottom = "10px"
                    labelaplatno.margin = "0"
                    divsala.appendChild(labelaplatno)
                    divsala.appendChild(divplatno)
                    if (JSON.parse(window.localStorage.getItem("sala2")) === null) {

                        for (let i = 1; i < 9; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala2" + "red" + `${i}`
                            sala2niz["red" + i] = []
                            for (let j = 1; j <= 6; j++) {
                                let objslika = {}
                                let img = document.createElement("img")
                                img.src = "slike/nerezervisano.png"
                                img.id = divred.id + "sediste" + `${j}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                img.onclick = function () {

                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: j - 1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)
                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == j - 1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                objslika["zauzeto"] = 0
                                objslika["id"] = img.id
                                objslika["broj"] = j - 1
                                sala2niz["red" + i].push(JSON.stringify(objslika))

                                localStorage.setItem("sala2", JSON.stringify(sala2niz))
                            }
                            divsala.appendChild(divred)
                        }

                    }


                    else {
                        sala2niz = JSON.parse(window.localStorage.getItem("sala2"))
                        for (let i = 1; i < 9; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala2" + "red" + `${i}`
                            for (let stolica of sala2niz["red" + i]) {
                                let brojac = 0
                                stolica = JSON.parse(stolica)
                                let img = document.createElement("img")
                                if (stolica.zauzeto == 0) {
                                    img.src = "slike/nerezervisano.png"
                                }
                                else {
                                    img.src = "slike/rezervisano.png"
                                }
                                img.id = divred.id + "sediste" + `${brk}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                let k1 = stolica.broj
                                img.onclick = function () {
                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: k1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }

                                            nizkupljenih.push(objnovi)
                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == k1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                brojac++
                            }
                            divsala.appendChild(divred)
                        }
                    }
                }
                else if (paragraf4.textContent.split(" ").join("") == "Sala3") {
                    divsala.innerHTML = ""
                    let divplatno = document.createElement("div")
                    divplatno.style.width = "350px"
                    divplatno.style.height = "5px"
                    divplatno.style.backgroundColor = "white"
                    divsala.style.paddingTop = "20px"
                    divsala.style.alignItems = "center"
                    divsala.style.justifyContent = "center"
                    let labelaplatno = document.createElement("h2")
                    labelaplatno.textContent = "Platno"
                    divplatno.style.marginBottom = "10px"
                    labelaplatno.margin = "0"
                    divsala.appendChild(labelaplatno)
                    divsala.appendChild(divplatno)
                    if (JSON.parse(window.localStorage.getItem("sala3")) === null) {

                        for (let i = 1; i < 11; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala3" + "red" + `${i}`
                            sala3niz["red" + i] = []
                            for (let j = 1; j <= 8; j++) {
                                let objslika = {}
                                let img = document.createElement("img")
                                img.src = "slike/nerezervisano.png"
                                img.id = divred.id + "sediste" + `${j}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                img.onclick = function () {
                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: j - 1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)
                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == j - 1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                objslika["zauzeto"] = 0
                                objslika["id"] = img.id
                                objslika["broj"] = j - 1
                                sala3niz["red" + i].push(JSON.stringify(objslika))

                                localStorage.setItem("sala3", JSON.stringify(sala3niz))
                            }
                            divsala.appendChild(divred)
                        }
                    }

                    else {
                        sala3niz = JSON.parse(window.localStorage.getItem("sala3"))

                        for (let i = 1; i < 11; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala3" + "red" + `${i}`
                            for (let stolica of sala3niz["red" + i]) {
                                let brojac = 0
                                stolica = JSON.parse(stolica)
                                let img = document.createElement("img")
                                if (stolica.zauzeto == 0) {

                                    img.src = "slike/nerezervisano.png"

                                }
                                else {

                                    img.src = "slike/rezervisano.png"
                                }
                                img.id = divred.id + "sediste" + `${brk}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                let k1 = stolica.broj
                                img.onclick = function () {
                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: k1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)

                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == k1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                brojac++
                            }
                            divsala.appendChild(divred)
                        }
                    }
                }
                else {
                    divsala.innerHTML = ""
                    let divplatno = document.createElement("div")
                    divplatno.style.width = "280px"
                    divplatno.style.height = "5px"
                    divplatno.style.backgroundColor = "white"
                    divsala.style.paddingTop = "20px"
                    divsala.style.alignItems = "center"
                    divsala.style.justifyContent = "center"
                    let labelaplatno = document.createElement("h2")
                    labelaplatno.textContent = "Platno"
                    divplatno.style.marginBottom = "10px"
                    labelaplatno.margin = "0"
                    divsala.appendChild(labelaplatno)
                    divsala.appendChild(divplatno)
                    if (JSON.parse(window.localStorage.getItem("sala4")) === null) {

                        for (let i = 1; i < 10; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala4" + "red" + `${i}`
                            sala4niz["red" + i] = []
                            for (let j = 1; j <= 7; j++) {
                                let objslika = {}
                                let img = document.createElement("img")
                                img.src = "slike/nerezervisano.png"
                                img.id = divred.id + "sediste" + `${j}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                img.onclick = function () {
                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: j - 1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }
                                            nizkupljenih.push(objnovi)

                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == j - 1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                objslika["zauzeto"] = 0
                                objslika["id"] = img.id
                                objslika["broj"] = j - 1
                                sala4niz["red" + i].push(JSON.stringify(objslika))

                                localStorage.setItem("sala4", JSON.stringify(sala4niz))
                            }
                            divsala.appendChild(divred)
                        }
                    }

                    else {
                        sala4niz = JSON.parse(window.localStorage.getItem("sala4"))
                        for (let i = 1; i < 10; i++) {
                            let divred = document.createElement("div")
                            divred.id = "sala4" + "red" + `${i}`
                            for (let stolica of sala4niz["red" + i]) {
                                let brojac = 0
                                stolica = JSON.parse(stolica)
                                let img = document.createElement("img")
                                if (stolica.zauzeto == 0) {

                                    img.src = "slike/nerezervisano.png"

                                }
                                else {

                                    img.src = "slike/rezervisano.png"
                                }
                                img.id = divred.id + "sediste" + `${brk}`
                                img.style.width = "24px"
                                img.style.objectFit = "cover"
                                img.style.padding = "3px"
                                let k1 = stolica.broj
                                img.onclick = function () {
                                    if (img.src == "http://127.0.0.1:5500/slike/nerezervisano.png") {
                                        if (brk > brojacsala) {
                                            // sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                                            // sala1niz["red" + i][j-1] = JSON.parse(sala1niz["red" + i][j-1])
                                            // sala1niz["red" + i][j-1].zauzeto = 1
                                            img.src = "slike/rezervisano.png"
                                            // sala1niz["red" + i][j-1] = JSON.stringify(sala1niz["red" + i][j-1])
                                            // localStorage.setItem("sala1", JSON.stringify(sala1niz))
                                            brojacsala++
                                            let objnovi = {
                                                red: i - 1,
                                                stolica: k1,
                                                imefilma: h2.textContent,
                                                vreme: paragraf3.textContent,
                                                sala: paragraf4.textContent,
                                                projekcija: paragraf5.textContent
                                            }
                                            if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                            }
                                            else {
                                                paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                            }

                                            nizkupljenih.push(objnovi)

                                        }
                                    }
                                    else {
                                        let gangbr = -1
                                        for (let item of nizkupljenih) {
                                            gangbr++
                                            if (item.red == i - 1 && item.stolica == k1) {
                                                img.src = "slike/nerezervisano.png"
                                                nizkupljenih.splice(gangbr, 1)
                                                brojacsala--
                                                if (paragraf5.textContent.split(" ").join("") == "2D") {
                                                    paragrafcena.textContent = "Trenutna cena: " + 400 * brojacsala
                                                }
                                                else {
                                                    paragrafcena.textContent = "Trenutna cena: " + 550 * brojacsala
                                                }
                                                if (brojacsala == 0) {
                                                    paragrafcena.textContent = ""
                                                }
                                                break
                                            }
                                        }
                                    }
                                }
                                img.style.cursor = "pointer"
                                divred.appendChild(img)
                                brojac++
                            }
                            divsala.appendChild(divred)
                        }
                    }
                }
                divsala.style.marginBottom = "15px"
                divlevi.appendChild(divsala)
                let karte = document.createElement("div")
                karte.style.display = "flex"
                karte.style.gap = "10px"
                let btnminus = document.createElement("button")
                btnminus.style.width = "30px"
                btnminus.style.height = "30px"
                btnminus.style.backgroundImage = "url(slike/minus.png)"
                btnminus.style.backgroundSize = "cover"
                btnminus.style.border = "none"
                btnminus.style.backgroundColor = "transparent"
                btnminus.style.cursor = "pointer"
                btnminus.onclick = function () {
                    if (brk > 0) {
                        brk--
                        spankarte.textContent = brk
                    }
                }
                karte.appendChild(btnminus)
                spankarte = document.createElement("span")
                spankarte.id = "kartetxt"
                spankarte.style.color = "white"
                spankarte.textContent = "0"
                karte.appendChild(spankarte)
                let btnplus = document.createElement("button")
                btnplus.style.width = "30px"
                btnplus.style.height = "30px"
                btnplus.style.backgroundImage = "url(slike/plus.png)"
                btnplus.style.backgroundSize = "cover"
                btnplus.style.border = "none"
                btnplus.style.backgroundColor = "transparent"
                btnplus.style.cursor = "pointer"
                btnplus.onclick = function () {
                    brk++
                    spankarte.textContent = brk
                }
                karte.appendChild(btnplus)
                divlevi.style.boxShadow = "0px 0px 10px 3px black"
                divlevi.style.height = "600px"
                divlevi.style.width = "500px"
                stranarezervacije.style.paddingTop = "100px"
                stranarezervacije.style.paddingLeft = "150px"
                karte.style.alignItems = "center"
                divlevi.appendChild(karte)
                divlevi.style.alignItems = "center"

                let divparagrafi = document.createElement("div")
                divparagrafi.style.display = "flex"
                divparagrafi.style.flexDirection = "column"
                divparagrafi.style.gap = "5px"
                divparagrafi.style.marginBottom = "10px"

                let paragraf2D = document.createElement("p")
                paragraf2D.textContent = "Cena za 2D film je : 400din"

                let paragraf3D = document.createElement("p")
                paragraf3D.textContent = "Cena za 3D film je : 550din"
                paragraf3D.style.margin = "0"
                paragraf3D.style.marginBottom = "10px"

                divparagrafi.appendChild(paragraf2D)
                divparagrafi.appendChild(paragraf3D)
                divlevi.appendChild(divparagrafi)

                divlevi.style.height = "650px"
                stranarezervacije.appendChild(divlevi)


                let divdesni = document.createElement("div")

                divdesni.style.display = "flex"
                divdesni.style.flexDirection = "column"
                divdesni.style.gap = "20px"

                let divtxtslika = document.createElement("div")
                divtxtslika.style.display = "flex"
                divtxtslika.style.justifyContent = "center"
                divtxtslika.style.gap = "10px"
                let divnaslov = document.createElement("div")
                divnaslov.style.marginLeft = "15px"
                divnaslov.appendChild(h2)
                divdesni.appendChild(divnaslov)
                divtxtslika.appendChild(slikafilm)
                let pomdiv = document.createElement("div")
                pomdiv.style.display = "flex"
                pomdiv.style.flexDirection = "column"
                let h1 = document.createElement("p")
                h1.textContent = "MATAPLEXX KRAGUJEVAC"
                pomdiv.appendChild(h1)
                let parvreme = document.createElement("p")
                parvreme.textContent = "Danas, " + paragraf3.textContent
                parvreme.style.margin = "0"
                pomdiv.appendChild(parvreme)
                let brojsale1 = document.createElement("p")
                brojsale1.textContent = paragraf4.textContent
                pomdiv.appendChild(brojsale1)
                let Nacin = document.createElement("p")
                Nacin.textContent = paragraf5.textContent
                Nacin.style.margin = "0"
                pomdiv.appendChild(Nacin)

                divtxtslika.appendChild(pomdiv)
                divtxtslika.style.marginBottom = "50px"
                divdesni.appendChild(divtxtslika)

                let btnkupi = document.createElement("button")
                btnkupi.style.width = "100px"
                btnkupi.style.height = "30px"
                btnkupi.textContent = "KUPI"
                btnkupi.id = "btnkupid"
                btnkupi.addEventListener("click", () => { kupi() })
                btnkupi.style.margin = "0 auto"
                btnkupi.style.marginTop = "50px"

                let divpromo = document.createElement("div")
                divpromo.style.display = "flex"
                divpromo.style.flexDirection = "column"
                divpromo.style.gap = "3px"

                inputpromo.style.width = "100px"
                inputpromo.style.margin = "0 auto"
                inputpromo.id = "inputpromoid"
                inputpromo.onkeyup = function () {
                    if (inputpromo.value == "KWT24") {
                        paragrafcena.textContent = "Trenutna cena: " + Number(paragrafcena.textContent.split(": ")[1]) * 0.76
                    }
                    else {
                        paragrafcena.textContent = "Trenutna cena: " + (brojacsala * (paragraf5.textContent.split(" ").join("") == "2D" ? 400 : 550))
                    }

                }

                let labelpromo = document.createElement("label")
                labelpromo.textContent = "Unesite promo kod"
                labelpromo.style.margin = "0 auto"
                divpromo.appendChild(labelpromo)
                divpromo.appendChild(inputpromo)

                divdesni.appendChild(divpromo)



                divdesni.appendChild(btnkupi)
                paragrafcena.style.margin = "0 auto"
                divdesni.appendChild(paragrafcena)

                divdesni.style.boxShadow = "0px 0px 10px 3px black"
                divdesni.style.height = "630px"
                divdesni.style.width = "350px"
                divdesni.style.paddingTop = "20px"
                divdesni.id = "gengdiv"
                stranarezervacije.appendChild(divdesni)
                stranarezervacije.style.backgroundColor = "#141413"
                stranarezervacije.style.backgroundImage = "linear-gradient(158deg, #141413 8%, #FF2525 42%, #1a1717 98%)"
            }
            div2.id = "divrezervacije"
            let paragraf5 = document.createElement("p")
            paragraf5.style.color = "white"
            paragraf5.textContent = `${vreme.D}`
            paragraf5.style.margin = "4px"
            div2.appendChild(paragraf5)
            div2.style.paddingLeft = "10px"
            div2.style.paddingRight = "10px"
            div1.appendChild(div2)
            div1.style.marginBottom = "20px"
        }
        divraspored.appendChild(div1)
    }
    divraspored.style.marginBottom = "65px"
    divraspored.style.backgroundColor = "rgb(36, 36, 36)"
    pom5.appendChild(divraspored)
    pom3.appendChild(pom5)
    pom1.appendChild(pom3)
    pom1.appendChild(pom4)
    pom1.style.justifyContent = "space-between"
    pom1.style.width = "1000px"

    document.getElementById("naklik").appendChild(pom1)
    document.getElementById("footer").style.position = "fixed"
}



function povecajga() {
    if (i + 1 < niz2.length) {
        i++
        return niz2[i]
    }
    else {
        i = 0
        return niz2[i]
    }
}

function smanjiga() {
    if (i - 1 >= 0) {
        i--
        return niz2[i]
    }
    else {
        i = niz2.length - 1
        return niz2[i]
    }
}



if (JSON.parse(window.localStorage.getItem("brojkorisnika")) === null) {
    korisnici = []
    brojkorisnika = 0
}
else {
    brojkorisnika = JSON.parse(window.localStorage.getItem("brojkorisnika"))
    korisnici = JSON.parse(window.localStorage.getItem("korisnici"))
}

let html1 = ` 
        <div id="geng">
            <div class="signup">
                <img src="slike/mataplex.png" id="slika1" alt="">
                <div id="par1">
                    <label for="input1" style="color: white;font-weight: 500;font-size: 1.6rem;">Korisnicko ime</label>
                    <input id="input1" type="text" onkeyup="loginuser()" title="Uneti korisnicko ime koje pocinje velikim slovom, sadrzi barem jednu cifru i ima minimum osam karaktera">
                    <p id="nijeusr">Nije dobro uneto!!!</p>
                </div>
                <div id="par2">
                    <label for="input2" style="color: white;font-weight: 500;font-size: 1.6rem;">Lozinka</label>
                    <input id="input2" type="password" onkeyup="loginpass()" title="Uneti sifru sa minimum 5 karaktera"> 
                    <p id="nijepass">Nije dobro uneto!!!</p> 
                </div>
                <div class="btnzab">
                    <button type="button" id="zaboravljena" onclick="zaboravi()">Zaboravljena lozinka?</button>
                </div>
                <button type="submit" id="login" onclick="prijavise()">PRIJAVI SE</button>
                <p id="hid">Akaunt ne postoji</p>
                <div class="btnreg">
                    <button type="button" id="registruj" onclick="osvezi()">Registruj se</button>
                </div>
            </div>
            <div id="desno">
                

            </div>
        </div>
`

let html2 = `   
<div id="geng">
<div class="register">

<img src="slike/mataplex.png" id="slika1" alt="">
<div id="par1">
    <label for="input1" style="color: white;font-weight: 500;font-size: 1.6rem;">Korisnicko ime</label>
    <input id="input1" type="text" onkeyup="loginuser()" title="Uneti korisnicko ime koje pocinje velikim slovom, sadrzi barem jednu cifru i ima minimum osam karaktera">
    <p id="nijeusr">Nije dobro uneto!!!</p>
</div>
<div id="par5">
    <label for="input5" style="color: white;font-weight: 500;font-size: 1.6rem;">Datum rodjenja</label>
    <input id="input5" type="text" onkeyup = "loginrodjenje()" title= "Uneti datum rodjenja u formatu dd/mm/yyyy">
</div>
<div id="par2">
    <label for="input2" style="color: white;font-weight: 500;font-size: 1.6rem;">Lozinka</label>
    <input id="input2" type="password" onkeyup="loginpass()" title="Uneti sifru sa minimum 5 karaktera"> 
    <p id="nijepass">Nije dobro uneto!!!</p> 
</div>
<div id="par3">
    <label for="input2" style="color: white;font-weight: 500;font-size: 1.6rem;">Ponovi lozinku</label>
    <input id="input3" type="password" onkeyup="loginpass1()" title="Uneti sifru sa minimum 5 karaktera"> 
    <p id="nijepass1">Nije dobro uneto!!!</p> 
</div>

<button type="submit" id="reg" onclick="unesi()">REGISTRUJ SE</button>
<button type="submit" id="back" onclick="vratise()">Vrati se</button>

</div>
        <div id="desno">
                

        </div>
</div>`

let html3 = `

<div id="geng">

<div class="zaborav">
    <img src="slike/mataplex.png" id="slika1" alt="">
    <label for="input1" style="color: white;font-weight: 500;font-size: 1.6rem;">Korisnicko ime</label>
    <input id="input1" type="text" onkeyup="zaboravusr()" title = "Uneti validno korisnicko ime koje postoji">
    <button type="submit" id="zabtn" onclick="dajsifru()">Posalji zahtev</button>
    <button type="submit" id="back" onclick="vratise()">Vrati se</button>
    <p id="parzab">123</p>
</div>
        <div id="desno">
                

        </div>
</div>
`


let flag1 = 0

let flag2 = 0

let flag3 = 0

prijava.disabled = true
nijedbrusr.style.opacity = "0%"
nijedbrpass.style.opacity = "0%"

function loginuser() {
    if ((regex.test(username.value) && username.value.length >= 8)) {
        nijedbrusr.style.opacity = "0%"
        flag1 = 1
    }
    else if ((username.value == "")) {
        nijedbrusr.style.opacity = "0%"
        flag1 = 0
    }
    else {
        nijedbrusr.style.opacity = "100%"
        flag1 = 0
    }
    enabledugme()
}

function loginpass() {
    if (password.value.length >= 5) {
        nijedbrpass.style.opacity = "0%"
        flag2 = 1
    }
    else if (password.value == "") {
        nijedbrpass.style.opacity = "0%"
        flag2 = 0
    }
    else {
        nijedbrpass.style.opacity = "100%"
        flag2 = 0
    }
    enabledugme()

}

let flag4 = 0

function loginrodjenje() {
    if (regexDatum.test(rodj.value)) {
        flag4 = 1
    }
    else {
        flag4 = 0
    }
    enabledugme()
}

function proveridalpostoji() {
    for (let kor of korisnici) {
        kor = JSON.parse(kor)
        if (username.value == kor.korisnicko)
            return false
    }
    return true
}

function enabledugme() {
    if (prijava1 == 1) {
        if (flag1 && flag2) {
            prijava.disabled = false
            prijava.style.cursor = "pointer"
        }
        else {
            prijava.disabled = true
            prijava.style.cursor = "not-allowed"
        }
    }
    else {
        if ((flag1 && flag2 && flag3 && flag4) && (psswd2.value == password.value)) {
            if (!proveridalpostoji()) {
                alert("Akaunt vec postoji!!!")
            }
            else {
                prijava1.disabled = false
                prijava1.style.cursor = "pointer"
            }
        }
        else {
            prijava1.disabled = true
            prijava1.style.cursor = "not-allowed"
        }
    }

}

function loginpass1() {
    if (psswd2.value.length >= 5) {
        nijedbrpass1.style.opacity = "0%"
        flag3 = 1
    }
    else if (psswd2.value == "") {
        nijedbrpass1.style.opacity = "0%"
        flag3 = 0
    }
    else {
        nijedbrpass1.style.opacity = "100%"
        flag3 = 0
    }
    enabledugme()
}

function osvezi() {
    main.innerHTML = html2
    prijava = document.getElementById("login")
    korisnicki = document.getElementById("par1")
    username = document.getElementById("input1")
    nijedbrusr = document.getElementById("nijeusr")
    nijedbrpass = document.getElementById("nijepass")
    password = document.getElementById("input2")
    prijava1 = document.getElementById("reg")
    psswd2 = document.getElementById("input3")
    nijedbrpass1 = document.getElementById("nijepass1")
    let btn = document.getElementById("back")
    rodj = document.getElementById("input5")

    btn.style.color = "white"
    btn.style.minWidth = "100px"
    btn.style.minHeight = "20px"
    btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    btn.style.cursor = "pointer"

    nijedbrusr.style.opacity = "0%"
    nijedbrpass.style.opacity = "0%"

    nijedbrpass1.style.color = "red"
    nijedbrpass1.style.display = "flex"
    nijedbrpass1.style.opacity = "0%"

    prijava1.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    prijava1.style.color = "black"
    prijava1.style.minWidth = "200px"
    prijava1.style.minHeight = "30px"
    prijava1.style.borderRadius = "10px"
    prijava1.style.cursor = "not-allowed"
    prijava1.disabled = true
}

function unesi() {
    let obj = {
        korisnicko: username.value,
        lozinka: password.value,
        datum: rodj.value,
        nizkarata: []
    }
    if (brojkorisnika > 0) {
        brojkorisnika = JSON.parse(window.localStorage.getItem("brojkorisnika"))
        korisnici = JSON.parse(window.localStorage.getItem("korisnici"))
    }
    brojkorisnika++
    localStorage.setItem("brojkorisnika", JSON.stringify(brojkorisnika))
    korisnici.push(JSON.stringify(obj))
    localStorage.setItem("korisnici", JSON.stringify(korisnici))
    vratise()
}

let korisnik
let pombr = 0
let parfut = document.getElementById("parfut")

function prijavise() {
    let br = 0
    for (kor of korisnici) {
        kor = JSON.parse(kor)

        if (kor.korisnicko == username.value && kor.lozinka == password.value) {
            br = 1
            hiden.style.opacity = "0%"
            main.id = "main2"
            pardiv.style.visibility = "visible"
            slika.style.visibility = "visible"
            footer.style.position = "relative"
            footer.style.display = "flex"
            footer.style.height = "50px"
            footer.style.justifyContent = "center"
            korisnik = username.value
            btn2 = document.getElementById("btnlog")
            btn2.style.display = "flex"
            strana.style.display = "flex"
            strana.style.flexDirection = "column"
            const paragraphs = document.querySelectorAll('#paragrafi p');
            paragraphs.forEach(p => {
                if (p.textContent != "Filmovi")
                    p.classList.remove('active');
                else
                    p.classList.add('active')
            });
            document.getElementById("sale").style.display = "none"
            popunizanrove()
            document.getElementById("searchbar").value = ''
            popunislike()
            document.getElementById("salaselect").value = "sala1"
            let stranarezervacije = document.getElementById("rezervisi")
            stranarezervacije.style.display = "none"
            for (let kor1 of korisnici) {
                kor1 = JSON.parse(kor1)
                if (kor1.korisnicko == korisnik) {
                    console.log(kor1.nizkarata)
                }
            }
        }
    }
    if (br == 0) {
        hiden.style.opacity = "100%"
    }

    for (const el of niz2) {
        if (el.Series_Title == "Skyfall") {
            document.getElementById("slicica").onclick = kliknuto.bind(null, el)
            document.getElementById("slicica").src = `${el.Link}`
        }
    }
}

function zaboravusr() {
    for (let kor of korisnici) {
        kor = JSON.parse(kor)
        if (kor.korisnicko == username.value) {
            btnz.disabled = false
            btnz.style.cursor = "pointer"
        }
    }
}


function zaboravi() {
    main.innerHTML = html3
    username = document.getElementById("input1")
    btnz = document.getElementById("zabtn")
    let sifra = document.getElementById("parzab")
    let btn = document.getElementById("back")
    btnz.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    btnz.style.color = "white"
    btnz.style.minWidth = "200px"
    btnz.style.minHeight = "30px"
    btnz.style.borderRadius = "10px"
    btnz.style.cursor = "not-allowed"
    btnz.disabled = true
    sifra.style.opacity = "0%"
    btn.style.color = "white"
    btn.style.minWidth = "100px"
    btn.style.minHeight = "20px"
    btn.style.backgroundColor = "rgba(255, 255, 255, 0.2)"
    btn.style.cursor = "pointer"
}

function dajsifru() {
    let sifra = document.getElementById("parzab")

    for (let kor of korisnici) {
        kor = JSON.parse(kor)
        if (kor.korisnicko == username.value) {
            sifra.textContent = "Vasa lozinka je: " + kor.lozinka
            sifra.style.color = "white"
            sifra.style.opacity = "100%"
        }
    }

}
function vratise() {
    main.innerHTML = html1
    racunmain.style.display = "none"
    document.getElementById("naklik").style.display = "none"
    prijava = document.getElementById("login")
    korisnicki = document.getElementById("par1")
    username = document.getElementById("input1")
    nijedbrusr = document.getElementById("nijeusr")
    nijedbrpass = document.getElementById("nijepass")
    password = document.getElementById("input2")
    document.getElementById("strana").style.display = "none"
    document.getElementById("hid").style.color = "red"
    nijedbrusr.style.opacity = "0%"
    nijedbrpass.style.opacity = "0%"
    hiden = document.getElementById("hid")
    prijava1 = 1
    hiden.style.opacity = "0%"
    main.id = "main"
    main.style.display = ""
    pardiv.style.visibility = "hidden"
    slika.style.visibility = "hidden"
    btn2.style.display = "none"
    let stranarezervacije = document.getElementById("rezervisi")
    stranarezervacije.style.display = "none"
}

function levastrela() {

    let pom = smanjiga()
    slideslika.src = `${pom.Link}`
    slideslika.style.width = "700px"
    slideslika.style.height = "450px"
    document.getElementById("slicica").onclick = kliknuto.bind(null, pom)
}

function desnastrela() {
    let pom = povecajga()
    slideslika.src = `${pom.Link}`
    slideslika.style.width = "700px"
    slideslika.style.height = "450px"
    document.getElementById("slicica").onclick = kliknuto.bind(null, pom)
}

function pocetna(el) {
    uradianimaciju(el)
    racunmain.style.display = "none"
    document.getElementById("naklik").style.display = "none"
    document.getElementById("strana").style.display = "flex"
    footer.style.position = "relative"
    footer.style.display = "flex"
    footer.style.height = "50px"
    footer.style.justifyContent = "center"
    rasporeddiv.style.display = "none"
    let stranarezervacije = document.getElementById("rezervisi")
    stranarezervacije.style.display = "none"
}

function filtriraj(el) {
    let search = document.getElementById("searchbar")
    let select = document.getElementById("zanroviselect")
    let oktxt = (el.Series_Title.toLowerCase().indexOf(search.value.toLowerCase()) != -1) || search.value == ""
    let okselect = false
    if (select.value == "all")
        okselect = true
    for (let el2 of el.Genres.split("\n")) {
        if (el2 != "" && el2 == select.value) {
            okselect = true
            break
        }
    }
    return oktxt && okselect
}

function popunizanrove() {
    let pomniz = []
    let select = document.getElementById("zanroviselect")
    select.innerHTML = ""
    select.innerHTML += `
    <option value = "all"> Svi </option>
    `
    for (let el of niz) {
        for (let el2 of el.Genres.split("\n")) {
            if (el2 != "" && pomniz.indexOf(el2) == -1) {
                pomniz.push(el2)
                select.innerHTML += `
                        <option value = "${el2}"> ${el2} </option>
                        `
            }
        }
    }
}

function napravizasalu(el) {

    const paragraphs = document.querySelectorAll('#paragrafi p');
        paragraphs.forEach(p => {
            if (p.textContent != "Sale")
                p.classList.remove('active');
            else
                p.classList.add('active')
        });
    strana.style.display = "none"
    racunmain.style.display = "none"
    document.getElementById("naklik").style.display = "none"
    let stranarezervacije = document.getElementById("rezervisi")
    stranarezervacije.style.display = "none"
    let divsala1 = document.getElementById("sala1")
    let divsala2 = document.getElementById("sala2")
    let divsala3 = document.getElementById("sala3")
    let divsala4 = document.getElementById("sala4")
    divsala1.style.display = "none"
    divsala2.style.display = "none"
    divsala3.style.display = "none"
    divsala4.style.display = "none"
    divsala1.style.boxShadow = "0px 0px 10px 3px black"
    divsala2.style.boxShadow = "0px 0px 10px 3px black"
    divsala3.style.boxShadow = "0px 0px 10px 3px black"
    divsala4.style.boxShadow = "0px 0px 10px 3px black"
    let selectsale = document.getElementById("salaselect")
    if (selectsale.value == "sala1") {
        divsala1.style.display = "flex"
        divsala1.innerHTML = ""
        let divplatno = document.createElement("div")
        divplatno.style.width = "400px"
        divplatno.style.minHeight = "5px"
        divplatno.style.backgroundColor = "white"
        divsala1.style.paddingTop = "20px"
        divsala1.style.alignItems = "center"
        divsala1.style.justifyContent = "center"
        let labelaplatno = document.createElement("h2")
        labelaplatno.textContent = "Platno"
        labelaplatno.marginTop = "10px"
        divplatno.style.marginBottom = "10px"
        divsala1.appendChild(labelaplatno)
        divsala1.appendChild(divplatno)
        for (let i = 1; i < 11; i++) {
            let divred = document.createElement("div")
            divred.id = "sala1" + "red" + `${i}`
            for (let j = 1; j <= 10; j++) {
                let img = document.createElement("img")
                img.src = "slike/nerezervisano.png"
                img.id = divred.id + "sediste" + `${j}`
                img.style.width = "30px"
                img.style.objectFit = "cover"
                img.style.padding = "3px"
                divred.appendChild(img)
            }
            divsala1.appendChild(divred)
        }
    }
    if (selectsale.value == "sala2") {
        divsala2.style.display = "flex"
        divsala2.innerHTML = ""
        let divplatno = document.createElement("div")
        divplatno.style.width = "250px"
        divplatno.style.height = "5px"
        divplatno.style.backgroundColor = "white"
        divsala2.style.paddingTop = "20px"
        divsala2.style.alignItems = "center"
        divsala2.style.justifyContent = "center"
        let labelaplatno = document.createElement("h2")
        labelaplatno.textContent = "Platno"
        divplatno.style.marginBottom = "10px"
        labelaplatno.margin = "0"
        divsala2.appendChild(labelaplatno)
        divsala2.appendChild(divplatno)
        for (let i = 1; i < 9; i++) {
            let divred = document.createElement("div")
            divred.id = "sala2" + "red" + `${i}`
            for (let j = 1; j <= 6; j++) {
                let img = document.createElement("img")
                img.src = "slike/nerezervisano.png"
                img.id = divred.id + "sediste" + `${j}`
                img.style.width = "30px"
                img.style.objectFit = "cover"
                img.style.padding = "3px"
                divred.appendChild(img)
            }
            divsala2.appendChild(divred)
        }
    }
    if (selectsale.value == "sala3") {
        divsala3.style.display = "flex"
        divsala3.innerHTML = ""
        let divplatno = document.createElement("div")
        divplatno.style.width = "350px"
        divplatno.style.height = "5px"
        divplatno.style.backgroundColor = "white"
        divsala3.style.paddingTop = "20px"
        divsala3.style.alignItems = "center"
        divsala3.style.justifyContent = "center"
        let labelaplatno = document.createElement("h2")
        labelaplatno.textContent = "Platno"
        divplatno.style.marginBottom = "10px"
        labelaplatno.margin = "0"
        divsala3.appendChild(labelaplatno)
        divsala3.appendChild(divplatno)
        for (let i = 1; i < 11; i++) {
            let divred = document.createElement("div")
            divred.id = "sala2" + "red" + `${i}`
            for (let j = 1; j <= 8; j++) {
                let img = document.createElement("img")
                img.src = "slike/nerezervisano.png"
                img.id = divred.id + "sediste" + `${j}`
                img.style.width = "30px"
                img.style.objectFit = "cover"
                img.style.padding = "3px"
                divred.appendChild(img)
            }
            divsala3.appendChild(divred)
        }
    }
    if (selectsale.value == "sala4") {
        divsala4.style.display = "flex"
        divsala4.innerHTML = ""
        let divplatno = document.createElement("div")
        divplatno.style.width = "280px"
        divplatno.style.height = "5px"
        divplatno.style.backgroundColor = "white"
        divsala4.style.paddingTop = "20px"
        divsala4.style.alignItems = "center"
        divsala4.style.justifyContent = "center"
        let labelaplatno = document.createElement("h2")
        labelaplatno.textContent = "Platno"
        divplatno.style.marginBottom = "10px"
        labelaplatno.margin = "0"
        divsala4.appendChild(labelaplatno)
        divsala4.appendChild(divplatno)
        for (let i = 1; i < 10; i++) {
            let divred = document.createElement("div")
            divred.id = "sala2" + "red" + `${i}`
            for (let j = 1; j <= 7; j++) {
                let img = document.createElement("img")
                img.src = "slike/nerezervisano.png"
                img.id = divred.id + "sediste" + `${j}`
                img.style.width = "30px"
                img.style.objectFit = "cover"
                img.style.padding = "3px"
                divred.appendChild(img)
            }
            divsala4.appendChild(divred)
        }
    }
    rasporeddiv.style.display = "flex"
    rasporeddiv.style.flexDirection = "column"
}

function kupi() {
    if (nizkupljenih.length == spankarte.textContent) {
        document.getElementById("rezervisi").style.display = "none"
        strana.style.display = "flex"
        inputpromo.value = ""
        for (let sediste of nizkupljenih) {
            console.log(sediste.stolica)
            if (sediste.sala.split(" ").join("") == "Sala1") {
                sala1niz = JSON.parse(window.localStorage.getItem("sala1"))
                sala1niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.parse(sala1niz["red" + (sediste.red + 1)][sediste.stolica])
                sala1niz["red" + (sediste.red + 1)][sediste.stolica].zauzeto = 1
                sala1niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.stringify(sala1niz["red" + (sediste.red + 1)][sediste.stolica])
                localStorage.setItem("sala1", JSON.stringify(sala1niz))
            }
            else if (sediste.sala.split(" ").join("") == "Sala2") {
                sala2niz = JSON.parse(window.localStorage.getItem("sala2"))
                sala2niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.parse(sala2niz["red" + (sediste.red + 1)][sediste.stolica])
                sala2niz["red" + (sediste.red + 1)][sediste.stolica].zauzeto = 1
                sala2niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.stringify(sala2niz["red" + (sediste.red + 1)][sediste.stolica])
                localStorage.setItem("sala2", JSON.stringify(sala2niz))
            }
            else if (sediste.sala.split(" ").join("") == "Sala3") {
                sala3niz = JSON.parse(window.localStorage.getItem("sala3"))
                sala3niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.parse(sala3niz["red" + (sediste.red + 1)][sediste.stolica])
                sala3niz["red" + (sediste.red + 1)][sediste.stolica].zauzeto = 1
                sala3niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.stringify(sala3niz["red" + (sediste.red + 1)][sediste.stolica])
                localStorage.setItem("sala3", JSON.stringify(sala3niz))
            }
            else {
                sala4niz = JSON.parse(window.localStorage.getItem("sala4"))
                sala4niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.parse(sala4niz["red" + (sediste.red + 1)][sediste.stolica])
                sala4niz["red" + (sediste.red + 1)][sediste.stolica].zauzeto = 1
                sala4niz["red" + (sediste.red + 1)][sediste.stolica] = JSON.stringify(sala4niz["red" + (sediste.red + 1)][sediste.stolica])
                localStorage.setItem("sala4", JSON.stringify(sala4niz))
            }
        }


        korisnici = JSON.parse(localStorage.getItem("korisnici"))
        for (let k = 0; k < korisnici.length; k++) {
            korisnici[k] = JSON.parse(korisnici[k])

            if (korisnik == korisnici[k].korisnicko) {
                for (let stavka of nizkupljenih) {

                    korisnici[k].nizkarata.push(JSON.stringify(stavka))
                }
            }
            korisnici[k] = JSON.stringify(korisnici[k])
        }
        localStorage.setItem("korisnici", JSON.stringify(korisnici))
        korisnici = JSON.parse(localStorage.getItem("korisnici"))
        nizkupljenih = []
        brojacsala = 0
    }
}

function RacunNapravi(el) {
    uradianimaciju(el)
    racunmain.innerHTML = ""
    korisnici = JSON.parse(localStorage.getItem("korisnici"))
    strana.style.display = "none"
    document.getElementById("naklik").style.display = "none"
    document.getElementById("sale").style.display = "none"
    document.getElementById("rezervisi").style.display = "none"
    racunmain.style.display = "flex"
    racunmain.style.alignItems = "center"
    racunmain.style.justifyContent = "center"
    racunmain.style.minHeight = "100vh"
    for (let k = 0; k < korisnici.length; k++) {
        korisnici[k] = JSON.parse(korisnici[k])

        if (korisnik == korisnici[k].korisnicko) {
            let divracun = document.createElement("div")
            divracun.style.display = "flex"
            divracun.style.flexDirection = "column"
            divracun.style.gap = "10px"
            divracun.style.width = "350px"
            divracun.style.color = "#333"
            divracun.style.alignItems = "center"
            divracun.style.margin = "50px"
            divracun.style.marginBottom = "100px"
            for (let stavka of korisnici[k].nizkarata) {
                stavka = JSON.parse(stavka)
                let divstavka = document.createElement("div")
                divstavka.style.display = "flex"
                divstavka.style.flexDirection = "column"
                divstavka.style.alignItems = "center"
                divstavka.style.width = "100%"
                let paragrafkorisnik = document.createElement("p")
                paragrafkorisnik.textContent = korisnik

                divstavka.appendChild(paragrafkorisnik)

                let divsredina = document.createElement("div")
                divsredina.style.display = "flex"
                divsredina.style.width = "100%"
                divsredina.style.justifyContent = "space-between"


                let paragrafime = document.createElement("p")
                paragrafime.textContent = stavka.imefilma
                paragrafime.style.width = "33%"
                paragrafime.style.textAlign = "center"
                divsredina.appendChild(paragrafime)

                let vremeproj = document.createElement("p")
                vremeproj.textContent = "Danas, " + stavka.vreme
                vremeproj.style.width = "33%"
                vremeproj.style.textAlign = "center"
                divsredina.appendChild(vremeproj)

                let projekcijafilma = document.createElement("p")
                projekcijafilma.textContent = stavka.projekcija
                projekcijafilma.style.width = "33%"
                projekcijafilma.style.textAlign = "center"
                divsredina.appendChild(projekcijafilma)

                divstavka.appendChild(divsredina)

                let divdole = document.createElement("div")
                divdole.style.display = "flex"
                divdole.style.gap = "20px"

                let imesale = document.createElement("p")
                imesale.textContent = stavka.sala

                divdole.appendChild(imesale)

                let redistolca = document.createElement("p")
                redistolca.textContent = "Red: " + (stavka.red + 1) + " Sediste: " + stavka.stolica

                divdole.appendChild(redistolca)

                let iznosstavke = document.createElement("p")
                iznosstavke.textContent = "Iznos: " + (stavka.projekcija.split(" ").join("") == "2D" ? 400 : 550)

                divdole.appendChild(iznosstavke)

                divstavka.appendChild(divdole)
                divstavka.style.border = "1px solid gray"
                divstavka.id = "stavka"
                divracun.appendChild(divstavka)


            }
            racunmain.appendChild(divracun)
        }
        korisnici[k] = JSON.stringify(korisnici[k])
    }
}

function uradianimaciju(elem) {
    if (typeof elem !== 'undefined' && elem !== null) {
        const paragraphs = document.querySelectorAll('#paragrafi p');
        paragraphs.forEach(p => {
            p.classList.remove('active');
        });
        elem.classList.add('active');
    }
    else {
        const paragraphs = document.querySelectorAll('#paragrafi p');
        paragraphs.forEach(p => {
            if (p.textContent != "Filmovi")
                p.classList.remove('active');
            else
                p.classList.add('active')
        });
    }
}
