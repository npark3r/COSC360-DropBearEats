require('geckodriver');
const { describe, it, after, before, beforeEach } = require('mocha');
const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const webdriver = require('selenium-webdriver'),
    By = webdriver.By,
    until = webdriver.until,
    Capabilities = webdriver.Capabilities;
const caps = new Capabilities();
caps.setPageLoadStrategy("normal");
const firefox = require('selenium-webdriver/firefox');
const fs = require('fs');
const path = require('path');
// custom async forEach function
async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}
// change URL to match your dev URL
const myURL = 'http://localhost:8080/';

// Do nothing for unhandled rejection
process.on('unhandledRejection', () => {});

describe('UI and User Tests', function() {
    let driver;

    before(() => {
        driver = new webdriver.Builder()
            .withCapabilities(caps)
            .forBrowser('firefox')
            .build();
    });
    beforeEach(() => {
        driver.get(myURL);
    })

    after(() => {
        driver.close();
    });

    it('Click login link, checking admin logs in', async() => {
        // click the login link
        await driver.findElement(webdriver.By.id('login-link')).click();

        // insert admin details for username and password
        let userName = await driver.findElement(By.css('#username'));
        await userName.sendKeys('admin')
        let pass = await driver.findElement(By.css('#pass'));
        await pass.sendKeys('admin')

        await driver.findElement(webdriver.By.id('login')).click();

        if (await driver.findElement(webdriver.By.id('success-area')).getText() == "Success! Logged In") {
            return true
        } else {
            return false;
        }
    })

    it('Click login link, checking false info leads to error', async() => {
        // click the login link
        await driver.findElement(webdriver.By.id('login-link')).click();

        // insert admin details for username and password
        let userName = await driver.findElement(By.css('#username'));
        await userName.sendKeys('fakeuser')
        let pass = await driver.findElement(By.css('#pass'));
        await pass.sendKeys('fakepass')

        await driver.findElement(webdriver.By.id('login')).click();

        if (await driver.findElement(webdriver.By.id('error-area')).getText() == "Could not find user") {
            return true
        } else {
            return false;
        }
    })

    it('Login as testuser, adding order to cart and checking cart udpates', async() => {
        // click the login link
        await driver.findElement(webdriver.By.id('login-link')).click();

        // insert admin details for username and password
        let userName = await driver.findElement(By.css('#username'));
        await userName.sendKeys('testuser')
        let pass = await driver.findElement(By.css('#pass'));
        await pass.sendKeys('testpassword')
        // click login
        await driver.findElement(webdriver.By.id('login')).click();
        // check that login was a success
        if (await driver.findElement(webdriver.By.id('success-area')).getText() != "Success! Logged In") {
            return false;
        }
        // click on browse nav button
        await driver.findElement(webdriver.By.id('browse-link')).click();

        await driver.findElement(webdriver.By.css('#add_to_cart_0')).click();
        await driver.findElement(webdriver.By.css('#add_to_cart_1')).click();
        await driver.findElement(webdriver.By.css('#add_to_cart_1')).click();

        await driver.findElement(webdriver.By.id('cart-link')).click();

        // Take a screenshot
        let encodedString = await driver.takeScreenshot();
        // Save it as 'screenshots/{time}.png'
        let filename = (new Date()).getTime() + '.png';
        fs.writeFileSync(path.join(__dirname, 'screenshots', filename), encodedString, 'base64');

        // get the total being output
        let cartTotal = await driver.findElement(webdriver.By.id('cart_total')).getText()
        // check the total is correct for the products ordered
        if (cartTotal === 'A$39.00'){
            return true;
        } else{
            return false;
        }
    })
});
