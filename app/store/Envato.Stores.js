
var searchStore = new Ext.data.JsonStore({
    url: 'php/envato.php',
    storeId: 'searchStore',
    model: 'SearchResult',
    proxy: {
        type: 'ajax',
        url: 'php/scripts/envato.php',
        reader: {
            type: 'json',
            idProperty: 'id',
            root: 'search'
        }
    }
});