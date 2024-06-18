Electron ile basit bir hesap makinesi uygulaması.

---------------------------------------------------
Bir dizinde klasör oluştur.
Örnek D:/denemeler/test

1- Bilgisayar da node.js kurulmalı

2- Sonra npm

3- Şu komut ile package.json dosyasını ayarla. Burada genelde index.js yerine main.js tercih ediliyor electron yapısı gereği.
Diğer ayarlar author, license, version, packagename v.b.
------------
npm init
------------

4- Electron yükle
------------
npm install electron --save-dev
-----------

5- Eğer npm run start ile electron uygulamasını çalışsın istiyorsak
package.json dosyasındaki script kısmına
-----------
"start":"electron ."
----------
kısmı eklenmelidir. Böylece electron uygulamasını arar ve uygulamayı başlatır. Bu kısım özelleştirilebilir.
Test,Restart v.b. komutlar buraya eklenebilir.

6- 3. adımda main.js olarak ayarladığımız için klasöre main.js dosyası oluşturup. içerisinde node.js komutlarını yazıp 5.adımdaki komut ile çalıştırabiliriz.
Örnek: main.js içine
--------------
console.log('ilk program')
---------------
yazıp kaydedelim. ve terminalden "npm run start" veya "npm start" komutunu verelim ve sonucu görelim.


7- artık Html etkileşimli electron uygulamamıza başlayalım.
ilk olarak herhangi bir html dosyası oluştrulalım. Örnek index.html
html komutları normal şekilde yazılabilir herhangi bir sorun yok. sadece head kısmına aşağıdaki gibi meta kodları eklenmelidir.
Zira bu kodlar olmadığı taktirde tarayıcı bunu tehlikeli kod olarak algılıyor.
-------------------
 <meta
      http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
 <meta
      http-equiv="X-Content-Security-Policy"
      content="default-src 'self'; script-src 'self'"
    />
---------------------------

8- Sıra geldi bu html kodlarının çalışmasını için main.js içerisinde kodları yazmaya.
Main.js içerisinde electron paketini çağırıp, Browserwindow ve app modüllerini yüklemeliyiz. Örnek Main.js
---------------------------------
const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
    })
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()
})
------------------------------
burada "require('electron')" kısmı paketi ekliyor ve içindeki app ve BrowserWİndow modullerini aktarıyoruz.
İlk satırda, CommonJS modül sözdizimi ile iki Electron modülünü içe aktarıyoruz:

app, uygulamanızın olay yaşam döngüsünü kontrol eder.
BrowserWindow, uygulama pencerelerini oluşturur ve yönetir.
app.whenReady ile app hazır olduğunda createwindow metotunu tetiklleyerek bir web penceresi açar.
macosda durum biraz farklı macosda pencere açık olamsa bile işlem devam ettiği için 
şu şekilde olmalı
-------------------------
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
---------------------------------

9- uygulamayı kapatmak için 
----------------
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})
--------------------
kullanılabilir.

10- VS Kodundan Hata Ayıklama
VS Code kullanarak uygulamanızda hata ayıklamak istiyorsanız, VS Code'u hem main hem de renderer işlemlerine eklemeniz gerekir. İşte çalıştırmanız için örnek bir yapılandırma. Projenizdeki yeni bir .vscode klasöründe bir launch.json yapılandırması oluşturun:
ve aşağıdaki şekilde ayarlaryın
-----------------------------
{
  "version": "0.2.0",
  "compounds": [
    {
      "name": "Main + renderer",
      "configurations": ["Main", "Renderer"],
      "stopAll": true
    }
  ],
  "configurations": [
    {
      "name": "Renderer",
      "port": 9222,
      "request": "attach",
      "type": "chrome",
      "webRoot": "${workspaceFolder}"
    },
    {
      "name": "Main",
      "type": "node",
      "request": "launch",
      "cwd": "${workspaceFolder}",
      "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron",
      "windows": {
        "runtimeExecutable": "${workspaceFolder}/node_modules/.bin/electron.cmd"
      },
      "args": [".", "--remote-debugging-port=9222"],
      "outputCapture": "std",
      "console": "integratedTerminal"
    }
  ]
}
---------------------------------------

11- Paketleme

ilk olarak Electron Forge's CLI yüklenerek paketleme için gerekli ortam hazırlanır.
----------------
npm install --save-dev @electron-forge/cli
npx electron-forge import   (bu komuta dikkat zira olmazsa bu komut tekrar çalıştırılmalı)
--------------------------

package.json scripts kısmına aşağıdakiler eklenmeli
---------------------------------------
  //...
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  //...
------------------------------------------------

son adım.
---------------
npm run make
---------------
komutu ile program paketlenir ve out klasörüne exe v.b. çıkartılır.







