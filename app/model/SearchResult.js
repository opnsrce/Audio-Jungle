Ext.regModel('SearchResult', {
    fields:[{
        name: 'preview_url',
        type: 'string',
        mapping: 'item_info.preview_url'
    },{
        name: 'sales',
        type: 'integer',
        mapping: 'item_info.sales'
    },{
        name: 'user',
        type: 'string',
        mapping: 'item_info.user'
    },{
        name: 'cost',
        type: 'float',
        mapping: 'item_info.cost'
    },{
        name: 'url',
        type: 'string',
        mapping: 'item_info.url'
    },{
        name: 'uploaded_on',
        type: 'date',
        dateFormat: 'r',
        mapping: 'item_info.uploaded_on'
    },{
        name: 'rating',
        type: 'integer',
        mapping: 'item_info.integer'
    },{
        name: 'tags',
        type: 'string',
        mapping: 'item_info.tags'
    },{
        name: 'thumbnail',
        type: 'string',
        mapping: 'item_info.thumbnail'
    },{
        name: 'id',
        type: 'integer',
        mapping: 'item_info.id'
    },{
        name: 'item',
        type: 'string',
        mapping: 'item_info.item'
    },{
        name: 'preview_type',
        type: 'string',
        mapping: 'item_info.preview_type'
    },{
        name: 'length',
        type: 'string',
        mapping: 'item_info.length'
    }]
});