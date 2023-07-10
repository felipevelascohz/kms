import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';

interface KmsConfig {
    actions?: string[];
    sourceRoles?: string[];
    disableRootPrincipal?: boolean;  
}

const policyActions: string[] = [
    "kms:Create*",
    "kms:Describe*",
    "kms:Enable*",
    "kms:List*",
    "kms:Put*",
    "kms:Update*",
    "kms:Revoke*",
    "kms:Disable*",
    "kms:Get*",
    "kms:Delete*",
    "kms:ScheduleKeyDeletion",
    "kms:CancelKeyDeletion"
];

export class Kms extends kms.Key {
    public constructor(scope: Construct, id: string, config: KmsConfig, props?: kms.KeyProps){
        
        //default interface values
        const { disableRootPrincipal = false } = config;
        const { sourceRoles = [] } = config;
        const { actions = policyActions } = config;
        
        //policyStatement for policyDocument
        const policyStatement = new iam.PolicyStatement({
            actions: actions,
            resources: ['*']
        });

        //Add account root to principal policy statement
        if (disableRootPrincipal == false ) {
            policyStatement.addPrincipals(new iam.AccountRootPrincipal());
        };

        //Add an array of source roles ti principal policy statement, required if disableRootPrincipal == true
        for (var i = 0; i < sourceRoles.length; i++) {
            policyStatement.addPrincipals(new iam.ArnPrincipal(sourceRoles[i]));
        };

        super(scope, id, {
            enableKeyRotation: true,
            policy: new iam.PolicyDocument({
                statements: [policyStatement]
            }),
            ...props,
        });
    };
};