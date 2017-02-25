# React Smart Select
#### React select component

#### Remark:
This is boilerplate with hot module replacement and redux.

Component located at:
[react-smart-select/frontend/components/SmartSelect/](https://github.com/soldovskij/react-smart-select/tree/master/frontend/components/SmartSelect)

#### Features:
- On mobile devices work as native select
- On desktop select is drop down as default, if not enough space - drop up
- Search with hihglight
- Auto correct keyboard layout from EN to RU
 
#### Component has several properties:
- list - dataSource for SmartSelect 
- rules - an object that defines what field of the object considered as a key, and as a value
- name - will be used when the form is submitted to the server request
- placeholder - user see that when nothing is selected
- style - style set for component 

#### How to use
    // countryList = [{ iso: 000, name: 'Some Country' }]
    <SmartSelector
        name  = "city-selector"
        list  = { countryList }
        rules = {{ 'key': 'iso', 'value': 'name' }}
        style = {{ width: '350px' }}
        placeholder = "Select the country"
    />
    
#### For launch example
- git clone https://github.com/soldovskij/react-smart-select.git
- npm install
- npm start
- open in browser on 3000 port

![React Smart Select](https://image.ibb.co/jEfFVa/react_smart_select.png)
