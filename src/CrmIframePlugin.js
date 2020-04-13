import React from 'react';
import { VERSION } from '@twilio/flex-ui';
import { FlexPlugin } from 'flex-plugin';
import CRMDisplay from './components/CRMDisplay/CRMDisplay'



import CustomTaskListContainer from './components/CustomTaskList/CustomTaskList.Container';
import reducers, { namespace } from './states';
import CallScripts from "./components/CallScript/CallScripts";

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
    flex.CRMContainer.Content.replace(<CallScripts key='callScripts'/>);
    // flex.CRMContainer.Content.replace(<CRMDisplay key='WaitingForTask' baseURL = {baseUrl} token={token}/>);





    console.log(`SessionToken ${token}`);
    let urlLoading= `http://192.168.8.110:8010/link/flexloading?Token=${token}`;
    console.log(urlLoading);

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


