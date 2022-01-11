import { ManagedPolicy } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import merge from "ts-deepmerge";
import { HelmAddOn, HelmAddOnProps, HelmAddOnUserProps } from '@aws-quickstart/ssp-amazon-eks/dist/addons/helm-addon';

export interface RezilionAddOnProps extends HelmAddOnUserProps {
    apiKey: string
}


export const defaultProps: HelmAddOnProps & RezilionAddOnProps = {
    chart: 'rezilion',
    name: 'rezilion',
    namespace: 'kube-system',
    release: 'rezilion',
    version: '0.0.1',
    repository: 'https://lzl-ssp-helm-test.s3.eu-west-1.amazonaws.com',
    apiKey: 'placeholder'
}

export class RezilionAddOn extends HelmAddOn {

    readonly options: RezilionAddOnProps;

    constructor(props: RezilionAddOnProps) {
        super({...defaultProps, ...props});
        this.options = this.props as RezilionAddOnProps;
    }

    deploy(clusterInfo: ssp.ClusterInfo): void | Promise<Construct> {
        const values = this.options.values ?? {};
        values['apiKey'] = this.options.apiKey

        const chart = this.addHelmChart(clusterInfo,
            values);

        return Promise.resolve(chart);
    }
}