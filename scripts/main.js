import { dataSeries } from './data.js';
var seriesTbody = document.getElementById('series');
var btnfilterByName = document.getElementById("button-filterByName");
var inputSearchBox = document.getElementById("search-box");
var totalSeasonsElm = document.getElementById("av-seasons");
var seriesDetailCard = document.getElementById('series-detail');
var cardTitle = document.getElementById('card-title');
var cardChannel = document.getElementById('card-channel');
var cardDescription = document.getElementById('card-description');
var cardLink = document.getElementById('card-link');
var cardImage = document.createElement('img');
cardImage.className = 'card-img-top';
seriesDetailCard.insertBefore(cardImage, seriesDetailCard.firstChild);
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderSeriesInTable(dataSeries);
totalSeasonsElm.innerHTML = "".concat(getAverageSeasons(dataSeries));
function renderSeriesInTable(series) {
    console.log('Desplegando series');
    series.forEach(function (serie) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td><strong>".concat(serie.id, "</strong></td>\n                           <td><a href=\"#\" class=\"series-link\">").concat(serie.nombre, "</a></td>\n                           <td>").concat(serie.canal, "</td>\n                           <td>").concat(serie.temporadas, "</td>");
        trElement.querySelector('.series-link').addEventListener('click', function () {
            showSeriesDetail(serie);
        });
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
function showSeriesDetail(serie) {
    cardTitle.textContent = serie.nombre;
    cardChannel.textContent = serie.canal;
    cardDescription.textContent = serie.descripcion;
    cardLink.href = serie.link;
    cardLink.textContent = "Ver más";
    cardImage.src = serie.imagen;
    seriesDetailCard.style.display = "block";
}
