var serverRoot = '/mnt/goldmate-exchange/goldmate.com.au/public_html';
var backHostRootDir = '/mnt/goldmate-exchange/backend.goldmate.com.au/public_html/';
var imgDir = 'wp-content/uploads';
var registerFormDir = '/regsiter/';
var fileType = '.zip';
var backHost = "http://backend.goldmate.com.au";
var currencylayerKey = 'e8f6db913b9b0785c48aa24750b1f539';
var homsSlug = "home";
var appPort = 8082;
var fs = require('fs');
var glob = require('glob')
var request = require('request');
var express = require('express');
var $ = require('jquery');
var url = require('url');
const querystring = require('querystring');
var app = express();
var postTypes;
var pages;
var cacheLib = new Array();
var hitCacheFileName = null;
var cacheExpireMin = 30;
var min = 60;
/* Active body parser use this plugin to parse form body*/
var bodyParser = require('body-parser');
var PATH = require('path');
var mime = require('mime');
app.use( bodyParser.urlencoded({
    extended: true
}));
app.use( bodyParser.json());
var parseString = require('xml2js').parseString;
/* homepage & all static file request*/
app.use('/',express.static(serverRoot + '/public'));
app.use(express.static(serverRoot + '/public'));
app.use(express.static(serverRoot));

console.log("server is running on " + appPort);
console.log('registering all path on server, avaliable path are: ')

/* register all post type routes */
request.get( backHost + '/json-api/restml/en/types', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    postTypes = JSON.parse(body);
   	for(var index = 0; index < postTypes.length; index++) {
   		var postTypeSlug = postTypes[index].slug;
   		if(postTypeSlug === 'goldmate-market-wrap') {
   			var singlePath = '/*/' + postTypeSlug + '/*/';
   			var archivePath = '/*/' + postTypeSlug + '/';
   			app.use(singlePath,express.static(serverRoot + '/public'));
   			app.use(archivePath,express.static(serverRoot + '/public'));
        console.log(archivePath);
        console.log(singlePath);
   		}
   	}
  } else {
  	console.log(error);
  }
});

/* register all pages routes */
request.get( backHost + '/json-api/restml/en/page?filter[posts_per_page]=-1', function (error, response, body) {
  if (!error && response.statusCode == 200) {
    pages = JSON.parse(body);
    for(var index = 0; index < pages.length; index++) { 
      var path = '/*/' + pages[index].slug + '/';
      if(pages[index].parent > 0) {
          var parent = pages.find(function(page){
              return page.id === pages[index].parent;
          });
          path = '/*/' + parent.slug + '/' + pages[index].slug + '/';
      }
   		if(pages[index].slug !== homsSlug) {
   			app.use(path,express.static(serverRoot + '/public'));
        console.log(path);
   		}
   	}
  } else {
  	console.log(error);
  }
});

/* redirect all api request */
/* in this stage we can log request times and cache most popular request */
app.get('/json-api/restml/*',function(req,res) {
	var backEndReq = backHost + req.originalUrl;
	request(backEndReq,function(error,response,body){
		if(!error && response.statusCode == 200) {
			var dataResp = JSON.parse(body);
			res.send(dataResp);
		} else {
			res.status(response.statusCode).send({ error: body });
		}
	});
});


/* param[0] language, param[1] contact-form-id */
app.post('/json-api/restml/*',function(req,res){
  // console.log(req.body['the-form-combination']);
  request({
      url: backHost + req.originalUrl,
      method: 'POST',
      form: req.body
  },function(error,response,body){
      if(!error && response.statusCode == 200) {
        var dataResp = JSON.parse(body);
        res.send(dataResp);
      } else {
        res.status(response.statusCode).send({ error: body });
      }
  })
});

/* redirect all image request */
app.get('/images/*',function(req,res) {
    var urlPartial = req.originalUrl.split('/');
    urlPartial.shift(); /* first element is empty */
    var contentType = 'image/';
    var filePath = urlPartial.map(function(item){
        if(item !== 'images' && item.length) {
            if(item === urlPartial[urlPartial.length - 1]) {
                var imgName = item.split('.');
                contentType += imgName[1];
            }
            return decodeURIComponent(item);
        }
    });
    var backEndFilePath = backHostRootDir + imgDir + filePath.join('/');
    var mimetype = mime.lookup(backEndFilePath);
    var filename = PATH.basename(backEndFilePath);
    fs.readFile(backEndFilePath,function(error,file){
        res.setHeader('Content-disposition', 'attachment; filename=' + filename);
        res.setHeader('Content-type', mimetype);
        res.write(file,'image');
        res.end();
        // res.clearCookie("language");
        // res.clearCookie("__zlcmid");
        // res.writeHead(200, {'content-type':mimetype});
        // res.write(file,'image');
        // res.end();
    })
});

/**
 * deal with user file download request 
 * param[0] -> media-file-id
 */
app.get('/json-api/media/*',function(req,res){
     // res.send(req);
     // console.log(req.params[0]);
     // console.log(backHost + '/json-api/wp/v2/media/' + req.params[0]);
     request({
          url: backHost + '/json-api/wp/v2/media/' + req.params[0],
          method: 'GET'
      },function(error,response,body){
          if(!error && response.statusCode == 200) {
            var dataResp = JSON.parse(body);
            var fileUrlObject = url.parse(dataResp.source_url);
            var filePath = backHostRootDir + fileUrlObject.pathname;
            // console.log(filePath);
            var filename = PATH.basename(filePath);
            // console.log(filename);
            var mimetype = mime.lookup(filePath);
            // console.log(mimetype);
            fs.readFile(filePath,function(error,file){
                res.setHeader('Content-disposition', 'attachment; filename=' + filename);
                res.setHeader('Content-type', 'text/html');
                var filestream = fs.createReadStream(filePath);
                filestream.pipe(res);
            })
          } else {
            res.status(response.statusCode).send({ error: body });
          }
      })
})

