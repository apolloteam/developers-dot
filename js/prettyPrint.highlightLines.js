!(function ($) {
    $.fn.highlightLines = function (options) {
        var settings = $.extend({
            className: 'highlight-line'
        }, options);
        return this.each(function () {
            // Busca todos los elementos "li" contenidos en el bloque.
            var $el = $(this),
                $elements = $el.find('li'),
                clsAttr = $el.attr('class') || '';
            if (!$elements.length) {
                $elements = $el;
            }
            // Busca la palabra highlight-line dentro del texto de l apropiedad "class"
            // y las posiciones de los corchetes (dentro de los cuales se encuentran 
            // enumeradas las líneas a resaltar.
            var key = 'highlight-line',
                numsConfig = clsAttr && (clsAttr.indexOf(key) > -1) ? clsAttr.substring(clsAttr.indexOf(key)) || '' : $el.data(key) || '',
                reNums = /(\[)?(\d+-\d+|\d+)(\])?/g,
                lines = [],
                num;
            while (num = reNums.exec(numsConfig)) {
                var reNum = /\d+/g,
                    lineAux = [],
                    pos = (num.length == 4) ? 2 : 1,
                    item;
                while (item = reNum.exec(num[pos])) {
                    var value = parseInt(item),
                        numAnt = (lineAux.length) ? lineAux[lineAux.length - 1] : value;
                    if (value != numAnt) {
                        for (var i = numAnt + 1; i <= value; i++) {
                            lineAux.push(i);
                        }

                    } else {
                        lineAux.push(value);
                    }
                }

                lines = lines.concat(lineAux);
            }

            for (var idx = 0, totalLines = lines.length; idx < totalLines; idx++) {
                var idxReal = lines[idx] - 1;
                // En cada ListItem que corresponda a una línea especificada, 
                // se aplica el estilo .resaltarLinea a todos los spans 
                // contenidos (excepto al primer span, que es utilizado como 
                // espaciador).
                $elements.eq(idxReal).find('span:not(.pln:first)').addClass(settings.className);
            }
        });
    };
}(jQuery, prettyPrint));