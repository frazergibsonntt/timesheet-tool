# timesheet-tool
Tool to load and log into the timesheet portal automatically once a week at a set time

## Create config file in src/config.ts
```bash
export const config = {
  host :  'https://ess.nttdata-emea.com/',
  username : '',
  password : ''
}
```

## Install modules
```
npm install
```

### Compile
```
npm run build
```

Run the file e.g.:
```
node dist/add.js
node dist/index.js
node dist/file-names-to-array.js
node dist/selenium-sap-timesheets.js
```

Re-run the build (tsc) if you make changes to the files.

Selenium:
Download the version of chrome driver that matches your browser version http://chromedriver.storage.googleapis.com/index.html

sudo spctl --master-enable
chromedriver: /usr/local/bin/chromedriver

Add a cronjob
crontab -e
Every Friday at 11:30
30 11 * * 5  cd /Users/GIBSOF/typescript-examples/ && export PATH=/Users/GIBSOF/.nvm/versions/node/v16.15.1/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Library/TeX/texbin:/Users/GIBSOF/.nvm/versions/node/v16.15.1/bin:/Users/GIBSOF/go/bin:/Users/GIBSOF/go/bin:/Users/GIBSOF/.nvm/versions/node/v16.15.1/bin && node dist/selenium-sap-timesheets.js

30 11 * * 5  cd /Users/GIBSOF/typescript-examples/ && export PATH=/Users/GIBSOF/.nvm/versions/node/v16.15.1/bin:/Users/GIBSOF/timesheet-tool/node_modules/webdriver-manager/bin && node dist/selenium-sap-timesheets.js

Check it's been added
crontab -l

TODO:
Get it to detect chrome and install chrome_driver for that version
Fill out the timesheet:
1. Import timesheet code - worklist>select>import
2. fill out the rows 
3. Release directly 

Get chromedriver version
 /usr/local/bin/chromedriver -v 

 ts-node src/download-chromedriver.ts 