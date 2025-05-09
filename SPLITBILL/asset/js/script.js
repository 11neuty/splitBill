// Fungsi untuk menampilkan form kedua
function showForm2(event) {
    event.preventDefault(); // Mencegah form pertama dari pengiriman

    // Sembunyikan form pertama dan tampilkan form kedua
    document.getElementById('form1').style.display = 'none';
    document.getElementById('form2').style.display = 'block';

    // Ambil jumlah orang dari input dan buat input untuk setiap orang
    const personCount = document.getElementById('person').value;
    const personInputs = document.getElementById('person-inputs');
    personInputs.innerHTML = ''; // Kosongkan input sebelumnya

    for (let i = 1; i <= personCount; i++) {
        personInputs.innerHTML += `
            <div>
                <label for="person-${i}">Nama Orang ${i}</label>
                <input type="text" id="person-${i}" placeholder="Nama Orang ${i}" required>
                <label for="price-${i}">Harga Makanan Orang ${i}</label>
                <input type="number" id="price-${i}" placeholder="Harga Makanan Orang ${i}" required>
            </div>
        `;
    }
}

// Fungsi untuk menampilkan form ketiga
function showForm3(event) {
    event.preventDefault(); // Mencegah form kedua dari pengiriman

    // Sembunyikan form kedua dan tampilkan form ketiga
    document.getElementById('form2').style.display = 'none';
    document.getElementById('form3').style.display = 'block';
}

// Fungsi untuk menghitung total
function calculateTotal(event) {
    event.preventDefault(); // Mencegah form ketiga dari pengiriman
    const tax = parseFloat(document.getElementById('tax').value);
    const discount = parseFloat(document.getElementById('discount').value);
    const personCount = parseInt(document.getElementById('person').value);
    const paymentDetails = document.getElementById('payment-details');
    paymentDetails.innerHTML = ''; // Kosongkan hasil sebelumnya

    const personPrices = [];

    const menuName = document.getElementById('menu-name').value;

    // Ambil harga makanan dari input
    for (let i = 1; i <= personCount; i++) {
        const price = parseFloat(document.getElementById(`price-${i}`).value);
        personPrices.push(price); // Simpan harga ke array
    }

    // Hitung total biaya
    const totalPrice = personPrices.reduce((acc, curr) => acc + curr, 0);
    const totalWithTax = totalPrice + tax;
    const finalTotal = totalWithTax - discount;

    // Hitung bagian pajak dan diskon per orang berdasarkan proporsi harga makanan mereka
    const taxPerPerson = (tax / totalPrice);
    const discountPerPerson = (discount / totalPrice);

    // Fungsi untuk membulatkan ke kelipatan 100
    function roundToNearest100(num) {
        return Math.round(num / 100) * 100;
    }

    // Tampilkan hasil dalam tabel
    let tableHTML = `
        <h2>Detail : <em>${menuName}</em></h2>
        <table>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Harga Makanan</th>
                    <th>Total Bayar</th>
                </tr>
            </thead>
            <tbody>
    `;

    for (let i = 1; i <= personCount; i++) {
        const personName = document.getElementById(`person-${i}`).value;
        const personPrice = personPrices[i - 1];
        const personTotal = personPrice + (personPrice * taxPerPerson) - (personPrice * discountPerPerson);
        const roundedTotal = roundToNearest100(personTotal);
        tableHTML += `
            <tr>
                <td>${personName}</td>
                <td>Rp ${personPrice.toFixed(2)}</td>
                <td>Rp ${roundedTotal.toFixed(2)}</td>
            </tr>
        `;
    }

    tableHTML += `
            </tbody>
        </table>
    `;

    paymentDetails.innerHTML = tableHTML;
}