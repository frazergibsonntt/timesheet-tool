import axios from 'axios';
import * as child_process from 'child_process';
import * as util from 'util';
import * as downloadAndUnzip from './downloadAndUnzip';
import fs = require("fs");
const exec = util.promisify(child_process.exec);


const config = {
  versionRegEx: /\d+\.\d+\.\d+\.\d+/,
  // chromedriverVersionCommand: '/usr/local/bin/chromedriver -v',
  chromedriverVersionCommand: 'bin/chromedriver  -v',
  chromeAppVersionCommand: '/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome --version',
}

async function getVersion(command: string, regex: any) {
  // try {
    const { stdout, stderr } = await exec(command)
    const version = stdout.match(regex);
    return version![0]
  // } catch(e){
  //   // return null
  //   console(e)
  // }
}
// https://chromedriver.storage.googleapis.com/LATEST_RELEASE_106.0.5249
// "https://chromedriver.storage.googleapis.com/index.html?path=72.0.3626.69/"
// https://chromedriver.storage.googleapis.com/72.0.3626.69/chromedriver_mac64.zip
// https://chromedriver.storage.googleapis.com/106.0.5249/chromedriver_mac64.zip

async function getReqDriverVersion(version: string) {
  try {
    const reqVersion = await axios.get<{ data: Response[] }>(
      `https://chromedriver.storage.googleapis.com/LATEST_RELEASE_${version}`
    );
    // console.log(reqVersion.data)
    return reqVersion.data
  } catch (e) {
    console.log(e)
    return null
  }
}


export async function compareVersions() {
  const chromedriverMinorV = (await getVersion(config.chromedriverVersionCommand, config.versionRegEx))
  .replace(/\.[0-9]+$/, '');

  const chromeAppMinorV = (await getVersion(config.chromeAppVersionCommand,config.versionRegEx))
  .replace(/\.[0-9]+$/, '');

  if (chromedriverMinorV === chromeAppMinorV) {
    console.log('chromedriver matches browser version')
    // return null
  } else {
    console.log('chromedriver doesn\'t match browser version')
    console.log(`Current chromedriver minor version is: ${chromedriverMinorV}`)
    console.log(`Current chrome browser minor version is: ${chromeAppMinorV}`)

    const requiredDriverVersion = await getReqDriverVersion(chromeAppMinorV)
    console.log(requiredDriverVersion)
    // return requiredDriverVersion
    downloadAndUnzip.downloadAndUnzipDriver(requiredDriverVersion)
  }
}


// compareVersions()

// test()

// downloadChromeDriver('106.0.5249')
// download()