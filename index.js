const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;
let openMapWindow;

//uygulama hazır olduğunda ana pencereyi açıyoruz
app.on("ready", () => {
  mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      //enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src\\main.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //üstbardaki menüyü tanımlıyoruz
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  //input ile girilen veriyi alıyoruz
  ipcMain.on("key:userNameDOM", (err, data) => {
    console.log(data);
  });

  // Yeni pencere oluşturuyoruz
  ipcMain.on("key:newWindow", () => {
    createWindow();
  });

  //başarıyla giriş yapıldıktan sonra açılacak olan ana pencere
  ipcMain.on("key:access", () => {
    intoWindow();
  });

  ipcMain.on("key:enter", () => {
    intoWindow();
  });

  ipcMain.on("key:address", () => {
    addressWindow();
  });

  ipcMain.on("key:status", () => {
    statusWindow();
  });

  ipcMain.on("key:openMap", () => {
    openMap();
  });

  //ana pencere kapandığında tüm uygulama kapanır
  mainWindow.on("close", () => {
    app.quit();
  });
});

//üstbardaki menüleri hazırlıyoruz
const mainMenuTemplate = [
  {
    label: "Exit",
    submenu: [
      {
        label: "Exit ",
        role: "quit",
      },
    ],
  },
];

//uygulama productionda değilse Dev Tools u ekliyoruz
if (process.env.NODE_ENV !== "production") {
  mainMenuTemplate.push({
    label: "Dev Tools",
    submenu: [
      {
        label: "Open Dev Tools",
        click(item, focusedWindow) {
          focusedWindow.toggleDevTools();
        },
      },
      {
        label: "Refresh",
        role: "reload",
      },
    ],
  });
}

/*Yeni pencere açılması
function createWindow() {
  addWindow = new BrowserWindow({
    width: 482,
    height: 200,
    title: "New Page",
  });

  addWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "new.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //bu pencere kapanırsa addWindow değeri sıfırlanır ki bellekte yer kaplamasın
  addWindow.on("close", () => {
    addWindow = null;
  }); 
}*/

//giriş yapıldıktan sonraki ana pencere
function intoWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src\\cargo\\cargo.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

function addressWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src\\cargo\\address\\address.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

function statusWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src\\cargo\\status\\status.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}

function openMap() {
  openMapWindow = new BrowserWindow({
    width: 700,
    height: 700,
    title: "Google Maps",
  });

  openMapWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "src\\cargo\\map\\map.html"),
      protocol: "file:",
      slashes: true,
    })
  );

  //bu pencere kapanırsa openMapWindow değeri sıfırlanır ki bellekte yer kaplamasın
  openMapWindow.on("close", () => {
    openMapWindow = null;
  });
}
