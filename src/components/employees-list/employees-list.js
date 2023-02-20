import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css';

const EmployeesList = ({data, onDelete, onToggleProp}) => {                                           

    //  data = [
    //     {name: 'kirill', salary: 32323},        // item 1
    //     {},        // item 2
    //     {}         // item 3
    // ]

    const elements  = data.map(item => {                
        const {id, ...itemProps} = item;                      // в  переменную elem приходит массив объектов Data, перебираем map, где каждый элемент массива будет обозначен как item
        return (
            <EmployeesListItem 
                key = {id}{...itemProps}                      // В элементc будет лежать массив с компонентами 1 EmployersList, 2, 3... {...item} - object spread оператор разворачивает item на строку вида name={item.name} salary={item.salary} {...item}
                onDelete = {() => onDelete(id)}
                onToggleProp = {(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
                />      
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}                                                       
        </ul>
    )
}
export default EmployeesList;  
    