const cupom1 = document.getElementsByClassName("btn btn-cupom ")
const elementToClick1 = cupom1[Math.floor(Math.random() * cupom1.length)]
elementToClick1.click()
document.querySelector('input[name = "cupomDesconto"]').value = '15PARCEIROPETZ';
const cupom2 = document.getElementsByClassName("btn btn-apply")
const elementToClick2 = cupom2[Math.floor(Math.random() * cupom2.length)]
elementToClick2.click()