# AWS KMS lib

Library created by:

- Name: Felipe Velasco  
- Org: BaasKit

## Usage

Code example:

``` typescript
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { Kms } from '@felipevelascohz/kms';
const iniciativa :string = 'IdSbxFelipeVelasco';
const provider = {
  account: process.env.CDK_DEFAULT_ACCOUNT, 
  region: process.env.CDK_DEFAULT_REGION 
};
const app = new cdk.App();
const stack = new cdk.Stack(app, iniciativa, {
  env: provider,
})
new Kms(stack, "Key", {})
app.synth();
```
