import { Construct } from 'constructs';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as kms from 'aws-cdk-lib/aws-kms';

interface KmsConfig {
    actions?: string[];
    sourceRoles?: string[]; 
}

const policyActionsRoot: string[] = [
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
    "kms:CancelKeyDeletion",
    "kms:Decrypt",
    "kms:Encrypt",
    "kms:CreateGrant",
    "kms:ListAliases",
    "kms:ReEncrypt*",
    "kms:GenerateDataKey*",
    "kms:DescribeKey"
];

const policyActions: string[] = [
    "kms:Decrypt",
    "kms:Encrypt",
    "kms:CreateGrant",
    "kms:ListAliases",
    "kms:ReEncrypt*",
    "kms:GenerateDataKey*",
    "kms:DescribeKey"
]

export class Kms extends kms.Key {
    public constructor(scope: Construct, id: string, config: KmsConfig, props?: kms.KeyProps){
        
        //default interface values
        const { sourceRoles = [] } = config;
        const { actions = policyActions } = config;
        
        //Add account root to principal policy statement

        var policyStatementRoot = new iam.PolicyStatement({
            actions: policyActionsRoot,
            resources: ['*']
        });

        policyStatementRoot.addPrincipals(new iam.AccountRootPrincipal());
   
        var policyStatement = new iam.PolicyStatement({
            actions: actions,
            resources: ['*']
        });

        for (var i = 0; i < sourceRoles.length; i++) {
            policyStatement.addPrincipals(new iam.ArnPrincipal(sourceRoles[i]));
        };

        super(scope, id, {
            enableKeyRotation: true,
            policy: new iam.PolicyDocument({
                statements: [policyStatement,policyStatementRoot]
            }),
            ...props,
        });
    };
};