import * as webdriver from 'selenium-webdriver';
import * as check_version from './checkVersions';
import { config } from './config';


async function RunTest() {
    let Url: string = config.host;

    try{
        await check_version.compareVersions()
        let driver: webdriver.ThenableWebDriver = new webdriver.Builder()
            .forBrowser('chrome')
            .withCapabilities(webdriver.Capabilities.chrome())
            .build();;

        // maximizing chrome browser
        await driver.manage().window().maximize();
        await driver.get(Url)
        let userBox = await driver.findElement(webdriver.By.name('sap-user'));
        await userBox.sendKeys(config.username);
        let passnameBox = await driver.findElement(webdriver.By.name('sap-password'));
        await passnameBox.sendKeys(config.password);
        await passnameBox.sendKeys(webdriver.Key.RETURN)
        await driver.wait(webdriver.until.elementLocated(webdriver.By.className("begin"))).then(el => el.getText().then(x => console.log(x)));


        let timeCapture = await driver.findElement(webdriver.By.className('begin')).click();

        
    } catch(e) {
        console.log(e)
    } finally {
        // closeWindow()  
    }
}

// function closeWindow() {
//     driver.quit();
// };
// downloadDriver()
RunTest()