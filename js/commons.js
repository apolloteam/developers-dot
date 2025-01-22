var nada = !function ($) {
    $(function () {
        window.prettyPrint && prettyPrint();
        initZeroClipboard();
    });
}(window.jQuery);

//#region Methods

function initZeroClipboard() {

    // Source: http://zeroclipboard.org/
    var zeroClipboard = new ZeroClipboard($('.btn-clipboard'));
    var htmlBridge = $('#global-zeroclipboard-html-bridge');

    // Handlers for ZeroClipboard.
    zeroClipboard.on('ready', function (event) {
        htmlBridge
            .data('placement', 'top')
            .attr('title', 'Copy to clipboard')
            .tooltip();

        // Event Copy.
        zeroClipboard.on('copy', function (event) {
            var ret = [],
                $highlight = $(event.target).parent().nextAll('.highlight').first();

            // Se concatena el contenido de cada tag <li> para poder imprimirlo linea a linea.
            // Usando el método text de jQuery devolvía tod o en una unica línea.
            var $li = $highlight.find('li');
            if ($li.length) {
                $li.each(function (idx, item) {
                    ret.push($(item).text());
                });
            } else {
                ret.push($highlight.text());
            }

            event.clipboardData.setData("text/plain", ret.join('\n'));
        });

        // Event AfteCopy.
        zeroClipboard.on('aftercopy', function () {
            // Notify copy success and reset tooltip title.
            htmlBridge
                .attr('title', 'Copied!')
                .tooltip('fixTitle')
                .tooltip('show')
                .attr('title', 'Copy to clipboard')
                .tooltip('fixTitle');
        });
    });
}

//#endregion