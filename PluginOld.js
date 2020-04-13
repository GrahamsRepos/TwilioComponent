import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';



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
        flex.Actions.addListener("afterAcceptTask",(payload, abortFunction) => {
            console.log("Task Completed");
            console.log(`payload ${JSON.stringify(payload)}`);
        });


        let token = encodeURIComponent(JSON.parse(localStorage.getItem('TWILIO_FLEX_SSO'))["token"]);
        console.log(`SessionToken ${token}`);
        let urlLoading= `http://192.168.8.110:8010/link/flexloading?Token=${token}`;
        console.log(urlLoading);

        flex.CRMContainer.defaultProps.uriCallback = (task) => {

            let taskAttributes;
            if(task!==null&&task){
                console.log(`Task Status ${task.status}`);
                console.log(`Task SID ${task.taskSid}`);
                console.log(`Task SID ${JSON.stringify(task.attributes)}`);

                taskAttributes = encodeURIComponent(JSON.stringify(task.attributes));

                console.log(task?`hastask ${JSON.stringify(task.attributes)}`:"notask");
            }

            return task
                ? `http://192.168.8.110:8010/link/flexform?Token=${token}&TaskSID=${task.taskSid}&Attributes=${taskAttributes}`
                : `http://192.168.8.110:8010/link/flexloading?Token=${token}`;
        }
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
