const { app, BrowserWindow, Menu, dialog } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 350,
        height: 450,
        resizable: false,
        icon: './calc.png',
        webPreferences:
        {
            preload: path.join(__dirname, 'preload.js')
        }
    })
    win.loadFile('index.html')
    const custommenu = [{
        label: "Uygulama Hakkında",
        submenu: [
            {
                label: "Hakkında",
                click: () => {
                    dialog.showMessageBox(win,
                        {
                            message: 'Basit Hesap makinesi',
                            type: 'info',
                            title: 'Hakkında',
                            detail: 'Basit bir electron uygulaması ',
                            buttons: ['Kapat']
                        })
                }
            },
            {
                label: "Geliştirici",
                click: () => {
                    dialog.showMessageBox(win,
                        {
                            message: 'Geliştirici:\nEkrem Eşref KILINÇ',
                            type: 'info',
                            title: 'Geliştirici Bilgisi',
                            detail: 'https://ekremesrefkilinc.com.tr ',
                            buttons: ['Kapat'],
                        })
                }
            }
        ]
    },
    {
        label: "Çıkış",
        role: 'quit'
    }]
    const menu = Menu.buildFromTemplate(custommenu)
    Menu.setApplicationMenu(menu)
}
app.whenReady().then(() => {
    createWindow()
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow()
        }
    })

})
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})