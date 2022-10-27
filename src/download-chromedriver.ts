import * as child_process from 'child_process';
import * as util from 'util';


const exec = util.promisify(child_process.exec);


const config = {
  versionRegEx: /\d+\.\d+\.\d+\.\d+/,
  chromedriverVersionCommand: '/usr/local/bin/chromedriver -v',
  chromeAppVersionCommand: '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version',
}

async function getVersion(command: string, regex: any) {
  const { stdout, stderr } = await exec(command)
  const version = stdout.match(regex);
  return version![0]
}

async function compareVersions() {
  if (await getVersion(config.chromedriverVersionCommand,config.versionRegEx) === await getVersion(config.chromeAppVersionCommand,config.versionRegEx)) {
    console.log('true')
  } else {
    console.log('false')
    console.log('getChromeDriverV()')
    console.log(await getVersion(config.chromedriverVersionCommand,config.versionRegEx))
    console.log('getChromeAppV()')
    console.log(await getVersion(config.chromeAppVersionCommand,config.versionRegEx))
  }
}


compareVersions()

// test()