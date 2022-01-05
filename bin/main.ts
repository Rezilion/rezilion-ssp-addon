import { App } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import { RezilionAddOn } from '../dist';

const app = new App();

ssp.EksBlueprint.builder()
    .addOns(new ssp.MetricsServerAddOn)
    .addOns(new ssp.ClusterAutoScalerAddOn)
    .addOns(new ssp.addons.SSMAgentAddOn)
    .addOns(new RezilionAddOn({
        cloudWatchRegion: 'us-east-1'
    }))
    .build(app, 'my-extension-test-blueprint');
