import '../../styles/verticalTimeline.scss';

const VerticalTimeline = ({ children }) => {
    return (
        <div className="vertical_timeline_container">
            {children}
        </div>
    )
}

const VerticalTimelineElement = ({ item }) => {
    return (
        <div className="vertical_timeline_ele_container">
            <div className="vertical_timeline_ele_wrapper">
                <div className="vertical_timeline_ele_body">
                    <h2>{item.title}</h2>
                    <h3>Karachi, Pakistan</h3>
                    <ul>
                        {item.description.map((x, i) => {
                            return <li key={i}>{x}</li>
                        })}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export { VerticalTimeline, VerticalTimelineElement }