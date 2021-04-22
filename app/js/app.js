const apiData = document.querySelector('.api-data')
const spinner = document.querySelector('.spinner-grow')
const nivelFilter = document.querySelector('.nivel-filter')
const cadastroFilter = document.querySelector('.cadastro-filter')

spinner.style.display="none"
async function getCursos(){
    const url = "http://localhost:3000/cursos"
    spinner.style.display="block"
    const response = await axios.get(url);
    spinner.style.display="none"
    const cursoList = Array.from(response.data)
    cursoList.forEach(async function(curso){
        apiData.innerHTML+=`
            <div class="m-1" style="display: block; background-color: white;" >
                <section class="card-body">
                    <h5 style="margin-bottom: 1.0rem; border-bottom: ridge;">${curso.curso}</h5>
                    <p>
                        <b>Nivel:</b><br> ${curso.nivel}
                    </p>
                    <p>
                        <b>Duração:</b><br> ${curso.duração}
                    </p>
                    <p>
                        <b>Município:</b><br> ${curso.município}
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
            <div class="m-1" style="display: block; background-color: white;">
                <section class="card-body">
                <h5 style="margin-bottom: 1.0rem; border-bottom: ridge;">${curso.curso}</h5>
                <p>
                    <b>Nivel:</b><br> ${curso.nivel}
                </p>
                <p>
                    <b>Duração:</b><br> ${curso.duração}
                </p>
                <p>
                    <b>Município:</b><br> ${curso.município}
                </p>                    
                </section>
            </div>
          `
    })
}
async function getNiveis(){
    const url =`http://localhost:3000/niveis`
    const response = await axios.get(url)
    const nivelList = Array.from(response.data)
    nivelList.forEach(function(nivel){
        nivelFilter.innerHTML+=`<option value="${nivel.op}">${nivel.op}</option>`
    })
}

async function getCadastros(){
    const url =`http://localhost:3000/cadastros`
    const response = await axios.get(url)
    const cadastroList = Array.from(response.data)
    cadastroList.forEach(function(cadastro){
        cadastroFilter.innerHTML+=`<li><a class="dropdown-item" value="${cadastro.cad}">${cadastro.cad}</a></li>`
    })
}

const btnBuscar = document.querySelector('.btn-buscar')
const inputSearch = document.querySelector('input[type=search]')

btnBuscar.addEventListener('click',function(){
    search(inputSearch.value)
})

nivelFilter.addEventListener('change',function(){
    search(nivelFilter.value)
})

cadastroFilter.addEventListener('change',function(){
    search(cadastroFilter.value)
})

getCursos()
getNiveis()
getCadastros()