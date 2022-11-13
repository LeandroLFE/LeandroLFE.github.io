function toggleDivAcademico(){
    const divAcademico = document.querySelector("#academico");
    if(divAcademico.style.display === "none"){
        divAcademico.style.display = "block";
    } else {
        divAcademico.style.display = "none";
    }
}

function toggleDivWork(){
    const divWork = document.querySelector("#work");
    if(divWork.style.display === "none"){
        divWork.style.display = "block";
    } else {
        divWork.style.display = "none";
    }
}