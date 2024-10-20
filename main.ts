import { Serie } from './serie.js';
import { dataSeries } from './data.js';

let seriesTbody: HTMLElement = document.getElementById('series')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement>document.getElementById("search-box")!;
const totalSeasonsElm: HTMLElement = document.getElementById("av-seasons")!;

btnfilterByName.onclick = () => applyFilterByName();

renderSeriesInTable(dataSeries);

totalSeasonsElm.innerHTML = `${getAverageSeasons(dataSeries)}`

function renderSeriesInTable(series: Serie[]): void {
  console.log('Desplegando series');
  series.forEach((serie) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td><strong>${serie.id}</strong></td>
                           <td><a href="${serie.link}" target="_blank">${serie.nombre}</a></td>
                           <td>${serie.canal}</td>
                           <td>${serie.temporadas}</td>`;
    seriesTbody.appendChild(trElement);
  });
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearSeriesInTable();
  let seriesFiltered: Serie[] = searchSeriesByName(text, dataSeries);
  renderSeriesInTable(seriesFiltered);
}

function searchSeriesByName(nameKey: string, series: Serie[]): Serie[] {
  return nameKey === '' ? dataSeries : series.filter(s => s.nombre.match(nameKey));
}

function getAverageSeasons(series: Serie[]): number {
    let totalSeasons: number = 0;
    series.forEach((serie) => totalSeasons += serie.temporadas);
    
    return totalSeasons / series.length;
}  

function clearSeriesInTable() {
  while (seriesTbody.hasChildNodes()) {
    if (seriesTbody.firstChild != null) {
      seriesTbody.removeChild(seriesTbody.firstChild);
    }
  }
}