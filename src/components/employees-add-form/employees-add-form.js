import { Component } from 'react';

import './employees-add-form.css';

class EmployeesAddForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            salary: ''
        }
    }

    onValueChange = (e) => {
        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value                        //записываем составное свойство в объект
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        if(this.state.name < 3 || !isNaN(this.state.name) || !this.state.salary || this.state.salary < 0) return;      // пустой return - сворачиваем лавочку и кнопка не срабатывает, иначе идем дальше по коду...
        this.props.onAdd(this.state.name, this.state.salary);
        this.setState({
            name: '',
            salary: ''
        })
    }

    render () {
        const {name, salary} = this.state;
        return (
            <div className="app-add-form">
                <h3>Добавьте нового сотрудника</h3>
                <form
                    className="add-form d-flex">
                    <input type="text"
                        className="form-control new-post-label"
                        placeholder="Как его зовут?"
                        name="name"            
                        value={name}                                    // Управляемый компонент благодаря которому реакт компонент будет рендерить форму и контролировал её поведение в ответ на ввод пользователя
                        onChange={this.onValueChange} />
                    <input type="number"
                        className="form-control new-post-label"
                        placeholder="З/П в $?"
                        name="salary"
                        value={salary}    
                        onChange={this.onValueChange} />

                    <button type="submit" 
                            className="btn btn-outline-light"
                            onClick={this.onSubmit}>
                                Добавить
                    </button>
                </form>
            </div>
        )
   }
}

export default EmployeesAddForm;