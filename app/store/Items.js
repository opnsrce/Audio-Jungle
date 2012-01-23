function itemStoreBuilder(extraParams, readerConfig) {
    return new Ext.data.JsonStore({
        url: 'php/envato.php',
        model: 'Item',
        proxy: {
            type: 'ajax',
            url: 'php/scripts/envato.php',
            extraParams: extraParams || {},
            reader: {
                type: readerConfig.type || 'json',
                idProperty: readerConfig.idProperty || 'id',
                root: readerConfig.root || 'root'
                }
        }
    });
}