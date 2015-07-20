Ext.regModel('Camping', {
    fields: ['campsiteName', 'locationState']
});

demos.ListStore = new Ext.data.Store({
    model: 'Camping',
    sorters: 'campsiteName',
    getGroupString : function(record) {
        return record.get('campsiteName')[0];
    },
    data: [
        {campsiteName: 'Bridge Bay', locationState: 'CA'},
        {campsiteName: 'Canyon', locationState: 'CO'},
        {campsiteName: 'Fishing Bridge', locationState: 'CO'},
        {campsiteName: 'Grant Village', locationState: 'ND'},
        {campsiteName: 'Lewis Lake', locationState: 'SD'},
        {campsiteName: 'Madison', locationState: 'WI'},
        {campsiteName: 'Mammoth', locationState: 'CA'},
        {campsiteName: 'Norris', locationState: 'MA'},
        {campsiteName: 'Pebble Creek', locationState: 'MA'},
        {campsiteName: 'Door County', locationState: 'MA'},
        {campsiteName: 'Slough Creek', locationState: 'MA'},
        {campsiteName: 'Tower', locationState: 'MA'},
        {campsiteName: 'Arches', locationState: 'MA'},
        {campsiteName: 'Canyon Lands', locationState: 'MA'},
        {campsiteName: 'Rushmore', locationState: 'MA'},
        ]
});

demos.List = new Ext.TabPanel ({
    items: [{
        title: 'Basic',
        layout: Ext.is.Phone ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        cls: 'demo-list',
        items: [{
            width: Ext.is.Phone ? undefined : 300,
            height: 500,
            xtype: 'list',
            store: demos.ListStore,
            itemTpl: '<div class="Camping"><strong>{campsiteName}</strong>, {locationState}</div>'
        }]
    }, {
        title: 'Grouped',
        layout: Ext.is.Phone ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        cls: 'demo-list',
        items: [{
            width: Ext.is.Phone ? undefined : 300,
            height: 500,
            xtype: 'list',
            store: demos.ListStore,
            itemTpl: '<div class="Camping"><strong>{campsiteName}</strong> {locationState}</div>',
            grouped: true,
            indexBar: true
        }]
    }, {
        title: 'Disclosure',
        layout: Ext.is.Phone ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        cls: 'demo-list',
        items: [{
            width: Ext.is.Phone ? undefined : 300,
            height: Ext.is.Phone ? undefined : 500,
            xtype: 'list',
            onItemDisclosure: function(record, btn, index) {
                Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('campsiteName'), Ext.emptyFn);
            },
            store: demos.ListStore, //getRange(0, 9),
            itemTpl: '<div class="Camping"><strong>{campsiteName}</strong> {locationState}</div>'
        }]
    }]
});