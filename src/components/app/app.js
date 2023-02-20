import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel  from '../search-panel/search-panel';
import AppFilter  from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';

import './app.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: "Kirill", salary: '800', increase: false, like: true, id: 1},                                // надо делать так чтобы реакт не менял айтемы по индексам, то есть новый айтем должен добавляться исключительно в конец массива, дабы избежать перерисовок 
                {name: "Artem", salary: '3000', increase: true, like: true, id: 2},
                {name: "Ivan", salary: '232323', increase: false, like: true, id: 3}
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    } 

    deleteItem = (id) => {                                                                              // иммутабельность = неизменяемость стейта, чтобы изменить стейт, надо создать копию его элемента и изменять её
        this.setState(({data}) => {

            // 1 Вариант - Нуб идет напролом!
            // const index = data.findIndex(elem => elem.id === id);                       
            
            // const before = data.slice(0, index);                                                    // берем первый кусок, где находятся элементы до выбранного индекса
            // const after = data.slice (index + 1);                                                   // берем второй кусок, где находятся элементы после выбранного индекса

            // const newArr = [...before, ...after];                                               // складываем кусочки

            // 2 Вариант - Профи берут метод filter!
            return {data:data.filter(item => item.id !== id)}
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary, 
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {data: newArr};
        })
    }

    // onToggleIncrease = (id) => {

    //     // 1 Вариант - простой       

    //     // this.setState(({data}) => {
    //     //     const index = data.findIndex(elem => elem.id === id);

    //     //     const old = data[index];
    //     //     const newItem = {                                    // новый объект
    //     //         ...old, increase: !old.increase
    //     //     }; 

    //     //     const newArr = [...data.slice(0, index), newItem, ...data.slice(index + 1)];

    //     //     return {
    //     //         data: newArr
    //     //      }
    //     // })

    //     // 2 Вариант - сложный
        
    //     this.setState(({data}) => ({
    //         data: data.map(item => {                                      // напрямую изменять мы не можем, поэтому используем метод массива map
    //             if (item.id === id) {
    //                 return {...item, increase: !item.increase}            // возвращаем новый объект который содержит старые свойства айтема, + инкрис
    //             }
    //             return item;  
    //         })
    //     }))
    // }

    // 3 суперсложный (объединяем 2 пропса)

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({ 
            data: data.map(item => {                                      // напрямую изменять мы не можем, поэтому используем метод массива map
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}            // возвращаем новый объект который содержит старые свойства айтема, + инкрис
                }
                return item;  
            })
        }))
    }

    search = (items, term) => {
        if (term.length === 0) {
            return items;
        }
        else if (term.match(/^[0-9]+$/)) {
            return items.filter(item => {
                return item.salary.indexOf(term) > -1
            })
        }
        else {
            return items.filter(item => {
                return item.name.indexOf(term) > -1
            })
        }
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }
 
    filterList = (items, filter) => {
        switch (filter) {
            case 'like':
                return items.filter(item => item.like);
            case 'moreThen1000':
                return items.filter(item => item.salary > 1000);
            default:
                return items;
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }

    render () {
        const {data, term, filter} = this.state;
        const employeesCount = this.state.data.length;
        const employeesIncreaseCount = this.state.data.filter(item => item.increase).length;
        const visibleData = this.filterList(this.search(data, term), filter);
        return ( 
            <div className="app">
                <AppInfo
                    employeesCount = {employeesCount}
                    employeesIncreaseCount = {employeesIncreaseCount}
                />
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}
                    /> 
                    <AppFilter
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}
                    />
                </div>
    
                <EmployeesList 
                    data={visibleData}
                    onDelete = {this.deleteItem}
                    onToggleProp = {this.onToggleProp}
                />
                <EmployeesAddForm onAdd = {this.addItem}/>
            </div>
        );
    }
}

export default App;