import * as webdriver from 'selenium-webdriver';
import { config } from './config';




let driver: webdriver.ThenableWebDriver;

driver = new webdriver.Builder()
    .withCapabilities(webdriver.Capabilities.chrome())
    .build();
// maximizing chrome browser
driver.manage().window().maximize();

async function RunTest() {
    let Url: string = config.host;

    try{
        await driver.get(Url)
        let userBox = await driver.findElement(webdriver.By.name('sap-user'));
        await userBox.sendKeys(config.username);
        let passnameBox = await driver.findElement(webdriver.By.name('sap-password'));
        await passnameBox.sendKeys(config.password);
        await passnameBox.sendKeys(webdriver.Key.RETURN)
        await driver.wait(webdriver.until.elementLocated(webdriver.By.className("begin"))).then(el => el.getText().then(x => console.log(x)));


        let timeCapture = await driver.findElement(webdriver.By.className('begin')).click();

        // nwbc
        
    } catch(e) {
        console.log(e)
    } finally {
        // closeWindow()  
    }
}

function closeWindow() {
        driver.quit();
    };

RunTest()