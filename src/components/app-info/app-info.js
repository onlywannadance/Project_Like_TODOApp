import './app-info.css';

const AppInfo = (props) => {

    const {employeesCount, employeesIncreaseCount} = props;

    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании </h1>
            <h2>Общее число сотрудников:  {employeesCount}</h2>
            <h2>Премию получат: {employeesIncreaseCount}</h2>
        </div>                                                                                        
    );
}

export default AppInfo;