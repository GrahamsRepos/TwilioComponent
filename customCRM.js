//Custom CRM Container
import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import Loading from './components/CRMDisplay/CRMDisplay'
import CallScripts from "./src/components/CallScript/CallScripts";



import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';

const PLUGIN_NAME = "CRMIFrame";

export default class SamplePlugin extends FlexPlugin {
    constructor() {
        super(PLUGIN_NAME);
    }

    /**
     * This code is run when your plugin is being started
     * Use this to modify any UI components or attach to the actions framework
     *
     * @param flex { typeof import('@twilio/flex-ui') }
     * @param manager { import('@twilio/flex-ui').Manager }
     */
    init(flex, manager) {
        this.registerReducers(manager);

        const baseUrl = 'http://192.168.8.110:8010';
        let token = encodeURIComponent(JSON.parse(localStorage.getItem('TWILIO_FLEX_SSO'))["token"]);
        let currentTask = manager.store.getState();
        console.log(`Store ${manager.store.getState()}`);
        if(currentTask !== null && typeof currentTask !== 'undefined'){
            console.log(`CurrentTask ${JSON.stringify(currentTask.attributes)}`);
        }
        flex.CRMContainer.Content.replace(<Loading key='WaitingForTask' baseURL = {baseUrl} token={token}/>);



        flex.Actions.addListener("afterAcceptTask",(payload, abortFunction) => {
            let task = payload.task;
            let taskAttributes = encodeURIComponent(JSON.stringify(task.attributes));
            console.log(`Task attributes ${JSON.stringify(task.attributes)}`);
            //Fix up the json abit to make it easier to import
            let attributes ={...task.attributes};
            if(attributes.channelType==='whatsapp'||attributes.channelType==='web'||attributes.channelType===''||attributes.channelType==='voice'){
                attributes = {...attributes,...attributes.information};
                delete attributes.information;
                if(attributes.channelType==='whatsapp'){
                    attributes.phone = attributes.phone.replace("whatsapp:","");
                }
                if(attributes.channelType===''){
                    attributes.channelType='voice';
                }
            }

            taskAttributes = encodeURIComponent(JSON.stringify(attributes));
            flex.CRMContainer.Content.replace(<Loading key='Form' src={`http://192.168.8.110:8010/link/flexform?Token=${token}&TaskSID=${task.taskSid}&Attributes=${taskAttributes}`} />);

            console.log(`payload ${JSON.stringify(payload.task.attributes)}`);
        });


        flex.Actions.addListener("afterCompleteTask",(payload, abortFunction) => {
            let task = payload.task;
            let taskAttributes = encodeURIComponent(JSON.stringify(task.attributes));
            console.log(`Task attributes ${JSON.stringify(task.attributes)}`);
            flex.CRMContainer.Content.replace(<Loading key='WaitingForTask' src={`http://192.168.8.110:8010/link/flexloading?Token=${token}`} />);

            console.log(`payload ${JSON.stringify(payload.task.attributes)}`);
        });





        console.log(`SessionToken ${token}`);
        let urlLoading= `http://192.168.8.110:8010/link/flexloading?Token=${token}`;
        console.log(urlLoading);

        // flex.CRMContainer.defaultProps.uriCallback = (task) => {
        //
        //   let taskAttributes;
        //   if(task!==null&&task){
        //     console.log(`Task Status ${task.status}`);
        //     console.log(`Task SID ${task.taskSid}`);
        //     console.log(`Task SID ${JSON.stringify(task.attributes)}`);
        //
        //     taskAttributes = encodeURIComponent(JSON.stringify(task.attributes));
        //
        //     console.log(task?`hastask ${JSON.stringify(task.attributes)}`:"notask");
        //   }
        //
        //   return task
        //       ? `http://192.168.8.110:8010/link/flexform?Token=${token}&TaskSID=${task.taskSid}&Attributes=${taskAttributes}`
        //       : `http://192.168.8.110:8010/link/flexloading?Token=${token}`;
        // }
    }

    /**
     * Registers the plugin reducers
     *
     * @param manager { Flex.Manager }
     */
    registerReducers(manager) {
        if (!manager.store.addReducer) {
            // eslint: disable-next-line
            console.error(`You need FlexUI > 1.9.0 to use built-in redux; you are currently on ${VERSION}`);
            return;
        }

        manager.store.addReducer(namespace, reducers);
    }
}
