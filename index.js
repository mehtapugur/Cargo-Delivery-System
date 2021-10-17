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
      protocol: "file",
      slashes: true,
    })
  );
  const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
  Menu.setApplicationMenu(mainMenu);

  ipcMain.on("key:userNameDOM", (err, data) => {
    console.log(data);
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
