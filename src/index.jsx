console.log('I am alive!');

import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import transform from 'tcomb-json-schema';


const Form = t.form.Form;

// define your domain model with tcomb
/*
const Person = t.struct({
  name: t.String,
  surname: t.String
});
*/

/*
 * or with JSON schema
 */
const Person = transform({
	"title": "Person",
	"type": "object",
	"properties": {
		"firstName": {
			"type": "string"
		},
		"lastName": {
			"type": "string"
		},
		"sex": {
			"type": "string"
		},
		"age": {
			"description": "Age in years",
			"type": "integer",
			"minimum": 0
		}
	},
	"required": ["firstName", "lastName", "sex"]
});


const App = React.createClass({

  save() {
    // call getValue() to get the values of the form
    var value = this.refs.form.getValue();
    // if validation fails, value will be null
    if (value) {
      // value here is an instance of Person
      console.log(value);
    }
  },

  render() {
    return (
      <div>
        <Form
          ref="form"
          type={Person}
        />
        <button onClick={this.save}>Save</button>
      </div>
    );
  }

});

render(<App />, document.getElementById('app'));

