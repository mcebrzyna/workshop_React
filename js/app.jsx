import React from 'react';
import ReactDOM from 'react-dom';

document.addEventListener('DOMContentLoaded', function(){

    const kitties = [
        {category: "male", age: "4", likesKids: true, name: "Fidel Catstro"},
        {category: "male", age: "9", likesKids: true, name: "Hairy Potter"},
        {category: "male", age: "2", likesKids: false, name: "Grumpy"},
        {category: "female", age: "1", likesKids: true, name: "Jude Paw"},
        {category: "female", age: "2", likesKids: false, name: "Lucifurr"},
        {category: "female", age: "3", likesKids: true, name: "Meowly Cyrus"}
    ];


    class SearchBar extends React.Component {

        render() {
            return (
                <form>
                    <input type="text" placeholder="Search..." value={this.props.text} onChange={this.props.handleText} />
                    <label className="control control-checkbox">
                        Only show kitties that likes kids
                        <input type="checkbox" checked={this.props.check} onChange={this.props.handleCheck} />
                        <div className="control_indicator"/>
                    </label>
                </form>)
        }
    }

    class CatTable extends React.Component {
        render() {
            let rows = [];
            let lastCategory = null;

            this.props.kitties.forEach( (kitty, index) => {
                const name = kitty.name.toLowerCase();
                const text = this.props.text.toLowerCase();

                if(this.props.check && !kitty.likesKids){
                    return null;
                }
                else if(name.indexOf(text) !== -1){

                    if(lastCategory !== kitty.category){
                        rows.push(<CatCategoryRow category={kitty.category} key={index}/>)
                    }

                    rows.push(<CatRow kitty={kitty} key={kitty.name} />);
                    lastCategory = kitty.category;
                }
            });

            return (
                <table>
                    <thead>
                        <tr><th>Name</th><th>Age</th></tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            )
        }
    }

    class CatRow extends React.Component {
        render() {
            const name = this.props.kitty.likesKids ?
                this.props.kitty.name : <span style={{color: '#ff4f52'}}> {this.props.kitty.name} </span>;
            return <tr><td>{name}</td><td className='age'>{this.props.kitty.age}</td></tr>;
        }
    }

    class CatCategoryRow extends React.Component {
        render() {
            return <tr><th className='category' colSpan="2">{this.props.category}</th></tr>;
        }
    }

    class App extends React.Component{
        state = {
            check: false,
            text: '',
        };

        handleText = ev => {
            this.setState({text: ev.target.value});
        };

        handleCheck = ev => {
            this.setState({check: ev.target.checked})
        };

        render(){

            return(
                <div>
                    <h1>Find your kitty...</h1>
                    <SearchBar check={this.state.check}
                               text={this.state.text}
                               handleText={this.handleText}
                               handleCheck={this.handleCheck}/>
                    <CatTable kitties={this.props.kitties}
                              check={this.state.check}
                              text={this.state.text}/>
                </div>)
        }
    }

    ReactDOM.render(
        <App kitties={kitties} />,
        document.getElementById('app')
    );

});

