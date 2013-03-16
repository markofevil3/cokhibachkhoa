if (document.getElementById('addMoreSpace')) {
  Button.enable(document.getElementById('addMoreSpace'), addMoreSpace);
}

// var leftPanel = document.getElementById('left-panel');
// var rightPanel = document.getElementById('right-panel');
// console.log(leftPanel.style.height, rightPanel.style.height);
// leftPanel.style.height = rightPanel.style.height;
// 
function addMoreSpace(parent) {
 var table = document.getElementById('productDetail-table');
 var rowCount = table.rows.length;
 // console.log(table.rows.length);
 var row = table.insertRow(rowCount - 1);
 var cell = row.insertCell(0);
 var inputType = document.createElement("input");
 inputType.type = "text";
 inputType.name = 'attribute' + (rowCount - 1);
 inputType.className = 'input-box';
 cell.appendChild(inputType);
 cell = row.insertCell(1);
 var inputContent = document.createElement("textarea");
 inputContent.name = 'value' + (rowCount - 1);
 inputContent.className = 'input-textarea';
 cell.appendChild(inputContent);
}