// Al carcar la pagina cargara las funciones o logica de programacion
// que tenga dentro
document.addEventListener('DOMContentLoaded', function () {
  CreateTableProducts(); // Se carga la funcion
})

/* 
  Se creo una funcion asincronica, para el cargado de datos con la api 
  obtenida
*/
async function CreateTableProducts() {
  const products = document.getElementById('products'); // En donde mostraremos los datos
  const keyMaster = '$2a$10$RHduZ6vFijtybXNzFj2Jre630q9e.qjzrnr3ebiIVx17nE2qxpEQ6'; // tokken o llave
  const dataProducts = await fetch('https://api.jsonbin.io/v3/b/668c97b3acd3cb34a8635828', {method:'GET',headers: {'X-Master-Key': keyMaster }})
    .then(response => response.json()); // Se obtiene el JSON del servicio alojado

  // Iteracion del array 
  const jsonProducts = dataProducts.record.products;
    jsonProducts.forEach(element => {
    const tr = document.createElement('tr');
    const tdImage = document.createElement('td');
    const tdName = document.createElement('td');
    const tdType = document.createElement('td');
    const tdBrand = document.createElement('td');
    const tdModel = document.createElement('td');
    const tdSection = document.createElement('td');
    const tdPrice = document.createElement('td');

    tdImage.innerHTML = `<img class="img-products" src="${element.image}" />`;
    tdImage.classList = 'd-flex justify-content-center'
    tdName.innerHTML = element.name;
    tdType.innerHTML = element.type;
    tdBrand.innerHTML = element.brand;
    tdModel.innerHTML = element.model;
    tdSection.innerHTML = element.section;
    tdPrice.innerHTML = element.price;

    tr.appendChild(tdImage);
    tr.appendChild(tdName);
    tr.appendChild(tdType);
    tr.appendChild(tdBrand);
    tr.appendChild(tdModel);
    tr.appendChild(tdSection);
    tr.appendChild(tdPrice);
    products.appendChild(tr);
  });
}