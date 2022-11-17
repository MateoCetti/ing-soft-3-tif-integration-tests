import {By, Builder} from 'selenium-webdriver'
import {suite} from 'selenium-webdriver/testing/index.js'
import assert from 'assert';

const FRONT_URL = process.env.FRONT_URL

suite(function(env) {
    describe('First script', function() {
        let driver;

        before(async function() {
            driver = await new Builder().forBrowser('chrome').build();
        });

        after(async () => await driver.quit());

        it('Check title', async function() {
            await driver.get(FRONT_URL);

            let title = await driver.getTitle();
            assert.equal("My Pokedex", title);

        });

        it('Check Charizard request', async function() {
            await driver.get(FRONT_URL);

            let title = await driver.getTitle();
            assert.equal("My Pokedex", title);

            let textBox = await driver.findElement(By.id('pokemon-input'));
            let submitButton = await driver.findElement(By.id('submitButton'));

            await textBox.sendKeys('Charizard');
            await submitButton.click();

            await sleep(1000)

            let name = await driver.findElement(By.id('pokemon-name')).getText();
            assert.equal("Charizard", name);

            let types = await driver.findElement(By.id('pokemon-types')).getText();
            assert.equal("fire, flying", types);
        });

        it('Check wrong request', async function() {
            await driver.get(FRONT_URL);

            let textBox = await driver.findElement(By.id('pokemon-input'));
            let submitButton = await driver.findElement(By.id('submitButton'));

            await textBox.sendKeys('dasda123');
            await submitButton.click();

            await sleep(1000)

            let error_msg = await driver.findElement(By.id('error-text')).getText();
            assert.equal("Error: Pokemon not found.", error_msg);

        });

    });
});

function sleep(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }