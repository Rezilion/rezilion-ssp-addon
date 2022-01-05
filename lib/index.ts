import { ManagedPolicy } from '@aws-cdk/aws-iam';
import { Construct } from '@aws-cdk/core';
import * as ssp from '@aws-quickstart/ssp-amazon-eks';
import { HelmAddOn, HelmAddOnProps, HelmAddOnUserProps } from '@aws-quickstart/ssp-amazon-eks/dist/addons/helm-addon';

export interface RezilionAddOnProps extends HelmAddOnUserProps {
    cloudWatchRegion: string
}


export const defaultProps: HelmAddOnProps & RezilionAddOnProps = {
    chart: 'aws-cloudwatch-metrics',
    cloudWatchRegion: 'us-east-1',
    name: 'rezilion-test-addon',
    namespace: 'kube-system',
    release: 'ssp-addon-myextension-rezilion-test',
    version: '0.0.6',
    repository: 'https://aws.github.io/eks-charts',
    values: {}
}

export class RezilionAddOn extends HelmAddOn {

    readonly options: RezilionAddOnProps;

    constructor(props: RezilionAddOnProps) {
        super({...defaultProps, ...props});
        this.options = this.props as RezilionAddOnProps;
    }

    deploy(clusterInfo: ssp.ClusterInfo): void | Promise<Construct> {
        const serviceAccountName = 'aws-for-fluent-bit-sa';
        const sa = clusterInfo.cluster.addServiceAccount('my-aws-for-fluent-bit-sa', {
            name: serviceAccountName,
            namespace: this.props.namespace
        });

        // Cloud Map Full Access policy.
        const cloudWatchAgentPolicy = ManagedPolicy.fromAwsManagedPolicyName("CloudWatchAgentServerPolicy");
        sa.role.addManagedPolicy(cloudWatchAgentPolicy);
        
        const chart = this.addHelmChart(clusterInfo, {
            serviceAccount: {
                create: false,
                name: serviceAccountName
            },
            cloudWatch: {
                region: this.options.cloudWatchRegion
            } 
        });
        chart.node.addDependency(sa);

        return Promise.resolve(chart);
    }
}