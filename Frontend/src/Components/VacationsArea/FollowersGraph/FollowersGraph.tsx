import { useEffect, useState } from "react";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import vacationsService from "../../../Services/VacationsService";
import notifyService from "../../../Services/NotifyService";
import VacationModel from "../../../Models/VacationModel";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

// Component for followers graph for admin:
export default function FollowersGraph() {

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            y: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            },
            x: {
                ticks: {
                    color: "white",
                    stepSize: 1,
                    beginAtZero: true
                }
            }
        }

    };

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    // useEffect performing once - perform once when component is ready for use:
    useEffect(() => {
        vacationsService
            .getAllVacationsForAdmin()
            .then((vacations) => setVacations(vacations))
            .catch((err) => notifyService.error(err));
    }, []);

    const data = {
        labels: vacations.map(v => v.destination),
        datasets: [
            {
                data: vacations.map((v: VacationModel) => v.followersAmount),
                backgroundColor: "blue",
            },
        ]
    };

    return <Bar options={options} data={data} />;
}