/* redirect all currency exchange request temp use yahoo 
 * we will save result and real call api every 30 mins
 */
/*app.get('/currency-api/ratepairs',function(req,res) {
    var queries = req.originalUrl.split('?');
    var currencyPairs = queries[1].split('&');
    var redirectUrl = 'http://query.yahooapis.com/v1/public/yql?q=select * from yahoo.finance.xchange where pair in (';
    for(var index = 0; index < currencyPairs.length; index++){
        if(index != currencyPairs.length - 1) {
            redirectUrl += '"' + currencyPairs[index] + '",';
        } else {
            redirectUrl += '"' + currencyPairs[index] + '"';
        }
    }
    redirectUrl += ')&format=json&diagnostics=true&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys';
    /* use cache file to deal with currency exchange rate check request
     * server will call original api every 30 minutes (change cacheExpireMin to modify)
     */
    /*var cacheFileName = serverRoot + '/public/cache/currency-api/ratepairs/currency-api-';
    var time = new Date().getTime();
    var nowTime =  Math.floor(time / 1000);
    cacheFileName += nowTime + '.json';
    glob(serverRoot + '/public/cache/currency-api/ratepairs/*.json', null, function (er, files) {
        for(var i = 0; i < files.length; i++) {
            var path = files[i].split('/');
            var fileName = path[path.length-1].split('.');
            var cacheTime = fileName[0].split('-');
            if(parseInt(nowTime) - parseInt(cacheTime[2]) <= cacheExpireMin * min) {
                hitCacheFileName = files[i];
                break;
            } else {
                hitCacheFileName = null;
                continue;
            }
        }
    });
    console.log(hitCacheFileName);
    if(hitCacheFileName === null) {
       request(redirectUrl,function(error,response,body){
          if(!error && response.statusCode == 200) {
            var dataResp = JSON.parse(body);
            fs.writeFile(cacheFileName, body, function (err,data) {
            if (err) {
                return console.log(err);
              }
            });
            res.send(dataResp);
          } else {
            res.status(response.statusCode).send({ error: body });
          }
      });
    } else {
        fs.readFile(hitCacheFileName,function(error,file){
            res.writeHead(200, {'content-type':'application/json'});
            res.write(file,'json');
            res.end();
        })
    }
});*/


/* link to new forign exchange rate api powered by currencylayer */
// app.get('/currency-api/ratepairs',function(req,res) {
//     var currencylayerUrl = 'https://apilayer.net/api/live';
//     var currencyPairs = req.query.target;
//     var source = req.query.base;
//     var format = '1';
//     var accessKey = currencylayerKey;
//     var apiQuery = currencylayerUrl + '?' +
//                   'access_key=' + accessKey + '&' +
//                   'currencies=' + currencyPairs + '&' +
//                   'source=' + source + '&' +
//                   'format=' + format;
//     request(apiQuery,function(error,response,body){
//         if(!error && response.statusCode == 200) {
//           var dataResp = JSON.parse(body);
//           // console.log(dataResp);
//           res.send(dataResp);
//         } else {
//           res.status(response.statusCode).send({ error: body });
//         }
//     });
// });

/* link to goldmate exchange backend to get latest exchange rate ;
 * API return xml data we need to parse it into json, we also unset
 * all useless properties, which are not necessary for website display.
 */
app.get('/currency-api/ratepairs',function(req,res) {
    var goldmateRateUrl = 'http://rate.goldmate.com.au/AjaxHandler/FinaceTransactionHandler.ashx';
    var apiQuery = '?action=getFlashXML&SubbranchName=S000000002';
    var url = goldmateRateUrl+apiQuery;
    var unsetProperty = new Array('InCurrencyImg','OutCurrencyImg','$','CreateDate');
    request(url,function(error,response,body) {
        if(!error && response.statusCode == 200) {
          parseString(body, function (err, parseResult) {
              /* unset all useless property for each results */
              var currencyPairResult = parseResult.query.results[0].rate;
              currencyPairResult.map(function(rateObj,index){
                  rateObj['CurrencyPair'] = rateObj['CurrencyPair'][0].replace('/',' / ');
                  unsetProperty.map(function(propertyKey,propertyIndex){
                      delete rateObj[propertyKey];
                  });
              });
              res.send(parseResult.query.results[0].rate);
          });
        } else {
          res.status(response.statusCode).send({ error: body });
        }
    });
});

/* deal with all request for currency table country flag images */
app.get('/currency-flag/images',function(req,res){
    var flagImageJson = 'flag-currency.json';
    glob(serverRoot + '/public/assets/json/' + flagImageJson, null, function (er, files) {
        //console.log(files.length);
        if(files.length == 1) {
            var hitCacheFileName = files[0];
            fs.readFile(hitCacheFileName,function(error,file){
                res.writeHead(200, {'content-type':'application/json'});
                res.write(file,'json');
                res.end();
            });
        }
    });
});


/* deal with all request for user login and registeration functionalities */

/* implement user physical exchange query with file upload functions
 * 
 * how to design user query form and documents upload...
 * when user registrate or make first query with email we
 * will create a folder named with extinct clients' name.
 * For different queries from clients, all details and related
 * documents will be saved a folder named with UNIX timestamp 
 * that is the time user sent their requests...
 */
app.listen(appPort,'localhost');
