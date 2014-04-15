var resolve,
    TreeWalker,
    ontwdirectory,
    ondirectory,
    onfile,
    onnode,
    ondone,
    onerror,
    treeWalker;
    
require('node-strict');
resolve = require('path').resolve;

TreeWalker = require('../../TreeWalker');

ontwdirectory = function ontwdirectory(directory) {
    var reader,
        iterator;

    reader = directory.read();
    reader.once('error', onerror);
    
    iterator = reader.iterate();
    //*/
    iterator.on('directory', ondirectory);
    iterator.on('file', onfile);
    /*/
    iterator.on('node', onnode);
    //*/
    iterator.once('done', ondone);
};

ondirectory = function ondirectory(directory) {
    console.log('directory', directory.toString());
    
    this.next();
};

onfile = function onfile(file) {
    console.log('file', file.toString());
    
    this.next();
};

onnode = function onnode(node) {
    console.log('node', node.toString());
    
    this.next();
};

ondone = function ondone() {
    console.log('done');
};

onerror = console.log.bind(console, 'error');

treeWalker = new TreeWalker(resolve('../test'));

treeWalker.once('directory', ontwdirectory);
treeWalker.once('error', onerror);
