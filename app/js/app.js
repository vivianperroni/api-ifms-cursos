import getData from "./api.js";
const apiData = document.querySelector('.api-data')
const spinner = document.querySelector('.spinner-grow')
const alert = document.querySelector('.alert')
const nivelFilter = document.querySelector('.nivel-filter')
const cadastroFilter = document.querySelector('.cadastro-filter')

showSpinner(false)
showAlert(false)

function showSpinner(isShow=false){
    if(isShow){
        spinner.style.display="block"
        return
    }
        spinner.style.display="none"

}

function showAlert(isShow=false){
    if(isShow){
        alert.style.display="block"
        return
    }
        alert.style.display="none"

}

function renderApi(cursoList){
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

async function getCursos(){
    showSpinner(true)
    showAlert(true)
    const response = await getData('cursos')
    showSpinner(false)
    showAlert(false)
    const cursoList = Array.from(response.data)
    renderApi(cursoList)
}

async function search(query){   
    showSpinner(true)
    showAlert(true)
    const response = await getData(`cursos?q=${query}`)
    showSpinner(false)
    showAlert(false)
    const cursoList = Array.from(response.data)
    apiData.innerHTML=""
    renderApi(cursoList)
}

async function getNiveis(){
    const response = await getData('niveis')
    const nivelList = Array.from(response.data)
    nivelList.forEach(function(nivel){
        nivelFilter.innerHTML+=`<option value="${nivel.op}">${nivel.op}</option>`
    })
}

async function getCadastros(){
    const response = await getData('cadastros')
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