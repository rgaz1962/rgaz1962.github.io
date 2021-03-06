/**
 * @class Ext.form.TextArea
 * @extends Ext.form.Text
 * <p>Wraps a textarea. See {@link Ext.form.FormPanel FormPanel} for example usage.</p>
 * @xtype textareafield
 */
Ext.form.TextArea = Ext.extend(Ext.form.Text, {
    ui: 'textarea',

    /**
     * @cfg {Integer} maxRows The maximum number of lines made visible by the input. 
     */
    maxRows: undefined,
    
    autoCapitalize: false,

    renderTpl: [
        '<tpl if="label"><div class="x-form-label"><span>{label}</span></div></tpl>',
        '<tpl if="fieldEl"><div class="x-form-field-container">',
            '<textarea id="{inputId}" type="{type}" name="{name}" class="{fieldCls}"',
            '<tpl if="tabIndex">tabIndex="{tabIndex}" </tpl>',
            '<tpl if="placeHolder">placeholder="{placeHolder}" </tpl>',
            '<tpl if="style">style="{style}" </tpl>',
            '<tpl if="maxRows != undefined">rows="{maxRows}" </tpl>',
            '<tpl if="maxlength">maxlength="{maxlength}" </tpl>',
            '<tpl if="autoComplete">autocomplete="{autoComplete}" </tpl>',
            '<tpl if="autoCapitalize">autocapitalize="{autoCapitalize}" </tpl>',
            '<tpl if="autoFocus">autofocus="{autoFocus}" </tpl>',
            '></textarea>',
            '<tpl if="useMask"><div class="x-field-mask"></div></tpl>',
        '</div></tpl>'
    ],
    
    // @private
    onRender: function() {
        this.renderData.maxRows = this.maxRows;
        
        Ext.form.TextArea.superclass.onRender.apply(this, arguments);
    },

    onKeyUp: function(e) {
        this.fireEvent('keyup', this, e);
    }
});

Ext.reg('textareafield', Ext.form.TextArea);

//<deprecated since=0.99>
//DEPRECATED - remove this in 1.0. See RC1 Release Notes for details
Ext.reg('textarea', Ext.form.TextArea);
//</deprecated>
