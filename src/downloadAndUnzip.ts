import * as admZip from 'adm-zip';
import * as fs from 'fs';
import * as request from 'superagent';

export async function downloadAndUnzipDriver(version: {data: Response[];} | null) {
  const href = `https://chromedriver.storage.googleapis.com/${version}`;
  const zipFile = 'chromedriver_mac64.zip';
  
  const source = `${href}/${zipFile}`;
  
  request
    .get(source)
    .on('error', function(error: any) {
      console.log(error);
    })
    .pipe(fs.createWriteStream(zipFile))
    .on('finish', function() {
      console.log('finished downloading');
      var zip = new admZip(zipFile);
      console.log('start unzip');
      zip.extractAllTo('bin', true);
      console.log('finished unzip');
      fs.chmodSync('bin/chromedriver', 0o755);
    });
}



