Ext.namespace('Envato.AudioJungle.Previewer');
var lastItemClicked = null; // Stores the last 'play' or 'pause' item clicked on
var timer = null;
var audioLoadMask = null;
Ext.onReady(function() {
    audioLoadMask = new Ext.LoadMask(Ext.getBody(), {
        msg: 'Loading audio...'
    })
})
Envato.AudioJungle.Previewer.audioPreview = new Ext.Audio({}); // Blank audio player used to preview the items
Envato.AudioJungle.Previewer.itemList = new Ext.List({ // The list of items
    store: new itemStoreFactory({
        site: 'audiojungle',
        set: 'new-files',
        params: 'music'
    },{
        idProperty: 'id',
        root: 'new-files'
    }),
    scroll: 'vertical',
    emptyText: 'No items found',
    loadingText: 'Loading Items',
    itemTpl: new Ext.XTemplate( // How we format the items when they come back
        '<tpl for=".">',
            '<div class = "audio_jungle_item">',
                '<img src = "{thumbnail}" class = \"thumbnail\">',
                '<span class = "item_title">{[fm.ellipsis(values.item, 20, false)]}</span>',
                '<span class = "item_author"> by {user}</span>',
                '<span class = \"item_price\">{sales} sales</span>',
                '<div class = "x-button play_pause_button">Play</div>',
            '</div>',
        '</tpl>'
    ),
    listeners: {
        itemtap: function(self, index, item, e) {
            var selectedItem = self.getRecord(item);
            var tapTarget = e.getTarget(); // Stores what we clicked on
            if(tapTarget.innerHTML == 'Play') { // We clicked on a 'Play button'
                if(lastItemClicked && lastItemClicked.innerHTML == 'Pause') { // Another item is currently playing
                    lastItemClicked.innerHTML = 'Play'; // Switch the button to 'Play'
                }
                lastItemClicked = tapTarget; // Store the currently clicked item as the last clicked item
                lastItemClicked.innerHTML = 'Pause'; // Set the button we clicked on to 'Pause'
                if(Envato.AudioJungle.Previewer.audioPreview.url) { // Check to see that the audio previewer is not empty
                    Envato.AudioJungle.Previewer.audioPreview.pause(); // Pause it
                }
                // Reset the audio previewer to play the item clicked
                Envato.AudioJungle.Previewer.audioPreview = new Ext.Audio({
                    id: 'audioPreview',
                    hidden: true,
                    url: selectedItem.get('preview_url'),
                    renderTo: Ext.getBody(),
                    listeners: {
                        canplay: {
                            element: 'media',
                            fn: function() {
                                audioLoadMask.hide();
                                Envato.AudioJungle.Previewer.audioPreview.play()
                            }
                        }
                    }
                });
                audioLoadMask.show();
                Envato.AudioJungle.Previewer.audioPreview.play();
            } else if (tapTarget.innerHTML == 'Pause') { // We clicked a pause button
                Envato.AudioJungle.Previewer.audioPreview.pause(); // Pause playback
                tapTarget.innerHTML = 'Play'; // Set the button to say 'Play'
            } else {
                Ext.Msg.confirm("Audio Jungle", "View this item at AudioJungle.net?", function(btn) {
                    if(btn == 'yes') {
                        location.href = selectedItem.get('url') + "?ref=opnsrce";
                    }
                });
            }
        }
    }
});
var lastSearchValue = '';
function loadSearchResults() {
    if(Envato.AudioJungle.Previewer.itemList.getStore().storeId != 'searchStore') {
        Envato.AudioJungle.Previewer.itemList.bindStore(searchStore);
    }
    var searchField = Ext.getCmp('EnvatoSearchField');
    if(searchField.getValue() != lastSearchValue) {
        lastSearchValue = searchField.getValue();
        Envato.AudioJungle.Previewer.itemList.getStore().load({
            params: {
                site: 'audiojungle',
                set: 'search',
                params: ',' + Ext.getCmp('EnvatoSearchField').getValue().replace(" ", "|or|")
            }
        });
    }
}
Envato.AudioJungle.Previewer.optionToolbar = [{
    dock: 'top',
    xtype: 'toolbar',
    title: 'AudioJungle',
    items: [{
        xtype: 'spacer'
    },{
        xtype: 'button',
        text: 'Recent Items'
    }]
},{
    xtype: 'searchfield',
    id: 'EnvatoSearchField',
    dock: 'top',
    listeners: {
        keyup: function(self, e) {
            clearTimeout(timer);
            if(self.getValue() == '') {
                Envato.AudioJungle.Previewer.itemList.bindStore(
                    new itemStoreFactory({
                        site: 'audiojungle',
                        set: 'new-files',
                        params: 'music'
                    },{
                        idProperty: 'id',
                        root: 'new-files'
                    }).load()
                );
            } else {
                timer = setTimeout("loadSearchResults()", 1000);
            }
        }
    }
}];