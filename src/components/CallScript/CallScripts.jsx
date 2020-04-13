import React from 'react';
import {Tabs, Tab} from 'react-bootstrap';
import {withTaskContext} from '@twilio/flex-ui';


import './Reactbootstrap.css';


class CallScripts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            hasContent: true,
            data: [{
                "Category": "Bond Optimizer",
                "Scriptss": [{
                    "Language": "Afrikaans",
                    "Content": "<p><strong>Afrikaans</strong></p><p>BondOptimiser Content</p>"
                }, {
                    "Language": "English",
                    "Content": "<p><strong>English</strong></p><p>Bond Optimiser</p><p><strong>Hi client ... blah blah blah blah</strong></p><ul><li>Say this</li><li>Then this</li><li>Then Close the deal</li></ul>"
                }]
            }, {
                "Category": "Vodacom",
                "Scriptss": [{
                    "Language": "Afrikaans",
                    "Content": "<p><strong>Afrikaans</strong></p><p>Vodacom</p><p>Hi klient ... blah blah blah blah</p>"
                }, {
                    "Language": "English",
                    "Content": "<p><strong>English</strong></p><p>Vodacom</p><p><strong>Hi client ... blah blah blah blah</strong></p><ul><li>Say this</li><li>Then this</li><li>Then Close the deal</li></ul>"
                }]
            }, {
                "Category": "Salary Advance",
                "Scriptss": [{
                    "Language": "Afrikaans",
                    "Content": "<p><strong>Opskrif 1</strong></p><p>Sal ADV</p><p><strong>Hi klient ... blah blah blah blah</strong></p>"
                }, {
                    "Language": "English",
                    "Content": "<p><strong>Heading 1</strong></p><p>SalaryADV</p><p><strong>Hi client ... blah blah blah blah</strong></p><ul><li>Say this</li><li>Then this</li><li>Then Close the deal</li></ul>"
                }]
            }]
        };

    }

    getLanguages = (data) => {
        let languages = [];
        data.forEach(dataentry => {
            dataentry.Scriptss.forEach(entry => {
                let lang = entry["Language"];
                if (!languages.includes(lang)) {
                    languages.push(lang);
                }
            })
        });
        return languages;
    };

    getCategories = (data) => {
        return data.map(entry => (
            entry.Category
        ));
    };

    getContent = (data, category, language) => {
        let categoryData = data.filter(entry => {
            return entry["Category"] === category;
        })[0];
        let ScriptData = categoryData["Scriptss"].filter(script => {
            return script["Language"] === language;
        })[0];
        console.log(ScriptData["Content"]);
        return ScriptData["Content"];

    };

    componentDidMount() {
        fetch('http://192.168.8.110:8010/rest/getscripts/v1/GetScripts/fetch')
            .then(res => res.json())
            .then(data => {
                this.setState({data: data, hasContent: true});
            }).catch(error => {
            console.log(error);
        })

        // console.log(this.state.data[0].Scriptss[0].Content);
        // let languages = getLanguages(this.state.data);
        // let categories = getCategories(this.state.data);
        // console.log(languages);
        // console.log(categories);
    }

    render() {

        let data = this.state.data;
        let languages;
        let categories;
        if (this.state.hasContent) {
            languages = this.getLanguages(data);
            categories = this.getCategories(data);
        }

        return (
            this.state.hasContent ?
                <div className="Tabs Container">
                    <Tabs key="Categories" id="Categories" defaultActiveKey="Vodacom">
                        {categories.map(cat => (
                            <Tab key={`${cat}`} eventKey={`${cat}`} title={`${cat}`}>

                                <Tabs  key="Lang" id="Lang" defaultActiveKey={`${cat}_English`}>
                                    {languages.map(lang => (
                                        <Tab key={`${cat}_${lang}`} eventKey={`${cat}_${lang}`} title={`${lang}`}
                                             dangerouslySetInnerHTML={{__html: this.getContent(data, cat, lang)}}/>
                                    ))}
                                </Tabs>

                            </Tab>
                        ))}
                    </Tabs>
                </div>
                : <div><h3>No Script Content</h3></div>
        );
    }
}


export default withTaskContext(CallScripts);

