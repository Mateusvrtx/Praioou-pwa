const passos = ["parte1", "parte2", "parte3", "parte4", "parte5", "parte6", "parte7", "parte8", "parte9", "parte10", "parte11", "parte12", "parte13", "parte14", "parte15", "parte16", "parte17", "parte18", "parte19", "parte20", "parte21", "parte22", "parte23", "parte24", "parte25", "parte26", "parte27", "parte28", "parte29", "parte30", "parte31"];  
  
function proximoPasso(atual) {
  const proximo = passos[passos.indexOf(atual) + 1];
  const elementoAtual = document.getElementById(atual);
  const elementoProximo = document.getElementById(proximo);
  
  if (elementoAtual && elementoProximo) {
    elementoAtual.style.display = "none";
    elementoProximo.style.display = "block";
  } else {
    console.error("Elemento não encontrado: ", atual, proximo);
  }
}

  
// Chamada da função para cada passo  
document.getElementById("setaP1").addEventListener("click", () => proximoPasso("parte1"));  
document.getElementById("setaP2").addEventListener("click", () => proximoPasso("parte2"));  
document.getElementById("setaP3").addEventListener("click", () => proximoPasso("parte3"));
document.getElementById("setaP4").addEventListener("click", () => proximoPasso("parte4"));
document.getElementById("setaP5").addEventListener("click", () => proximoPasso("parte5"));
document.getElementById("setaP6").addEventListener("click", () => proximoPasso("parte6"));
document.getElementById("setaP7").addEventListener("click", () => proximoPasso("parte7"));
document.getElementById("setaP8").addEventListener("click", () => proximoPasso("parte8"));
document.getElementById("setaP9").addEventListener("click", () => proximoPasso("parte9"));
document.getElementById("setaP10").addEventListener("click", () => proximoPasso("parte10"));
document.getElementById("setaP11").addEventListener("click", () => proximoPasso("parte11"));
document.getElementById("setaP12").addEventListener("click", () => proximoPasso("parte12"));
document.getElementById("setaP13").addEventListener("click", () => proximoPasso("parte13"));
document.getElementById("setaP14").addEventListener("click", () => proximoPasso("parte14"));
document.getElementById("setaP15").addEventListener("click", () => proximoPasso("parte15"));
document.getElementById("setaP16").addEventListener("click", () => proximoPasso("parte16"));
document.getElementById("setaP17").addEventListener("click", () => proximoPasso("parte17"));
document.getElementById("setaP18").addEventListener("click", () => proximoPasso("parte18"));
document.getElementById("setaP19").addEventListener("click", () => proximoPasso("parte19"));
document.getElementById("setaP20").addEventListener("click", () => proximoPasso("parte20"));
document.getElementById("setaP21").addEventListener("click", () => proximoPasso("parte21"));
document.getElementById("setaP22").addEventListener("click", () => proximoPasso("parte22"));
document.getElementById("setaP23").addEventListener("click", () => proximoPasso("parte23"));
document.getElementById("setaP24").addEventListener("click", () => proximoPasso("parte24"));
document.getElementById("setaP25").addEventListener("click", () => proximoPasso("parte25"));
document.getElementById("setaP26").addEventListener("click", () => proximoPasso("parte26"));
document.getElementById("setaP27").addEventListener("click", () => proximoPasso("parte27"));
document.getElementById("setaP28").addEventListener("click", () => proximoPasso("parte28"));
document.getElementById("setaP29").addEventListener("click", () => proximoPasso("parte29"));
document.getElementById("setaP30").addEventListener("click", () => proximoPasso("parte30"));
