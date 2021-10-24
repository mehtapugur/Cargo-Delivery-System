const electron = require("electron");
const { ipcRenderer } = require("electron");

let address = document.getElementById("address");
let status = document.getElementById("status");

address.addEventListener("click", () => {
  ipcRenderer.send("key:address");
});

status.addEventListener("click", () => {
  ipcRenderer.send("key:status");
});
