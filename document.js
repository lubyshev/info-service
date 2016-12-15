var App = {

    gifAjaxLoading: '<img src="http://www.dmer.org/minoritydmer/images/ajax-loader_thumb.gif" />',

    getEmulatedResponse : function() {
        response = {};
        if( $("#rbtn-success").prop( "checked" )) {
            response.success = true;
            response.html =
                '<h3>Транзакция завершена</h3>' +
                '<p>Пройдите к ближайшему пункту выдачи товаров</p>';
        } else {
            response.success = false;
            response.html =
                '<h3>Сервер не смог обработать транзакцию</h3>' +
                '<p>Обратитесь к администратору зала</p>';
        }
        return response;
    },

    insertModalContent : function( html, success ) {
        $("#modal-request .modal-dialog .modal-content .modal-body").html( html );
        if( typeof success !== 'undefined' ) {
            if( success ) {
                $("#modal-request .modal-dialog .modal-content .modal-body")
                    .addClass('bg-success')
                    .removeClass('bg-danger');
            } else {
                $("#modal-request .modal-dialog .modal-content .modal-body")
                    .addClass('bg-danger')
                    .removeClass('bg-success');
            }
        }
    },

    parseResponse: function( data ) {
        App.insertModalContent( data.html, data.success );
    },

    request: function( url ) {
        $("#modal-request .modal-dialog .modal-content .modal-body")
            .removeClass('bg-success')
            .removeClass('bg-danger');
        if( $("#chb-emulate").prop( "checked" )) {
            setTimeout( App.parseResponse, 2000, App.getEmulatedResponse());
        } else {
            $.ajax( {
                url: url,
                method: 'GET'
            } )
                .done( function( response ) {
                    App.parseResponse( {
                        success: true,
                        html: response
                    } );
                })
                .fail(function() {
                    App.parseResponse({
                        success: false,
                        html:
                            '<h3>Произошла непредвиденная ошибка</h3>' +
                            '<p>Обратитесь к администратору зала</p>'
                    });
                })
            ;
        }
    },

    showEmulateSection: function() {
        section = $('#section-emulate');
        if( $("#chb-emulate").prop( "checked" )) {
            section.removeClass('hidden');
        } else {
            section.addClass('hidden');
        }
    }

};

$( function(){

    App.showEmulateSection();

    $("#chb-emulate").change( function(){ App.showEmulateSection(); });

    $('#btn-start').click( function() {
        App.insertModalContent( '<div class="text-center">' + App.gifAjaxLoading + '</div>');
        $('#modal-request').modal('show');
        App.request( $('#url').val() );
    });

});