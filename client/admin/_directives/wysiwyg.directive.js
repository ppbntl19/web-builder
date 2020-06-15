(function () {
    'use strict';

    angular
        .module('app')
        .directive('wysiwyg', Directive);

    function Directive($rootScope) {
        return {
            require: 'ngModel',
            link: function (scope, element, attr, ngModel) {
                var editorOptions;
                if (attr.wysiwyg === 'minimal') {
                    // minimal editor
                    editorOptions = {
                        height: 100,
                        toolbar: [
                            { name: 'basic', items: ['Bold', 'Italic', 'Underline'] },
                            { name: 'links', items: ['Link', 'Unlink'] },
                            { name: 'tools', items: ['Maximize'] },
                            { name: 'document', items: ['Source'] },
                        ],
                        removePlugins: 'elementspath',
                        resize_enabled: false,
                        allowedContent: true,
                        extraAllowedContent : true
                    };
                } else {
                    // regular editor
                    editorOptions = {
                        filebrowserImageUploadUrl: '/uploader/upload.php',
                        removeButtons: 'About,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Save,CreateDiv,Language,BidiLtr,BidiRtl,Flash,Iframe,addFile,Styles',
                        allowedContent: true,
                        extraAllowedContent : true
                    };
                }
                editorOptions.entities = false;
                editorOptions.entities_greek = false;
                editorOptions.basicEntities = false;
                editorOptions.removePlugins = 'htmldataprocessor';

                // enable ckeditor
                var ckeditor = element.ckeditor(editorOptions);
                var cloudName = 'db0gq7w3r';

                var unsignedUploadPreset = 'sg9szjpu';
                // Change request to upload to Cloudinary server 
                ckeditor.editor.on('fileUploadRequest', function (evt) {
                    // Prepare request to Cloudinary
                    var url = 'https://api.cloudinary.com/v1_1/' + cloudName + '/upload';
                    var xhr = evt.data.fileLoader.xhr;
                    xhr.open('POST', url, true);
                    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');

                    // Fill all necessary fields for Cloudinary
                    var fd = new FormData();
                    fd.append('upload_preset', unsignedUploadPreset);
                    fd.append('folder', location.hostname + '/content/articles'); // Optional - place image at specific folder admin in Cloudinary
                    fd.append('tags', 'browser_upload'); // Optional - add tag for image admin in Cloudinary
                    fd.append('file', evt.data.fileLoader.file);

                    // Send the request to Cloudinary server
                    xhr.send(fd);

                    // Prevented the default behavior.
                    evt.stop();
                });

                // Change response to handle Cloudinary response
                ckeditor.editor.on('fileUploadResponse', function (evt) {
                    // Prevent the default response handler.
                    evt.stop();

                    // Get XHR and response.
                    var data = evt.data,
                        xhr = data.fileLoader.xhr,
                        response = JSON.parse(xhr.responseText);

                    // Transfer the response to Ckeditor format
                    data.uploaded = 1;
                    data.fileName = response.public_id + '.' + response.format;
                    data.url = response.secure_url;
                });

                // update ngModel on change
                ckeditor.editor.on('change', function () {
                    ngModel.$setViewValue(this.getData());
                });
            }
        };
    }
})();