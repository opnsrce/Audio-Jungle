new Ext.Application({
    name: 'AudioJungle',
    defaultUrl: '',
    profiles: {
        phone: function() {
            return Ext.is.Phone;
        },
        tabletPortrait: function() {
            return Ext.is.Tablet && Ext.orientation == 'portrait';
        },
        tabletLandscape: function() {
            return Ext.is.Tablet && Ext.orientation == 'landscape';
        }
    }
})