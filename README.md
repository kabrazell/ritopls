# ritopls
Rito Playground Using Node


#Docs
- https://developer.riotgames.com/api/methods
- https://developer.riotgames.com/docs/response-codes

async.map(['file1','file2','file3'], fs.stat, function(err, results){
    // results is now an array of stats for each file
});

async.filter(['file1','file2','file3'], fs.exists, function(results){
    // results now equals an array of the existing files
});

async.parallel([
    function(callback){
        setTimeout(function(){
            callback(null, 'one');
        }, 200);
    },
    function(callback){
        setTimeout(function(){
            callback(null, 'two');
        }, 100);
    }
],
// optional callback
function(err, results){
    // the results array will equal ['one','two'] even though
    // the second function had a shorter timeout.
});

async.series([
    function(){ ... },
    function(){ ... }
]);

That oughta be good for now!
