document.addEventListener('DOMContentLoaded', function () {
  const json = getJsonForProducts();
  json.then(value => CreateTableProducts(value));
});

async function getJsonForProducts() {
  const keyMaster = '$2a$10$a4qnvn8x5u9JjJLvSAAvKO/aH1xQQ.UKmE9Yzix96kxVzNuzscw0a';
  const dataProducts = await fetch('https://api.jsonbin.io/v3/b/668c97b3acd3cb34a8635828', { method: 'GET', headers: { 'mode' : 'no-cors',  'X-Master-Key': keyMaster } })
    .then(response => response.json());
  const jsonProducts = dataProducts.record.products;
  
  return await jsonProducts;
}

function empyInputs() {
  document.getElementById('editProductId').value = '0';
  document.getElementById('indexProduct').value = '0';
  document.getElementById('editProductImage').value = '';
  document.getElementById('editProductName').value = '';
  document.getElementById('editProductType').value = '';
  document.getElementById('editProductBrand').value = '';
  document.getElementById('editProductModel').value = '';
  document.getElementById('editProductSection').value = '';
  document.getElementById('editProductPrice').value = 0.0;
}

function empyInputsAdd() {
  document.getElementById('generateID').disabled = false;
  document.getElementById('AddProductId').classList.remove('danger-id');
  document.getElementById('AddProductId').classList.remove('succes-id');
  document.getElementById('AddProductId').value = '';
  document.getElementById('AddProductImage').value = '';
  document.getElementById('AddProductName').value = '';
  document.getElementById('AddProductType').value = '';
  document.getElementById('AddProductBrand').value = '';
  document.getElementById('AddProductModel').value = '';
  document.getElementById('AddProductSection').value = '';
  document.getElementById('AddProductPrice').value = 0.0;
}

document.getElementById('addProduct').addEventListener('click',empyInputsAdd);

function CreateTableProducts(jsonProducts) {
  LimitProducts(jsonProducts);
  const products = document.getElementById('products');
  jsonProducts.forEach((element,index) => {
    const tr = document.createElement('tr');
    const tdid = document.createElement('td');
    const tdImage = document.createElement('td');
    const tdName = document.createElement('td');
    const tdType = document.createElement('td');
    const tdBrand = document.createElement('td');
    const tdModel = document.createElement('td');
    const tdSection = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdAction = document.createElement('td');

    tdid.classList= 'td-id';
    tdid.innerHTML = element.id;
    tdImage.innerHTML = `<img class="img-products" src="${element.image}" />`;
    tdImage.classList = 'd-flex justify-content-center';
    tdName.innerHTML = element.name;
    tdType.innerHTML = element.type;
    tdBrand.innerHTML = element.brand;
    tdModel.innerHTML = element.model;
    tdSection.innerHTML = element.section;
    tdPrice.innerHTML = element.price;
    tdAction.innerHTML = '<div class="btn-group align-top">' +
      ' <button class="btn btn-sm btn-primary badge edit" type="button" data-toggle="modal"' +
      `  data-target="#editProductModal" data-id="${element.id}" data-image="${element.image}" data-name="${element.name}"` +
      `  data-type="${element.type}" data-index="${index}" data-brand="${element.brand}" data-model="${element.model}"` +
      `  data-section="${element.section}" data-price="${element.price}">Edit</button>` +
      
      `  <button class="btn btn-sm btn-danger badge" type="button" onclick="deleteProduct('${element.id}')"><i` +
      '  class="fa fa-trash"></i></button>' +
      ' </div>';
    tr.appendChild(tdid);
    tr.appendChild(tdImage);
    tr.appendChild(tdName);
    tr.appendChild(tdType);
    tr.appendChild(tdBrand);
    tr.appendChild(tdModel);
    tr.appendChild(tdSection);
    tr.appendChild(tdPrice);
    tr.appendChild(tdAction);
    products.appendChild(tr);
  });

  // Añadir el evento de clic a los botones de edición
  const editButtons = document.getElementsByClassName('edit');
  for (let i = 0; i < editButtons.length; i++) {
    editButtons[i].addEventListener('click', function () {
      const button = editButtons[i];
      const id = button.getAttribute('data-id');
      const index = button.getAttribute('data-index');
      const image = button.getAttribute('data-image');
      const name = button.getAttribute('data-name');
      const type = button.getAttribute('data-type');
      const brand = button.getAttribute('data-brand');
      const model = button.getAttribute('data-model');
      const section = button.getAttribute('data-section');
      const price = button.getAttribute('data-price');

      document.getElementById('editProductId').value = id;
      document.getElementById('indexProduct').value = parseInt(index);
      document.getElementById('editProductImage').value = image;
      document.getElementById('editProductName').value = name;
      document.getElementById('editProductType').value = type;
      document.getElementById('editProductBrand').value = brand;
      document.getElementById('editProductModel').value = model;
      document.getElementById('editProductSection').value = section;
      document.getElementById('editProductPrice').value = price;
    });
  }
}

