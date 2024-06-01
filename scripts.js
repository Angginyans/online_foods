document.addEventListener('DOMContentLoaded', function() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            createCharts(data);
            populateDataTable(data);
            applyFilters(data);
        });

    function createCharts(data) {
        const ctxBar1 = document.getElementById('barChart1').getContext('2d');
        const ctxBar2 = document.getElementById('barChart2').getContext('2d');
        const ctxLine = document.getElementById('lineChart').getContext('2d');
        const ctxPie = document.getElementById('pieChart').getContext('2d');

        // Bar chart 1 - Age group dan occupation
        new Chart(ctxBar1, {
            type: 'bar',
            data: {
                labels: ['Student', 'Employee', 'Self Employed', 'Housewife'],
                datasets: [
                    { label: '22-25', data: [166, 43, 22, 1], backgroundColor: 'black' },
                    { label: '26-29', data: [6, 54, 25, 0], backgroundColor: 'red' },
                    { label: '18-21', data: [35, 2, 0, 0], backgroundColor: 'orange' },
                    { label: '30-33', data: [0, 19, 7, 8], backgroundColor: 'brown' }
                ]
            }
        });

        // Bar chart 2 - Gender dan hasil
        new Chart(ctxBar2, {
            type: 'bar',
            data: {
                labels: ['Male', 'Female'],
                datasets: [
                    { label: 'true', data: [175, 126], backgroundColor: 'black' },
                    { label: 'false', data: [47, 40], backgroundColor: 'orange' }
                ]
            }
        });

        // Line chart - Age group dan hasil
        new Chart(ctxLine, {
            type: 'line',
            data: {
                labels: ['22-25', '26-29', '18-21', '30-33'],
                datasets: [
                    { label: 'true', data: [203, 44, 30, 24], borderColor: 'black', fill: false },
                    { label: 'false', data: [29, 41, 7, 10], borderColor: 'orange', fill: false }
                ]
            }
        });

        // Pie chart - Feedback
        new Chart(ctxPie, {
            type: 'pie',
            data: {
                labels: ['Positive', 'Negative'],
                datasets: [{
                    data: [317 , 71],
                    backgroundColor: ['black', 'orange']
                }]
            }
        });
    }

    function populateDataTable(data) {
        $('#dataTable').DataTable({
            data: data,
            columns: [
                { data: 'Age_Group' },
                { data: 'Gender' },
                { data: 'Occupation' },
                { data: 'Monthly Income' },
                { data: 'Feedback' },
                { data: 'Hasil' }
            ]
        });
    }

    function applyFilters(data) {
        const filterHasil = document.getElementById('filterHasil');
        const filterGender = document.getElementById('filterGender');

        filterHasil.addEventListener('change', () => filterData(data));
        filterGender.addEventListener('change', () => filterData(data));
    }

    function filterData(data) {
        const filterHasil = document.getElementById('filterHasil').value;
        const filterGender = document.getElementById('filterGender').value;

        let filteredData = data;
        if (filterHasil !== 'all') {
            filteredData = filteredData.filter(item => item.Hasil === filterHasil);
        }
        if (filterGender !== 'all') {
            filteredData = filteredData.filter(item => item.Gender.toLowerCase() === filterGender);
        }

        $('#dataTable').DataTable().clear().rows.add(filteredData).draw();
    }
});
