

    var resolve,
        TreeWalker,
        ontwdirectory,
        onnode,
        onstats,
        ondone,
        onerror,
        treeWalker;
       
    require('node-strict');
    resolve = require('path').resolve;
     
    TreeWalker = require('../../TreeWalker');
     
    ontwdirectory = function ontwdirectory(directory) {
        var store,
            reader,
            iterator;
     
        store = {};
        reader = directory.tree(5);
        reader.once('error', onerror);
       
        iterator = reader.iterate();
       
        iterator.on('node', onnode.bind(iterator, store));
        iterator.once('done', ondone.bind(iterator, store));
    };
     
    onnode = function onnode(store, node) {
        var statEmitter,
            ondone;
       
        statEmitter = node.stat();
       
        ondone = onstats.bind(this, store, node.path);
       
        statEmitter.once('done', ondone);
        statEmitter.once('error', onerror);
    };
     
    onstats = function onstats(store, path, stats) {
        store[path] = stats;
       
        this.next();
    };
     
    ondone = function ondone(store) {
        console.log('done', store);
    };
     
    onerror = console.log.bind(console, 'error');
     
    treeWalker = new TreeWalker(resolve('../test'));
     
    treeWalker.once('directory', ontwdirectory);
    treeWalker.once('error', onerror);

