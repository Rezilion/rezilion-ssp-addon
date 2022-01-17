import {Construct} from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import {HelmAddOn, HelmAddOnProps} from '@aws-quickstart/ssp-amazon-eks/dist/addons/helm-addon';

export const defaultProps: HelmAddOnProps = {
    chart: 'rezilion',
    name: 'rezilion',
    namespace: 'kube-system',
    release: 'rezilion',
    version: '0.0.1',
    repository: 'https://rezilion-ssp.s3.eu-west-1.amazonaws.com',
}

export class RezilionAddOn extends HelmAddOn {

    readonly apiKey: String;

    constructor(apiKey: string, props: HelmAddOnProps = defaultProps) {
        super({...defaultProps, ...props});
        this.apiKey = apiKey
    }

    deploy(clusterInfo: ssp.ClusterInfo): void | Promise<Construct> {
        const values = this.props.values ?? {};
        values['apiKey'] = this.apiKey

        const chart = this.addHelmChart(clusterInfo, values);

        return Promise.resolve(chart);
    }
}