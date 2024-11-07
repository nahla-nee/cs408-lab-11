window.onload = loaded;

lambda_url = "https://09kqt0htph.execute-api.us-east-2.amazonaws.com/items";

/**
 * Simple Function that will be run when the browser is finished loading.
 */
function loaded() {
  document.getElementById("load_all_data").onclick = load_all_items;
  document.getElementById("send_data").onclick = send_data;
}


function itemFromTemplate(item) {
  return `<tr id = "${item.id}">
    <td>${item.id}</td>
      <td>${item.name}</td>
    <td>${item.price}</td>
    <td><input type="button" value="Delete" onclick="delete_item('${item.id}')"></td>
  </tr>`;
}

function load_all_items() {
  let item_data = document.getElementById("item_data");
  let xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function () {
    item_data.innerHTML = "";
    JSON.parse(xhr.response).forEach((item) => item_data.innerHTML += itemFromTemplate(item));
  });
  xhr.open("GET", lambda_url);
  xhr.send();
}

function delete_item(id) {
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", lambda_url+"/"+id);
  xhr.send();
  document.getElementById(id).remove();
}

function send_data() {
  let data_to_send = {
    "id": document.getElementById("item_id").value,
    "name": document.getElementById("item_name").value,
    "price": document.getElementById("item_price").value
  };

  let xhr = new XMLHttpRequest();
  xhr.open("PUT", lambda_url);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data_to_send))
}
