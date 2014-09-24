/*global define*/
define([
    "common-objects/utils/date",
    "common-objects/views/components/modal",
    "common-objects/views/attributes/template_new_attributes",
    "common-objects/views/file/file_list",
    "text!templates/template_new.html"
], function (date, ModalView, TemplateNewAttributesView, FileListView, template) {
    var TemplateEditView = ModalView.extend({

        template: template,

        initialize: function () {
            ModalView.prototype.initialize.apply(this, arguments);
            // destroy previous template edit view if any
            if (TemplateEditView._instance) {
                TemplateEditView._oldInstance = TemplateEditView._instance;
            }
            // keep track of the created template edit view
            TemplateEditView._instance = this;
        },

        rendered: function () {
            this.attributesView = this.addSubView(
                new TemplateNewAttributesView({
                    el: "#tab-attributes-" + this.cid,
                    attributesLocked: this.model.isAttributesLocked()
                })
            );
            this.attributesView.render();
            this.attributesView.collection.reset(this.model.get("attributeTemplates"));

            this.fileListView = new FileListView({
                deleteBaseUrl: this.model.url(),
                uploadBaseUrl: this.model.getUploadBaseUrl(),
                collection: this.model.get("attachedFiles"),
                editMode: true
            }).render();

            /* Add the fileListView to the tab */
            $("#tab-files-" + this.cid).append(this.fileListView.el);

            this.$("a#mask-help").popover({
                title: App.config.i18n.MASK,
                placement: "left",
                html: true,
                content: App.config.i18n.MASK_HELP
            });

        },

        primaryAction: function () {
            this.model.unset("reference");
            this.model.save({
                documentType: $("#form-" + this.cid + " .type").val(),
                mask: $("#form-" + this.cid + " .mask").val(),
                idGenerated: $("#form-" + this.cid + " .id-generated").is(':checked'),
                attributeTemplates: this.attributesView.collection.toJSON(),
                attributesLocked: this.attributesView.isAttributesLocked()
            }, {
                success: this.success,
                error: this.error
            });

            /*
             *saving new files : nothing to do : it's already saved
             *deleting unwanted files
             */
            this.fileListView.deleteFilesToDelete();

            return false;
        },

        cancelAction: function () {
            this.fileListView.deleteNewFiles();
        },

        success: function (model, response) {
            this.hide();
        },

        error: function (model, error) {
            this.collection.remove(model);
            if (error.responseText) {
                this.alert({
                    type: "error",
                    message: error.responseText
                });
            } else {
                console.error(error);
            }
        }
    });
    return TemplateEditView;
});
