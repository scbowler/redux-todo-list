import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { addListItem } from '../actions';

class AddItem extends Component {
    renderInput({ input, label, meta: { touched, error } }){
        
        return (
            <div className="row">
                <div className="s12">
                    <label>{label}</label>
                    <input {...input} type="text" autoComplete="off"/>
                    <p className="red-text text-darken-2">{touched && error}</p>
                </div>
            </div>
        );
    }

    saveItem = async (values) => {
        console.log('Form Values:', values);
        
        await this.props.addListItem(values);

        this.props.history.push('/');
    }

    render(){
        const { handleSubmit } = this.props;

        return (
            <div>
                <h1 className="center">Add Item</h1>
                <div className="row">
                    <div className="col s8 offset-s2">
                        <form onSubmit={handleSubmit(this.saveItem)}>
                            <Field name="title" component={this.renderInput} label="Title"/>
                            <Field name="details" component={this.renderInput} label="Details"/>
                            <div className="row">
                                <div className="s12 right-align">
                                    <button className="btn blue-grey darken-1">Add Item</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

function validate({ title, details }){
    const errors = {};

    if(!title){
        errors.title = 'Please give your item a title';
    }

    if(!details){
        errors.details = 'Please give your item some details';
    }

    return errors;
}

AddItem = reduxForm({
    form: 'add-item',
    validate: validate
})(AddItem);

export default connect(null, {
    addListItem: addListItem
})(AddItem);
