import { App } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
//import * as wego from '@weaveworksoss/weavegitops-ssp-addon';
import { RezilionAddOn } from '../lib';

const app = new App();

ssp.EksBlueprint.builder()
    .addOns(new RezilionAddOn({
        apiKey: 'dynamic_test_api_key'
    }))
    .build(app, 'ssp-rezilion-addon');
