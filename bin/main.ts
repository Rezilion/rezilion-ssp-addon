import { App } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import { RezilionAddOn } from '../lib';

const app = new App();

ssp.EksBlueprint.builder()
    .addOns(new RezilionAddOn('dynamic_test_api_key'))
    .build(app, 'lzl-rezilion-addon');
