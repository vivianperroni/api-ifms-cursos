const apiData = document.querySelector('.api-data')
const spinner = document.querySelector('.spinner-grow')

spinner.style.display="none"
async function getCursos(){
    const url = "http://localhost:3000/cursos"
    spinner.style.display="block"
    const response = await axios.get(url)
    spinner.style.display="none"
    const cursoList = Array.from(response.data)
    cursoList.forEach(async function(curso){
        apiData.innerHTML+=`
            <div class="card m-2" style="width:220px">
                <section class="card-body">
                    <h5 class="card-title">${curso.curso}</h5>
                    <p>
                        Nivel de ensino: ${curso.nivel}
                    </p>
                    <p>
                        Duração: ${curso.duração}
                    </p>
                    <p>
                        Município: ${curso.município}
                    </p>                    
               
                </section>
            </div>
        `
    })   
}

async function search(query){
    const url =  `http://localhost:3000/cursos?q=${query}`
   
    spinner.style.display="block"
    const response = await axios.get(url);
    spinner.style.display="none"
    const cursoList = Array.from(response.data)
    apiData.innerHTML=""
    cursoList.forEach(function(curso){
        apiData.innerHTML+=`
            <div class="card m-2" style="width:220px">
                <section class="card-body">
                <h5 class="card-title">${curso.curso}</h5>
                <p>
                    Nivel de ensino: ${curso.nivel}
                </p>
                <p>
                    Duração: ${curso.duração}
                </p>
                <p>
                    Município: ${curso.município}
                </p> 
                </section>
            </div>
          `
    })
}

const btnBuscar = document.querySelector('.btn-buscar')
const inputSearch = document.querySelector('input[type=search]')
btnBuscar.addEventListener('click',function(){
    search(inputSearch.value)
})

getCursos()