// ==UserScript==
// @name         Nonogram solver
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.nonograms.ru/nonograms/i/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=nonograms.ru
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const box = document.querySelector('#nmti');
  const solveButton = box.appendChild(document.createElement('button'));
  solveButton.textContent = "Решить";
  solveButton.onclick = solve;

  box.appendChild(document.createElement('br'));

  const solveSteps = box.appendChild(document.createElement('button'));
  solveSteps.textContent = "Решить шагов:";
  solveSteps.onclick = () => solve(+document.querySelector('#stepsCountInput').value);

  box.appendChild(document.createElement('br'));

  const stepsNum = box.appendChild(document.createElement('input'));
  stepsNum.onchange = e => solve(+e.target.value);
  stepsNum.id = "stepsCountInput";
  stepsNum.type = 'number';
  stepsNum.min = 1;
  stepsNum.value = 1;
  stepsNum.max = 100;
  stepsNum.style = "width: 50px";
})();

function solve(steps = 0) {
  const rows = [];
  document.querySelectorAll('#nonogram_table .nmtl tr').forEach(e => {
    const quantifiers = [];
    e.childNodes.forEach(num => {
      if (num.classList.contains('num_empty')) return;
      quantifiers.push(+num.textContent);
    });
    rows.push({ quantifiers });
  });
  const cols = new Array(document.querySelector('#nonogram_table .nmtt tr ').childElementCount).fill(null).map(e => Object({ quantifiers: [] }));
  document.querySelectorAll('#nonogram_table .nmtt tr').forEach(e => {
    e.childNodes.forEach((num, i) => {
      if (num.classList.contains('num_empty')) return;
      cols[i].quantifiers.push(+num.textContent);
    });
  });
  fetch(`http://localhost:3001/api/nonogram/solve/json?steps=${steps}`, {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    body: JSON.stringify({ cols, rows })
  }).then(
    response => {
      response.json().then(
        json_response => {
          console.log(json_response);
          for (let rowN = 0; rowN < json_response.rows.length; rowN++) {
            for (let colN = 0; colN < json_response.cols.length; colN++) {
              const state = json_response.rows[rowN].tiles[colN].state;
              const btn = document.querySelector(`#nmf${colN}_${rowN}`);
              if (state == 'empty') {
                if (btn.style.backgroundColor == "") {
                  window.fc2({ button: 1 }, colN, rowN);
                }
                window.fc2({ button: 1 }, colN, rowN);
              } else if (state == 'painted' && btn.style.backgroundColor == "") {
                window.fc2({ button: 1 }, colN, rowN);
              } else if (state == 'flagged' && btn.style.backgroundImage == "") {
                window.fc2({ button: 2 }, colN, rowN);
              }
            }
          }
        }
      );
    }
  );
}