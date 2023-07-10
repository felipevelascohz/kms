# AWS KMS lib

Library created by:

- Name: Felipe Velasco

## Usage

Code example:

``` typescript
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import * as kms from '@felipevelascohz/kms';
const iniciativa :string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};
const app = new cdk.App();
const stack = new cdk.Stack(app, iniciativa, {
  env: provider,
})
new kms.Kms(stack, "Key", {})
app.synth();
```
