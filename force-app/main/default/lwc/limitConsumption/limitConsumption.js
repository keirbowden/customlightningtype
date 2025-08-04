import { LightningElement, api } from 'lwc';
import ChartJs from '@salesforce/resourceUrl/ChartJS441UMD';
import { loadScript } from 'lightning/platformResourceLoader';

export default class LimitConsumption extends LightningElement {
    @api value;
    chart;
    snapshots;

    renderedCallback() {
        console.log('In rendered callback!');
        if (this.chart) {
            return; // Chart already initialized
        }
        loadScript(this, ChartJs)
            .then(() => {
                this.initializeChart();
            })
            .catch(error => {
                console.error('Error loading Chart.js:', error);
            });
    }

    initializeChart() {
        console.log('At 1');
        const ctx = this.refs.canvas.getContext('2d');
        console.log('At 2');
        console.log('Value = ' + JSON.stringify(this.value[0], null, 4));
        this.snapshots=this.value[0].snapshots;
        console.log('Snapshots = ' + JSON.stringify(this.snapshots, null, 4));
        let chartData=
            {
                labels: [],
                datasets: [
                    {
                        label: 'CPU',
                        data: [],
                        backgroundColor: 'rgba(75, 192, 192, 0.2)',
                        borderColor: 'rgba(75, 192, 192, 1)',
                        borderWidth: 1
                    }
                ]
            };

        for (let i=0; i<this.snapshots.length; i++) {
            chartData.labels.push(this.snapshots[i].name);
            chartData.datasets[0].data.push(this.snapshots[i].cpu);
        }

        this.chart = new Chart(ctx, {
            type: 'bar',
            data: chartData,
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
}        