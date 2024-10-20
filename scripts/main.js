import { dataSeries } from './data.js';
var seriesTbody = document.getElementById('series');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalSeasonsElm = document.getElementById("av-seasons");
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(dataSeries);
totalSeasonsElm.innerHTML = "".concat(getAverageSeasons(dataSeries));
function renderSeriesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td><strong>".concat(serie.id, "</strong></td>\n                           <td><a href=\"").concat(serie.link, "\" target=\"_blank\">").concat(serie.nombre, "</a></td>\n                           <td>").concat(serie.canal, "</td>\n                           <td>").concat(serie.temporadas, "</td>");
        seriesTbody.appendChild(trElement);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearSeriesInTable();
    var seriesFiltered = searchSeriesByName(text, dataSeries);
    renderSeriesInTable(seriesFiltered);
}
function searchSeriesByName(nameKey, series) {
    return nameKey === '' ? dataSeries : series.filter(function (s) { return s.nombre.match(nameKey); });
}
function getAverageSeasons(series) {
    var totalSeasons = 0;
    series.forEach(function (serie) { return totalSeasons += serie.temporadas; });
    return totalSeasons / series.length;
}
function clearSeriesInTable() {
    while (seriesTbody.hasChildNodes()) {
        if (seriesTbody.firstChild != null) {
            seriesTbody.removeChild(seriesTbody.firstChild);
        }
    }
}
