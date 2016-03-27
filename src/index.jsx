console.log('I am alive!');

import React from 'react';
import { render } from 'react-dom';
import t from 'tcomb-form';
import transform from 'tcomb-json-schema';


const Form = t.form.Form;


let formSchema = transform({
	"title": "None",
	"type": "object",
	"properties": {
		"firstName": {
			"type": "string"
		}
	}
});


fetch('/barleyrs/entitytypes/scott.picdb/Picture')
.then(function(response) {
  return response.json()
}).then(function(json) {
	formSchema = transform( json );
	render(<App />, document.getElementById('app'));
});


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
/*
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
		"age": {
			"description": "Age in years",
			"type": "integer",
			"minimum": 0
		}
	},
	"required": ["firstName", "lastName", "sex"]
});
*/

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
  
  onChange(value, path) {
    // validate a field on every change
    this.refs.form.getComponent(path).validate();
  },

  render() {
    return (
    	<div>
    	<Form ref="form" 
    		  type={formSchema}
    		  onChange={this.onChange} />
    		<button onClick={this.save}>Save</button>
    	</div>
    );
  }

});

render(<App />, document.getElementById('app'));



/*		"lastName2": {
"type": "string"
},
"lastName3": {
"type": "string"
},
"lastName4": {
"type": "string"
},
"lastName5": {
"type": "string"
},
"lastName6": {
"type": "string"
},
"lastName7": {
"type": "string"
},
"lastName8": {
"type": "string"
},
"lastName9": {
"type": "string"
},
"lastName11": {
"type": "string"
},
"lastName12": {
"type": "string"
},
"lastName13": {
"type": "string"
},
"lastName14": {
"type": "string"
},
"lastName15": {
"type": "string"
},
"lastName16": {
"type": "string"
},
"lastName17": {
"type": "string"
},
"lastName18": {
"type": "string"
},
"lastName19": {
"type": "string"
},
"lastName111": {
"type": "string"
},
"lastName112": {
"type": "string"
},
"lastName113": {
"type": "string"
},
"lastName114": {
"type": "string"
},
"lastName115": {
"type": "string"
},
"lastName116": {
"type": "string"
},
"lastName117": {
"type": "string"
},
"lastName118": {
"type": "string"
},
"lastName119": {
"type": "string"
},
"lastName1111": {
"type": "string"
},
"lastName1112": {
"type": "string"
},
"lastName1113": {
"type": "string"
},
"lastName1114": {
"type": "string"
},
"lastName1115": {
"type": "string"
},
"lastName1116": {
"type": "string"
},
"lastName1117": {
"type": "string"
},
"lastName1118": {
"type": "string"
},
"lastName1119": {
"type": "string"
},
"sex": {
"type": "string"
},
*/