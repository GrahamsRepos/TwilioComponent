import React from 'react';
import {withTaskContext} from '@twilio/flex-ui';

class CRMDisplay extends React.Component {
    constructor(props) {

        super(props);
    }
    render() {
        // Retrieve Task details
        // (`task` will be undefined if there's no task selected in the UI)
        const baseURL = this.props.baseURL;
        const Token = this.props.token;
        const {task} = this.props;


        let attributes = '';

        if (typeof task !== 'undefined') {
            attributes = {...task.attributes};
            if (attributes.channelType === 'whatsapp' || attributes.channelType === 'web' || attributes.channelType === '' || attributes.channelType === 'voice') {
                attributes = {...attributes, ...attributes.information};
                delete attributes.information;
                if (attributes.channelType === 'whatsapp') {
                    attributes.phone = attributes.phone.replace("whatsapp:", "");
                }
                if (attributes.channelType === '') {
                    attributes.channelType = 'voice';
                }
            }
        }
        let taskAttributes = encodeURIComponent(JSON.stringify(attributes));
        //if the task exists render the form on the crm , else render the loading page
        const source = task ? `${baseURL}/link/flexform?Token=${Token}&TaskSID=${task.taskSid}&Attributes=${taskAttributes}` : `${baseURL}/link/flexloading?Token=${Token}`;

        return (<div style={{width: "100%", height: "100%"}}>
                <iframe title='Loading' src={source} style={{width: "100%", height: "100%"}}/>
            </div>
        );
    }
}
//The withTaskContext provides the task object as a prop to the component
export default withTaskContext(CRMDisplay);