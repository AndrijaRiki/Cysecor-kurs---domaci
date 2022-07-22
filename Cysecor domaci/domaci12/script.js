const chart = document.querySelector('#chart');
const labels = ['Data Scientist', 'Machine Learning Scientist', 'Big Data Engineer', 'Product Data Analyst', 'Machine Learning Engineer', 'Data Analyst', 'Business Data Analyst'];
const data = [70000, 260000, 85000, 20000, 150000, 72000, 135000];

new Chart(chart, {
    type: 'polarArea',
    data: {
        labels: labels,
        datasets: [
            {
                label: "Businesses",
                data: data,
                backgroundColor: [
                    '#00204a',
                    '#005792',
                    '#00bbf0',
                    '#fdb44b',
                    '#5dacbd',
                    '#a7bcb9',
                    '#e0ebeb'
                ],
            }
        ]
    }
});