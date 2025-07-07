function showForm2(event) {
  event.preventDefault();
  const personCount = parseInt(document.getElementById('person').value);
  document.getElementById('form1').style.display = 'none';
  const container = document.getElementById('person-inputs');
  container.innerHTML = '';
  for (let i = 1; i <= personCount; i++) {
    container.innerHTML += `
      <div class="person-block">
        <h3>Orang ${i}</h3>
        <label>Nama:</label>
        <input type="text" id="person-${i}" placeholder="Nama Orang ${i}" required>
        <label>Jumlah item makanan:</label>
        <input type="number" id="item-count-${i}" min="1" value="1" required>
        <button type="button" onclick="showItemDetails(${i})">Detail Item</button>
        <div id="items-${i}"></div>
      </div>`;
  }
  document.getElementById('form2').style.display = 'block';
}

function showItemDetails(idx) {
  const cnt = parseInt(document.getElementById(`item-count-${idx}`).value);
  const div = document.getElementById(`items-${idx}`);
  div.innerHTML = '';
  for (let j = 1; j <= cnt; j++) {
    div.innerHTML += `
      <div class="item-block">
        <label>Item ${j}:</label>
        <input type="text" id="item-name-${idx}-${j}" placeholder="Nama Item ${j}" required>
        <input type="number" id="item-price-${idx}-${j}" placeholder="Harga Item ${j}" required>
      </div>`;
  }
}

function showForm3(event) {
  event.preventDefault();
  document.getElementById('form2').style.display = 'none';
  document.getElementById('form3').style.display = 'block';
}

function calculateTotal(event) {
  event.preventDefault();
  const tax = parseFloat(document.getElementById('tax').value) || 0;
  const discount = parseFloat(document.getElementById('discount').value) || 0;
  const personCount = parseInt(document.getElementById('person').value);
  const menuName = document.getElementById('menu-name').value;
  const paymentDetails = document.getElementById('payment-details');
  
  let grandTotal = 0, people = [];
  for (let i = 1; i <= personCount; i++) {
    const name = document.getElementById(`person-${i}`).value;
    const cnt = parseInt(document.getElementById(`item-count-${i}`).value);
    let subtotal = 0;
    for (let j = 1; j <= cnt; j++) {
      subtotal += parseFloat(document.getElementById(`item-price-${i}-${j}`).value) || 0;
    }
    people.push({ name, subtotal });
    grandTotal += subtotal;
  }

  const taxRate = grandTotal ? tax / grandTotal : 0;
  const discRate = grandTotal ? discount / grandTotal : 0;
  const round100 = x => Math.round(x / 100) * 100;

  let html = `<h2>Detail: <em>${menuName}</em></h2><table>
    <thead><tr><th>Nama</th><th>Subtotal</th><th>Total Bayar</th></tr></thead><tbody>`;
  
  people.forEach(p => {
    const tot = p.subtotal * (1 + taxRate - discRate);
    html += `<tr>
      <td>${p.name}</td>
      <td>Rp ${p.subtotal.toFixed(2)}</td>
      <td>Rp ${round100(tot).toFixed(2)}</td>
    </tr>`;
  });

  html += `</tbody></table>`;
  paymentDetails.innerHTML = html;
}