function LimitProducts(json){
  if(json.length >= 20){
    const addbtn = document.getElementById('addProduct');
    addbtn.disabled = true;
  }
}

function saveProductChanges() {
  const id = document.getElementById('editProductId').value.trim();
  const name = document.getElementById('editProductName').value.trim();
  const type = document.getElementById('editProductType').value.trim();
  const brand = document.getElementById('editProductBrand').value.trim();
  const model = document.getElementById('editProductModel').value.trim();
  const section = document.getElementById('editProductSection').value.trim();
  const price = document.getElementById('editProductPrice').value.trim();
  const image = document.getElementById('editProductImage').value.trim();

  // Validaciones
  if (!id || !name || !type || !brand || !model || !section || !price || !image) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos antes de guardar los cambios.'
    });
    return;
  }
  
  updateProduct(id ,name,type,brand,image,model,section,price);
  // Actualiza la tabla
  const rows = document.getElementById('products').getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    const button = rows[i].getElementsByClassName('edit')[0];
    if (button && button.getAttribute('data-id') === id) {
      rows[i].getElementsByTagName('td')[1].innerHTML = `<img class="img-products" src="${image}" />`;
      rows[i].getElementsByTagName('td')[2].innerHTML = name;
      rows[i].getElementsByTagName('td')[3].innerHTML = type;
      rows[i].getElementsByTagName('td')[4].innerHTML = brand;
      rows[i].getElementsByTagName('td')[5].innerHTML = model;
      rows[i].getElementsByTagName('td')[6].innerHTML = section;
      rows[i].getElementsByTagName('td')[7].innerHTML = price;
      button.setAttribute('data-name', name);
      button.setAttribute('data-type', type);
      button.setAttribute('data-brand', brand);
      button.setAttribute('data-model', model);
      button.setAttribute('data-section', section);
      button.setAttribute('data-price', price);
      break;
    }
  }

  // Cierra el modal
  $('#editProductModal').modal('hide');
}

async function updateProduct(id,name,type,brand,image,model,section,price) {
  const apiUrl = 'https://api.jsonbin.io/v3/b/668c97b3acd3cb34a8635828';
  const secretKey = '$2a$10$a4qnvn8x5u9JjJLvSAAvKO/aH1xQQ.UKmE9Yzix96kxVzNuzscw0a';
  const productId = id;
  console.log("ID del producto: ", productId)
  // Datos actualizados del producto
  let updatedProduct = {
    "id": productId,
    "name": name,
    "type": type,
    "brand": brand,
    "image": image,
    "model": model,
    "price": parseFloat(price),
    "section": section
  };

  
  try {
    // Obtener los datos existentes
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Master-Key': secretKey
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos existentes');
    }

    const result = await response.json();
    const products = result.record.products;

    // Encontrar el índice del producto a actualizar
    const productIndex = products.findIndex(product => product.id === productId);

    // Actualizar el producto en la lista
    if (productIndex !== -1) {
      products[productIndex] = updatedProduct;
    }

    // Estructura completa del JSON para enviar de vuelta
    const updatedData = {
      products: products
    };

    // Configurar el cuerpo de la solicitud
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': secretKey,
        'X-Bin-Versioning': 'false' // Opcional, para evitar crear una nueva versión
      },
      body: JSON.stringify(updatedData)
    };

    // Realizar la solicitud de actualización con fetch
    const updateResponse = await fetch(apiUrl, requestOptions);

    if (!updateResponse.ok) {
      throw new Error('Error al actualizar el producto');
    }

    const updateResult = await updateResponse.json();
    console.log('Producto actualizado:', updateResult);
    Swal.fire({
      icon: 'success',
      title: 'Realizado',
      text: 'Producto Modificado'
    });

    $('#AddProductModal').modal('hide');
    

  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  } 
 
}

