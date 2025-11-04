import axios from "axios";
import { useEffect, useState } from "react";
import { api } from "../../Api/api";
import Loading from "../../components/Loading";

interface Snippet {
    createdAt: string;
}

interface DayBox {
    date: string;
    count: number;
    dayOfWeek: number;
}

const PracticeGraph = () => {
    const [graphData, setGraphData] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("TOKEN");

    const visibleDays = 120; // sliding window
    const daysInWeek = 7;

    useEffect(() => {
        const fetchGraph = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${api}/api/snippet/get/snippet`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                const snippets: Snippet[] = res.data?.getSnippet || [];
                const dateMap: Record<string, number> = {};

                snippets.forEach((item) => {
                    const date = new Date(item.createdAt).toISOString().split("T")[0];
                    dateMap[date] = (dateMap[date] || 0) + 1;
                });

                setGraphData(dateMap);
            } catch (err) {
                console.error(err);
                setError("Error fetching graph data");
            } finally {
                setLoading(false);
            }
        };

        fetchGraph();
    }, [token]);

    if (loading) return <Loading />;
    if (error) return <p>{error}</p>;

    // Generate all days from oldest to newest
    const today = new Date();
    const allDays: DayBox[] = [];
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - visibleDays + 1);

    for (let d = new Date(startDate); d <= today; d.setDate(d.getDate() + 1)) {
        const key = d.toISOString().split("T")[0];
        allDays.push({
            date: key,
            count: graphData[key] || 0,
            dayOfWeek: d.getDay(),
        });
    }

    // Arrange days into weeks (columns)
    const weeks: DayBox[][] = [];
    let week: DayBox[] = [];
    allDays.forEach((day) => {
        week.push(day);
        if (week.length === daysInWeek) {
            weeks.push(week);
            week = [];
        }
    });
    if (week.length) weeks.push(week);

    // Color intensity
    const getColor = (count: number) => {
        if (count === 0) return "#ebedf0";
        if (count === 1) return "#c6e48b";
        if (count === 2) return "#7bc96f";
        if (count === 3) return "#239a3b";
        return "#196127";
    };

    return (
        <div className="practice-graph-container">
            <h3 className="graph-title">Your Practice Activity</h3>
            <div className="graph-wrapper">
                {weeks.map((week, wIdx) => (
                    <div key={wIdx} className="week-column">
                        {week.map((day, dIdx) => (
                            <div
                                key={dIdx}
                                className="graph-square"
                                style={{ backgroundColor: getColor(day.count) }}
                                title={`${day.date} — ${day.count} solved`}
                            />
                        ))}
                    </div>
                ))}
            </div>
            <p className="graph-note">Last {visibleDays} days (sliding window)</p>
        </div>
    );
};

export default PracticeGraph;
