import * as cdk from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { Kms } from '../src/kms';


const provider = {
   account: process.env.CDK_DEFAULT_ACCOUNT, 
   region: process.env.CDK_DEFAULT_REGION 
 }
 
const id: string = 'MyTestStack'

test('SQS Created', () => {
  const app = new cdk.App();
  const stack = new cdk.Stack(app, id, {
    env: provider
  });
  new Kms(stack, id, {});
  const template = Template.fromStack(stack);
  template.hasResourceProperties('AWS::KMS::Key', {
   "EnableKeyRotation": true
  });
});