async function AddProduct() {
  /* console.log(id,' - ' ,name,' - ' ,type,' - ' ,brand,' - ' ,image,' - ' ,model,' - ' ,price, ' - ' ,section); */
  
  const id = document.getElementById('AddProductId').value.trim();
  const name = document.getElementById('AddProductName').value.trim();
  const type = document.getElementById('AddProductType').value.trim();
  const brand = document.getElementById('AddProductBrand').value.trim();
  const model = document.getElementById('AddProductModel').value.trim();
  const section = document.getElementById('AddProductSection').value.trim();
  const price = document.getElementById('AddProductPrice').value.trim();
  const image = document.getElementById('AddProductImage').value.trim();

  // Validaciones
  if (!id || !name || !type || !brand || !model || !section || !price || !image) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Por favor, completa todos los campos antes de guardar los cambios.'
    });
    return;
  }

  const apiUrl = 'https://api.jsonbin.io/v3/b/668c97b3acd3cb34a8635828';
  const secretKey = '$2a$10$a4qnvn8x5u9JjJLvSAAvKO/aH1xQQ.UKmE9Yzix96kxVzNuzscw0a';
  const productId = id;
  console.log("ID del producto: ", productId)
  // Datos actualizados del producto
  let addProduct = {
    "id": productId,
    "name": name,
    "type": type,
    "brand": brand,
    "image": image,
    "model": model,
    "price": parseFloat(price),
    "section": section
  };

  try {
    // Obtener los datos existentes
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'X-Master-Key': secretKey
      }
    });

    if (!response.ok) {
      throw new Error('Error al obtener los datos existentes');
    }

    const result = await response.json();
    const products = result.record.products;

    products.push(addProduct);

    // Estructura completa del JSON para enviar de vuelta
    const updatedDataProduct = {
      products: products
    };

    // Configurar el cuerpo de la solicitud
    const requestOptions = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': secretKey,
        'X-Bin-Versioning': 'false' // Opcional, para evitar crear una nueva versión
      },
      body: JSON.stringify(updatedDataProduct)
    };

    // Realizar la solicitud de actualización con fetch
    const updateResponse = await fetch(apiUrl, requestOptions);

    if (!updateResponse.ok) {
      throw new Error('Error al actualizar el producto');
    }

    const updateResult = await updateResponse.json();
    //console.log('Producto actualizado:', updateResult);
    Swal.fire({
      icon: 'success',
      title: 'Realizado',
      text: 'Producto Modificado'
    });
    

  } catch (error) {
    console.error('Error al actualizar el producto:', error);
  } 
 
}

const btnGenerate = document.getElementById('generateID');
btnGenerate.addEventListener('click', generateRandomString);

function generateRandomString() {
  const length = 7;
  const btnGen = document.getElementById('generateID');
  const inputID = document.getElementById('AddProductId');
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
  }
  inputID.value = result;
  const idExistsInTable = checkIdInTable(result);

  if (idExistsInTable) {
    inputID.classList.remove('succes-id');
    inputID.classList.add('danger-id');
  } else {
    inputID.classList.remove('danger-id');
    inputID.classList.add('succes-id');
    btnGen.disabled = true;
  }
}

function checkIdInTable(generatedId) {
  const thElements = document.querySelectorAll('td.td-id')
  for (let th of thElements) {
      if (th.innerText === generatedId) {
          return true;
      }
  }
  return false;
}

async function deleteProduct(id) {
  const apiUrl = 'https://api.jsonbin.io/v3/b/668c97b3acd3cb34a8635828';
  const secretKey = '$2a$10$a4qnvn8x5u9JjJLvSAAvKO/aH1xQQ.UKmE9Yzix96kxVzNuzscw0a';
  const productId = id; // El ID del producto que deseas eliminar
   
  console.log(typeof id)
  try {
      // Obtener los datos existentes
      const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
              'X-Master-Key': secretKey
          }
      });

      if (!response.ok) {
          throw new Error('Error al obtener los datos existentes');
      }

      const result = await response.json();
      const products = result.record.products;


      // Filtrar el producto a eliminar
      const updatedProducts = products.filter(product => product.id !== productId);

      // Estructura completa del JSON para enviar de vuelta
      const updatedData = {
        products: updatedProducts
      };

      // Configurar el cuerpo de la solicitud
      const requestOptions = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'X-Master-Key': secretKey,
              'X-Bin-Versioning': 'false' // Opcional, para evitar crear una nueva versión
          },
          body: JSON.stringify(updatedData)
      };

      // Realizar la solicitud de actualización con fetch
      const updateResponse = await fetch(apiUrl, requestOptions);

      if (!updateResponse.ok) {
          throw new Error('Error al actualizar el producto');
      }

      const updateResult = await updateResponse.json();
      //console.log('Producto eliminado:', updateResult);
      Swal.fire({
        icon: 'success',
        title: 'Realizado',
        text: 'Producto Eliminado'
      });

  } catch (error) {
      console.error('Error al eliminar el producto:', error);
  }
}

/* document.getElementById('test').addEventListener('click', deleteProduct);
 */


