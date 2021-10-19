const electron = require("electron");
const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const url = require("url");
const path = require("path");

let mainWindow;

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
      pathname: path.join(__dirname, "main.html"),
      protocol: "file:",
      slashes: true,
    })
  );
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  //input ile girilen veriyi alıyoruz
  ipcMain.on("key:userNameDOM", (err, data) => {
    console.log(data);
  });

  // New Window
  ipcMain.on("key:newWindow", () => {
    createWindow();
  });

  ipcMain.on("key:access", () => {
    intoWindow();
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

// Yeni pencere açılması
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
}

function intoWindow() {
  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "next.html"),
      protocol: "file:",
      slashes: true,
    })
  );
}
