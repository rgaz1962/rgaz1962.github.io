Ext.setup({
    icon: 'icon.png',
    glossOnIcon: false,
    tabletStartupScreen: 'tablet_startup.png',
    phoneStartupScreen: 'phone_startup.png',
    onReady: function() {
        new Ext.TabPanel({
            fullscreen: true,
            type: 'dark',
            items: [{
                title: 'Tab 1',
                html: '<p>This is a place for HTML</p> <p>feel free to add your content</p>',
                cls: 'card1'
            }]
        });
    }
});
